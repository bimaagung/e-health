const { AvailableSchedule } = require('../models');

class AviableDateRepository {
  constructor() {
    this._availableScheduleModel = AvailableSchedule;
  }

  async addAvailableSchedule(schedule) {
    const result = await this._availableScheduleModel.create(schedule);
    return result;
  }
}

module.exports = AviableDateRepository;
