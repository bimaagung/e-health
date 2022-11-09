const express = require('express');
const availableScheduleController = require('../controller/availableSchedule');

const router = express.Router();
const { authorized } = require('../middleware/authorization');

router.post('/available/add', authorized, availableScheduleController.addAvailableSchedule);

module.exports = router;
