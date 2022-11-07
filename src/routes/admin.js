const express = require('express');
const categoryController = require('../controller/category');

const router = express.Router();
const mediahandler = require('../libs/mediaHandler');
const { authorized, admin } = require('../middleware/authorization');
const categoryValidator = require('../middleware/validator/category');

router.post('/category/add', authorized, admin, mediahandler.uploadFile.single('image'), categoryValidator.validatorCategory, categoryController.addCategory);

module.exports = router;
