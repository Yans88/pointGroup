'use strict';

// IMPORT ALL PACKAGES
const fs = require('fs');
const bcrypt = require('bcryptjs');
const client = require('../../connection');

// HELPER MODULE
const helperModule = require('../../helpers/module');
const { filePath, sliceImageFile } = helperModule;

// API GET ALL USERS DATA
exports.getAllUsers = async (req, res) => {
  try {
    const userList = await client.query(
      `SELECT concat(users.first_name, ' ', users.last_name) AS user_name, about_dealerships.dealer_name, roles.role_name, users.email, users.password, users.cell_phone, users.status, users.address, users.created_at, users.updated_at, users.profile_picture, users.reset_link, users.city, users.state, users.country FROM users LEFT JOIN about_dealerships ON users.about_dealership_id = about_dealerships.about_dealership_id LEFT JOIN roles ON users.role_id = roles.role_id`
    );

    return res.status(200).json({
      success: true,
      message: 'Got all data successfully.',
      data: userList.rows,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};

// API GET A USER DATA BY ID
exports.getSingleUser = async (req, res) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `SELECT u.user_id, u.first_name, u.last_name, u.about_dealership_id, d.dealer_name, d.location, u.role_id, r.role_name, u.password, u.email, u.cell_phone, u.status, u.address, u.created_at, u.updated_at, u.profile_picture, u.reset_link, u.city, u.state, u.country, u."isAdmin" FROM users u LEFT JOIN about_dealerships d ON d.about_dealership_id = u.about_dealership_id LEFT JOIN roles r ON r.role_id = u.role_id WHERE u.user_id = ${req.params.id}`
    );

    return res.status(200).json({
      success: true,
      message: 'Got the data successfully.',
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: 'This user was not found.',
    });
  }
};

