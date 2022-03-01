import express from 'express';
import { saveLog, getAllLogs } from '../services/logService.js';
import validators from '../models/view-models/index.js';
import { handleValidation } from '../middlewares/handleValidations.js';
import { BadRequest } from '../utils/errors.js';
import mongoose from 'mongoose';

const router = express.Router();

const getHandler = async (req, res, next) => {
  const { pageNumber, siteId } = req.query;
  const filters = {};
  try {
    if (siteId != null) {
      if (!mongoose.Types.ObjectId.isValid(siteId)) {
        throw new BadRequest('Invalid ID');
      }
      filters.site = siteId;
    }
    const logs = await getAllLogs(pageNumber, filters);
    res.status(200).send(logs);
  } catch (e) {
    return next(e, req, res);
  }
};

const postHandler = async (req, res, next) => {
  try {
    const { body } = req;
    const log = await saveLog(body);
    res.status(201).send(log);
  } catch (e) {
    return next(e, req, res);
  }
};

router.get('/', getHandler);
router.post('/', handleValidation(validators.logSchemaValidate), postHandler);

const configure = (app) => {
  app.use('/logs', router);
};

export default configure;
