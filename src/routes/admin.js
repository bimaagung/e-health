const express = require('express');
const categoryController = require('../controller/category');
const approveValidationController = require('../controller/approvedValidation');
const medicalSpecialistController = require('../controller/medicalSpecialist');

const router = express.Router();
const { authorized, admin } = require('../middleware/authorization');
const categoryValidator = require('../middleware/validator/category');

router.post('/category/add', authorized, admin, categoryValidator.validatorCategory, categoryController.addCategory);
router.delete('/category/delete/:id', authorized, admin, categoryController.deleteCategoryById);

// approve validation
router.get('/pending/validation/docter', authorized, admin, approveValidationController.getListPendingDocterValidation);
router.patch('/approve/docter/:id', authorized, admin, approveValidationController.approvedValidation);
router.patch('/reject/docter/:id', authorized, admin, approveValidationController.rejectedValidation);

// medical Specialist
router.post('/medical-specialist/add', authorized, admin, medicalSpecialistController.addMedicalSpecialist);
router.put('/medical-specialist/update/:id', authorized, admin, medicalSpecialistController.updateMedicalSpecialist);
router.delete('/medical-specialist/delete/:id', authorized, admin, medicalSpecialistController.deleteMedicalSpecialist);

module.exports = router;
