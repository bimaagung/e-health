const resData = require('../helper/response');

module.exports = {
  getAllDoctor: async (req, res, next) => {
    try {
      const result = await req.doctorUC.getAllDoctor();

      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },
  getDoctorById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await req.doctorUC.getDoctorById(id);

      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },
};
