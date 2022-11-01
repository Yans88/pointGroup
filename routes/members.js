'use strict';

// IMPORT ALL PACKAGES
const express = require('express');
const router = express.Router();

// HELPER MODULE
const helperModule = require('../helpers/module');
const fileSizeLimitErrorHandler = helperModule.fileSizeLimitErrorHandler;
const imageUpload = helperModule.imageUpload;

// --- MEMBER AUTH START --- //
// IMPORT auth.js FILE FROM controllers/member FOLDER
const {
  memberSignup,
  verificationLink,
  agreeTC,
  memberActivation,
  memberSignin,
  forgotPassword,
  resetPassword,
} = require('../controllers/member/auth');

// SIGN UP A NEW MEMBER AND SENDING EMAIL VERIFICATION TO MEMBER
router.post('/signup', memberSignup);

// VERIFY OR SUBMIT MEMBER ACCOUNT AFTER CLICKING ON VERIFICATION EMAIL
router.post('/verification-link', verificationLink);

// CHECK TERMS & CONDITIONS API
router.post('/:id/terms-and-conditions', agreeTC);

// MEMBER ACTIVATION BY INPUTTING MEMBER ID AND PASSWORD
router.post('/activation', memberActivation);

// MEMBER SIGN IN BY EMAIL & PASSWORD
router.post('/signin', memberSignin);

// FORGET / RESET PASSWORD MEMBER
router.put('/forgot-password', forgotPassword);

// RESET MEMBER PASSWORD
router.put('/reset-password', resetPassword);
// --- MEMBER AUTH END --- //

// --- MEMBER PROFILE START --- //
// IMPORT profile.js FILE FROM controllers/member FOLDER
const {
  getSingleMember,
  getAllMembers,
  searchMembers,
  updateProfile,
  updatePassword,
  deleteMember,
  allDealershipsOfMember,
  postDealershipMember,
  deleteDealershipMember,
} = require('../controllers/member/profile');

// API GET ALL MEMBERS DATA
router.get('/', getAllMembers);

// API GET A MEMBER DATA BY ID
router.get('/:id', getSingleMember);

// API SEARCH MEMBERS DATA BY ID
router.post('/search-members', searchMembers);

// UPDATE PROFILE MEMBER
router.put(
  '/account/:id',
  imageUpload.single('profile_picture'),
  fileSizeLimitErrorHandler,
  updateProfile
);

// UPDATE MEMBER PASSWORD
router.put('/change-password', updatePassword);

// API DELETE A MEMBER DATA BY ID
router.delete('/:id', deleteMember);

// GET DEALERSHIP MEMBER
router.get('/dealerships/:id', allDealershipsOfMember);

// POST DEALERSHIP MEMBER
router.post('/dealerships', postDealershipMember);

// DELETE DEALERSHIP MEMBER
router.delete('/delete-dealerships/:id', deleteDealershipMember);
// --- MEMBER PROFILE END --- //

module.exports = router;
