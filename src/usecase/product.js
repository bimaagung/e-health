class ProductUseCase {
  constructor(productRepository, categoryRepository, mediaHandler) {
    this._productRepository = productRepository;
    this._categoryRepository = categoryRepository;
    this._mediaHandler = mediaHandler;
  }

  async createProduct(product, file) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    product.name = product.name.toUpperCase();

    const checkProductName = await this._productRepository.getProductByName(product.name);

    if (checkProductName !== null) {
      result.isSuccess = false;
      result.statusCode = 400;
      result.reason = 'product name already exists';
      return result;
    }

    const verifyCategory = await this._categoryRepository.getCategoryById(product.categoryId);

    if (verifyCategory === null) {
      const otherCategory = await this._categoryRepository.getCategoryByName('OTHER');
      product.categoryId = otherCategory.id;
    }

    const urlImage = await this._mediaHandler.cloudinaryUpload(file.path, 'product');
    product.urlImage = urlImage;

    const addProduct = await this._productRepository.addProduct(product);

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = addProduct;

    return result;
  }
}

module.exports = ProductUseCase;
