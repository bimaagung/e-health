const express = require('express');
const otpContoller = require('../controller/otp');

const router = express.Router();

router.post("/request/otp", otpContoller.generateOTP);
module.exports = router;
