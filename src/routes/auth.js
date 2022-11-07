const express = require('express');
const authController = require('../controller/auth');

const router = express.Router();
const mediahandler = require('../libs/mediaHandler');

router.post('/login', authController.login);
router.post('/register', mediahandler.uploadFile.single('image'), authController.login);

module.exports = router;
