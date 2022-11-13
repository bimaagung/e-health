class doctorValidationUseCase {
  constructor(
    doctorValidationRepository,
    mediaHanlder,
    validationStatus,
    func,
  ) {
    this._doctorValidation = doctorValidationRepository;
    this._mediaHanlder = mediaHanlder;
    this._validationStatus = validationStatus;
    this._func = func;
  }

  async addDoctorValidation(validation, file) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };
    if (file === undefined) {
      result.statusCode = 400;
      result.reason = 'please insert document';
      return result;
    }
    const uploadDocument = await this._mediaHanlder.cloudinaryUpload(
      file.path,
      'urlDoc',
    );
    // check file pdf
    let verifyPdf = await this._func.verifyPdf(uploadDocument);
    if (verifyPdf !== 'pdf') {
      result.statusCode = 400;
      result.reason = 'can only upload pdf files';
      return result;
    }
    validation.urlDoc = uploadDocument;
    validation.status = this._validationStatus.PENDING;
    const validationExist = await this._doctorValidation.getDoctorValdationByUserId(validation.doctorId);
    if (validationExist === null) {
      const createValidation = await this._doctorValidation.addDoctorValidation(validation);
      result.isSuccess = true;
      result.statusCode = 201;
      result.data = createValidation;

      return result;
    }
    // check validation PENDING AND COMPLETED
    for (let i = 0; i < validationExist.length; i += 1) {
      if (validationExist[i].status === this._validationStatus.PENDING) {
        result.statusCode = 400;
        result.reason = 'you have sent the doc, please check your email regularly for update';
        return result;
      }
      if (validationExist[i].status === this._validationStatus.COMPLETED) {
        result.statusCode = 400;
        result.reason = 'you have been verified as a doctor';
        return result;
      }
    }
    // create new Validation If status validation REJECT
    const createValidation = await this._doctorValidation.addDoctorValidation(validation);
    result.isSuccess = true;
    result.statusCode = 201;
    result.data = createValidation;

    return result;
  }
}

module.exports = doctorValidationUseCase;
