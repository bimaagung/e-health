const { Day } = require('../models');

class DayRepository {
  constructor() {
    this._DayModel = Day;
  }

  async getDayById(id) {
    const result = await this._DayModel.findOne({
      where: { id },
    });
    return result;
  }
}

module.exports = DayRepository;
