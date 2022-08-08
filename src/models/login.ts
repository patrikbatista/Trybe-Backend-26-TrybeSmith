import { Pool, RowDataPacket } from 'mysql2/promise';
import { Login, User } from '../interfaces';

export default class LoginModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getUser(user: Login): Promise<User | undefined> {
    const result = await this.connection
      .execute<RowDataPacket[]>(`SELECT * FROM 
      Trybesmith.Users WHERE username = ? `, [user.username]);
    
    const [rows] = result;
    return rows[0] as User;
  }
}   