import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import LoginService from '../services/login';

const SECRET = 'segredoSegredosoToken';

export default class LoginController {
  loginService = new LoginService();

  constructor() {
    this.getUser = this.getUser.bind(this);
  }

  public async getUser(req: Request, res: Response) {
    const { body: { username, password } } = req;
    const user = await this.loginService.getUser({ username, password });
    console.log(user);    
    
    if (user === undefined) {
      return res.status(401).json({ message: 'Username or password invalid' });
    } 

    if (user.password !== password) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }
    const token = jwt.sign({ username, id: user.id }, SECRET);    
    return res.status(200).json({ token });
  }
}