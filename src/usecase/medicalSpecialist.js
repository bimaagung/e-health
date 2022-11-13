class MedicalSpecialistUseCase {
  constructor(medicalSpecialist, userRepository) {
    this._medicalSpecialistRepository = medicalSpecialist;
    this._userRepository = userRepository;
  }

  async addMedicalSpecialist(specialistName) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    const medicalSpecialistUpperCase = specialistName.toUpperCase();

    const medicalSpecialistByName = await this._medicalSpecialistRepository.getMedicalSpecialistByName(
      medicalSpecialistUpperCase,
    );

    if (medicalSpecialistByName !== null) {
      result.isSuccess = false;
      result.statusCode = 400;
      result.reason = 'specialist name already exists';

      return result;
    }

    const addMedicalSpecialist = await this._medicalSpecialistRepository.addMedicalSpecialist(
      medicalSpecialistUpperCase,
    );

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = addMedicalSpecialist;

    return result;
  }

  async getListMedicalSpecialist() {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    const medicalSpecialist = await this._medicalSpecialistRepository.getListMedicalSpecialist();

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = medicalSpecialist;

    return result;
  }

  async updateMedicalSpecialist(id, newSpecialistName) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    const medicalSpecialistValues = {
      name: newSpecialistName.specialistName.toUpperCase(),
    };

    const updateSpecialistName = await this._medicalSpecialistRepository.updateMedicalSpecialist(
      id,
      medicalSpecialistValues,
    );

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = updateSpecialistName;

    return result;
  }

  async getDoctorByMedicalSpecialistId(id) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    const medicalSpecialistById = await this._medicalSpecialistRepository.getDoctorByMedicalSpecialistId(id);

    if (medicalSpecialistById === null) {
      result.statusCode = 404;
      result.reason = 'category not found';
      return result;
    }

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = {
      id: medicalSpecialistById.id,
      name: medicalSpecialistById.SpecialistName,
      createdAt: medicalSpecialistById.createdAt,
      updatedAt: medicalSpecialistById.updatedAt,
      doctors: await this._userRepository.getUserByDoctorRole(),
    };

    return result;
  }

  async deleteMedicalSpecialist(id) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
    };

    const medicalSpecialist = await this._medicalSpecialistRepository.getDoctorByMedicalSpecialistId(id);

    if (medicalSpecialist === null) {
      result.statusCode = 404;
      result.reason = 'Specialist Name not found';
      return result;
    }

    await this._medicalSpecialistRepository.deleteMedicalSpecialist(id);

    result.isSuccess = true;
    result.statusCode = 200;
    return result;
  }
}

module.exports = MedicalSpecialistUseCase;
