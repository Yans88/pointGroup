'use strict';

// IMPORT ALL PACKAGES
const client = require('../../connection');

// API GET HELP CENTER ALL CONTACT US DATA
exports.getAllContact = async (req, res) => {
  try {
    const allContacts = await client.query(`SELECT * FROM help_center_contact`);

    return res.status(200).json({
      success: true,
      message: 'Got all data successfully.',
      data: allContacts.rows,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'There is no data found.' });
  }
};

// API GET HELP CENTER A CONTACT US DATA BY ID
exports.getSingleContact = (req, res) => {
  try {
    client.query(
      `SELECT * FROM help_center_contact WHERE contact_id = ${req.params.id}`,
      (error, result) => {
        if (result.rows.length === 0) {
          console.log(error);
          return res.status(400).json({
            success: false,
            error: 'There is no data found with this Id.',
          });
        } else {
          const {
            rows: [singleContact],
          } = result;

          return res.status(200).json({
            success: true,
            message: 'Got the data successfully.',
            data: singleContact,
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

// API SEARCH HELP CENTER CONTACT US DATA BY KEYWORDS
exports.searchContacts = async (req, res) => {
  const { keyword, orderBy, order, currentPage, perPage } = req.query;

  const sql = `SELECT *
    FROM help_center_contact WHERE LOWER(contact_name) LIKE '%${keyword.toLowerCase()}%' OR LOWER(email) LIKE '%${keyword.toLowerCase()}%'`;

  const totalData = await client.query(sql);

  client.query(
    `${sql} ORDER BY ${orderBy || 'contact_name'} ${order || 'ASC'} LIMIT ${
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

// API POST HELP CENTER A CONTACT US DATA
exports.postContact = (req, res) => {
  try {
    const { contact_name, phone_number, email, status } = req.body;

    const created_at = new Date();

    client.query(
      `INSERT INTO help_center_contact (contact_name, phone_number, email, status, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [contact_name, phone_number, email, status, created_at],
      (error, result) => {
        if (error) {
          console.log(error);
          return res.status(400).json({
            success: false,
            error: 'The data was not created.',
          });
        } else {
          const {
            rows: [contact],
          } = result;

          return res.status(200).json({
            success: true,
            message: 'Created the data successfully.',
            data: contact,
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

// API PUT / UPDATE HELP CENTER A CONTACT US DATA BY ID
exports.updateContact = async (req, res) => {
  try {
    const {
      rows: [contact],
    } = await client.query(
      `SELECT * FROM help_center_contact WHERE contact_id = ${req.params.id}`
    );

    if (!contact) {
      return res.status(400).json({
        success: false,
        error: 'There is no data found with this Id.',
      });
    } else {
      const {
        contact_name: exist_contact_name,
        phone_number: exist_phone_number,
        email: exist_email,
      } = contact;

      const { contact_name, phone_number, email, status } = req.body;

      const updated_at = new Date();

      client.query(
        `UPDATE help_center_contact SET contact_name = $1, phone_number = $2, email = $3, status = $4, updated_at = $5 WHERE contact_id = $6 RETURNING *`,
        [
          contact_name || exist_contact_name,
          phone_number || exist_phone_number,
          email || exist_email,
          status === true ? true : false,
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
              rows: [updatedContact],
            } = result;

            return res.status(200).json({
              success: true,
              message: 'Updated the data successfully.',
              data: updatedContact,
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

// API DELETE HELP CENTER A CONTACT US DATA BY ID
exports.deleteSingleContact = async (req, res) => {
  try {
    const {
      rows: [contact],
    } = await client.query(
      `SELECT * FROM help_center_contact WHERE contact_id = ${req.params.id}`
    );

    if (!contact) {
      return res.status(400).json({
        success: false,
        error: 'There is no data found with this Id.',
      });
    } else {
      client.query(
        `DELETE FROM help_center_contact WHERE contact_id = ${req.params.id}`,
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
