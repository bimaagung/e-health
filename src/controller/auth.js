const resData = require('../helper/response');

module.exports = {
  login: async (req, res, next) => {
    try {
      const user = {
        usernameOrEmail: req.body.username_or_email,
        password: req.body.password,
      };

      const responseObj = {
        status: 'ok',
        message: 'success',
        token: null,
      };

      const result = await req.authUC.login(user);

      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }

      responseObj.token = result.token;

      res.status(result.statusCode).json(responseObj);
    } catch (error) {
      next(error);
    }
  },

  register: async (req, res, next) => {
    try {
      const user = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        phone: req.body.phone,
        otp_code: req.body.otp_code,
        file: req.file,
      };

      const result = await req.authUC.register(user);

      if (result.isSuccess === false) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }

      res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },
};
