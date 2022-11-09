const express = require('express');
const docterValidationController = require('../controller/doctorValidation');

const router = express.Router();
const mediahandler = require('../libs/mediaHandler');
const { authorized } = require('../middleware/authorization');

router.post('/validation', authorized, mediahandler.uploadFile.single('urlDoc'), docterValidationController.addDoctorValidation);

module.exports = router;
