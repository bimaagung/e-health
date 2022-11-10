const Joi = require('joi');

const UploadFileSchema = Joi.object({
  path: Joi.string().required(),
  mimetype: Joi.string().valid('image/png', 'image/jpg', 'image/jpeg', 'application/pdf').required().error(new Error('file type must png / jpeg / jpg / pdf')),
  fieldname: Joi.string(),
  originalname: Joi.string(),
  encoding: Joi.string(),
  destination: Joi.string(),
  filename: Joi.string(),
  size: Joi.number().max(1000000).error(new Error('file size less than 1000 KB')),

});

module.exports = { UploadFileSchema };
