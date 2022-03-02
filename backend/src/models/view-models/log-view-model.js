import Joi from 'joi';

const schema = Joi.object().keys({
  action: Joi.string().required(),
  user: Joi.string().required(),
  site: Joi.string().required(),
  details: Joi.object().required()
});

const validateLog = (data) => {
  const result = schema.validate(data);
  data.createdAt = new Date();
  result.value = data;
  return result;
};

export default validateLog;
