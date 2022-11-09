const resData = require('../helper/response');

module.exports = {
  addCategory: async (req, res, next) => {
    try {
      const { name } = req.body;

      const result = await req.categoryUC.addCategory(name);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },

  getListCategory: async (req, res, next) => {
    try {
      const result = await req.categoryUC.getListCategory();

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },

  updateCategory: async (req, res, next) => {
    try {
      const { id } = req.params;

      const checkCaregory = await req.categoryUC.getCategoryById(id);

      if (!checkCaregory) {
        return res.status(404).json(resData.failed('Category not found'));
      }

      const newCategory = {
        name: req.body.name,
      };

      const result = await req.categoryUC.updateCategory(id, newCategory);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },
};
