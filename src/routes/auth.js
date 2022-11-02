const express = require('express');
const authContoller = require('../controller/auth');

const router = express.Router();

router.post('/login', authContoller.login);
module.exports = router;
