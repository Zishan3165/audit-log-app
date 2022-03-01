import express from 'express';
import {
  getAllSites,
  saveSite,
  updateSite,
  deleteSite,
  getSiteById
} from '../services/siteService.js';
import validators from '../models/view-models/index.js';
import { handleValidation } from '../middlewares/handleValidations.js';

const router = express.Router();

const getHandler = async (req, res) => {
  const { pageNumber } = req.query;
  const sites = await getAllSites(pageNumber);
  res.status(200).send(sites);
};

const getHandlerById = async (req, res, next) => {
  try {
    const sites = await getSiteById(req.params.id);
    res.status(200).send(sites);
  } catch (e) {
    return next(e, req, res);
  }
};

const postHandler = async (req, res, next) => {
  try {
    const { body } = req;
    const { userId } = req.query;
    const site = await saveSite(body, userId);
    res.status(201).send(site);
  } catch (e) {
    return next(e, req, res);
  }
};

const putHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const { userId } = req.query;
    const site = await updateSite(body, id, userId);
    res.status(200).send(site);
  } catch (e) {
    return next(e, req, res);
  }
};

const deleteHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { userId } = req.query;
    await deleteSite(id, userId);
    res.status(200).send({ message: 'Site Deleted' });
  } catch (e) {
    return next(e, req, res);
  }
};

router.get('/', getHandler);
router.get('/:id', getHandlerById);
router.post('/', handleValidation(validators.siteSchemaValidate), postHandler);
router.put('/:id', handleValidation(validators.siteSchemaValidate), putHandler);
router.delete('/:id', deleteHandler);

const configure = (app) => {
  app.use('/sites', router);
};

export default configure;
