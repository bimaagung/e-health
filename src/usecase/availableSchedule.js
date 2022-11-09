class AviableDateUseCase {
  constructor(availableSchedulRepository, docterValidationRepository, _) {
    this._availableSchedulRepository = availableSchedulRepository;
    this._docterValidationRepository = docterValidationRepository;
    this._ = _;
  }

  async addAvailableSchedule(availableSchedule) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };
    const verifyDocterValidation = await this._docterValidationRepository.getDocterValdationByUserId(availableSchedule.docterId);
    if (verifyDocterValidation === null) {
      result.statusCode = 404;
      result.reason = 'docter validation not found!';
      return result;
    }
    const completeDocterValidation = await this._.find(verifyDocterValidation, ['status', 'COMPLETED']);
    availableSchedule.docterValidationId = completeDocterValidation.id;
    const schedule = await this._availableSchedulRepository.addAvailableSchedule(availableSchedule);
    result.isSuccess = true;
    result.statusCode = 201;
    result.data = schedule;
    return result;
  }
}
module.exports = AviableDateUseCase;
