class PrescriptionUseCase {
  constructor(PrescriptionRepository) {
    this._PrescriptionRepositroy = PrescriptionRepository;
  }

  async getPrescriptionById(id) {
    let result = {
      isSuccess: false,
      statusCode: 404,
      reason: null,
      data: null,
    };

    const prescription = await this._PrescriptionRepositroy.getPrescriptionById(id);
    if (prescription === null) {
      result.reason = 'prescription not found';
      return result;
    }
    result.isSuccess = true;
    result.statusCode = 200;
    result.data = prescription;
    return result;
  }
}

module.exports = PrescriptionUseCase;
