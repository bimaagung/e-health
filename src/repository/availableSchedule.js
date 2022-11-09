const { AvailableSchedule } = require('../models');

class AviableDateRepository {
  constructor() {
    this._availableScheduleModel = AvailableSchedule;
  }

  async getAllAvailableScheduleByDoctorId(schedule) {
    const result = await this._availableScheduleModel.create(schedule);
    return result;
  }

  async addAvailableSchedule(schedule) {
    const result = await this._availableScheduleModel.create(schedule);
    return result;
  }
}

module.exports = AviableDateRepository;
