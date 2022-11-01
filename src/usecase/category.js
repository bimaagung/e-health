class CategoryUseCase {
  constructor(categoryRepository, mediaHanlder) {
    this._categoryRepository = categoryRepository;
    this._mediaHanlder = mediaHanlder;
  }

  async addCategory(category) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    const categoryValues = {
      name: category.name.toUpperCase(),
      url: null,
    };

    const categoryByName = await this._categoryRepository.getCategoryByName(categoryValues.name);

    if (categoryByName !== null) {
      result.isSuccess = false;
      result.statusCode = 400;
      result.reason = 'category name already exists';

      return result;
    }

    if (category.file !== undefined) {
      const urlImage = await this._mediaHanlder.cloudinaryUpload(category.file.path, 'category');
      categoryValues.url = urlImage;
    } else {
      categoryValues.url = process.env.DEFAULT_IMAGE_CATEGORY;
    }

    const addCategory = await this._categoryRepository.addCategory(categoryValues);

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = addCategory;

    return result;
  }
}

module.exports = CategoryUseCase;