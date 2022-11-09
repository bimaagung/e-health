class AviableDateUseCase {
  constructor(availableSchedulRepository, doctorValidationRepository, _) {
    this._availableSchedulRepository = availableSchedulRepository;
    this._doctorValidationRepository = doctorValidationRepository;
    this._ = _;
  }

  async getAllAvailableScheduleByDoctorId(docterId) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: [],
    };
    const verifyDoctorValidation = await this._doctorValidationRepository.getDoctorValdationByUserId(docterId);
    const completeDoctorValidation = await this._.find(verifyDoctorValidation, ['status', 'COMPLETED']);

    const scheduleList = await this._availableSchedulRepository.getAllAvailableScheduleByDoctorValidationId(completeDoctorValidation.id);
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
    const verifyDoctorValidation = await this._doctorValidationRepository.getDoctorValdationByUserId(availableSchedule.doctorId);
    if (verifyDoctorValidation === null) {
      result.statusCode = 404;
      result.reason = 'doctor validation not found!';
      return result;
    }
    const completeDoctorValidation = await this._.find(verifyDoctorValidation, ['status', 'COMPLETED']);
    if (completeDoctorValidation === null || completeDoctorValidation === undefined) {
      result.statusCode = 400;
      result.reason = 'cannot add schedule before document approved!';
      return result;
    }
    availableSchedule.doctorValidationId = completeDoctorValidation.id;
    const schedule = await this._availableSchedulRepository.addAvailableSchedule(availableSchedule);
    result.isSuccess = true;
    result.statusCode = 201;
    result.data = schedule;
    return result;
  }
}
module.exports = AviableDateUseCase;
