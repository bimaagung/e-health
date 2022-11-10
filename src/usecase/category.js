class CategoryUseCase {
  constructor(categoryRepository, productRepository) {
    this._categoryRepository = categoryRepository;
    this._productRepository = productRepository;
  }

  async addCategory(name) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    const categoryUpperCase = name.toUpperCase();

    const categoryByName = await this._categoryRepository.getCategoryByName(
      categoryUpperCase,
    );

    if (categoryByName !== null) {
      result.isSuccess = false;
      result.statusCode = 400;
      result.reason = 'category name already exists';

      return result;
    }

    const addCategory = await this._categoryRepository.addCategory(
      categoryUpperCase,
    );

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = addCategory;

    return result;
  }

  async getListCategory() {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    const categories = await this._categoryRepository.getListCategory();

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = categories;

    return result;
  }

  async updateCategory(id, newCategory) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    const categoryValues = {
      name: newCategory.name.toUpperCase(),
    };

    const updateCategory = await this._categoryRepository.updateCategory(
      id,
      categoryValues,
    );

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = updateCategory;

    return result;
  }

  async getCategoryById(id) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    const filter = {
      where: {
        category_id: id,
      },
    };

    const categoryById = await this._categoryRepository.getCategoryById(id);

    if (categoryById === null) {
      result.statusCode = 404;
      result.reason = 'category not found';
      return result;
    }

    const products = await this._productRepository.getListProduct(filter);

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = {
      id: categoryById.id,
      name: categoryById.name,
      createdAt: categoryById.createdAt,
      updatedAt: categoryById.updatedAt,
      products,
    };

    return result;
  }

  async deleteCategoryById(id) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
    };

    const categoryById = await this._categoryRepository.getCategoryById(id);

    if (categoryById === null) {
      result.statusCode = 404;
      result.reason = 'category not found';
      return result;
    }

    await this._categoryRepository.deleteCategory(id);

    result.isSuccess = true;
    result.statusCode = 200;
    return result;
  }
}

module.exports = CategoryUseCase;
