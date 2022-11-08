class ApprovedValidationUseCase {
  constructor(approvedValidationRepository, userRepositoryRepository) {
    this._approvedValidationRepository = approvedValidationRepository;
    this._userRepositoryValidationRepository = userRepositoryRepository;
  }
  async approvedValidation(approve) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };
    
    const userApprove = {
        roleId = 3,
    }

  }
}
module.exports = ApprovedValidationUseCase;
