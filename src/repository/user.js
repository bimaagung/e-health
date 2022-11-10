const { Op } = require('sequelize');
const { User } = require('../models');

class UserRepository {
  constructor() {
    this._userModel = User;
  }

  async getUserByUsernameOrEmail(usernameOrEmail) {
    const result = await this._userModel.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });
    return result;
  }

  async addUser(user) {
    const result = await this._userModel.create(user);
    return result;
  }

  async verifyPhoneNumber(phone) {
    const result = await this._userModel.findOne({ where: { phone } });
    return result;
  }

  async updateUser(update, id) {
    const result = await this._userModel.update(update, { where: { id } });
    return result;
  }

  async getUserById(id) {
    const result = await this._userModel.findOne({ where: { id } });
    return result;
  }

  async getUserByDoctorRole() {
    const result = await this._userModel.findAll({ where: { roleId: 2 } });
    return result;
  }
}

module.exports = UserRepository;
