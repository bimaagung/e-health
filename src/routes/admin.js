const express = require('express');
const categoryController = require('../controller/category');
const approveValidationController = require('../controller/approvedValidation');

const router = express.Router();
const { authorized, admin } = require('../middleware/authorization');
const categoryValidator = require('../middleware/validator/category');

router.post('/category/add', authorized, admin, categoryValidator.validatorCategory, categoryController.addCategory);

// approve validation
router.get('/pending/validation/docter', authorized, admin, approveValidationController.getListPendingDocterValidation);
router.patch('/approve/validation/docter/:id', authorized, admin, approveValidationController.approvedValidation);
router.patch('/reject/validation/docter/:id', authorized, admin, approveValidationController.rejectedValidation);

module.exports = router;
