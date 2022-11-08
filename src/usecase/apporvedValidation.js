class ApprovedValidationUseCase {
  constructor(
    approvedValidationRepository,
    userRepositoryRepository,
  ) {
    this._approvedValidationRepository = approvedValidationRepository;
    this._userRepositoryValidationRepository = userRepositoryRepository;
  }
}
module.exports = ApprovedValidationUseCase;
