class PharmacyProductUseCase {
  constructor(pharmacyProductRepository) {
    this._pharmacyProductRepository = pharmacyProductRepository;
  }

  async addPharmacyProduct(product) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    const pharmacyProduct = await this._pharmacyProductRepository.getPharmacyProductByProductId(product.productId);

    if (pharmacyProduct !== null) {
      result.statusCode = 400;
      result.isSuccess = false;
      result.reason = 'product is already exists';
      return result;
    }

    await this._pharmacyProductRepository.addPharmacyProduct(product);

    result.isSuccess = true;
    result.statusCode = 200;

    return result;
  }
}

module.exports = PharmacyProductUseCase;
