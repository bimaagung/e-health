const resData = require("../helper/response");

module.exports = {
  addCategory: async (req, res, next) => {
    try {
      const category = {
        name: req.body.name,
        file: req.file,
        is_examination: req.body.is_examination,
      };

      const result = await req.categoryUC.addCategory(category);

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
      const { is_examination: isExamination } = req.query;

      const result = await req.categoryUC.getListCategory(isExamination);

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
        return res.status(404).json(resData.failed("Category not found"));
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
