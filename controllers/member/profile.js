'use strict';

// IMPORT ALL PACKAGES
const fs = require('fs');
const bcrypt = require('bcryptjs');
const client = require('../../connection');

// HELPER MODULE
const helperModule = require('../../helpers/module');
const { filePath, sliceImageFile } = helperModule;

// API GET ALL MEMBERS DATA
exports.getAllMembers = async (req, res) => {
  try {
    const memberList = await client.query(`SELECT * FROM members`);

    return res.status(200).json({
      success: true,
      message: 'Got all data successfully.',
      data: memberList.rows,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};

// API GET A MEMBER DATA BY ID
exports.getSingleMember = async (req, res) => {
  try {
    const {
      rows: [member],
    } = await client.query(
      `SELECT * FROM members WHERE member_id = ${req.params.id}`
    );

    return res.status(200).json({
      success: true,
      message: 'Got the data successfully.',
      data: member,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: 'This member was not found.',
    });
  }
};

// API SEARCH MEMBERS DATA BY KEYWORDS
exports.searchMembers = async (req, res) => {
  const { keyword, currentPage, perPage } = req.query;

  const sql = `SELECT * FROM members_v WHERE LOWER(fullname) LIKE '%LOWER(${keyword})%' OR LOWER(email) LIKE '%LOWER(${keyword})%' OR member_id = ${keyword} OR cell_phone = ${keyword}`;

  const totalData = await client.query(sql);

  client.query(
    `${sql} LIMIT ${+perPage || 10} OFFSET ${
      ((+currentPage || 1) - 1) * (perPage || 10)
    }`,
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

// UPDATE PROFILE MEMBER
exports.updateProfile = async (req, res) => {
  try {
    const {
      rows: [existingMember],
    } = await client.query(
      `SELECT * FROM members WHERE member_id = ${req.params.id}`
    );

    const {
      member_id: exist_member_id,
      email: exist_email,
      home_phone: exist_home_phone,
      cell_phone: exist_cell_phone,
      work_phone: exist_work_phone,
      title: exist_title,
      first_name: exist_first_name,
      middle_name: exist_middle_name,
      last_name: exist_last_name,
      gender: exist_gender,
      birth_date: exist_birth_data,
      address: exist_address,
      city: exist_city,
      state: exist_state,
      country: exist_country,
      zip: exist_zip,
      profile_picture: exist_profile_picture,
      email_promotions: exist_email_promotions,
    } = existingMember;

    const image = req.file;

    let imagePath;
    let prevImage;

    if (exist_profile_picture) {
      prevImage = exist_profile_picture.slice(
        sliceImageFile('profile_picture')
      );
    }

    if (image) {
      imagePath = filePath(req, 'profile_picture', image.filename);
    } else {
      imagePath = exist_profile_picture;
    }

    const errors = [];

    const {
      email,
      home_phone,
      cell_phone,
      work_phone,
      title,
      first_name,
      middle_name,
      last_name,
      gender,
      birth_date,
      address,
      city,
      state,
      country,
      zip,
      email_promotions,
    } = req.body;

    const change_date = new Date();

    if (!email) {
      errors.push({
        success: false,
        error: 'Email is required.',
      });
    }
    if (!first_name) {
      errors.push({
        success: false,
        error: 'First Name is required.',
      });
    }
    if (!last_name) {
      errors.push({
        success: false,
        error: 'Last Name is required.',
      });
    }
    if (!cell_phone) {
      errors.push({
        success: false,
        error: 'Cell Phone is required.',
      });
    }
    if (!address) {
      errors.push({
        success: false,
        error: 'Address is required',
      });
    }
    if (!city) {
      errors.push({
        success: false,
        error: 'City is required.',
      });
    }
    if (!zip) {
      errors.push({
        success: false,
        error: 'Zip is required.',
      });
    }
    if (zip.length > 7) {
      errors.push({
        success: false,
        error: 'Zip must be maximum of 7 characters long.',
      });
    }

    if (errors.length > 0) {
      return res.status(500).json({ errors });
    } else {
      // MEMBER VALIDATION CHECK

      client.query(
        `SELECT * FROM members
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
            rows: [updatingMember],
          } = result;

          if (updatingMember && updatingMember.member_id !== exist_member_id) {
            return res.status(500).json({
              success: false,
              error: 'There is no data found.',
            });
          } else {
            client.query(
              `UPDATE members SET email = $1, cell_phone = $2, home_phone = $3, work_phone = $4, title = $5, first_name = $6, middle_name = $7, last_name = $8, gender = $9, birth_date = $10, address = $11, city = $12, state = $13, country = $14, zip = $15, change_date = $16, profile_picture = $17, email_promotions = $18 WHERE member_id = $19 RETURNING *`,
              [
                email.toLowerCase() || exist_email,
                cell_phone || exist_cell_phone,
                home_phone || exist_home_phone,
                work_phone || exist_work_phone,
                title || exist_title,
                first_name || exist_first_name,
                middle_name || exist_middle_name,
                last_name || exist_last_name,
                gender || exist_gender,
                birth_date || exist_birth_data,
                address || exist_address,
                city || exist_city,
                state || exist_state,
                country || exist_country,
                zip || exist_zip,
                change_date,
                imagePath || exist_profile_picture,
                email_promotions || exist_email_promotions,
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
                  rows: [updatingMember],
                } = result;

                if (image && updatingMember && prevImage !== undefined) {
                  fs.unlink(prevImage, error => {
                    if (error) throw error;
                  });
                }

                return res.status(200).json({
                  success: true,
                  message: 'Updated the data successfully.',
                  data: updatingMember,
                });
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

// UPDATE MEMBER PASSWORD
exports.updatePassword = async (req, res) => {
  try {
    const { member_id, currentPassword, newPassword, retypePassword } =
      req.body;

    const {
      rows: [existingMember],
    } = await client.query(
      `SELECT * FROM members WHERE member_id = ${member_id}`
    );

    const change_date = new Date();

    const errors = [];

    if (
      existingMember &&
      bcrypt.compareSync(currentPassword, existingMember.password)
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
          `UPDATE members SET password = $1, change_date = $2 WHERE member_id = $3 RETURNING *`,
          [password, change_date, member_id],
          (error, result) => {
            if (error) {
              console.log(error);
              return res.status(400).json({
                success: false,
                error: 'Error while updating the data.',
              });
            }

            const {
              rows: [updatingMember],
            } = result;

            return res.status(200).json({
              success: true,
              message: 'Updated the data successfully.',
              data: updatingMember,
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

// API DELETE A MEMBER DATA BY ID
exports.deleteMember = async (req, res) => {
  try {
    const {
      rows: [member],
    } = await client.query(
      `SELECT profile_picture FROM members WHERE member_id = ${req.params.id}`
    );

    if (!member) {
      return res.status(400).json({
        success: false,
        error: 'There is no data found with this Id.',
      });
    }

    if (member.profile_picture) {
      fs.unlink(
        member.profile_picture.slice(sliceImageFile('profile_picture')),
        error => {
          if (error) throw error;
        }
      );
    }

    client.query(
      `DELETE FROM members WHERE member_id = ${req.params.id}`,
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

// API GET ALL MEMBER DEALERSHIPS DATA
exports.allDealershipsOfMember = (req, res) => {
  try {
    client.query(
      `SELECT * FROM member_dealerships JOIN about_dealerships ON member_dealerships.about_dealership_id = about_dealerships.about_dealership_id WHERE member_dealerships.member_id = ${req.params.id}`,
      (error, result) => {
        if (result.rows.length === 0) {
          console.log(error);
          return res.status(400).json({
            success: false,
            error: 'There is no data found with this Id.',
          });
        } else {
          return res.status(200).json({
            success: true,
            message: 'Got the data successfully.',
            data: result.rows,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'There is no data found.' });
  }
};

// POST DEALERSHIP MEMBER
exports.postDealershipMember = async (req, res) => {
  try {
    const { member_id, about_dealership_id } = req.body;

    const created_at = new Date();

    const totalMemberDealership = await client.query(
      `SELECT * FROM member_dealerships JOIN about_dealerships ON member_dealerships.about_dealership_id = about_dealerships.about_dealership_id WHERE member_dealerships.member_id = ${member_id}`
    );

    if (totalMemberDealership.rows.length === 5) {
      return res.status(400).json({
        success: false,
        error: 'You are only allowed to input 5 Dealerships.',
      });
    } else {
      let error;

      for (let i = 0; i < totalMemberDealership.rows.length; i++) {
        if (
          about_dealership_id ===
          totalMemberDealership.rows[i].about_dealership_id
        ) {
          error = true;
        }
      }

      if (error) {
        return res.status(400).json({
          success: false,
          error: 'Cannot choose the same data twice.',
        });
      } else {
        client.query(
          `INSERT INTO member_dealerships (member_id, about_dealership_id, created_at) VALUES ($1, $2, $3) RETURNING *`,
          [member_id, about_dealership_id, created_at],
          (error, result) => {
            if (error) {
              console.log(error);
              return res.status(400).json({
                success: false,
                error: 'The data was not created.',
              });
            }
            const {
              rows: [member_dealerships],
            } = result;

            return res.status(200).json({
              success: true,
              message: 'Created the data successfully.',
              data: member_dealerships,
            });
          }
        );
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};

// DELETE DEALERSHIP MEMBER
exports.deleteDealershipMember = (req, res) => {
  try {
    client.query(
      `DELETE FROM member_dealerships WHERE id = ${req.params.id}`,
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
