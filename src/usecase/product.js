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

    const checkProductName = this._productRepository.getProductByName(product.name);

    if (checkProductName !== null) {
      result.isSuccess = false;
      result.statusCode = 400;
      result.reason = 'product name already exists';
      return result;
    }

    const verifyCategory = await this._categoryRepository.getCategoryById(product.category_id);

    if (verifyCategory === null) {
      product.category_id = process.env.DEFAULT_CATEGORY_ID;
    }

    if (file !== undefined) {
      const urlImage = await this._mediaHanlder.cloudinaryUpload(file.path, 'product');
      product.url = urlImage;
    } else {
      product.url = process.env.DEFAULT_IMAGE_CATEGORY;
    }

    const addProduct = this._productRepository.addProduct(product);

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = addProduct;

    return result;
  }
}

module.exports = ProductUseCase;
