import { Request, Response } from 'express';

import OrderService from '../services/orders';

export default class ProductsController {
  orderService = new OrderService();

  constructor() {
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
  }

  public async getAll(_req: Request, res: Response): Promise<Response> {
    const orders = await this.orderService.getAll();

    // const newOrders = orders.map((order) => ({ 
    //   ...order, productsIds: [order.products],
    // }));

    if (orders.length > 0) {
      return res.status(200).json(orders);
    } 
    const newError = new Error('not found');
    newError.name = '500';
    throw newError;
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { productsIds, user } = req.body;
    
    const { id } = user;
    const orders = await this.orderService.create({ userId: id, products: productsIds });
    
    if (orders) {
      return res.status(201).json({ userId: orders.userId, productsIds: orders.products });
    } 
    const newError = new Error('internal error');
    newError.name = '500';
    throw newError;
  }
}