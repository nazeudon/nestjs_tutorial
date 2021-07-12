// eslint-disable-next-line @typescript-eslint/no-var-requires
const Joi = require('joi');

export const createCatSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  age: Joi.number().required(),
  bread: Joi.string().alphanum().min(3).max(30).required(),
});
