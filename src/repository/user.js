const { User } = require('../models');

class CategoryRepository {
  constructor() {
    this._userModel = User;
  }

  async getUserById(id) {
    const result = await this._userModel.findOne(
      {
        where: { id },
      },
    );

    return result;
  }
}

module.exports = CategoryRepository;
