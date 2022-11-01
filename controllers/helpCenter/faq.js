'use strict';

// IMPORT ALL PACKAGES
const fs = require('fs');
const client = require('../../connection');

// HELPER MODULE
const helperModule = require('../../helpers/module');
const { filePath, sliceImageFile } = helperModule;

// API GET HELP CENTER ALL FAQ DATA
exports.getAllFaqs = async (req, res) => {
  try {
    const joinFaqsTopic = await client.query(
      `SELECT help_center_faqs.faq_id, help_center_faqs.question, help_center_topic.topic, help_center_faqs.answer, help_center_faqs.faq_image FROM help_center_faqs LEFT JOIN help_center_topic ON help_center_faqs.topic_id = help_center_topic.topic_id`
    );

    return res.status(200).json({
      success: true,
      message: 'Got all data successfully.',
      data: joinFaqsTopic.rows,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'There is no data found.' });
  }
};

// API GET HELP CENTER A FAQ DATA BY ID
exports.getSingleFaq = (req, res) => {
  try {
    client.query(
      `SELECT * FROM help_center_faqs WHERE faq_id = ${req.params.id}`,
      (error, result) => {
        if (result.rows.length === 0) {
          console.log(error);
          return res.status(400).json({
            success: false,
            error: 'There is no data found with this Id.',
          });
        } else {
          const {
            rows: [singleFaq],
          } = result;

          return res.status(200).json({
            success: true,
            message: 'Got the data successfully.',
            data: singleFaq,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};

// API SEARCH HELP CENTER FAQS DATA BY KEYWORDS
exports.searchFaqs = async (req, res) => {
  const { keyword, topic_id, orderBy, order, currentPage, perPage } = req.query;

  const sql = `SELECT fa.faq_id, fa.question, t.topic_id, t.topic, fa.answer, fa.faq_image, fa.created_at, fa.updated_at
    FROM help_center_faqs fa
    LEFT JOIN help_center_topic t ON fa.topic_id = t.topic_id ${
      keyword || topic_id ? 'WHERE' : ''
    } ${
    keyword ? "LOWER(fa.question) LIKE '%" + keyword.toLowerCase() + "%'" : ''
  } ${topic_id ? `${keyword ? 'AND' : ''} t.topic_id = ${topic_id}` : ''}`;

  const totalData = await client.query(sql);

  client.query(
    `${sql} ORDER BY ${orderBy || 'faq_id'} ${order || 'ASC'} LIMIT ${
      +perPage || 10
    } OFFSET ${((+currentPage || 1) - 1) * (perPage || 10)}`,
    (error, result) => {
      if (result.rows.length === 0) {
        console.log(error);
        return res.status(400).json({
          success: false,
          error: 'There is no data found with this keyword.',
        });
      } else {
        return res.status(200).json({
          success: true,
          message: 'Data was found with this keyword.',
          totalData: totalData.rowCount,
          resultData: result.rowCount,
          perPage: perPage,
          currentPage: currentPage,
          data: result.rows,
        });
      }
    }
  );
};

// API POST HELP CENTER A FAQ DATA
exports.postFaq = (req, res) => {
  try {
    const { question, topic_id, answer } = req.body;

    const created_at = new Date();

    const image = req.file;

    let imagePath;

    if (image) {
      imagePath = filePath(req, 'faq_image', image.filename);
    } else {
      imagePath = null;
    }

    client.query(
      `INSERT INTO help_center_faqs (question, topic_id, answer, created_at, faq_image) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [question, topic_id, answer, created_at, imagePath],
      (error, result) => {
        if (error) {
          console.log(error);
          return res.status(400).json({
            success: false,
            error: 'The data was not created.',
          });
        } else {
          const {
            rows: [faq],
          } = result;

          return res.status(200).json({
            success: true,
            message: 'Created the data successfully.',
            data: faq,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};

// API PUT / UPDATE HELP CENTER A FAQ DATA BY ID
exports.updateFaq = async (req, res) => {
  try {
    const {
      rows: [faq],
    } = await client.query(
      `SELECT * FROM help_center_faqs WHERE faq_id = ${req.params.id}`
    );

    if (!faq) {
      return res.status(400).json({
        success: false,
        error: 'There is no data found with this Id.',
      });
    } else {
      const {
        question: exist_question,
        topic_id: exist_topic_id,
        answer: exist_answer,
        faq_image: exist_faq_image,
      } = faq;

      const image = req.file;

      let imagePath;
      let prevImage;

      if (exist_faq_image) {
        prevImage = exist_faq_image.slice(sliceImageFile('faq_image'));
      }

      if (image) {
        imagePath = filePath(req, 'faq_image', image.filename);
      } else {
        imagePath = exist_faq_image;
      }

      const { question, topic_id, answer } = req.body;

      const updated_at = new Date();

      client.query(
        `UPDATE help_center_faqs SET question = $1, topic_id = $2, answer = $3, updated_at = $4, faq_image = $5 WHERE faq_id = $6 RETURNING *`,
        [
          question || exist_question,
          topic_id || exist_topic_id,
          answer || exist_answer,
          updated_at,
          imagePath || exist_faq_image,
          req.params.id,
        ],
        (error, result) => {
          if (error) {
            console.log(error);
            return res.status(400).json({
              success: false,
              error: 'Error while updating the data.',
            });
          } else {
            const {
              rows: [updatedFaq],
            } = result;

            if (image && updatedFaq && prevImage !== undefined) {
              fs.unlink(prevImage, error => {
                if (error) throw error;
              });
            }

            return res.status(200).json({
              success: true,
              message: 'Updated the data successfully.',
              data: updatedFaq,
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};

// API DELETE HELP CENTER A FAQ DATA BY ID
exports.deleteSingleFaq = async (req, res) => {
  try {
    const {
      rows: [faq],
    } = await client.query(
      `SELECT * FROM help_center_faqs WHERE faq_id = ${req.params.id}`
    );

    if (!faq) {
      return res.status(400).json({
        success: false,
        error: 'There is no data found with this Id.',
      });
    } else {
      if (faq.image) {
        fs.unlink(faq.image.slice(sliceImageFile('faq_image')), error => {
          if (error) throw error;
        });
      }

      client.query(
        `DELETE FROM help_center_faqs WHERE faq_id = ${req.params.id}`,
        error => {
          if (error) {
            console.log(error);
            return res.status(400).json({
              success: false,
              error: 'Error while deleting the data.',
            });
          } else {
            return res.status(200).json({
              success: true,
              message: 'Deleted the data successfully.',
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};
