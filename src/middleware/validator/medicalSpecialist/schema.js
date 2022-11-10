const Joi = require('joi');

const MediacalSpecialistPayloadSchema = Joi.object({
  specialistName: Joi.string().required(),
});

module.exports = { MediacalSpecialistPayloadSchema };
