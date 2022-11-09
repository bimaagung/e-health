class AviableDateUseCase {
  constructor(availableSchedulRepository, docterValidationRepository) {
    this._availableSchedulRepository = availableSchedulRepository;
    this._docterValidationRepository = docterValidationRepository;
  }

  async addAvailableSchedule(availableSchedule) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };
    const verifyDocterValidation = await this._docterValidationRepository.getDocterValdationById(availableSchedule.docterValidationId);
    if (verifyDocterValidation === null) {
      result.statusCode = 404;
      result.reason = 'docter validation not found!';
      return result;
    }
    const schedule = await this._availableSchedulRepository.addAvailableSchedule(availableSchedule);
    result.isSuccess = true;
    result.statusCode = 201;
    result.data = schedule;
    return result;
  }
}
module.exports = AviableDateUseCase;
