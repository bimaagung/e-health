const express = require('express');
const doctorController = require('../controller/doctor');

const router = express.Router();

const { authorized } = require('../middleware/authorization');

router.get('/list', doctorController.getAllDoctor);
router.get('/detail/:id', doctorController.getDoctorByUserId);

module.exports = router;
