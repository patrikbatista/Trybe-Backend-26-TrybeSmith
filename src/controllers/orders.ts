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

    const newOrders = orders.map((order) => ({ 
      ...order, products: [order.products],
    }));

    if (newOrders.length > 0) {
      return res.status(200).json(newOrders);
    } 
    const newError = new Error('not found');
    newError.name = '500';
    throw newError;
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { products, user } = req.body;
    const { id } = user;
    const orders = await this.orderService.create({ userId: id, products });

    if (orders) {
      return res.status(201).json({ order: { ...orders } });
    } 
    const newError = new Error('internal error');
    newError.name = '500';
    throw newError;
  }
}