'use strict';

// IMPORT ALL PACKAGES
const express = require('express');
const router = express.Router();

// IMPORT FILE FROM controllers/points FOLDER
const { getHistoryPoint, getHistoryPointDetail } = require('../controllers/points');

// API GET ALL History Point
router.post('/', getHistoryPoint);

// API GET History Point by id_histroy
router.get('/:id', getHistoryPointDetail);

module.exports = router;
