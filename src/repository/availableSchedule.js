const { AvailableSchedule } = require('../models');

class AviableDateRepository {
  constructor() {
    this._availableScheduleModel = AvailableSchedule;
  }

  async getAllScheduleByDoctorId(doctorId) {
    const result = await this._availableScheduleModel.findAll({
      where: { doctorId },
    });
    return result;
  }

  async addAvailableSchedule(schedule) {
    const result = await this._availableScheduleModel.create(schedule);
    return result;
  }
}

module.exports = AviableDateRepository;
