class ValidationDocterUseCase {
    constructor(ValidationDocterRepository, mediaHanlder) {
      this._ValidationDocter = ValidationDocterRepository;
      this._mediaHanlder = mediaHanlder;
    }

  }
  
  module.exports = ValidationDocterUseCase;
  