import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import UserService from '../services/users';

const SECRET = 'segredoSegredosoToken';

export default class UserController {
  userService = new UserService();

  constructor() {
    this.getAll = this.getAll.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  public async getAll(_req: Request, res: Response): Promise<Response> {
    const users = await this.userService.getAll();
    if (users.length > 0) {
      return res.status(200).json(users);
    } 
    const newError = new Error('not found');
    newError.name = '404';
    throw newError;
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    const { body: { username, classe, level, password } } = req;
    
    const newUser = await this.userService.create({ username, classe, level, password });
    if (newUser) {
      const token = jwt.sign({ newUser }, SECRET);
      return res.status(201).json({ token });
    }
    const newError = new Error('not found');
    newError.name = '500';
    throw newError;
  }
}