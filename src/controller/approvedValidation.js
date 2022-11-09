const resData = require('../helper/response');

module.exports = {
  approvedValidation: async (req, res, next) => {
    try {
      const { id } = req.params;
      const approve = {
        status: req.body.status,
        adminId: req.user.id,
      };

      const result = await req.approvedValidationUC.approvedValidation(approve, id);

      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success());
    } catch (error) {
      next(error);
    }
  },
};
