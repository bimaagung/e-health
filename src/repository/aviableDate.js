const { AviabeleDate } = require('../models');

class AviableDateRepository {
  constructor() {
    this._aviableDate = AviabeleDate;
  }

  async addAviableDate(aviableDate) {
    const result = await this._aviableDateModel.create(aviableDate);
    return result;
  }

  async getListAviableDate(filter) {
    const result = await this._AviableDateModel.findAll(filter);
    return result;
  }

  async getAviableDateById(id) {
    const result = await this._aviableDateModel.findOne(
      {
        where: { id },
      },
    );

    return result;
  }

  async getAviableDateByName(name) {
    const result = await this._aviableDateModel.findOne(
      {
        where: { name },
      },
    );

    return result;
  }

  async updateAviableDate(id, aviableDate) {
    const result = await this._aviableDateModel.findOne(
      aviableDate,
      {
        where: { id },
      },
    );
    return result;
  }

  async deleteAviableDate(id) {
    const result = await this._AviableDateModel.destroy(
      {
        where: { id },
      },
    );
    return result;
  }
}

module.exports = AviableDateRepository;
