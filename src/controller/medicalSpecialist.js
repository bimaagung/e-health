const resData = require('../helper/response');

module.exports = {
  addMedicalSpecialist: async (req, res, next) => {
    try {
      const { specialistName } = req.body;

      const result = await req.medicalSpecialist.addMedicalSpecialist(specialistName);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },

  getListMedicalSpecialist: async (req, res, next) => {
    try {
      const result = await req.medicalSpecialist.getListMedicalSpecialist();

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },

  getDoctorByMedicalSpecialistId: async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await req.medicalSpecialist.getDoctorByMedicalSpecialistId(id);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },

  deleteMedicalSpecialist: async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await req.medicalSpecialist.deleteMedicalSpecialist(id);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },

  updateMedicalSpecialist: async (req, res, next) => {
    try {
      const { id } = req.params;
      const newCategory = {
        specialistName: req.body.specialistName,
      };
      const result = await req.medicalSpecialist.updateCategory(id, newCategory);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },

};
