class ApprovedValidationUseCase {
  constructor(
    approvedValidationRepository,
    docterValidationRepository,
    userRepositoryRepository,
  ) {
    this._approvedValidationRepository = approvedValidationRepository;
    this._docterValidationValidationRepository = docterValidationRepository;
    this._userRepositoryRepository = userRepositoryRepository;
  }
  async approvedValidation(approve) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };
    const userValue = {
      roleId: 3,
    };
    await this._userRepositoryRepository.updateUser(
      userValue,
      approve.docterId
    );
    return result;
  }
}
module.exports = ApprovedValidationUseCase;
