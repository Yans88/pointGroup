'use strict';

// IMPORT ALL PACKAGES
const express = require('express');
const router = express.Router();

// IMPORT FILE FROM controllers/dataServices FOLDER
const { getDataCSVToday, getDataCSV, checkPointExpired, getDataCSVDirect } = require('../controllers/dataServices');


router.get('/', getDataCSV);
router.get('/today', getDataCSVToday);
router.get('/check_point_expired', checkPointExpired);
router.get('/get_data_csv_direct', getDataCSVDirect);

module.exports = router;
