'use strict';

// IMPORT ALL PACKAGES
const client = require('../../connection');

// API GET ABOUT ALL COMPANIES DATA
exports.getAboutAllCompany = async (req, res) => {
  try {
    const allAboutCompany = await client.query(`SELECT * FROM about_company`);

    return res.status(200).json({
      success: true,
      message: 'Got all data successfully.',
      data: allAboutCompany.rows,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'There is no data found.' });
  }
};

// API GET ABOUT A COMPANY DATA BY ID
exports.getAboutSingleCompany = (req, res) => {
  try {
    client.query(
      `SELECT * FROM about_company WHERE about_company_id = ${req.params.id}`,
      (error, result) => {
        if (result.rows.length === 0) {
          console.log(error);
          return res.status(400).json({
            success: false,
            error: 'There is no data found with this Id.',
          });
        } else {
          const {
            rows: [aboutCompany],
          } = result;

          return res.status(200).json({
            success: true,
            message: 'Got the data successfully.',
            data: aboutCompany,
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

// API POST ABOUT A COMPANY DATA
exports.postAboutCompany = (req, res) => {
  try {
    const { title, description } = req.body;

    const created_at = new Date();

    client.query(
      `INSERT INTO about_company (title, description, created_at) VALUES ($1, $2, $3) RETURNING *`,
      [title, description, created_at],
      (error, result) => {
        if (error) {
          console.log(error);
          return res
            .status(400)
            .json({ success: false, error: 'The data was not created.' });
        } else {
          const {
            rows: [aboutCompany],
          } = result;

          return res.status(200).json({
            success: true,
            message: 'Created the data successfully.',
            data: aboutCompany,
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

// API PUT / UPDATE ABOUT A COMPANY DATA BY ID
exports.updateAboutCompany = async (req, res) => {
  try {
    const {
      rows: [aboutCompany],
    } = await client.query(
      `SELECT * FROM about_company WHERE about_company_id = ${req.params.id}`
    );

    if (!aboutCompany) {
      return res.status(400).json({
        success: false,
        error: 'There is no data found with this Id.',
      });
    } else {
      const { title: exist_title, description: exist_description } =
        aboutCompany;

      const { title, description } = req.body;

      const updated_at = new Date();

      client.query(
        `UPDATE about_company SET title = $1, description = $2, updated_at = $3 WHERE about_company_id = $4 RETURNING *`,
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
              rows: [updatedAboutCompany],
            } = result;

            return res.status(200).json({
              success: true,
              message: 'Updated the data successfully.',
              data: updatedAboutCompany,
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

// API DELETE ABOUT A COMPANY DATA BY ID
exports.deleteAboutCompany = async (req, res) => {
  try {
    const {
      rows: [aboutCompany],
    } = await client.query(
      `SELECT * FROM about_company WHERE about_company_id = ${req.params.id}`
    );

    if (!aboutCompany) {
      return res.status(400).json({
        success: false,
        error: 'There is no data found with this Id.',
      });
    } else {
      client.query(
        `DELETE FROM about_company WHERE about_company_id = ${req.params.id}`
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
