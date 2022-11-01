'use strict';

// IMPORT ALL PACKAGES
const client = require('../../connection');

// API GET ABOUT ALL TERMS & CONDITION DATA
exports.getAboutAllTermsCondition = async (req, res) => {
  try {
    const allAboutTermsCondition = await client.query(
      `SELECT * FROM about_terms_condition`
    );

    return res.status(200).json({
      success: true,
      message: 'Got all data successfully.',
      data: allAboutTermsCondition.rows,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'There is no data found.' });
  }
};

// API GET ABOUT TERMS AND CONDITION DATA BY ID
exports.getAboutSingleTermsCondition = (req, res) => {
  try {
    client.query(
      `SELECT * FROM about_terms_condition WHERE terms_condition_id = ${req.params.id}`,
      (error, result) => {
        if (result.rows.length === 0) {
          console.log(error);
          return res.status(400).json({
            success: false,
            error: 'There is no data found with this Id.',
          });
        } else {
          const {
            rows: [aboutTermsCondition],
          } = result;

          return res.status(200).json({
            success: true,
            message: 'Got the data successfully.',
            data: aboutTermsCondition,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: 'Something error on server.',
    });
  }
};

// API POST ABOUT TERMS & CONDITION DATA
exports.postAboutTermsCondition = (req, res) => {
  try {
    const { title, description } = req.body;

    const created_at = new Date();

    client.query(
      `INSERT INTO about_terms_condition (title, description, created_at) VALUES ($1, $2, $3) RETURNING *`,
      [title, description, created_at],
      (error, result) => {
        if (error) {
          console.log(error);
          return res
            .status(400)
            .json({ success: false, error: 'The data was not created.' });
        } else {
          const {
            rows: [aboutTermsCondition],
          } = result;

          return res.status(200).json({
            success: true,
            message: 'Created the data successfully.',
            data: aboutTermsCondition,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: 'Something error on server.',
    });
  }
};

// API PUT / UPDATE ABOUT TERMS & CONDITION DATA BY ID
exports.updateAboutTermsCondition = async (req, res) => {
  try {
    const {
      rows: [aboutTermsCondition],
    } = await client.query(
      `SELECT * FROM about_terms_condition WHERE terms_condition_id = ${req.params.id}`
    );

    if (!aboutTermsCondition) {
      return res.status(400).json({
        success: false,
        error: 'There is no data found with this Id.',
      });
    } else {
      const { title: exist_title, description: exist_description } =
        aboutTermsCondition;

      const { title, description } = req.body;

      const updated_at = new Date();

      client.query(
        `UPDATE about_terms_condition SET title = $1, description = $2, updated_at = $3 WHERE terms_condition_id = $4 RETURNING *`,
        [
          title || exist_title,
          description || exist_description,
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
              rows: [updatedAboutTermsCondition],
            } = result;

            return res.status(200).json({
              success: true,
              message: 'Updated the data successfully.',
              data: updatedAboutTermsCondition,
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

// API DELETE ABOUT TERMS & CONDITION DATA BY ID
exports.deleteAboutTermsCondition = async (req, res) => {
  try {
    const {
      rows: [aboutTermsCondition],
    } = await client.query(
      `SELECT * FROM about_terms_condition WHERE terms_condition_id = ${req.params.id}`
    );

    if (!aboutTermsCondition) {
      return res.status(400).json({
        success: false,
        error: 'There is no data found with this Id.',
      });
    } else {
      client.query(
        `DELETE FROM about_terms_condition WHERE terms_condition_id = ${req.params.id}`
      );

      return res.status(200).json({
        success: true,
        message: 'Deleted the data successfully.',
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};
