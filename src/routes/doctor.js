const express = require('express');
const doctorController = require('../controller/doctor');

const router = express.Router();

const { authorized } = require('../middleware/authorization');

router.get('/list', doctorController.getAllDoctor);

module.exports = router;
