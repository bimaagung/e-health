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
  sumbitedOrder: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const result = await req.orderUC.sumbitedOrder(userId);

      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },
  processOrder: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const result = await req.orderUC.processOrder(userId);

      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },
  canceledOrderByUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const result = await req.orderUC.canceledOrderByUser(userId, id);

      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },
  canceledOrderByAdmin: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const result = await req.orderUC.canceledOrderByAdmin(userId);

      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },
  completedOrder: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const result = await req.orderUC.completedOrder(userId);

      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },
};
