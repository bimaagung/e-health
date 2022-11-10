const express = require('express');
const docterValidationController = require('../controller/doctorValidation');

const router = express.Router();
const docterValidationValidator = require('../middleware/validator/doctorValidation');
const mediahandler = require('../libs/mediaHandler');
const { authorized } = require('../middleware/authorization');

router.post('/doctor', authorized, mediahandler.uploadFile.single('urlDoc'), docterValidationValidator.validatorDoctorValidation, docterValidationController.addDoctorValidation);

module.exports = router;
