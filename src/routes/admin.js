const express = require('express');
const categoryController = require('../controller/category');

const router = express.Router();
const mediahandler = require('../libs/mediaHandler');
const categoryValidator = require('../middleware/validator/category');

router.post('/category/add', mediahandler.uploadFile.single('image'), categoryValidator.validatorCategory, categoryController.addCategory);

module.exports = router;
