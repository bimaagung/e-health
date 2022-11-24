const { Prescription } = require('../models');

class PrescriptionRespository {
  constructor() {
    this._prescription = Prescription;
  }

  async getPrescriptionById(id) {
    const result = await this._prescription.findOne(id);
    return result;
  }

  async getAllPrescription(fillter) {
    const result = await this._prescription.findAll(fillter);
    return result;
  }

  async addPrecription(data) {
    const result = await this._prescription.create(data);
    return result;
  }
}

module.exports = PrescriptionRespository;
