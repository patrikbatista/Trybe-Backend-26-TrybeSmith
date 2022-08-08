import connection from '../models/connection';
import LoginModel from '../models/login';
import { Login } from '../interfaces';

class LoginService {
  public model: LoginModel;

  constructor() {
    this.model = new LoginModel(connection);
  }

  public async getUser(user: Login) {
    const result = await this.model.getUser(user);
    return result;
  }
}

export default LoginService;