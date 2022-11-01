'use strict';

const fs = require('fs');
require('dotenv').config();
const multer = require('multer');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');

// IMAGE MYME TYPE
const IMAGE_TYPE_MAP = {
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'image/png': 'png',
};

// EMAIL API SENDGRID CONFIG START //
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_APIKEY,
    },
  })
);
// EMAIL API SENDGRID CONFIG END //

const fileSizeLimitErrorHandler = (err, req, res, next) => {
  if (err) {
    res.status(413).json({
      success: false,
      error: 'Image file is too big.',
    });
  } else {
    next();
  }
};

const folderPath = folder => {
  let filePath = `public/${folder}s`;
  return filePath;
};

// MULTER STORAGE
const setStorage = FILE_TYPE_MAP => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const isValid = FILE_TYPE_MAP[file.mimetype];
      let uploadError = new Error('Invalid image type');

      if (isValid) {
        uploadError = null;
      }

      const fileBasePath = folderPath(`${file.fieldname}`);

      if (!fs.existsSync(fileBasePath)) {
        fs.mkdirSync(fileBasePath, { recursive: true });
      }

      cb(uploadError, fileBasePath);
    },

    filename: function (req, file, cb) {
      const extension = FILE_TYPE_MAP[file.mimetype];
      const imageName = crypto.randomBytes(8).toString('hex');

      cb(null, `${Date.now()}-${imageName}.${extension}`);
    },
  });

  return storage;
};

// MULTER OPTIONS
const multerOptions = (storage, size) => {
  const uploadOptions = multer({
    storage: storage,
    limits: { fileSize: size },
  });
  return uploadOptions;
};

// FILE STORAGE CONFIG
const imageStorage = setStorage(IMAGE_TYPE_MAP);
const imageMaxSize = 5000000;
const imageUpload = multerOptions(imageStorage, imageMaxSize);

// IMAGE ROUTE CONFIG
const filePath = (req, folder, file) => {
  const filePath = `${req.protocol}://${req.get('host')}/${folderPath(
    folder
  )}/${file}`;
  return filePath;
};

const sliceImageFile = () => {
  const image_file_path = `${process.env.LOCALHOST}/`;

  return image_file_path.length;
};

const formatDate = date => {
  let from = date.split('-');
  let convertDate = from[2] + '-' + from[1] + '-' + from[0];
  return convertDate;
};

exports.transporter = transporter;
exports.fileSizeLimitErrorHandler = fileSizeLimitErrorHandler;
exports.imageUpload = imageUpload;
exports.filePath = filePath;
exports.sliceImageFile = sliceImageFile;
exports.formatDate = formatDate;
