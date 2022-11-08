const resData = require('../helper/response');

module.exports = {
  addDocterValidation: async (req, res, next) => {
    try {
      const validation = {
        docterId: req.user.id,
        file: req.file,
        status: req.body.status,
        adminId: null,
      };

      const result = await req.docterValidationUC.addDocterValidation(validation);

      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },
};
