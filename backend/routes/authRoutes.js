const express = require('express');
const { loginUser, signupUser, getUser, verifyUser, forgotPassword, resendVerifyEmail, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/get-user', protect, getUser);
router.get('/verify', verifyUser);
router.post('/resend-email', resendVerifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;