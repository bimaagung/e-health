class ValidationDocterUseCase {
  constructor(
    ValidationDocterRepository,
    UserRepository,
    mediaHanlder,
    validationStatus,
  ) {
    this._validationDocter = ValidationDocterRepository;
    this._userRepository = UserRepository;
    this._mediaHanlder = mediaHanlder;
    this._validationStatus = validationStatus;
  }

  async addDocterValidation(validation) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    const validationExist = await this._validationDocter.getDocterValdationByUserId(validation.docterId);
    if (validationExist !== null) {
      result.statusCode = 400;
      result.reason = 'you have sent the doc, please check your email regularly for update';
      return result;
    }

    if (validation.file === undefined) {
      result.statusCode = 400;
      result.reason = 'please insert document';
      return result;
    }
    const uploadDocument = await this._mediaHanlder.cloudinaryUpload(
      validation.file.path,
      'urlDoc',
    );
    let verifyPdf = uploadDocument.split('.').reverse()[0];
    if (verifyPdf !== 'pdf') {
      result.statusCode = 400;
      result.reason = 'can only upload pdf files';
      return result;
    }

    validation.urlDoc = uploadDocument;
    validation.status = this._validationStatus.PENDING;
    const createValidation = await this._validationDocter.addDocterValidation(
      validation,
    );

    result.isSuccess = true;
    result.statusCode = 201;
    result.data = createValidation;

    return result;
  }
}

module.exports = ValidationDocterUseCase;
