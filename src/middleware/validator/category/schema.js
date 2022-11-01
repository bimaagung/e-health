const Joi = require('joi');

const CategoryPayloadSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().allow(''),
});

module.exports = { CategoryPayloadSchema };
