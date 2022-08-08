import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

const SECRET = 'segredoSegredosoToken';
export default class UserValidate {
  static userNameValidate(req: Request, res: Response, next: NextFunction) {
    const { username } = req.body;
    
    if (!username) {
      return res.status(400).json({ message: '"username" is required' });
    } 
    if (typeof username !== 'string') {
      return res.status(422).json({ message: 'Username must be a string' });
    }
    if (username.length <= 2) {
      return res.status(422).json({ message: 'Username must be longer than 2 characters' });
    }
    next();
  }

  static classeValidate(req: Request, res: Response, next: NextFunction) {
    const { classe } = req.body;
    if (!classe) {
      return res.status(400).json({ message: 'Classe is required' });
    } 
    if (typeof (classe) !== 'string') {
      return res.status(422).json({ message: 'Classe must be a string' });
    }
    if (classe.length <= 2) {
      return res.status(422).json({ message: 'Classe must be longer than 2 characters' });
    }
    next();
  }

  static levelValidate(req: Request, res: Response, next: NextFunction) {
    const { level } = req.body;
    
    if (level === undefined) {
      return res.status(400).json({ message: 'Level is required' });
    } 
    if (typeof level !== 'number') {
      return res.status(422).json({ message: 'Level must be a number' });
    }
    if (level <= 0) {
      return res.status(422).json({ message: 'Level must be greater than 0' });
    }
    next();
  }

  static passwordValidate(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: '"password" is required' });
    } 
    if (typeof (password) !== 'string') {
      return res.status(422).json({ message: 'Password must be a string' });
    }
    if (password.length < 8) {
      return res.status(422).json({ message: 'Password must be longer than 7 characters' });
    }
    next();
  }

  static authUser(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const decoded = jwt.verify(authorization, SECRET);
      req.body.user = decoded;
      return next();
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}