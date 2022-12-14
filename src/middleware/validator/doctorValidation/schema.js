const Joi = require('joi');

const DoctorValidationPayloadSchema = Joi.object({
  medicalSpecialistId: Joi.number().required(),
  hospitalId: Joi.number().required(),
});

module.exports = { DoctorValidationPayloadSchema };
