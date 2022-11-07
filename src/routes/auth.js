const express = require('express');
const authController = require('../controller/auth');

const router = express.Router();

router.post('/login', authController.login);

module.exports = router;
