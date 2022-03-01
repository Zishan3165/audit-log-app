import { GeneralError } from '../utils/errors.js';

export const handleErrors = async (err, req, res, next) => {
  if (err instanceof GeneralError) {
    const code = err.getCode();
    return res.status(code).json({ message: err.message, name: err.name });
  }
  return res.status(500).json({ name: 'Internal server error', message: err.message });
};
