const resData = require('../helper/response');

module.exports = {
  addCategory: async (req, res, next) => {
    try {
      const category = {
        name: req.body.name,
        file: req.file,
      };

      const result = await req.categoryUC.addCategory(category);

      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },
};
