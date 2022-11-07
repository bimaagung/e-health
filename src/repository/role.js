const { Role } = require('../models');

class RoleRepository {
  constructor() {
    this._userRole = Role;
  }

  async getRoleById(id) {
    const result = await this._userRole.findOne({ where: { id } });
    return result;
  }
}

module.exports = RoleRepository;
