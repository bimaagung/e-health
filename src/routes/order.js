const express = require('express');
const orderController = require('../controller/order');

const router = express.Router();

const { authorized } = require('../middleware/authorization');

router.post('/create-or-update/', authorized, orderController.createOrUpdateOrder);
router.patch('/sumbited/', authorized, orderController.sumbitedOrder);
router.patch('/canceled/by/user/:id', authorized, orderController.canceledOrderByUser);
module.exports = router;
