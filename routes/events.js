'use strict';

// Import all packages
const express = require('express');
const router = express.Router();

// HELPER MODULE
const helperModule = require('../helpers/module');
const fileSizeLimitErrorHandler = helperModule.fileSizeLimitErrorHandler;
const imageUpload = helperModule.imageUpload;

// --- EVENT START --- //
// IMPORT event.js FILE FROM controllers/event FOLDER
const {
  searchEvents,
  postEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/event/event');

// API SEARCH EVENTS DATA BY KEYWORDS, TITLE, STATUS AND BY ID
router.post('/search-events', searchEvents);

// API POST A NEW EVENT
router.post(
  '/',
  imageUpload.single('event_image'),
  fileSizeLimitErrorHandler,
  postEvent
);

// API PUT / UPDATE AN EVENT DATA BY ID
router.put(
  '/:id',
  imageUpload.single('event_image'),
  fileSizeLimitErrorHandler,
  updateEvent
);

// API DELETE AN EVENT DATA BY ID
router.delete('/:id', deleteEvent);
// --- EVENT END --- //

module.exports = router;
