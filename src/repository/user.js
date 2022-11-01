const { Op } = require("sequelize");
const { User } = require("../models");

class UserRepository {
  constructor() {
    this.UserModel = User;
  }
  async getUserByUsernameAndEmail(username, email) {
    return await this.UserModel.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
  }
  async getAllUser() {
    return await this.UserModel.findAll({
      attributes: { exclude: ["password"] },
    });
  }
  async getUserById(id) {
    return await this.UserModel.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
    });
  }
  async getUserByEmail(email) {
    return await this.UserModel.findOne({
      where: { email },
    });
  }
  async getUserByUsername(username) {
    return await this.UserModel.findOne({
      where: { username },
    });
  }
}
module.exports = UserRepository;