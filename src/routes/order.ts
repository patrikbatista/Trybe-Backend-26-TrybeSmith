import { Router } from 'express';

import OrderController from '../controllers/orders';
import UserValidate from '../middlewares/userValidate';
import ProductValidate from '../middlewares/productValidate';

const order = Router();

const orderController = new OrderController();

order.get('/orders', orderController.getAll);
order.post(
  '/orders', 
  UserValidate.authUser, 
  ProductValidate.productValidate, 
  orderController.create,
);

export default order;