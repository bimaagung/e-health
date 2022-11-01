const { CategoryPayloadSchema } = require('./schema');
const resData = require('../../../helper/response');

const CategoryValidator = {
  validatorCategory: async (req, res, next) => {
    const validationResult = CategoryPayloadSchema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json(resData.failed(validationResult.error.details[0].message));
    }

    next();
  },
};

module.exports = CategoryValidator;
