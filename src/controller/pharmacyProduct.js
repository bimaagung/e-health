const resData = require('../helper/response');

module.exports = {
  addPharmacyProduct: async (req, res, next) => {
    try {
      const product = {
        productId: req.body.productId,
        price: req.body.price,
        stock: req.body.stock,
        pharmacyId: req.body.pharmacyId,
      };

      const result = await req.pharmacyProductUC.addPharmacyProduct(product);

      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success());
    } catch (error) {
      next(error);
    }
  },
};
