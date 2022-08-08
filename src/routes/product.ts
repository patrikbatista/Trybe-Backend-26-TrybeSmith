import { Router } from 'express';

import ProductsController from '../controllers/products';
import ProductValidate from '../middlewares/productValidate';

const product = Router();

const productsController = new ProductsController();

product.get('/products', productsController.getAll);

product.post(
  '/products', 
  ProductValidate.nameValidate, 
  ProductValidate.amountValidate, 
  productsController.createProduct,
);

export default product;