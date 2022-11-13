class DoctorUseCase {
  constructor(
    doctorRepository,
    doctorValidationRepository,
    userRepository,
    medicalSpecialistRepository,
    availableScheduleRepository,
    hospitalRepository,
  ) {
    this._doctorRepository = doctorRepository;
    this._doctorValidationRepository = doctorValidationRepository;
    this._userRepository = userRepository;
    this._medicalSpecialistRepository = medicalSpecialistRepository;
    this._availableScheduleRepository = availableScheduleRepository;
    this._hospitalRepository = hospitalRepository;
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

    const doctorValue = {
      id: verifyDoctor.id,
      medicalSpecialistId: verifyDoctor.medicalSpecialistId,
      doctorValidationId: verifyDoctor.doctorValidationId,
      hospitalId: verifyDoctor.hospitalId,
      createdAt: verifyDoctor.createdAt,
      updatedAt: verifyDoctor.updatedAt,
      detail: [
        {
          user: await this._userRepository.getUserById(id),
          medicalSpecialist: await this._medicalSpecialistRepository.getMedicalSpecialistById(verifyDoctor.medicalSpecialistId),
          docterValidation: await this._doctorValidationRepository.getDoctorValdationByUserId(id),
          hospital: await this._hospitalRepository.getHospitalById(verifyDoctor.hospitalId),
          availableSchedule: await this._availableScheduleRepository.getAllScheduleByDoctorId(id),
        },
      ],
    };

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = doctorValue;
    return result;
  }
}

module.exports = DoctorUseCase;
