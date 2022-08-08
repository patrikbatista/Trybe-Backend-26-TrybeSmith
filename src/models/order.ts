import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Order } from '../interfaces';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.connection.execute(
      `SELECT Orders.id as id, Orders.userId as userId, Products.id as products 
      FROM Trybesmith.Orders
      INNER JOIN Trybesmith.Products 
      ON Trybesmith.Orders.id = Trybesmith.Products.OrderId;`,
    );
    const [rows] = result;
    return rows as Order[];
  }

  public async create(order: Order): Promise<Order> {
    const { userId, products } = order;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;

    await Promise.all(products.map(async (product) => {
      await this.connection.execute(
        'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?', 
        [insertId, product],
      );
    }));
    return { id: insertId, ...order };
  }
}