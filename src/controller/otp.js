const resData = require('../helper/response');

module.exports = {
  generateOTP: async (req, res, next) => {
    try {
      const { email } = req.query;
      const { otp_type: otpType } = req.body;

      const result = await req.otpUC.generateOTP(email, otpType);

      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }

      res.status(result.statusCode).json(resData.success(result.reason));
    } catch (error) {
      next(error);
    }
  },
};
