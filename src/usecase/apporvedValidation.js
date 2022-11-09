class ApprovedValidationUseCase {
  constructor(
    doctorValidationRepository,
    userRepositoryRepository,
    validationStatus,
    _,
  ) {
    this._doctorValidationRepository = doctorValidationRepository;
    this._userRepositoryRepository = userRepositoryRepository;
    this._validationStatus = validationStatus;
    this._ = _;
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
    await this._userRepositoryRepository.updateUser(
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
