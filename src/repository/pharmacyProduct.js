const { PharmacyProduct } = require('../models');

class PharmacyProductRepository {
  constructor() {
    this._pharmacyProductModel = PharmacyProduct;
  }

  async addPharmacyProduct(product) {
    const result = await this._pharmacyProductModel.create(product);
    return result;
  }

  async getPharmacyProductByProductId(productId) {
    const result = await this._pharmacyProductModel.findOne({ where: { productId } });
    return result;
  }
}

module.exports = PharmacyProductRepository;
