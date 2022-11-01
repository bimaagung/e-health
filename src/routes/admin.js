const express = require('express');
const categoryController = require('../controller/category');

const router = express.Router();
const mediahandler = require('../lib/mediaHandler');

router.post('/category/add', mediahandler.uploadFile.single('image'), categoryController.addCategory);

module.exports = router;