// API SEARCH USERS DATA BY KEYWORDS
exports.searchUsers = async (req, res) => {
  const { status, role_id, keyword, orderBy, order, currentPage, perPage } =
    req.query;

  const sql = `SELECT u.user_id, u.first_name, u.last_name, u.about_dealership_id, d.dealer_name, u.role_id, r.role_name, u.password, u.email, u.cell_phone, u.status, u.address, u.created_at, u.updated_at, u.profile_picture, u.reset_link, u.city, u.state, u.country, u."isAdmin" FROM users u LEFT JOIN about_dealerships d ON d.about_dealership_id = u.about_dealership_id LEFT JOIN roles r ON r.role_id = u.role_id ${
    status || role_id || keyword ? 'WHERE (' : ''
  } ${status ? `u.status = ${status} ${!role_id ? ')' : ''}` : ''} ${
    role_id ? `${status ? 'AND' : ''} u.role_id::text LIKE '%${role_id}%')` : ''
  } ${
    keyword
      ? `${
          status || role_id ? 'AND (' : ''
        } LOWER(concat(u.first_name, CASE WHEN (u.last_name IS NOT NULL) THEN concat(' ', u.last_name) ELSE ''::text END,' ',u.last_name)) LIKE '%${keyword.toLowerCase()}%' OR LOWER(u.email) LIKE '%${keyword.toLowerCase()}%' OR u.cell_phone LIKE '%${keyword}%' OR u.user_id::text LIKE '%${keyword}%')`
      : ''
  }`;

  const totalData = await client.query(sql);

  client.query(
    `${sql} ORDER BY ${orderBy || 'first_name'} ${order || 'ASC'} LIMIT ${
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
          message: `Data was found${keyword ? ' with this keyword.' : '.'}`,
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

// API POST A USER DATA
exports.postUser = (req, res) => {
  try {
    const {
      first_name,
      last_name,
      about_dealership_id,
      role_id,
      email,
      password,
      retypePassword,
      cell_phone,
      status,
    } = req.body;

    const errors = [];

    if (
      !first_name ||
      !last_name ||
      !about_dealership_id ||
      !role_id ||
      !email ||
      !password ||
      !retypePassword ||
      !cell_phone
    ) {
      errors.push({ error: 'Please enter all fields.' });
    }

    if (password && retypePassword) {
      if (password.length < 8) {
        errors.push({ error: 'Password must be at least 8 characters long.' });
      }
      if (retypePassword !== password) {
        errors.push({ error: 'Retype password must be match.' });
      }
    }

    const created_at = new Date();

    const image = req.file;

    let imagePath;

    if (image) {
      imagePath = filePath(req, 'profile_picture', image.filename);
    } else {
      imagePath = null;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    if (errors.length > 0) {
      return res.status(500).json({ errors });
    } else {
      client.query(
        `SELECT email FROM users
      WHERE LOWER(email) = $1`,
        [email.toLowerCase()],
        (error, results) => {
          if (error) {
            console.log(error);
            errors.push({
              success: false,
              error: 'Error !! Please input a correct email.',
            });
          }
          // -- EMAIL VALIDATION START -- //
          if (results.rows.length > 0) {
            return res.status(500).json({
              success: false,
              error: 'Email is unavailable.',
            });
          }
          // -- EMAIL VALIDATION END -- //
          else {
            client.query(
              `INSERT INTO users (first_name, last_name, about_dealership_id, role_id, email, password, cell_phone, profile_picture, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
              [
                first_name,
                last_name,
                about_dealership_id,
                role_id,
                email,
                hashedPassword,
                cell_phone,
                imagePath,
                status,
                created_at,
              ],
              (error, result) => {
                if (error) {
                  console.log(error);
                  return res.status(400).json({
                    success: false,
                    error: 'The data was not created.',
                  });
                } else {
                  const {
                    rows: [user],
                  } = result;

                  return res.status(200).json({
                    success: true,
                    message: 'Created the data successfully.',
                    data: user,
                  });
                }
              }
            );
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

// UPDATE PROFILE USER
exports.updateProfile = async (req, res) => {
  try {
    const {
      rows: [existingUser],
    } = await client.query(
      `SELECT * FROM users WHERE user_id = ${req.params.id}`
    );

    const {
      user_id: exist_user_id,
      first_name: exist_first_name,
      last_name: exist_last_name,
      about_dealership_id: exist_about_dealership_id,
      role_id: exist_role_id,
      email: exist_email,
      cell_phone: exist_cell_phone,
      status: exist_status,
      profile_picture: exist_profile_picture,
    } = existingUser;

    const image = req.file;

    let imagePath;
    let prevImage;

    if (exist_profile_picture) {
      prevImage = exist_profile_picture.slice(sliceImageFile());
    }

    if (image) {
      imagePath = filePath(req, 'profile_picture', image.filename);
    } else {
      imagePath = exist_profile_picture;
    }

    const {
      first_name,
      last_name,
      about_dealership_id,
      role_id,
      email,
      cell_phone,
      status,
    } = req.body;

    const updated_at = new Date();

    // USER VALIDATION CHECK
    client.query(
      `SELECT * FROM users
        WHERE LOWER(email) = $1`,
      [email.toLowerCase()],
      (error, result) => {
        if (error) {
          console.log(error);
          return res.status(400).json({
            success: false,
            error: 'There is no data found with this email.',
          });
        }

        const {
          rows: [updatingUser],
        } = result;

        if (updatingUser && updatingUser.user_id !== exist_user_id) {
          return res.status(500).json({
            success: false,
            error: 'There is no data found.',
          });
        } else {
          client.query(
            `UPDATE users SET first_name = $1, last_name = $2, about_dealership_id = $3, role_id = $4, email = $5, cell_phone = $6, status = $7, updated_at = $8, profile_picture = $9 WHERE user_id = $10 RETURNING *`,
            [
              first_name || exist_first_name,
              last_name || exist_last_name,
              about_dealership_id || exist_about_dealership_id,
              role_id || exist_role_id,
              email.toLowerCase() || exist_email,
              cell_phone || exist_cell_phone,
              status || exist_status,
              updated_at,
              imagePath || exist_profile_picture,
              req.params.id,
            ],
            (error, result) => {
              if (error) {
                console.log(error);
                return res.status(400).json({
                  success: false,
                  error: 'Error while updating the data.',
                });
              }
              const {
                rows: [updatingUser],
              } = result;

              if (image && updatingUser && prevImage !== undefined) {
                fs.unlink(prevImage, error => {
                  if (error) throw error;
                });
              }

              return res.status(200).json({
                success: true,
                message: 'Updated the data successfully.',
                data: updatingUser,
              });
            }
          );
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

// UPDATE USER PASSWORD
exports.updatePassword = async (req, res) => {
  try {
    const { user_id, currentPassword, newPassword, retypePassword } = req.body;

    const {
      rows: [existingUser],
    } = await client.query(`SELECT * FROM users WHERE user_id = ${user_id}`);

    const updated_at = new Date();

    const errors = [];

    if (
      existingUser &&
      bcrypt.compareSync(currentPassword, existingUser.password)
    ) {
      if (!newPassword || newPassword.length < 8) {
        errors.push({
          success: false,
          error: 'Please input a new password that contains 8 characters long.',
        });
      }

      if (retypePassword !== newPassword) {
        errors.push({
          success: false,
          error: 'Re-type password must be match.',
        });
      }

      const password = bcrypt.hashSync(newPassword, 10);

      if (errors.length > 0) {
        return res.status(500).json({ errors });
      } else {
        client.query(
          `UPDATE users SET password = $1, updated_at = $2 WHERE user_id = $3 RETURNING *`,
          [password, updated_at, user_id],
          (error, result) => {
            if (error) {
              console.log(error);
              return res.status(400).json({
                success: false,
                error: 'Error while updating the data.',
              });
            }

            const {
              rows: [updatingUser],
            } = result;

            return res.status(200).json({
              success: true,
              message: 'Updated the data successfully.',
              data: updatingUser,
            });
          }
        );
      }
    } else {
      return res
        .status(400)
        .json({ success: false, error: 'Invalid current password !!' });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};

// API DELETE A USER DATA BY ID
exports.deleteUser = async (req, res) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `SELECT profile_picture FROM users WHERE user_id = ${req.params.id}`
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'There is no data found with this Id.',
      });
    }

    if (user.profile_picture) {
      fs.unlink(user.profile_picture.slice(sliceImageFile()), error => {
        if (error) throw error;
      });
    }

    client.query(
      `DELETE FROM users WHERE user_id = ${req.params.id}`,
      error => {
        if (error) {
          console.log(error);
          return res.status(400).json({
            success: false,
            error: 'There is no data found with this Id.',
          });
        } else {
          return res.status(200).json({
            success: true,
            message: 'Deleted the data successfully.',
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
