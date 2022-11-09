const { DocterValidation } = require('../models');

class DocterValidationRepository {
  constructor() {
    this._docterValidation = DocterValidation;
  }

  async addDocterValidation(validation) {
    const result = await this._docterValidation.create(validation);
    return result;
  }

  async getDocterValdationByUserId(docterId) {
    const result = await this._docterValidation.findAll(
      {
        where: { docterId },
      },
    );

    return result;
  }

  async getDocterValdationById(id) {
    const result = await this._docterValidation.findOne(
      {
        where: { id },
      },
    );

    return result;
  }

  async updateDocterValidation(validation, id) {
    const result = await this._docterValidation.update(validation, {
      where: { id },
    });
    return result;
  }
}

module.exports = DocterValidationRepository;
