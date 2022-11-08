class ApprovedValidationUseCase {
  constructor(
    docterValidationRepository,
    userRepositoryRepository,
    validationStatus,
    _
  ) {
    this._docterValidationRepository = docterValidationRepository;
    this._userRepositoryRepository = userRepositoryRepository;
    this._validationStatus = validationStatus;
    this._ = _;
  }
  async approvedValidation(approve) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
    };
    const userValue = {
      roleId: 3,
    };
    const verifyDocter = await this._userRepositoryRepository.getUserById(
      approve.docterId
    );
    if (verifyDocter === null) {
      result.statusCode = 404;
      result.reason = "user not found!";
      return result;
    }
    await this._userRepositoryRepository.updateUser(
      userValue,
      approve.docterId
    );
    let getPendingValidationDocter =
      await this._docterValidationRepository.getDocterValdationByUserId(
        approve.docterId
      );
    let pendingValidation = this._.find(getPendingValidationDocter, [
      "status",
      "PENDING",
    ]);
    console.log(pendingValidation);
    const docterValidationValue = {
      status: this._validationStatus.COMPLETED,
      adminId: approve.AdminId,
    };
    await this._docterValidationRepository.updateDocterValidation(
      docterValidationValue,
      pendingValidation.id
    );
  }
}

module.exports = ApprovedValidationUseCase;
