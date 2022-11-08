class ApprovedValidationUseCase {
  constructor(
    approvedValidationRepository,
    docterValidationRepository,
    userRepositoryRepository,
    validationStatus,
  ) {
    this._approvedValidationRepository = approvedValidationRepository;
    this._docterValidationRepository = docterValidationRepository;
    this._userRepositoryRepository = userRepositoryRepository;
    this._validationStatus = validationStatus;
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
    const verifyDocter = await this._userRepositoryRepository.getUserById(approve.docterId)
    if(verifyDocter === null) {
      result.statusCode = 404,
      result.reason = 'user not found!'
      return result
    }
    await this._userRepositoryRepository.updateUser(
      userValue,
      approve.docterId
    );
    const docterValidationValue = {

    }
    
  }
}
module.exports = ApprovedValidationUseCase;
