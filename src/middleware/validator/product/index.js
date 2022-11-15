const { ProductPayloadSchema } = require('./schema');
const { UploadFileSchema } = require('../Upload/schema');
const resData = require('../../../helper/response');

const ProductValidator = {
  validatorProduct: async (req, res, next) => {
    const validationResult = ProductPayloadSchema.validate(req.body);
    const validationImageResult = UploadFileSchema.validate(req.file);

    if (validationImageResult.error) {
      return res.status(400).json(resData.failed(validationImageResult.error.message));
    }

    if (validationResult.error) {
      return res.status(400).json(resData.failed(validationResult.error.details[0].message));
    }

    next();
  },

  validatorUpdateProduct: async (req, res, next) => {
    const validationResult = ProductPayloadSchema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json(resData.failed(validationResult.error.details[0].message));
    }

    next();
  },
};

module.exports = ProductValidator;
