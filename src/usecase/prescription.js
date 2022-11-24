class PrescriptionUseCase {
  constructor(prescriptionRepository, userRepository, orderRepository, mediaHandler) {
    this._prescriptionRepositroy = prescriptionRepository;
    this._userRepository = userRepository;
    this._orderRepository = orderRepository;
    this._mediaHandler = mediaHandler;
  }

  async getPrescriptionById(id) {
    let result = {
      isSuccess: false,
      statusCode: 404,
      reason: null,
      data: null,
    };

    const prescription = await this._prescriptionRepositroy.getPrescriptionById(
      id,
    );
    if (prescription === null) {
      result.reason = 'prescription not found';
      return result;
    }
    result.isSuccess = true;
    result.statusCode = 200;
    result.data = prescription;
    return result;
  }

  async addPrescription(prescription, file) {
    let result = {
      isSuccess: false,
      statusCode: 404,
      reason: null,
      data: null,
    };

    const user = await this._userRepository.getUserById(prescription.userId);
    if (user === null) {
      result.reason = 'user not found';
      return result;
    }
    const pendingOrder = await this._orderRepository.getPendingOrderByUserId(user.id);
    if (pendingOrder === null) {
      result.reason = 'order not found';
      return result;
    }
    if (file === undefined) {
      result.statusCode = 400;
      result.reason = 'please insert Prescription';
      return result;
    }
    const uploadPrescription = await this._mediaHandler.cloudinaryUpload(
      file.path,
      'urlPrescription',
    );
    const prescriptionValue = {
      urlPresciption: uploadPrescription,
      userId: user.id,
      orderId: pendingOrder.id,
    };
    const newPrescription = await this._prescriptionRepositroy.addPrescription(prescriptionValue);
    result.isSuccess = true;
    result.statusCode = 201;
    result.data = newPrescription;
  }
}

module.exports = PrescriptionUseCase;
