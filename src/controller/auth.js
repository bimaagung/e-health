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
};
