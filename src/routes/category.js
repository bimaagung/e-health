const express = require('express');
const categoryController = require('../controller/category');

const router = express.Router();

router.get('/', categoryController.getListCategory);
router.get('/:id', categoryController.getCategoryById);

module.exports = router;
