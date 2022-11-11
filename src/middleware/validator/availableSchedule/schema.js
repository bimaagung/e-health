const Joi = require('joi');

const AvailableSchedulePayloadSchema = Joi.object({
  dayNameId: Joi.number().required(),
  newTime: Joi.string().required(),
  // time: Joi.date().format('YYYY-MM-DD').required(),
});

module.exports = { AvailableSchedulePayloadSchema };
