'use strict';

// IMPORT ALL PACKAGES
const express = require('express');
const router = express.Router();

// HELPER MODULE
const helperModule = require('../helpers/module');
const fileSizeLimitErrorHandler = helperModule.fileSizeLimitErrorHandler;
const imageUpload = helperModule.imageUpload;

// IMPORT banner.js FILE FROM controllers/home FOLDER
const {
  getAllBanners,
  getAllActiveBanners,
  getSingleBanner,
  searchBanners,
  postHomeBanners,
  updateBannerStatus,
  updateBannerPosition,
  updateHomeBanners,
  deleteSingleBanner,
} = require('../controllers/home/banner');

// API GET HOME ALL BANNERS DATA
router.get('/banner', getAllBanners);

// API GET HOME ALL ACTIVE BANNERS DATA
router.get('/banner/active', getAllActiveBanners);

// API GET HOME A BANNER DATA BY ID
router.get('/banner/:id', getSingleBanner);

// API SEARCH HOME BANNERS DATA
router.post('/search-banners', searchBanners);

// API POST HOME BANNERS DATA
router.post(
  '/banner',
  imageUpload.single('banner_image'),
  fileSizeLimitErrorHandler,
  postHomeBanners
);

// API PUT / UPDATE HOME SINGLE BANNER DATA BY ID
router.put(
  '/banner/:id',
  imageUpload.single('banner_image'),
  fileSizeLimitErrorHandler,
  updateHomeBanners
);

// API PUT / UPDATE STATUS HOME BANNER DATA
router.put('/banner/status/:id', updateBannerStatus);

// API PUT / UPDATE POITION HOME BANNER DATA
router.put('/banner-position', updateBannerPosition);

// API DELETE HOME A BANNER BY ID AND BANNER PATH
router.delete('/banner/:id', deleteSingleBanner);

// IMPORT message.js FILE FROM controllers/home FOLDER
const { sendMessage } = require('../controllers/home/message');

// API SEND A NEW MESSAGE FOR CONTACT US PAGE ON MEMBER SITE
router.post('/send-message', sendMessage);

module.exports = router;
