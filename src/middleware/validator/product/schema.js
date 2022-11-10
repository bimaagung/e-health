const Joi = require('joi');
const segmentation = require('../../../internal/constant/segmentation');

const ProductPayloadSchema = Joi.object({
  name: Joi.string().required(),
  categoryId: Joi.number().required(),
  isStrip: Joi.boolean().required(),
  price: Joi.number().required(),
  description: Joi.string(),
  indication: Joi.string(),
  composition: Joi.string().required(),
  dose: Joi.string().required(),
  use: Joi.string().required(),
  sideEffect: Joi.string(),
  segmentation: Joi.string().valid(...segmentation).required(),
  packaging: Joi.string().required(),
  manufacture: Joi.string().required(),
  stock: Joi.number().required(),
  urlImage: Joi.string(),
  expiredAt: Joi.date().required(),
});

module.exports = { ProductPayloadSchema };
