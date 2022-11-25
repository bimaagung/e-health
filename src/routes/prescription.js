const express = require('express');
const prescriptionController = require('../controller/prescription');

const router = express.Router();

const mediahandler = require('../libs/mediaHandler');
const { authorized } = require('../middleware/authorization');

// router.post('/add', authorized, mediahandler.uploadFile.single('urlPresciption'), prescriptionController.addPrescription);
// router.get('/:id', prescriptionController.getPrescriptionById);

module.exports = router;
