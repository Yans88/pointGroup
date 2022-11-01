'use strict';

// IMPORT ALL PACKAGES
const client = require('../../connection');

// API GET HELP CENTER ALL FAQ TOPICS DATA
exports.getAllTopics = async (req, res) => {
  try {
    const allTopics = await client.query(
      `SELECT topic, user_type, COUNT(*) as related_questions FROM help_center_topic topic LEFT JOIN help_center_faqs faqs ON faqs.topic_id = topic.topic_id WHERE topic.topic_id = faqs.topic_id GROUP BY topic.topic, topic.user_type, faqs.topic_id ;`
    );

    return res.status(200).json({
      success: true,
      message: 'Got all data successfully.',
      totalData: allTopics.rowCount,
      data: allTopics.rows,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'There is no data found.' });
  }
};

// API GET HELP CENTER A FAQ TOPIC DATA BY ID
exports.getSingleTopic = (req, res) => {
  try {
    const sql = `SELECT t.topic_id, t.topic, t.user_type, (SELECT COUNT(*) FROM help_center_faqs fa WHERE fa.topic_id = ${req.params.id}), t.created_at, t.updated_at
    FROM help_center_topic t
    LEFT JOIN help_center_faqs fa ON fa.topic_id = t.topic_id WHERE t.topic_id = ${req.params.id}`;

    client.query(sql, (error, result) => {
      if (result.rows.length === 0) {
        console.log(error);
        return res.status(400).json({
          success: false,
          error: 'There is no data found with this Id.',
          data: result.rows.length,
        });
      } else {
        const {
          rows: [singleTopic],
        } = result;

        return res.status(200).json({
          success: true,
          message: 'Got the data successfully.',
          data: singleTopic,
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};

// API SEARCH HELP CENTER FAQ TOPICS DATA BY KEYWORDS
exports.searchTopics = async (req, res) => {
  const { keyword, user_type, orderBy, order, currentPage, perPage } =
    req.query;

  const sql = `SELECT t.topic_id, t.topic, t.user_type, (SELECT COUNT(*) FROM help_center_faqs fa WHERE fa.topic_id = t.topic_id), t.created_at, t.updated_at
    FROM help_center_topic t
    LEFT JOIN help_center_faqs fa ON t.topic_id = fa.topic_id ${
      keyword || user_type ? 'WHERE' : ''
    } ${
    keyword ? "LOWER(t.topic) LIKE '%" + keyword.toLowerCase() + "%'" : ''
  } ${
    user_type
      ? `${
          keyword ? 'AND' : ''
        } LOWER(t.user_type) LIKE '%${user_type.toLowerCase()}%'`
      : ''
  } GROUP BY t.topic_id, t.topic`;

  const totalData = await client.query(sql);

  client.query(
    `${sql} ORDER BY ${orderBy || 'topic_id'} ${order || 'ASC'} LIMIT ${
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

// API POST HELP CENTER A FAQ TOPIC DATA
exports.postTopic = (req, res) => {
  try {
    const { topic, user_type } = req.body;

    const created_at = new Date();

    client.query(
      `INSERT INTO help_center_topic (topic, user_type, created_at) VALUES ($1, $2, $3) RETURNING *`,
      [topic, user_type, created_at],
      (error, result) => {
        if (error) {
          console.log(error);
          return res.status(400).json({
            success: false,
            error: 'The data was not created.',
          });
        } else {
          const {
            rows: [topic],
          } = result;

          return res.status(200).json({
            success: true,
            message: 'Created the data successfully.',
            data: topic,
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

// API PUT / UPDATE HELP CENTER A FAQ TOPIC DATA BY ID
exports.updateTopic = async (req, res) => {
  try {
    const {
      rows: [current_topic],
    } = await client.query(
      `SELECT * FROM help_center_topic WHERE topic_id = ${req.params.id}`
    );

    if (!current_topic) {
      return res.status(400).json({
        success: false,
        error: 'There is no data found with this Id.',
      });
    } else {
      const { topic: exist_topic, user_type: exist_user_type } = current_topic;

      const { topic, user_type } = req.body;

      const updated_at = new Date();

      client.query(
        `UPDATE help_center_topic SET topic = $1, user_type = $2, updated_at = $3 WHERE topic_id = $4 RETURNING *`,
        [
          topic || exist_topic,
          user_type || exist_user_type,
          updated_at,
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
              rows: [updatedTopic],
            } = result;

            return res.status(200).json({
              success: true,
              message: 'Updated the data successfully.',
              data: updatedTopic,
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

// API DELETE HELP CENTER A FAQ TOPIC DATA BY ID
exports.deleteSingleTopic = async (req, res) => {
  try {
    const {
      rows: [topic],
    } = await client.query(
      `SELECT * FROM help_center_topic WHERE topic_id = ${req.params.id}`
    );

    if (!topic) {
      return res.status(400).json({
        success: false,
        error: 'There is no data found with this Id.',
      });
    } else {
      client.query(
        `DELETE FROM help_center_topic WHERE topic_id = ${req.params.id}`,
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
