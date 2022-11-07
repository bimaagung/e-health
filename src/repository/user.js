const { Op } = require('sequelize');
const { User } = require('../models');

class UserRepository {
  constructor() {
    this._userModel = User;
  }

  async getUserByUsernameOrEmail(usernameOrEmail) {
    const result = await this._userModel.findOne({
      where: {
        [Op.or]: [
          { username: usernameOrEmail },
          { email: usernameOrEmail },
        ],
      },
    });
    return result;
  }
}

module.exports = UserRepository;
