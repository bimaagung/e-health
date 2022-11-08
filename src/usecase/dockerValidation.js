class ValidationDocterUseCase {
  constructor(ValidationDocterRepository, UserRepository, mediaHanlder) {
    this._validationDocter = ValidationDocterRepository;
    this._userRepository = UserRepository;
    this._mediaHanlder = mediaHanlder;
  }

  async addDocterValidation(validation, file) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    const validationExist = await this._validationDocter.getDocterValdationByUserId(validation.userId);
    if (validationExist !== null) {
      result.statusCode = 400;
      result.reason = 'you have sent the doc, please check your email regularly for update';
      return result;
    }
    if (file !== undefined) {
      result.statusCode = 400;
      result.reason = 'please insert file';
      return result;
    }
    const urlDoc = await this._mediaHanlder.cloudinaryUpload(file.path);
    validation.urlDoc = urlDoc
    const createValidation = await this._validationDocter.addDocterValidation(validation);

    result.isSuccess = true;
    result.statusCode = 201;
    result.data = createValidation;

    return result;
  }
}
module.exports = ValidationDocterUseCase;
