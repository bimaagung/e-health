class ApprovedValidationUseCase {
  constructor(
    docterValidationRepository,
    userRepositoryRepository,
    validationStatus,
    _,
  ) {
    this._docterValidationRepository = docterValidationRepository;
    this._userRepositoryRepository = userRepositoryRepository;
    this._validationStatus = validationStatus;
    this._ = _;
  }

  async approvedValidation(approve, id) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
    };
    const userValue = {
      roleId: 3,
    };
    const docterValidation = await this._docterValidationRepository.getDocterValdationById(id);
    if (docterValidation === null) {
      result.statusCode = 404;
      result.reason = 'document not found';
      return result;
    }
    if (docterValidation.status !== this._validationStatus.PENDING) {
      result.statusCode = 400;
      result.reason = 'Document status is not pending';
      return result;
    }
    await this._userRepositoryRepository.updateUser(
      userValue,
      docterValidation.docterId,
    );
    const docterValidationValue = {
      status: this._validationStatus.COMPLETED,
      adminId: approve.adminId,
      message: 'your document has been approved',
    };
    await this._docterValidationRepository.updateDocterValidation(
      docterValidationValue,
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
    const docterValidation = await this._docterValidationRepository.getDocterValdationById(id);
    if (docterValidation === null) {
      result.statusCode = 404;
      result.reason = 'document not found';
      return result;
    }
    if (docterValidation.status !== this._validationStatus.PENDING) {
      result.statusCode = 400;
      result.reason = 'Document status is not pending';
      return result;
    }
    const docterValidationValue = {
      status: this._validationStatus.REJECT,
      adminId: reject.adminId,
    };
    await this._docterValidationRepository.updateDocterValidation(
      docterValidationValue,
      id,
    );
    result.isSuccess = true;
    result.statusCode = 200;
    return result;
  }
}

module.exports = ApprovedValidationUseCase;
