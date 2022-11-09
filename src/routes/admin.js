const express = require('express');
const categoryController = require('../controller/category');
const approveValidationController = require('../controller/approvedValidation');

const router = express.Router();
const mediahandler = require('../libs/mediaHandler');
const { authorized, admin } = require('../middleware/authorization');
const categoryValidator = require('../middleware/validator/category');

router.post('/category/add', authorized, admin, mediahandler.uploadFile.single('image'), categoryValidator.validatorCategory, categoryController.addCategory);

// approve validation
router.patch('/approve/validation/docter/:id', authorized, admin, approveValidationController.approvedValidation);

module.exports = router;
