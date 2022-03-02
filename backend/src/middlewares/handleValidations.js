import { BadRequest } from '../utils/errors.js';

export const handleValidation = validate => {
  return (req, res, next) => {
    const result = validate(req.body);
    const isValid = result.error == null;
    if (isValid) return next();

    const { details } = result.error;
    const messages = details.map(e => e.message);
    messages.join(', ');
    throw new BadRequest(messages);
  };
};
