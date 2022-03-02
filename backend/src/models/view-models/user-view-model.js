import Joi from 'joi';

const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(5).max(30).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(5).max(100).required()
});

const validateUser = (data) => {
  const result = schema.validate(data);
  data.createdAt = new Date();
  result.value = data;
  return result;
};

export default validateUser;
