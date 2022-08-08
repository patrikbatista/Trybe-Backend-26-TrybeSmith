import { Router } from 'express';

import LoginController from '../controllers/login';
import UserValidate from '../middlewares/userValidate';
// import loginValidate from '../middlewares/userValidate';

const login = Router();

const loginController = new LoginController();

login.post(
  '/login', 
  UserValidate.userNameValidate,
  UserValidate.passwordValidate,
  loginController.getUser,
);

export default login;