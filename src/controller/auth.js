const resData = require('../helper/response');

module.exports = {
    login: async (req, res, next) => {
        try {
          let { username, password } = req.body;
          let resUser = await req.authUC.login(username, password);
          if (resUser.isSuccess !== true) {
            return res.status(resUser.statusCode).json(resData.failed(resUser.reason));
          }
          res.status(resUser.statusCode).json(
            resData.success({
              user: resUser.data,
              token: resUser.token,
            })
          );
        } catch (e) {
          next(e);
        }
},
register: async (req, res, next) => {
    try {
      let { userData } = req.body;
      let resUser = await req.authUC.register(userData);
      if (resUser.isSuccess !== true) {
        return res.status(resUser.status).json(resData.failed(resUser.reason));
      }
      res.status(200).json(
        resData.success(resUser.data)
      );
    } catch (e) {
      next(e);
    }
  }
}