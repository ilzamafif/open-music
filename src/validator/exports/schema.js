const Joi = require('joi');
 
const validateExportSongsPayload = Joi.object({
  targetEmail: Joi.string().email({ tlds: true }).required(),
});
 
module.exports = validateExportSongsPayload;
