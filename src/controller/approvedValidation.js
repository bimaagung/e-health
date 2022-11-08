const resData = require('../helper/response');

module.exports = {
    approvedValidation: async (req, res, next) => {
    try {
      const approve = {
        docterId: req.body.docterId,
        status: req.body.status,
        adminId: req.user.id,
      };

      const result = await req.docterValidationUC.approvedValidation(approve);

      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },
};
