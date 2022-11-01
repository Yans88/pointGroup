'use strict';

// IMPORT ALL PACKAGES
const client = require('../../connection');

// API GET ABOUT ALL LOYALTY CLUB DATA
exports.getAboutAllLoyaltyClub = async (req, res) => {
  try {
    const aboutLoyaltyClub = await client.query(
      `SELECT * FROM about_loyalty_club`
    );

    return res.status(200).json({
      success: true,
      message: 'Got all data successfully.',
      data: aboutLoyaltyClub.rows,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'There is no data found.' });
  }
};

// API GET ABOUT A LOYALTY CLUB DATA BY ID
exports.getAboutSingleLoyaltyClub = (req, res) => {
  try {
    client.query(
      `SELECT * FROM about_loyalty_club WHERE about_loyalty_club_id = ${req.params.id}`,
      (error, result) => {
        if (result.rows.length === 0) {
          console.log(error);
          return res.status(400).json({
            success: false,
            error: 'There is no data found with this Id.',
          });
        } else {
          const {
            rows: [aboutLoyaltyClub],
          } = result;

          return res.status(200).json({
            success: true,
            message: 'Got the data successfully.',
            data: aboutLoyaltyClub,
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

// API POST ABOUT A LOYALTY CLUB DATA
exports.postAboutLoyaltyClub = (req, res) => {
  try {
    const { title, description } = req.body;

    const created_at = new Date();

    client.query(
      `INSERT INTO about_loyalty_club (title, description, created_at) VALUES ($1, $2, $3) RETURNING *`,
      [title, description, created_at],
      (error, result) => {
        if (error) {
          console.log(error);
          return res.status(400).json({
            success: false,
            error: 'The data was not created.',
          });
        } else {
          const {
            rows: [aboutLoyaltyClub],
          } = result;

          return res.status(200).json({
            success: true,
            message: 'Created the data successfully.',
            data: aboutLoyaltyClub,
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

// API PUT / UPDATE ABOUT A LOYALTY CLUB DATA BY ID
exports.updateAboutLoyaltyClub = async (req, res) => {
  try {
    const {
      rows: [aboutLoyaltyClub],
    } = await client.query(
      `SELECT * FROM about_loyalty_club WHERE about_loyalty_club_id = ${req.params.id}`
    );

    if (!aboutLoyaltyClub) {
      return res.status(400).json({
        success: false,
        error: 'There is no data found with this Id.',
      });
    } else {
      const { title: exist_title, description: exist_description } =
        aboutLoyaltyClub;

      const { title, description } = req.body;

      const updated_at = new Date();

      client.query(
        `UPDATE about_loyalty_club SET title = $1, description = $2, updated_at = $3 WHERE about_loyalty_club_id = $4 RETURNING *`,
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
              rows: [aboutLoyaltyClub],
            } = result;

            return res.status(200).json({
              success: true,
              message: 'Updated the data successfully.',
              data: aboutLoyaltyClub,
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

// API DELETE ABOUT A LOYALTY CLUB DATA BY ID
exports.deleteAboutLoyaltyClub = async (req, res) => {
  try {
    const {
      rows: [aboutLoyaltyClub],
    } = await client.query(
      `SELECT * FROM about_loyalty_club WHERE about_loyalty_club_id = ${req.params.id}`
    );

    if (!aboutLoyaltyClub) {
      return res.status(400).json({
        success: false,
        error: 'There is no data found with this Id',
      });
    } else {
      client.query(
        `DELETE FROM about_loyalty_club WHERE about_loyalty_club_id = ${req.params.id}`,
        error => {
          if (error) {
            console.log(error);
            return res.status(400).json({
              success: false,
              message: 'Error while deleting the data.',
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
