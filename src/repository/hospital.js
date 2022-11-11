const { Hospital } = require('../models');

class hospitalRepository {
  constructor() {
    this._hospitalModel = Hospital;
  }

  async getHospitalById(id) {
    const result = await this._hospitalModel.findOne({
      where: { id },
    });
    return result;
  }
}

module.exports = hospitalRepository;
