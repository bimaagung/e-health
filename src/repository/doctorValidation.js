const { DoctorValidation } = require('../models');
const validationStatus = require('../internal/constant/doctorValidation');

class DoctorValidationRepository {
  constructor() {
    this._doctorValidation = DoctorValidation;
  }

  async addDoctorValidation(validation) {
    const result = await this._doctorValidation.create(validation);
    return result;
  }

  async getDoctorValdationByUserId(doctorId) {
    const result = await this._doctorValidation.findAll(
      {
        where: { doctorId },
      },
    );

    return result;
  }

  async getDoctorValdationById(id) {
    const result = await this._doctorValidation.findOne(
      {
        where: { id },
      },
    );

    return result;
  }

  async getListPendingDoctorValidation() {
    const result = await this._doctorValidation.findAll({
      where: { status: validationStatus.PENDING },
    });
    return result;
  }

  async updateDoctorValidation(validation, id) {
    const result = await this._doctorValidation.update(validation, {
      where: { id },
    });
    return result;
  }
}

module.exports = DoctorValidationRepository;
