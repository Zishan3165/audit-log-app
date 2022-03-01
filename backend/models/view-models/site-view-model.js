import Joi from 'joi';

const schema = Joi.object().keys({
  name: Joi.string().max(30).required(),
  region: Joi.string().max(30).required(),
  description: Joi.string().allow('').max(200),
  lat: Joi.number().required(),
  long: Joi.number().required()
});

const validateSite = (data) => {
  const result = schema.validate(data);
  data.createdAt = new Date();
  result.value = data;
  return result;
};

export default validateSite;
