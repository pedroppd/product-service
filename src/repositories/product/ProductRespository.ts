import { EntityRepository, Repository } from 'typeorm';
import { AppError } from '@errors/AppError';
import { IRequestSaveProduct } from './IRequestSaveProduct';
import { Products } from '@entities/Products';

@EntityRepository(Products)
export class ProductRespository extends Repository<Products> {
  async findByName(tid: string, name: string): Promise<Products | void> {
    return await this.findOne({
      where: {
        name,
      },
    }).catch(error => {
      console.log({
        tid: tid,
        message: `Error to find product ${error.stack}`,
      });
    });
  }

  async createProduct(product: IRequestSaveProduct) {
    return this.create({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    });
  }

  async saveProduct(tid: string, product: Products) {
    return await this.save(product).catch(error => {
      console.log({ tid: tid, message: 'Error to try save product' });
      throw new AppError('Error to try save product', 500);
    });
  }
}