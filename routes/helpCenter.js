'use strict';

// IMPORT ALL PACKAGES
const express = require('express');
const router = express.Router();

// HELPER MODULE
const helperModule = require('../helpers/module');
const fileSizeLimitErrorHandler = helperModule.fileSizeLimitErrorHandler;
const imageUpload = helperModule.imageUpload;

// --- HELP CENTER CONTACT US START --- //
// IMPORT contact.js FILE FROM controllers/helpCenter FOLDER
const {
  getAllContact,
  getSingleContact,
  searchContacts,
  postContact,
  updateContact,
  deleteSingleContact,
} = require('../controllers/helpCenter/contact');

// API GET HELP CENTER ALL CONTACT US DATA
router.get('/contact-us', getAllContact);

// API GET HELP CENTER A CONTACT US DATA BY ID
router.get('/contact-us/:id', getSingleContact);

// API SEARCH HELP CENTER CONTACT US DATA BY KEYWORDS
router.post('/search-contact-us', searchContacts);

// API POST HELP CENTER A CONTACT US DATA
router.post('/contact-us', postContact);

// API PUT / UPDATE HELP CENTER A CONTACT US DATA BY ID
router.put('/contact-us/:id', updateContact);

// API DELETE HELP CENTER A CONTACT US DATA BY ID
router.delete('/contact-us/:id', deleteSingleContact);
// --- HELP CENTER CONTACT US END --- //

// --- HELP CENTER FAQ START --- //
// IMPORT faq.js FILE FROM controllers/helpCenter FOLDER
const {
  getAllFaqs,
  getSingleFaq,
  searchFaqs,
  postFaq,
  updateFaq,
  deleteSingleFaq,
} = require('../controllers/helpCenter/faq');

// API GET HELP CENTER ALL FAQ DATA
router.get('/faq', getAllFaqs);

// API GET HELP CENTER A FAQ DATA BY ID
router.get('/faq/:id', getSingleFaq);

// API SEARCH HELP CENTER FAQS DATA BY KEYWORDS
router.post('/search-faq', searchFaqs);

// API POST HELP CENTER A FAQ DATA
router.post(
  '/faq',
  imageUpload.single('faq_image'),
  fileSizeLimitErrorHandler,
  postFaq
);

// API PUT / UPDATE HELP CENTER A FAQ DATA BY ID
router.put(
  '/faq/:id',
  imageUpload.single('faq_image'),
  fileSizeLimitErrorHandler,
  updateFaq
);

// API DELETE HELP CENTER A FAQ DATA BY ID
router.delete('/faq/:id', deleteSingleFaq);
// --- HELP CENTER FAQ END --- //

// --- HELP CENTER FAQ TOPIC START --- //
// IMPORT faq.js FILE FROM controllers/helpCenter FOLDER
const {
  getAllTopics,
  getSingleTopic,
  searchTopics,
  postTopic,
  updateTopic,
  deleteSingleTopic,
} = require('../controllers/helpCenter/topic');

// API GET HELP CENTER ALL FAQ DATA
router.get('/faq-topic', getAllTopics);

// API GET HELP CENTER A FAQ DATA BY ID
router.get('/faq-topic/:id', getSingleTopic);

// API SEARCH HELP CENTER FAQS DATA BY KEYWORDS
router.post('/search-faq-topic', searchTopics);

// API POST HELP CENTER A FAQ DATA
router.post('/faq-topic', postTopic);

// API PUT / UPDATE HELP CENTER A FAQ DATA BY ID
router.put('/faq-topic/:id', updateTopic);

// API DELETE HELP CENTER A FAQ DATA BY ID
router.delete('/faq-topic/:id', deleteSingleTopic);
// --- HELP CENTER FAQ TOPIC END --- //

module.exports = router;
