const { ProductPayloadSchema } = require('./schema');
const { UploadImageSchema } = require('../Upload/schema');
const resData = require('../../../helper/response');

const ProductValidator = {
  validatorProduct: async (req, res, next) => {
    const validationResult = ProductPayloadSchema.validate(req.body);
    const validationImageResult = UploadImageSchema.validate(req.file);

    if (validationImageResult.error) {
      return res.status(400).json(resData.failed(validationImageResult.error.message));
    }

    if (validationResult.error) {
      return res.status(400).json(resData.failed(validationResult.error.details[0].message));
    }

    next();
  },
};

module.exports = ProductValidator;
