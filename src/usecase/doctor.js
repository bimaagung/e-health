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
    const doctorList = await this._userRepositoryRepository.getUserByDoctorRole(
      roleDoctor,
    );
    result.isSuccess = true;
    result.statusCode = 200;
    result.data = doctorList;
    return result;
  }

  async getDoctorByUserId(id) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };
    const verifyDoctor = await this._userRepositoryRepository.getUserById(id);
    if (verifyDoctor === null) {
      result.statusCode = 404;
      result.reason = 'user not found';
      return result;
    }
    if (verifyDoctor.roleId !== 2) {
      result.statusCode = 400;
      result.reason = 'user is not doctor';
      return result;
    }
    result.isSuccess = true;
    result.statusCode = 200;
    result.data = verifyDoctor;
    return result;
  }
}

module.exports = DoctorUseCase;
