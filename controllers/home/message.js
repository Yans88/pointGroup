'use strict';

// HELPER MODULE
const helperModule = require('../../helpers/module');
const { transporter } = helperModule;

// SEND A NEW MESSAGE FOR CONTACT US PAGE ON MEMBER SITE
exports.sendMessage = (req, res) => {
  try {
    const { isMember, fullName, phoneNumber, email, dealerName, message } =
      req.body;

    const errors = [];

    if (!fullName || !email || !message) {
      errors.push({
        error: 'Please enter full name, email and message fields.',
      });
    }

    const sent_date = new Date();

    if (errors.length > 0) {
      return res.status(500).json({ errors });
    } else {
      transporter
        .sendMail({
          from: 'webforms-cor@openroadautogroup.com',
          // to: 'wahidchdly@gmail.com, wahidchdly@icloud.com',
          to: 'memberhelp@remembergroup.com, club@openroadautogroup.com',
          subject: 'New message/inquiry from Club OpenRoad',
          sent: sent_date,
          html: `<div style="justify-content: column">
            <p style="color:black">Is Member: ${isMember}</p>
            <p style="color:black">Email From: ${fullName} (${email})</p>
            <p style="color:black">Phone Number: ${phoneNumber}</p>
            <p style="color:black">Dealer Name: ${dealerName}</p>
            <p style="color:black">Messsage: ${message}</p>
            </div>`,
        })
        .then(result => {
          return res.status(200).json({
            success: true,
            message: 'Sent the message data successfully.',
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
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};
