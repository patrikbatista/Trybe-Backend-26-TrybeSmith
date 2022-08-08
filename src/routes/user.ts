import { Router } from 'express';

import UserController from '../controllers/users';
import UserValidate from '../middlewares/userValidate';

const user = Router();

const userController = new UserController();

user.get('/users', userController.getAll);

user.post(
  '/users', 
  UserValidate.userNameValidate,
  UserValidate.classeValidate,
  UserValidate.levelValidate,
  UserValidate.passwordValidate,
  userController.createUser,
);

export default user;