import models from '../models/data-models/index.js';
import { AlreadyExists, NotFound, Unauthorized } from '../utils/errors.js';

export const saveUser = async (user) => {
  const model = new models.User(user);
  const { username, email } = user;
  const userExists = await models.User.find({ $or: [{ username }, { email }] });
  if (userExists?.length) {
    throw new AlreadyExists('User already exists');
  }
  const savedUser = await model.save();
  return savedUser;
};

export const loginUser = async (user) => {
  const { username, password } = user;
  const userObj = await models.User.findOne({ username });
  if (!userObj) {
    throw new NotFound('User does not exist');
  }
  const match = await userObj.comparePassword(password, userObj.password);
  if (!match) {
    throw new Unauthorized('Invalid credentials');
  }
  return userObj;
};

export const getAllUsers = async () => {
  const User = models.User;
  const users = await User.find();
  return users;
};

export const updateUser = async (user) => {
  const id = user._id;
  const User = models.User;
  let model = await User.findById(id);
  if (model) {
    model.username = user.username;
    model.save();
    return model;
  }
  throw new NotFound('User does not exist');
};

export const deleteUser = async (id) => {
  const User = models.User;
  let model = await User.findById(id);
  if (model) {
    const result = await User.deleteOne({ _id: id });
    return result;
  }
  throw new NotFound('User does not exist');
};
