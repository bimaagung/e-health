const express = require('express');

const router = express.Router();

const otpController = require('../controller/otp');

router.post('/generate', otpController.generateOTP);

module.exports = router;
