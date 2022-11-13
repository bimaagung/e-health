class ApprovedValidationUseCase {
  constructor(
    doctorValidationRepository,
    userRepository,
    doctorRepository,
    validationStatus,
    has,
  ) {
    this._doctorValidationRepository = doctorValidationRepository;
    this._userRepository = userRepository;
    this._doctorRepository = doctorRepository;
    this._validationStatus = validationStatus;
    this._has = has;
  }

  async getListPendingDoctorValidation() {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: [],
    };
    const pendingList = await this._doctorValidationRepository.getListPendingDoctorValidation();
    result.isSuccess = true;
    result.statusCode = 200;
    result.data = pendingList;
    return result;
  }

  async approvedValidation(approve, id) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
    };
    const userValue = {
      roleId: 2,
    };
    const doctorValidation = await this._doctorValidationRepository.getDoctorValdationById(id);
    if (doctorValidation === null) {
      result.statusCode = 404;
      result.reason = 'document not found';
      return result;
    }
    if (doctorValidation.status !== this._validationStatus.PENDING) {
      result.statusCode = 400;
      result.reason = 'Document status is not pending';
      return result;
    }
    await this._userRepository.updateUser(
      userValue,
      doctorValidation.doctorId,
    );
    const doctorValidationValue = {
      status: this._validationStatus.COMPLETED,
      adminId: approve.adminId,
      message: 'your document has been approved',
    };
    await this._doctorValidationRepository.updateDoctorValidation(
      doctorValidationValue,
      id,
    );
    const doctorValues = {
      id: doctorValidation.doctorId,
      medicalSpecialistId: doctorValidation.medicalSpecialistId,
      doctorValidationId: doctorValidation.id,
      hospitalId: doctorValidation.hospitalId,
    };
    await this._doctorRepository.addDoctor(doctorValues);
    result.isSuccess = true;
    result.statusCode = 200;
    return result;
  }

  async rejectedValidation(reject, id) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
    };
    const doctorValidation = await this._doctorValidationRepository.getDoctorValdationById(id);
    if (doctorValidation === null) {
      result.statusCode = 404;
      result.reason = 'document not found';
      return result;
    }
    if (doctorValidation.status !== this._validationStatus.PENDING) {
      result.statusCode = 400;
      result.reason = 'Document status is not pending';
      return result;
    }
    const doctorValidationValue = {
      status: this._validationStatus.REJECT,
      adminId: reject.adminId,
      message: reject.message,
    };
    await this._doctorValidationRepository.updateDoctorValidation(
      doctorValidationValue,
      id,
    );
    result.isSuccess = true;
    result.statusCode = 200;
    return result;
  }
}

module.exports = ApprovedValidationUseCase;
