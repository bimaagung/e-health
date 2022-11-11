class DoctorUseCase {
  constructor(
    doctorRepository,
    doctorValidationRepository,
    userRepository,
    medicalSpecialistRepository,
    availableScheduleRepository,
    hospitalRepository,
    _,
  ) {
    this._doctorRepository = doctorRepository;
    this._doctorValidationRepository = doctorValidationRepository;
    this._userRepository = userRepository;
    this._medicalSpecialistRepository = medicalSpecialistRepository;
    this._availableScheduleRepository = availableScheduleRepository;
    this._hospitalRepository = hospitalRepository;
    this._ = _;
  }

  async getAllDoctor() {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: [],
    };
    const doctorList = await this._doctorRepository.getListDoctor();

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = doctorList;
    return result;
  }

  async getDoctorById(id) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };
    const verifyDoctor = await this._doctorRepository.getDoctorById(id);
    if (verifyDoctor === null) {
      result.statusCode = 404;
      result.reason = 'Doctor not found';
      return result;
    }

    const schedule = await this._availableScheduleRepository.getAllAvailableScheduleByDoctorIdd(id);
    const hospital = await this._
    const doctor = {
      id: verifyDoctor.id,
      username: verifyDoctor.username,
      firstName: verifyDoctor.firstName,
      lastName: verifyDoctor.lastName,
      email: verifyDoctor.email,
      phone: verifyDoctor.phone,
      medicalSpecialistId: medicalSpecialist.id,
      specialistName: medicalSpecialist.dataValues.specialistName,
      roleId: verifyDoctor.roleId,
      createdAt: verifyDoctor.createdAt,
      updatedAt: verifyDoctor.updatedAt,
      availableSchedule: schedule,
    };

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = doctor;
    return result;
  }
}

module.exports = DoctorUseCase;
