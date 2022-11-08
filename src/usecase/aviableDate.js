class AviableDateUseCase {
  constructor(aviableDateRepository, docterValidationRepository) {
    this._aviableDateRepository = aviableDateRepository;
    this._docterValidationRepository = docterValidationRepository;
  }
}
module.exports = AviableDateUseCase;
