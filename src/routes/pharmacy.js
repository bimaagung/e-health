const express = require('express');
const pharmacyProductController = require('../controller/pharmacyProduct');

const router = express.Router();

router.get('/product/add', pharmacyProductController.addPharmacyProduct);

module.exports = router;
