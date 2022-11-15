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

  async getListProduct() {
    let result = {
      isSuccess: false,
      statusCode: null,
      data: [],
    };

    const filter = {
      where: {},
    };

    const products = await this._productRepository.getListProduct(filter);

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = products;

    return result;
  }

  async getProductById(id) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    const productId = await this._productRepository.getProductById(id);

    if (productId === null) {
      result.isSuccess = false;
      result.statusCode = 404;
      result.reason = 'product not found';
      return result;
    }

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = productId;
    return result;
  }

  async updateProduct(id, product, file) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    product.name = product.name.toUpperCase();

    const productId = await this._productRepository.getProductById(id);

    if (productId === null) {
      result.isSuccess = false;
      result.statusCode = 404;
      result.reason = 'product not found';
      return result;
    }

    const categoryId = await this._categoryRepository.getCategoryById(product.categoryId);

    if (categoryId === null) {
      result.isSuccess = false;
      result.statusCode = 404;
      result.reason = 'category not found';
      return result;
    }

    if (file !== undefined) {
      const urlImage = await this._mediaHandler.cloudinaryUpload(file.path, 'product');
      product.urlImage = urlImage;
    } else {
      delete product.urlImage;
    }

    await this._productRepository.updateProduct(product, id);

    result.isSuccess = true;
    result.statusCode = 200;
    return result;
  }

  async deleteProduct(id) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    const productId = await this._productRepository.getProductById(id);

    if (productId === null) {
      result.isSuccess = false;
      result.statusCode = 404;
      result.reason = 'product not found';
      return result;
    }

    await this._productRepository.deleteProduct(id);

    result.isSuccess = true;
    result.statusCode = 200;
    return result;
  }
}

module.exports = ProductUseCase;
