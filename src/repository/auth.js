const { User } = require("../models");

class AuthRepository {
  constructor() {
    this.UserModel = User;
  }

  async register(userData) {
    return await this.UserModel.create(userData);
  }

  async login(username) {
    return await this.UserModel.findOne({
      where: { username },
      
    });
  }
  async loginGoogle(email) {
    return await this.UserModel.findOne({
      where: { email },
      
    });
  }
  

}

module.exports = AuthRepository;