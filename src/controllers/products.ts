import { Request, Response } from 'express';

import ProductService from '../services/products';

export default class ProductsController {
  productService = new ProductService();

  constructor() {
    this.getAll = this.getAll.bind(this);
    this.createProduct = this.createProduct.bind(this);
  }

  public async getAll(_req: Request, res: Response): Promise<Response> {
    const products = await this.productService.getAll();
    if (products.length > 0) {
      return res.status(200).json(products);
    } 
    const newError = new Error('not found');
    newError.name = '404';
    throw newError;
  }

  public async createProduct(req: Request, res: Response): Promise<Response> {
    const { body: { name, amount } } = req;
    
    const newProduct = await this.productService.create({ name, amount });
    if (newProduct) {
      return res.status(201).json(newProduct);
    }
    const newError = new Error('not found');
    newError.name = '500';
    throw newError;
  }
}