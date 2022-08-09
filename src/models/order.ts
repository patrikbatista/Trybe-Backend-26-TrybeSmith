import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Order } from '../interfaces';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  // https://dev.mysql.com/doc/refman/5.7/en/aggregate-functions.html#function_json-arrayagg
  public async getAll(): Promise<Order[]> {
    const result = await this.connection.execute(
      `SELECT ord.id as id, ord.userId as userId, JSON_ARRAYAGG(prod.id) as productsIds
      FROM Trybesmith.Orders as ord
      INNER JOIN Trybesmith.Products as prod
      ON ord.id = prod.orderId 
      GROUP BY ord.id
      ORDER BY ord.userId;`,
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