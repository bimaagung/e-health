const express = require('express');
const categoryController = require('../controller/category');
const productController = require('../controller/product');
const approveValidationController = require('../controller/approvedValidation');

const router = express.Router();
const { authorized, admin } = require('../middleware/authorization');
const categoryValidator = require('../middleware/validator/category');
const productValidator = require('../middleware/validator/product');
const mediaHandler = require('../libs/mediaHandler');

// category
router.post('/category/add', authorized, admin, categoryValidator.validatorCategory, categoryController.addCategory);
router.delete('/category/delete/:id', authorized, admin, categoryController.deleteCategoryById);

// product
router.post('/product/add', authorized, admin, mediaHandler.uploadFile.single('urlImage'), productValidator.validatorProduct, productController.addProduct);

// approve validation
router.get('/pending/validation/docter', authorized, admin, approveValidationController.getListPendingDocterValidation);
router.patch('/approve/validation/docter/:id', authorized, admin, approveValidationController.approvedValidation);
router.patch('/reject/validation/docter/:id', authorized, admin, approveValidationController.rejectedValidation);

module.exports = router;
