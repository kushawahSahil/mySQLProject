const express = require('express');
const router = express();
const userController = require('../model/userController');
const upload = require('../service/multer');
const { authenticate, generateToken } = require('../model/authmodel');


router.post('/form_register', upload.single('image'), userController.form_register);
router.post('/login', generateToken, userController.login);
router.post('/verifyEmail', userController.verifyEmail);

router.get('/verifyOtp', userController.verifyOtp);
router.get('/logout', userController.logout);
router.get('/viewProfile/:id', userController.viewProfile);

router.post('/updatePassword', userController.updatePassword);
router.put('/resetPassword', userController.resetPassword);
router.put('/updateProfile/:id', authenticate, upload.single('image'), userController.updateProfile);

module.exports = router;