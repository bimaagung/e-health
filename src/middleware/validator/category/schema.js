const Joi = require('joi');

const CategoryPayloadSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().allow(''),
  is_examination: Joi.boolean().required(),
});

module.exports = { CategoryPayloadSchema };
