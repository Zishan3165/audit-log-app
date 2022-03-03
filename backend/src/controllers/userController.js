import express from 'express';
import {
  getAllUsers,
  saveUser,
  updateUser,
  deleteUser,
  loginUser,
  getUserById
} from '../services/userService.js';
import validators from '../models/view-models/index.js';
import { handleValidation } from '../middlewares/handleValidations.js';

const router = express.Router();

const getHandler = async (req, res) => {
  const users = await getAllUsers();
  res.status(200).send(users);
};

const getHandlerById = async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    return next(e, req, res);
  }
};

const postHandler = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await saveUser(body);
    res.status(201).send(user);
  } catch (e) {
    return next(e, req, res);
  }
};

const login = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await loginUser(body);
    res.status(200).send(user);
  } catch (e) {
    return next(e, req, res);
  }
};

const putHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await updateUser(body);
    res.status(201).send(user);
  } catch (e) {
    return next(e, req, res);
  }
};

const deleteHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteUser(id);
    res.status(200).send('User deleted');
  } catch (e) {
    return next(e, req, res);
  }
};

router.get('/', getHandler);
router.get('/:id', getHandlerById);
router.post('/login', login);
router.post('/signup', handleValidation(validators.userSchemaValidate), postHandler);
router.put('/', putHandler);
router.delete('/:id', deleteHandler);

const configure = (app) => {
  app.use('/users', router);
};

export default configure;
