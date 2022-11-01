'use strict';

// Import all packages
const express = require('express');
const router = express.Router();

// HELPER MODULE
const helperModule = require('../helpers/module');
const fileSizeLimitErrorHandler = helperModule.fileSizeLimitErrorHandler;
const imageUpload = helperModule.imageUpload;

// --- ABOUT COMPANY START --- //
// IMPORT auth.js FILE FROM controllers/about FOLDER
const {
  getAboutAllCompany,
  getAboutSingleCompany,
  postAboutCompany,
  updateAboutCompany,
  deleteAboutCompany,
} = require('../controllers/about/company');

// API GET ABOUT ALL COMPANY DATA
router.get('/company', getAboutAllCompany);

// API GET ABOUT A COMPANY DATA BY ID
router.get('/company/:id', getAboutSingleCompany);

// API POST ABOUT A COMPANY DATA
router.post('/company', postAboutCompany);

// API PUT / UPDATE ABOUT A COMPANY DATA BY ID
router.put('/company/:id', updateAboutCompany);

// API DELETE ABOUT A COMPANY DATA BY ID
router.delete('/company/:id', deleteAboutCompany);
// --- ABOUT COMPANY END --- //

// --- ABOUT DEALERSHIP START --- //
// IMPORT dealership.js FILE FROM controllers/about FOLDER
const {
  getAboutAllDealerships,
  getAboutSingleDealership,
  searchDealerships,
  postAboutDealership,
  updateAboutDealership,
  deleteAboutDealership,
} = require('../controllers/about/dealership');

// API GET ABOUT ALL DEALERSHIPS DATA
router.get('/dealership', getAboutAllDealerships);

// API GET ABOUT A DEALERSHIP DATA BY ID
router.get('/dealership/:id', getAboutSingleDealership);

// API SEARCH ABOUT DEALERSHIP DATA BY KEYWORDS
router.post('/search-dealership/', searchDealerships);

// API POST ABOUT A DEALERSHIP DATA
router.post(
  '/dealership',
  imageUpload.single('dealer_image'),
  fileSizeLimitErrorHandler,
  postAboutDealership
);

// API PUT / UPDATE ABOUT A DEALERSHIP DATA BY ID
router.put(
  '/dealership/:id',
  imageUpload.single('dealer_image'),
  fileSizeLimitErrorHandler,
  updateAboutDealership
);

// API DELETE ABOUT A DEALERSHIP DATA BY ID
router.delete('/dealership/:id', deleteAboutDealership);
// --- ABOUT DEALERSHIP END --- //

// --- ABOUT LOYALTY CLUB START --- //
// IMPORT loyaltyClub.js FILE FROM controllers/about FOLDER
const {
  getAboutAllLoyaltyClub,
  getAboutSingleLoyaltyClub,
  postAboutLoyaltyClub,
  updateAboutLoyaltyClub,
  deleteAboutLoyaltyClub,
} = require('../controllers/about/loyaltyClub');

// API GET ABOUT ALL LOYALTY CLUB DATA
router.get('/loyalty-club/', getAboutAllLoyaltyClub);

// API GET ABOUT A LOYALTY CLUB DATA BY ID
router.get('/loyalty-club/:id', getAboutSingleLoyaltyClub);

// API POST ABOUT A LOYALTY CLUB DATA
router.post('/loyalty-club', postAboutLoyaltyClub);

// API PUT / UPDATE ABOUT A LOYALTY CLUB DATA BY ID
router.put('/loyalty-club/:id', updateAboutLoyaltyClub);

// API DELETE ABOUT A LOYALTY CLUB DATA BY ID
router.delete('/loyalty-club/:id', deleteAboutLoyaltyClub);
// --- ABOUT LOYALTY CLUB END --- //

// --- ABOUT RICHMOND AUTO BODY START --- //
// IMPORT richmondAutoBody.js FILE FROM controllers/about FOLDER
const {
  getAboutAllRichmond,
  getAboutSingleRichmond,
  searchRichmonds,
  postAboutRichmond,
  updateAboutRichmond,
  deleteAboutRichmond,
} = require('../controllers/about/richmondAutoBody');

// API GET ABOUT ALL RICHMOND AUTO BODY DATA
router.get('/richmond', getAboutAllRichmond);

// API GET ABOUT A RICHMOND AUTO BODY DATA BY ID
router.get('/richmond/:id', getAboutSingleRichmond);

// API SEARCH ABOUT RICHMOND AUTO BODY DATA BY KEYWORDS
router.post('/search-richmond/', searchRichmonds);

// API POST ABOUT A RICHMOND AUTO BODY DATA
router.post(
  '/richmond',
  imageUpload.single('image'),
  fileSizeLimitErrorHandler,
  postAboutRichmond
);

// API PUT / UPDATE ABOUT A RICHMOND AUTO BODY DATA BY ID
router.put(
  '/richmond/:id',
  imageUpload.single('image'),
  fileSizeLimitErrorHandler,
  updateAboutRichmond
);

// API DELETE ABOUT A RICHMOND AUTO BODY DATA BY ID
router.delete('/richmond/:id', deleteAboutRichmond);
// --- ABOUT RICHMOND AUTO BODY END --- //

// --- ABOUT TERMS & CONDITION START --- //
// IMPORT termsAndCondition.js FILE FROM controllers/about FOLDER
const {
  getAboutAllTermsCondition,
  getAboutSingleTermsCondition,
  postAboutTermsCondition,
  updateAboutTermsCondition,
  deleteAboutTermsCondition,
} = require('../controllers/about/termsAndCondition');

// API GET ABOUT ALL TERMS & CONDITION DATA
router.get('/terms-and-condition', getAboutAllTermsCondition);

// API GET ABOUT TERMS AND CONDITION DATA BY ID
router.get('/terms-and-condition/:id', getAboutSingleTermsCondition);

// API POST ABOUT TERMS & CONDITION DATA
router.post('/terms-and-condition', postAboutTermsCondition);

// API PUT / UPDATE ABOUT TERMS & CONDITION DATA BY ID
router.put('/terms-and-condition/:id', updateAboutTermsCondition);

// API DELETE ABOUT TERMS & CONDITION DATA BY ID
router.delete('/terms-and-condition/:id', deleteAboutTermsCondition);
// --- ABOUT TERMS & CONDITION END --- //

module.exports = router;
