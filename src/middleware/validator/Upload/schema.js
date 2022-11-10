const Joi = require('joi');

const UploadImageSchema = Joi.object({
  path: Joi.string().required(),
  mimetype: Joi.string().valid('image/png', 'image/jpg', 'image/jpeg').required().error(new Error('file type must png / jpeg / jpg')),
  fieldname: Joi.string(),
  originalname: Joi.string(),
  encoding: Joi.string(),
  destination: Joi.string(),
  filename: Joi.string(),
  size: Joi.number().max(50000).error(new Error('file size less than 500 KB')),

});

module.exports = { UploadImageSchema };
