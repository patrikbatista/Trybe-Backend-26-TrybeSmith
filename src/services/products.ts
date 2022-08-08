import connection from '../models/connection';
import ProductModel from '../models/product';
import { Product } from '../interfaces';

class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async getAll(): Promise<Product[]> {
    const products = await this.model.getAll();
    return products;
  }

  public async create(product: Product): Promise<Product> {
    const createdProduct = await this.model.create(product);
    return createdProduct;
  }
}

export default ProductService;