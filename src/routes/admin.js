const express = require('express');
const categoryController = require('../controller/category');
const productController = require('../controller/product');
const approveValidationController = require('../controller/approvedValidation');
const medicalSpecialistController = require('../controller/medicalSpecialist');
const orderController = require('../controller/order');

const router = express.Router();
const { authorized, admin } = require('../middleware/authorization');
const categoryValidator = require('../middleware/validator/category');
const productValidator = require('../middleware/validator/product');
const medicalSpecialistValidator = require('../middleware/validator/medicalSpecialist');
const mediaHandler = require('../libs/mediaHandler');

// category
router.post('/category/add', authorized, admin, categoryValidator.validatorCategory, categoryController.addCategory);
router.delete('/category/delete/:id', authorized, admin, categoryController.deleteCategoryById);

// product
router.post('/product/add', authorized, admin, mediaHandler.uploadFile.single('urlImage'), productValidator.validatorProduct, productController.addProduct);
router.put('/product/update/:id', authorized, admin, mediaHandler.uploadFile.single('urlImage'), productValidator.validatorUpdateProduct, productController.updateProduct);

// approve validation
router.get('/pending/validation/docter', authorized, admin, approveValidationController.getListPendingDocterValidation);
router.patch('/approve/validation/:id', authorized, admin, approveValidationController.approvedValidation);
router.patch('/reject/validation/:id', authorized, admin, approveValidationController.rejectedValidation);

// medical Specialist
router.post('/medical-specialist/add', authorized, admin, medicalSpecialistValidator.validatorMedicalSpecialist, medicalSpecialistController.addMedicalSpecialist);
router.put('/medical-specialist/update/:id', authorized, admin, medicalSpecialistValidator.validatorMedicalSpecialist, medicalSpecialistController.updateMedicalSpecialist);
router.delete('/medical-specialist/delete/:id', authorized, admin, medicalSpecialistController.deleteMedicalSpecialist);

// Order
router.patch('/order-process/:id', authorized, admin, orderController.processOrder);
router.patch('/order-complete/:id', authorized, admin, orderController.completedOrder);
router.patch('/order-canceled/:id', authorized, admin, orderController.canceledOrderByAdmin);
module.exports = router;
