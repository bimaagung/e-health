const express = require('express');
const orderController = require('../controller/order');

const router = express.Router();

const { authorized } = require('../middleware/authorization');

router.post('/create-or-update/', authorized, orderController.createOrUpdateOrder);

module.exports = router;
