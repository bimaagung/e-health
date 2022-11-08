class docterValidationUseCase {
  constructor(
    docterValidationRepository,
    userRepository,
    mediaHanlder,
    validationStatus,
  ) {
    this._docterValidation = docterValidationRepository;
    this._userRepository = userRepository;
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
// check validation PENDING AND COMPLETED
    const validationExist = await this._docterValidation.getDocterValdationByUserId(validation.docterId);
    if (validationExist.status === this._validationStatus.PENDING) {
      result.statusCode = 400;
      result.reason = 'you have sent the doc, please check your email regularly for update';
      return result;
    }
    if (validationExist.status === this.validation.status.COMPLETED) {
      result.statusCode = 400;
      result.reason = 'you have been verified as a doctor';
      return result;
    }
// verify file is exist
    if (validation.file === undefined) {
      result.statusCode = 400;
      result.reason = 'please insert document';
      return result;
    }
    const uploadDocument = await this._mediaHanlder.cloudinaryUpload(
      validation.file.path,
      'urlDoc',
    );
// check file pdf
    let verifyPdf = uploadDocument.split('.').reverse()[0];
    if (verifyPdf !== 'pdf') {
      result.statusCode = 400;
      result.reason = 'can only upload pdf files';
      return result;
    }

    validation.urlDoc = uploadDocument;
    validation.status = this._validationStatus.PENDING;
    const createValidation = await this._docterValidation.addDocterValidation(
      validation,
    );

    result.isSuccess = true;
    result.statusCode = 201;
    result.data = createValidation;

    return result;
  }
}

module.exports = docterValidationUseCase;
