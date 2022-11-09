const express = require('express');
const docterValidationController = require('../controller/docterValidation');
const availableScheduleController = require('../controller/availableSchedule');

const router = express.Router();
const mediahandler = require('../libs/mediaHandler');
const { authorized } = require('../middleware/authorization');

router.post('/validation', authorized, mediahandler.uploadFile.single('urlDoc'), docterValidationController.addDocterValidation);
router.post('/available-schedule/add', authorized, availableScheduleController.addAvailableSchedule);

module.exports = router;
