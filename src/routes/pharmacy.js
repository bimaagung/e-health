const express = require('express');
const pharmacyProductController = require('../controller/pharmacyProduct');

const router = express.Router();

// TODO: Add authorization for pharmacy
router.post('/product/add', pharmacyProductController.addPharmacyProduct);

module.exports = router;
