const { MediacalSpecialistPayloadSchema } = require('./schema');
const resData = require('../../../helper/response');

const MediacalSpecialistValidator = {
  validatorMedicalSpecialist: async (req, res, next) => {
    const validationResult = MediacalSpecialistPayloadSchema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json(resData.failed(validationResult.error.details[0].message));
    }

    next();
  },
};

module.exports = MediacalSpecialistValidator;
