const express = require('express');
const availableScheduleController = require('../controller/availableSchedule');

const router = express.Router();
const { authorized, doctor } = require('../middleware/authorization');
const availableScheduleValidator = require('../middleware/validator/availableSchedule');

router.post('/available/add', authorized, doctor, availableScheduleValidator.validatorAvailableSchedule, availableScheduleController.addAvailableSchedule);
router.get('/available/list', availableScheduleController.getAllAvailableScheduleByDoctorId);

module.exports = router;
