const resData = require('../helper/response');

module.exports = {
  addProduct: async (req, res, next) => {
    try {
      const product = {
        name: req.body.name,
        categoryId: req.body.categoryId,
        isStrip: req.body.isStrip, // true : STRIP | false : BOTOL
        price: req.body.price,
        description: req.body.description,
        indication: req.body.indication,
        composition: req.body.composition,
        dose: req.body.dose,
        use: req.body.use,
        sideEffect: req.body.sideEffect,
        segmentation: req.body.description, // MERAH | BIRU | HIJAU
        packaging: req.body.packaging,
        manufacture: req.body.manufacture,
        stock: req.body.stock,
        urlImage: null,
        expiredAt: req.body.expiredAt, // 2023-09-07
      };

      const { file } = req;

      const result = await req.productUC.createProduct(product, file);

      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },

};
