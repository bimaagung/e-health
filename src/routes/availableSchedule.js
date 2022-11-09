const express = require('express');
const availableScheduleController = require('../controller/availableSchedule');

const router = express.Router();
const { authorized, doctor } = require('../middleware/authorization');

router.post('/available/add', authorized, doctor, availableScheduleController.addAvailableSchedule);
router.get('/available/list', availableScheduleController.getAllAvailableScheduleByDoctorId);

module.exports = router;
