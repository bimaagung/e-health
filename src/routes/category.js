const express = require('express');
const categoryController = require('../controller/category');

const router = express.Router();

router.get('/', categoryController.getListCategory);

module.exports = router;
