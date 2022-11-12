const resData = require('../helper/response');

module.exports = {
  createOrUpdateOrder: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { items } = req.body;
      const result = await req.orderUC.createOrUpdateOrder(userId, items);

      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },
};
