const { MedicalSpecialist } = require('../models');

class MedicalSpecialistRepository {
  constructor() {
    this._medicalSpecialistModel = MedicalSpecialist;
  }

  async addMedicalSpecialist(specialist) {
    const result = await this._medicalSpecialistModel.create({ name: specialist });
    return result;
  }

  async getListMedicalSpecialist() {
    const result = await this._medicalSpecialistModel.findAll();
    return result;
  }

  async getDoctorByMedicalSpecialistId(id) {
    const result = await this._medicalSpecialistModel.findAll(
      {
        where: { id },
      },
    );

    return result;
  }

  async getMedicalSpecialistById(id) {
    const result = await this._medicalSpecialistModel.findOne(
      {
        where: { id },
      },
    );

    return result;
  }

  async getMedicalSpecialistByName(name) {
    const result = await this._medicalSpecialistModel.findOne(
      {
        where: { name },
      },
    );
    return result;
  }

  async updateMedicalSpecialist(id, specialist) {
    const result = await this._medicalSpecialistModel.findOne(
      specialist,
      {
        where: { id },
      },
    );
    return result;
  }

  async deleteMedicalSpecialist(id) {
    const result = await this._medicalSpecialistModel.destroy(
      {
        where: { id },
      },
    );
    return result;
  }
}

module.exports = MedicalSpecialistRepository;
