class CategoryUseCase {
  constructor(categoryRepository) {
    this._categoryRepository = categoryRepository;
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
}

module.exports = CategoryUseCase;
