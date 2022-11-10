class DoctorUseCase {
  constructor(doctorValidationRepository, userRepositoryRepository, _) {
    this._doctorValidationRepository = doctorValidationRepository;
    this._userRepositoryRepository = userRepositoryRepository;
    this._ = _;
  }

  async getAllDoctor(roleDoctor) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: [],
    };
    const doctorList = await this._userRepositoryRepository.getUserByDoctorRole(roleDoctor);
    result.isSuccess = true;
    result.statusCode = 200;
    result.data = doctorList;
    return result;
  }
}

module.exports = DoctorUseCase;
