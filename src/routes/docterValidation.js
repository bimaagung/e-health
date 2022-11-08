const express = require('express');
const docterValidationController = require('../controller/docterValidation');

const router = express.Router();
const mediahandler = require('../libs/mediaHandler');
const { authorized } = require('../middleware/authorization');

router.post('/validation', authorized, mediahandler.uploadFile.single('urlDoc'), docterValidationController.addDocterValidation);

module.exports = router;
