const resData = require('../helper/response');

module.exports = {
  addProduct: async (req, res, next) => {
    try {
      const product = {
        name: req.body.name,
        file: req.file,
        is_examination: req.body.is_examination,
      };

      const result = await req.productUC.createProduct(product);

      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },

};
