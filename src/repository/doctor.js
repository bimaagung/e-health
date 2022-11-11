const { Doctor } = require('../models');

class DoctorRepository {
  constructor() {
    this._doctorModel = Doctor;
  }

  async addDoctor(doctor) {
    const result = await this._doctorModel.create(doctor);
    return result;
  }

  async getListDoctor() {
    const result = await this._doctorModel.findAll();
    return result;
  }

  async getDoctorById(id) {
    const result = await this._doctorModel.findOne(
      {
        where: { id },
      },
    );

    return result;
  }
}

module.exports = DoctorRepository;
