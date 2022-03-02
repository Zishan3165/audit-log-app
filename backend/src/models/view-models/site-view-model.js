import Joi from 'joi';

const schema = Joi.object().keys({
  name: Joi.string().max(30).required(),
  region: Joi.string().max(30).required(),
  description: Joi.string().allow('').max(200),
  lat: Joi.number().min(-90).max(90).required(),
  long: Joi.number().min(-180).max(180).required()
});

const validateSite = (data) => {
  const result = schema.validate(data);
  data.createdAt = new Date();
  result.value = data;
  return result;
};

export default validateSite;
