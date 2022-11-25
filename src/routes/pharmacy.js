const express = require('express');
const pharmacyProductController = require('../controller/pharmacyProduct');

const router = express.Router();

// TODO: Add authorization for pharmacy
router.post('/product/add', pharmacyProductController.addPharmacyProduct);
router.put('/product/update/:id', pharmacyProductController.updatePharmacyProduct);
router.delete('/product/delete/:id', pharmacyProductController.deletePharmacyProduct);

module.exports = router;
