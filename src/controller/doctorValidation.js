const resData = require('../helper/response');

module.exports = {
  addDoctorValidation: async (req, res, next) => {
    try {
      const validation = {
        doctorId: req.user.id,
        file: req.file,
        status: req.body.status,
        adminId: null,
      };

      const result = await req.doctorValidationUC.addDoctorValidation(validation);

      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },
};
