import connection from '../models/connection';
import UserModel from '../models/user';
import { User } from '../interfaces';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async getAll(): Promise<User[]> {
    const users = await this.model.getAll();
    return users;
  }

  public async create(user: User): Promise<User> {
    const createdUser = await this.model.create(user);
    return createdUser;
  }
}

export default UserService;