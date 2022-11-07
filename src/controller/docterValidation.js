const resData = require('../helper/response');

module.exports = {
  addCategory: async (req, res, next) => {
    try {
      const validation = {
        docterId: req.user.id,
        urlDoc: req.file.path,
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
}