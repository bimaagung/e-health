const { Product } = require('../models');

class ProductRepository {
  constructor() {
    this._productModel = Product;
  }

  async addProduct(product) {
    const result = await this._productModel.create(product);
    return result;
  }

  async getListProduct(filter) {
    const result = await this._productModel.findAll(filter);
    return result;
  }

  async getProductById(id) {
    const result = await this._productModel.findOne(
      {
        where: { id },
      },
    );

    return result;
  }

  async getProductByName(name) {
    const result = await this._productModel.findOne(
      {
        where: { name },
      },
    );

    return result;
  }

  async updateProduct(id, product) {
    const result = await this._productModel.findOne(
      product,
      {
        where: { id },
      },
    );
    return result;
  }

  async deleteProduct(id) {
    const result = await this._productModel.destroy(
      {
        where: { id },
      },
    );
    return result;
  }
}

module.exports = ProductRepository;
