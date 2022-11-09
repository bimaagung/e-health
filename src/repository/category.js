const { Category } = require('../models');

class CategoryRepository {
  constructor() {
    this._categoryModel = Category;
  }

  async addCategory(category) {
    const result = await this._categoryModel.create({ name: category });
    return result;
  }

  async getListCategory() {
    const result = await this._categoryModel.findAll();
    return result;
  }

  async getCategoryById(id) {
    const result = await this._categoryModel.findOne(
      {
        where: { id },
      },
    );

    return result;
  }

  async getCategoryByName(name) {
    const result = await this._categoryModel.findOne(
      {
        where: { name },
      },
    );

    return result;
  }

  async updateCategory(id, category) {
    const result = await this._categoryModel.findOne(
      category,
      {
        where: { id },
      },
    );
    return result;
  }

  async deleteCategory(id) {
    const result = await this._categoryModel.destroy(
      {
        where: { id },
      },
    );
    return result;
  }
}

module.exports = CategoryRepository;
