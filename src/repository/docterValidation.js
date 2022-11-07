const { DocterValidation } = require('../models');

class DocterValidationRepository {
  constructor() {
    this._docterValidation = DocterValidation;
  }

  async addDocterValidation(validation) {
    const result = await this._docterValidation.create(validation);
    return result;
  }

  async getDocterValdationByUserId(userId) {
    const result = await this._docterValidation.findOne(
      {
        where: { userId },
      },
    );

    return result;
  }
}

module.exports = DocterValidationRepository;
