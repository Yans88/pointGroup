'use strict';

// IMPORT ALL PACKAGES
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const client = require('../../connection');
require('dotenv').config();

// HELPER MODULE
const helperModule = require('../../helpers/module');
const { transporter } = helperModule;

// const msal = require('@azure/msal-node');
// const REDIRECT_URI = 'http://localhost:3000/redirect';

// const config = {
//   auth: {
//     clientId: 'Enter_the_Application_Id_Here',
//     authority: 'Enter_the_Cloud_Instance_Id_HereEnter_the_Tenant_Info_Here',
//     clientSecret: 'Enter_the_Client_Secret_Here',
//   },
//   system: {
//     loggerOptions: {
//       loggerCallback(loglevel, message, containsPii) {
//         console.log(message);
//       },
//       piiLoggingEnabled: false,
//       logLevel: msal.LogLevel.Verbose,
//     },
//   },
// };

// // Create msal application object
// const pca = new msal.ConfidentialClientApplication(config);

// // USER SIGNIN BY EMAIL & PASSWORD
// exports.userSigninMsal = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const {
//       rows: [user],
//     } = await client.query(
//       `SELECT user_id, email, password FROM users WHERE LOWER(email) = $1`,
//       [email.toLowerCase()]
//     );

//     const secret = process.env.SESSION_SECRET;

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         error: 'There is no data corresponding to the email address.',
//       });
//     }

//     if (user && bcrypt.compareSync(password, user.password)) {
//       const token = jwt.sign(
//         {
//           user_id: user.user_id,
//           isAdmin: user.isAdmin,
//         },
//         secret,
//         { expiresIn: '2d' }
//       );

//       return res.status(200).send({
//         success: true,
//         message: 'Signed in successfully.',
//         data: user,
//         access_token: token,
//       });
//     } else {
//       return res
//         .status(400)
//         .json({ success: false, error: 'Invalid email or password !!' });
//     }
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ success: false, error: 'Something error on server.' });
//   }
// };

// USER SIGNIN BY EMAIL & PASSWORD
exports.userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const {
      rows: [user],
    } = await client.query(
      `SELECT user_id, email, password FROM users WHERE LOWER(email) = $1`,
      [email.toLowerCase()]
    );

    const secret = process.env.SESSION_SECRET;

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'There is no data corresponding to the email address.',
      });
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          user_id: user.user_id,
          isAdmin: user.isAdmin,
        },
        secret,
        { expiresIn: '2d' }
      );

      return res.status(200).send({
        success: true,
        message: 'Signed in successfully.',
        data: user,
        access_token: token,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, error: 'Invalid email or password !!' });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};

// FORGET / RESET PASSWORD USER
exports.forgotPassword = (req, res) => {
  try {
    const { email } = req.body;

    client.query(
      `SELECT user_id, email FROM users
          WHERE LOWER(email) = $1`,
      [email.toLowerCase()],
      (error, result) => {
        const {
          rows: [user],
        } = result;

        if (error || !user) {
          console.log(error);
          return res.status(400).json({
            success: false,
            error: 'Data with this email does not exist.',
          });
        }

        if (user) {
          const token = jwt.sign(
            { user_id: user.user_id },
            process.env.RESET_ADMIN_PASSWORD_KEY,
            { expiresIn: '20m' }
          );

          client.query(
            `UPDATE users SET reset_link = $1 WHERE user_id = $2 RETURNING *`,
            [token, user.user_id],
            error => {
              if (error) {
                console.log(error);
                return res.status(400).json({
                  success: false,
                  error: 'Reset Password Link error.',
                });
              } else {
                transporter
                  .sendMail({
                    from: 'noreply-cor@openroadautogroup.com',
                    to: email,
                    subject: 'Reset Your Account Password',
                    html: `<h2 style="color:black">Please click on the given link to reset your password <a href=${process.env.ADMIN_URL}/forgot-password?token=${token} style="color:blue; text-decoration:none">here</a>.</h2>`,
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

// RESET USER PASSWORD
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
        process.env.RESET_ADMIN_PASSWORD_KEY,
        async function (error, decodedData) {
          if (error) {
            console.log(error);
            return res.status(401).json({
              success: false,
              error: 'Incorrect token or Expired Link.',
            });
          }

          const hashedPassword = await bcrypt.hashSync(password, 10);

          client.query(
            `SELECT password FROM users WHERE reset_link = $1`,
            [reset_link],
            (error, result) => {
              const {
                rows: [user],
              } = result;

              if (error || !user) {
                return res.status(400).json({
                  success: false,
                  error: 'Data with this token does not exist.',
                });
              }

              const updated_at = new Date();

              client.query(
                `UPDATE users SET password = $1, reset_link = $2, updated_at = $3 WHERE reset_link = $4 RETURNING *`,
                [hashedPassword, '', updated_at, reset_link],
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
