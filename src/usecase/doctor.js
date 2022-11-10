class DoctorUseCase {
  constructor(
    doctorValidationRepository,
    userRepository,
    medicalSpecialistRepository,
    availableScheduleRepository,
    _,
  ) {
    this._doctorValidationRepository = doctorValidationRepository;
    this._userRepository = userRepository;
    this._medicalSpecialistRepository = medicalSpecialistRepository;
    this._availableScheduleRepository = availableScheduleRepository;
    this._ = _;
  }

  async getAllDoctor(roleDoctor) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: [],
    };
    const doctorList = await this._userRepository.getUserByDoctorRole(
      roleDoctor,
    );
    result.isSuccess = true;
    result.statusCode = 200;
    result.data = doctorList;
    return result;
  }

  async getDoctorByUserId(id) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };
    const verifyDoctor = await this._userRepository.getUserById(id);
    if (verifyDoctor === null) {
      result.statusCode = 404;
      result.reason = 'user not found';
      return result;
    }
    if (verifyDoctor.roleId !== 2) {
      result.statusCode = 400;
      result.reason = 'user is not doctor';
      return result;
    }
    const doctorValidation = await this._doctorValidationRepository.getDoctorValdationByUserId(
      verifyDoctor.id,
    );
    const completeDoctorValidation = await this._.find(doctorValidation, [
      'status',
      'COMPLETED',
    ]);
    const medicalSpecialist = await this._medicalSpecialistRepository.getMedicalSpecialistById(
      completeDoctorValidation.medicalSpecialistId,
    );
    const schedule = await this._availableScheduleRepository.getAllAvailableScheduleByDoctorValidationId(completeDoctorValidation.id);
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
      availableSchedule: schedule,
    };

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = doctor;
    return result;
  }
}

module.exports = DoctorUseCase;
