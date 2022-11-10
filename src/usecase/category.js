class CategoryUseCase {
  constructor(categoryRepository, mediaHanlder) {
    this._categoryRepository = categoryRepository;
    this._mediaHanlder = mediaHanlder;
  }

  async addCategory(category) {
    

    const categoryValues = {
      name: category.name.toUpperCase(),
      url: null,
      is_examination: category.is_examination,
    };

    const categoryByName = await this._categoryRepository.getCategoryByName(
      categoryValues.name,
    );

    if (categoryByName !== null) {
      result.isSuccess = false;
      result.statusCode = 400;
      result.reason = 'category name already exists';

      return result;
    }

    if (category.file !== undefined) {
      const urlImage = await this._mediaHanlder.cloudinaryUpload(
        category.file.path,
        'category',
      );
      categoryValues.url = urlImage;
    } else {
      categoryValues.url = process.env.DEFAULT_IMAGE_CATEGORY;
    }

    const addCategory = await this._categoryRepository.addCategory(
      categoryValues,
    );

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = addCategory;

    return result;
  }

  async getListCategory(isExamination) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    let filter = {};
    if (isExamination !== undefined) {
      filter = {
        where: {
          is_examination: isExamination,
        },
      };
    }

    const categories = await this._categoryRepository.getListCategory(filter);

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
