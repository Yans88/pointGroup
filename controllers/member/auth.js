'use strict';

// IMPORT ALL PACKAGES
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const client = require('../../connection');
require('dotenv').config();

// HELPER MODULE
const helperModule = require('../../helpers/module');
const templateEmail = require('../../helpers/sendEmail');
const { transporter } = helperModule;
const {
  sendEmailVerification,
  sendEmailMemberActivation,
  sendEmailForgotPassword,
} = templateEmail;

// SIGN UP A NEW MEMBER AND SENDING EMAIL VERIFICATION TO MEMBER
exports.memberSignup = (req, res) => {
  try {
    const { email, password, retypePassword, email_promotions } = req.body;
    const errors = [];

    if (!email || !password || !retypePassword) {
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

    if (errors.length > 0) {
      return res.status(500).json({ errors });
    } else {
      client.query(
        `SELECT email FROM members
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
              error: 'Email already exists, please sign-in instead.',
            });
          }
          // -- EMAIL VALIDATION END -- //

          const token = jwt.sign({ email }, process.env.JWT_ACC_MEMBER, {
            expiresIn: '20m',
          });

          const dynamicEmailTemplate = sendEmailVerification(req, token);

          transporter
            .sendMail({
              from: 'your-email',
              to: email.toLowerCase(),
              subject: 'Verify Your Account',
              html: dynamicEmailTemplate,
            })
            .then(result => {
              const hashedPassword = bcrypt.hashSync(password, 10);

              const created_date = new Date();

              client.query(
                `INSERT INTO members (email, password, created_date, verified, activated, points, active, email_promotions) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING member_id, email, created_date, verified, activated, points, email_promotions`,
                [
                  email.toLowerCase(),
                  hashedPassword,
                  created_date,
                  false,
                  0,
                  0,
                  0,
                  email_promotions,
                ],
                error => {
                  if (error) {
                    console.log(error);
                    return res.status(400).json({
                      success: false,
                      error: 'Error while signing up.',
                    });
                  } else {
                    return res.status(200).json({
                      success: true,
                      message:
                        'Signed up successfully. Email has been sent, kindly check your email account.',
                    });
                  }
                }
              );
            })
            .catch(error => {
              console.log(error);
              return res.status(400).json({
                success: false,
                error: error,
              });
            });
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

// VERIFY OR SUBMIT MEMBER ACCOUNT AFTER CLICKING ON VERIFICATION EMAIL
exports.verificationLink = async (req, res) => {
  try {
    const { token } = req.body;

    if (token) {
      jwt.verify(
        token,
        process.env.JWT_ACC_MEMBER,
        function (error, decodedToken) {
          if (error) {
            console.log(error);
            return res.status(400).json({
              success: false,
              error: 'Incorrect token or Expired Link.',
            });
          }

          const { email } = decodedToken;

          client.query(
            `UPDATE members SET verified = $1 WHERE LOWER(email) = $2`,
            [true, email.toLowerCase()],
            (error, result) => {
              if (error) {
                return res.status(400).json({
                  success: false,
                  error: 'Error while verifying the data.',
                });
              }

              const {
                rows: [verifiedMember],
              } = result;

              return res.status(200).json({
                success: true,
                message: 'Verified the data successfully.',
                data: verifiedMember,
              });
            }
          );
        }
      );
    } else {
      return res
        .status(400)
        .json({ success: false, error: 'Something went wrong !!' });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};

// MEMBER SIGN IN BY EMAIL & PASSWORD
exports.memberSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const {
      rows: [member],
    } = await client.query(
      `SELECT member_id, email, password, verified FROM members WHERE LOWER(email) = $1`,
      [email.toLowerCase()]
    );

    const secret = process.env.SESSION_SECRET;

    if (!member) {
      return res.status(400).json({
        success: false,
        error: 'Email cannot be found, please sign-up instead.',
      });
    }

    if (member.verified === false) {
      return res.status(400).json({
        success: false,
        error:
          'Email has not been verified, please verify your email by setting a new password first.',
      });
    }

    if (!member.password) {
      return res.status(400).json({
        success: false,
        error:
          'No password detected, please set a new one first on the "set new password" page.',
      });
    }

    if (member && bcrypt.compareSync(password, member.password)) {
      const token = jwt.sign(
        {
          member_id: member.member_id,
          verified: member.verified,
        },
        secret,
        { expiresIn: '2d' }
      );

      return res.status(200).send({
        success: true,
        message: 'Signed in successfully.',
        data: member,
        access_token: token,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: `Password is incorrect. Check your password and try to sign-in again.

        If you are still using a 4-digit pin, you have to set a new password below.`,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};

// CHECK TERMS & CONDITIONS API
exports.agreeTC = (req, res) => {
  try {
    const { agree_tc } = req.body;

    client.query(
      `UPDATE members SET agree_tc = $1 WHERE member_id = $2`,
      [agree_tc, req.params.id],
      (error, result) => {
        if (error) {
          return res.status(400).json({
            success: false,
            error: 'Error while updating the data.',
          });
        }

        const {
          rows: [updatedMember],
        } = result;

        return res.status(200).json({
          success: true,
          message: 'Updated the data successfully.',
          data: updatedMember,
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};

// MEMBER ACTIVATION BY INPUTTING MEMBER ID AND PASSWORD
exports.memberActivation = (req, res) => {
  try {
    const { member_id, password } = req.body;

    client.query(
      `SELECT * FROM members
        WHERE member_id = $1`,
      [member_id],
      (error, result) => {
        const {
          rows: [member],
        } = result;

        if (error) {
          console.log(error);
          return res.status(400).json({ error });
        }

        if (!member) {
          return res
            .status(500)
            .json({ success: false, error: 'Member Id is invalid.' });
        }

        if (!bcrypt.compareSync(password, member.password)) {
          return res.status(400).json({
            success: false,
            error:
              'Password is incorrect. Check your password and try to activate again..',
          });
        }

        const activation_date = new Date();

        let points;

        if (member.activation_date !== null) {
          points = 0;
        } else {
          points = 1000;
        }

        client.query(
          `UPDATE members SET activated = $1, activation_date = $2, points = $3 WHERE member_id = $4 RETURNING member_id, email, activated, verified, activation_date`,
          [1, activation_date, member.points + points, member_id],
          error => {
            if (error) {
              console.log(error);
              return res.status(400).json({
                success: false,
                error: 'Error while activating account.',
              });
            }

            const dynamicEmailTemplate = sendEmailMemberActivation(req, member);

            if (points === 1000) {
              let transaction_code =
                member_id + new Date().toISOString().split('.')[0];
              transaction_code = transaction_code.replace(/[:ZT.-]/g, '');

              client.query(
                `INSERT INTO history_point (member_id, point, description, type, created_at, transaction_description, created_by, is_verify, transaction_code, pal_partner_locs_pk, about_dealership_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
                [
                  member_id,
                  1000,
                  'Earning 1000 points',
                  1,
                  new Date(),
                  'You got 1000 points as an active member',
                  12,
                  1,
                  transaction_code,
                  1366,
                  30,
                ],
                error => {
                  if (error) {
                    console.log(error);
                    return res.status(400).json({
                      success: false,
                      error: 'Error while inserting points history.',
                    });
                  }

                  transporter
                    .sendMail({
                      from: 'your-email',
                      to: member.email.toLowerCase(),
                      subject:
                        'Thank You For Activating Your Club OpenRoad Membership',
                      html: dynamicEmailTemplate,
                    })
                    .then(result => {
                      return res.status(200).json({
                        success: true,
                        message: 'Your account is activated.',
                      });
                    })
                    .catch(error => {
                      console.log(error);
                      return res.status(400).json({
                        success: false,
                        error: error,
                      });
                    });
                }
              );
            } else {
              transporter
                .sendMail({
                  from: 'your-email',
                  to: member.email.toLowerCase(),
                  subject:
                    'Thank You For Activating Your Club OpenRoad Membership',
                  html: dynamicEmailTemplate,
                })
                .then(result => {
                  return res.status(200).json({
                    success: true,
                    message: 'Your account is activated.',
                  });
                })
                .catch(error => {
                  console.log(error);
                  return res.status(400).json({
                    success: false,
                    error: error,
                  });
                });
            }
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};

// FORGET / RESET PASSWORD MEMBER
exports.forgotPassword = (req, res) => {
  try {
    const { email } = req.body;

    client.query(
      `SELECT member_id, email, first_name FROM members
          WHERE LOWER(email) = $1`,
      [email.toLowerCase()],
      (error, result) => {
        const {
          rows: [member],
        } = result;

        if (error) {
          console.log(error);
          return res.status(400).json({
            success: false,
            error:
              'There is an error while sending the email to set your new password.',
          });
        }

        if (!member) {
          console.log(error);
          return res.status(400).json({
            success: false,
            error: 'Email cannot be found, please sign-up instead.',
          });
        }

        if (member) {
          const token = jwt.sign(
            { member_id: member.member_id },
            process.env.RESET_PASSWORD_KEY,
            { expiresIn: '20m' }
          );

          client.query(
            `UPDATE members SET reset_link = $1 WHERE member_id = $2 RETURNING member_id, charge_type, birth_date, gender, title, first_name, middle_name, last_name, address, city, state, zip, country, home_phone, cell_phone, work_phone, fax_phone, points, active, activated, profile_picture, activation_date, admin_action_date`,
            [token, member.member_id],
            error => {
              if (error) {
                console.log(error);
                return res.status(400).json({
                  success: false,
                  error: 'Reset Password Link error.',
                });
              } else {
                const dynamicEmailTemplate = sendEmailForgotPassword(
                  req,
                  token,
                  member
                );

                transporter
                  .sendMail({
                    from: 'your-email',
                    to: email,
                    subject: 'Reset Your Account Password',
                    html: dynamicEmailTemplate,
                  })
                  .then(result => {
                    return res.status(200).json({
                      success: true,
                      message:
                        'Email has been sent, kindly check your email account.',
                    });
                  })
                  .catch(error => {
                    console.log(error);
                    return res.status(400).json({
                      success: false,
                      error: error,
                    });
                  });
              }
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

// RESET MEMBER PASSWORD
exports.resetPassword = (req, res) => {
  try {
    const { reset_link, password, retypePassword } = req.body;

    if (retypePassword !== password) {
      return res.status(400).json({
        success: false,
        error: 'Retype Password must be match.',
      });
    }

    if (reset_link && retypePassword === password) {
      jwt.verify(
        reset_link,
        process.env.RESET_PASSWORD_KEY,
        async function (error) {
          if (error) {
            console.log(error);
            return res.status(401).json({
              success: false,
              error: 'Incorrect token or Expired Link.',
            });
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          client.query(
            `SELECT password FROM members WHERE reset_link = $1`,
            [reset_link],
            (error, result) => {
              const {
                rows: [member],
              } = result;

              if (error || !member) {
                return res.status(400).json({
                  success: false,
                  error: 'Data with this token does not exist.',
                });
              }

              const change_date = new Date();

              client.query(
                `UPDATE members SET password = $1, reset_link = $2, change_date = $3, verified = $4 WHERE reset_link = $5 RETURNING member_id, charge_type, birth_date, gender, title, first_name, middle_name, last_name, address, city, state, zip, country, home_phone, cell_phone, work_phone, fax_phone, points, activated, active, activation_date, profile_picture`,
                [hashedPassword, '', change_date, true, reset_link],
                error => {
                  if (error) {
                    return res.status(400).json({
                      success: false,
                      error: 'Error while resetting password.',
                    });
                  } else {
                    return res.status(200).json({
                      success: true,
                      message: 'Your password has been changed.',
                    });
                  }
                }
              );
            }
          );
        }
      );
    } else {
      return res
        .status(401)
        .json({ success: false, error: 'Authentication error' });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};
