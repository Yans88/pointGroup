'use strict';

// IMPORT ALL PACKAGES
const express = require('express');
const router = express.Router();

// HELPER MODULE
const helperModule = require('../helpers/module');
const fileSizeLimitErrorHandler = helperModule.fileSizeLimitErrorHandler;
const imageUpload = helperModule.imageUpload;

// --- USER AUTH START --- //
// IMPORT auth.js FILE FROM controllers/user FOLDER
const {
  userSignin,
  forgotPassword,
  resetPassword,
} = require('../controllers/user/auth');

// USER SIGN IN BY EMAIL & PASSWORD
router.post('/signin', userSignin);

// FORGET / RESET PASSWORD USER
router.post('/forgot-password', forgotPassword);

// RESET USER PASSWORD
router.put('/reset-password', resetPassword);
// --- USER AUTH END --- //

// --- USER PROFILE START --- //
// IMPORT profile.js FILE FROM controllers/user FOLDER
const {
  getAllUsers,
  getSingleUser,
  searchUsers,
  postUser,
  updatePassword,
  updateProfile,
  deleteUser,
} = require('../controllers/user/profile');

// API GET ALL USERS DATA
router.get('/user', getAllUsers);

// API GET A USER DATA BY ID
router.get('/user/:id', getSingleUser);

// API SEARCH USERS DATA BY ID
router.post('/search-users', searchUsers);

// API POST A USER DATA
router.post(
  '/user',
  imageUpload.single('profile_picture'),
  fileSizeLimitErrorHandler,
  postUser
);

// UPDATE USER PASSWORD
router.put('/user/change-password', updatePassword);

// UPDATE PROFILE USER
router.put(
  '/user/account/:id',
  imageUpload.single('profile_picture'),
  fileSizeLimitErrorHandler,
  updateProfile
);

// API DELETE A USER DATA BY ID
router.delete('/user/:id', deleteUser);
// --- USER PROFILE END --- //

// --- USER ROLE START --- //
// IMPORT role.js FILE FROM controllers/user FOLDER
const {
  getAllRoles,
  getSingleRole,
  searchRoles,
  postRole,
  updateRole,
  deleteRole,
} = require('../controllers/user/role');

// API GET ALL ROLES DATA
router.get('/user-role', getAllRoles);

// API GET A ROLE DATA BY ID
router.get('/user-role/:id', getSingleRole);

// API SEARCH ROLES DATA
router.post('/search-user-roles', searchRoles);

// POST A ROLE DATA
router.post('/user-role', postRole);

// UPDATE A ROLE DATA BY ID
router.put('/user-role/:id', updateRole);

// API DELETE A ROLE BY ID
router.delete('/user-role/:id', deleteRole);
// --- USER ROLE END --- //

// --- ADMIN NOTIFICATION START --- //
// IMPORT FILE FROM controllers/notifications FOLDER
const {
  getDataNotification,
  saveDataNotification,
  getNotificationDetail,
  deleteDataNotification,
} = require('../controllers/notifications');

// IMPORT FILE FROM controllers/points FOLDER
const {
  getAllHistoryPoint,
  createTransfer,
  getPointDefinition,
  editPointDefinition,
  createRedemption,
  addPoint,
  verify_transaction,
} = require('../controllers/points');

// API GET ALL HISTORY POINT
router.post('/history_point', getAllHistoryPoint);
router.post('/create_transfer', createTransfer);
router.get('/point_definition', getPointDefinition);
router.post('/set_point_definition', editPointDefinition);
router.post('/create_redemption', createRedemption);
router.post('/add_point_member', addPoint);
router.post('/verify_transaction', verify_transaction);

// API GET NOTIFICATION
router.post('/notification', getDataNotification);
router.post('/save_notification', saveDataNotification);
router.post('/del_notification', deleteDataNotification);
router.get('/notification/:id/:member_id', getNotificationDetail);
// --- ADMIN NOTIFICATION END --- //

// IMPORT FILE FROM controllers/members FOLDER
const { getAllDataMembers, editDataMember } = require('../controllers/member');

// IMPORT FILE FROM controllers/statistics FOLDER
const { members, redemptions, annualStoreReport, downloadAnnualStoreReport } = require('../controllers/statistics');

// API GET All data Member
router.post('/get_members', getAllDataMembers);
router.post(
  '/edit_member',
  imageUpload.single('profile_picture'),
  fileSizeLimitErrorHandler,
  editDataMember
);

// API GET Statistics
router.post('/statistic_member', members);
router.post('/statistic_redemption', redemptions);
router.post('/statistic_annual_store', annualStoreReport);
router.get('/download_annual_store_report', downloadAnnualStoreReport);

module.exports = router;