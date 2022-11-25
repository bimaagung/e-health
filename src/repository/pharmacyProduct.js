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

  async updatePharmacyProduct(id, product) {
    const result = await this._pharmacyProductModel.update(product, { where: { productId: id } });
    return result;
  }

  async deletePharmacyProduct(productId) {
    const result = await this._pharmacyProductModel.destroy({ where: { productId } });
    return result;
  }
}

module.exports = PharmacyProductRepository;
