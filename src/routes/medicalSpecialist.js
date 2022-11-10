const express = require('express');
const medicalSpecialistController = require('../controller/medicalSpecialist');

const router = express.Router();

router.get('/', medicalSpecialistController.getListMedicalSpecialist);
router.get('/:id', medicalSpecialistController.getDoctorByMedicalSpecialistId);

module.exports = router;
