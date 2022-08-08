import connection from '../models/connection';
import OrderModel from '../models/order';
import { Order } from '../interfaces';

class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const orders = await this.model.getAll();
    return orders;
  }

  public async create(order: Order): Promise<Order> {
    const result = await this.model.create(order);
    return result;
  }
}

export default OrderService;