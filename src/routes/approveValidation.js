const express = require('express');
const approveValidationController = require('../controller/approvedValidation');

const router = express.Router();
const { authorized, admin } = require('../middleware/authorization');

router.post('/approve/validation/docter', authorized, admin, approveValidationController.approvedValidation);

module.exports = router;
