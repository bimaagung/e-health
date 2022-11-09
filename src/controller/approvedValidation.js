const resData = require('../helper/response');

module.exports = {
  getListPendingDocterValidation: async (req, res, next) => {
    try {
      const result = await req.approvedValidationUC.getListPendingDocterValidation();

      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },
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
  rejectedValidation: async (req, res, next) => {
    try {
      const { id } = req.params;
      const reject = {
        status: req.body.status,
        adminId: req.user.id,
        message: req.body.message,
      };

      const result = await req.approvedValidationUC.rejectedValidation(reject, id);

      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success());
    } catch (error) {
      next(error);
    }
  },
};
