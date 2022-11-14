class AviableDateUseCase {
  constructor(availableSchedulRepository) {
    this._availableSchedulRepository = availableSchedulRepository;
  }

  async getAllAvailableScheduleByDoctorId(doctorId) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: [],
    };

    const scheduleList = await this._availableSchedulRepository.getAllScheduleByDoctorId(doctorId);
    result.isSuccess = true;
    result.statusCode = 200;
    result.data = scheduleList;
    return result;
  }

  async addAvailableSchedule(availableSchedule) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    const schedule = await this._availableSchedulRepository.addAvailableSchedule(availableSchedule);
    result.isSuccess = true;
    result.statusCode = 201;
    result.data = schedule;
    return result;
  }
}

module.exports = AviableDateUseCase;
