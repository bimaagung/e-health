const Joi = require('joi');

const AvailableSchedulePayloadSchema = Joi.object({
  dayNameId: Joi.number().required(),
  // time: Joi.date().format('YYYY-MM-DD').required(),
});

module.exports = { AvailableSchedulePayloadSchema };
