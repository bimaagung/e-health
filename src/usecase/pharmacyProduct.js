class PharmacyProductUseCase {
  constructor(pharmacyProductRepository, productRepository) {
    this._pharmacyProductRepository = pharmacyProductRepository;
    this._productRepository = productRepository;
  }

  async addPharmacyProduct(product) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    const productId = await this._productRepository.getProductById(product.productId);

    if (productId === null) {
      result.statusCode = 404;
      result.isSuccess = false;
      result.reason = 'productId not found';
      return result;
    }

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
