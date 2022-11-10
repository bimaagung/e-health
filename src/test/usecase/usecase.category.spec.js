require("dotenv").config();
const CategoryUseCase = require("../../usecase/category");
const mockCategory = require("../mock/category.mock");
const mockProduct = require("../mock/product.mock");

let mockCategoryResult, mockProductResult = {};
let categoryUC = null;

describe("category test", () => {
  beforeEach(() => {
    mockCategoryResult = {
      getListCategory: jest.fn().mockReturnValue([mockCategory.category]),
      getCategoryById: jest.fn().mockReturnValue(mockCategory.category),
      addCategory: jest.fn().mockReturnValue(mockCategory.category),
      updateCategory: jest.fn().mockReturnValue(true),
      deleteCategory: jest.fn().mockReturnValue(true),
      getCategoryByName: jest.fn().mockReturnValue(mockCategory.category),
    };

    mockProductResult = {
      getListProduct: jest.fn().mockReturnValue([mockProduct.product]),
    }

    categoryUC = new CategoryUseCase(mockCategoryResult, mockProductResult);
  });

  describe("addCategory test", () => {
    test("should isSuccess = true, statusCode = 200, and data is true", async () => {
      mockCategoryResult.getCategoryByName = jest.fn().mockReturnValue(null);
      categoryUC = new CategoryUseCase(mockCategoryResult);

      let res = await categoryUC.addCategory("flu dan batuk");

      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
      expect(typeof res.data === "object").toBeTruthy();
      expect(res.data).toHaveProperty("id");
      expect(res.data).toHaveProperty("name");
    });

    test("should isSuccess = false, statusCode = 400, and reason = 'category name already exists' ", async () => {
      let res = await categoryUC.addCategory("flu dan batuk");

      expect(res.isSuccess).toBeFalsy();
      expect(res.statusCode).toEqual(400);
      expect(res.reason).toEqual("category name already exists");
    });
  });

  describe("getListCategory test", () => {
    test("should isSuccess = true, statusCode = 200, and type data is array", async () => {
      let res = await categoryUC.getListCategory();

      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.data)).toBeTruthy();
      expect(res.data[0]).toHaveProperty("id");
      expect(res.data[0]).toHaveProperty("name");
    });

    test("when add query is_examination should isSuccess = true, statusCode = 200, and type data is array", async () => {
      let res = await categoryUC.getListCategory({ is_examination: false });

      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.data)).toBeTruthy();
      expect(res.data[0]).toHaveProperty("id");
      expect(res.data[0]).toHaveProperty("name");
    });
  });

  describe("getCategoryById test", () => {
    test("should isSuccess = true, statusCode = 200, and type data is valid", async () => {
      let res = await categoryUC.getCategoryById(1);

      expect(mockCategoryResult.getCategoryById).toHaveBeenCalled();
      expect(mockProductResult.getListProduct).toHaveBeenCalled();
      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
      expect(typeof res.data === 'object').toBeTruthy();
      expect(res.data).toHaveProperty("id");
      expect(res.data).toHaveProperty("name");
      expect(res.data).toHaveProperty("products");
      expect(Array.isArray(res.data.products)).toBeTruthy()
      expect(res.data.products[0]).toHaveProperty('id');
      expect(res.data.products[0]).toHaveProperty('name');
      expect(res.data.products[0]).toHaveProperty('price');
      expect(res.data.products[0]).toHaveProperty('isStrip');
      expect(res.data.products[0]).toHaveProperty('segmentation');
      expect(res.data.products[0]).toHaveProperty('urlImage');
    });

    test("should isSuccess is true,  statusCode = 404, and message 'category not found'", async () => {
      mockCategoryResult.getCategoryById = jest.fn().mockReturnValue(null)
      categoryUC = new CategoryUseCase(mockCategoryResult, mockProductResult);
      let res = await categoryUC.getCategoryById(1);

      expect(res.isSuccess).toBeFalsy();
      expect(res.statusCode).toEqual(404);
      expect(res.reason).toEqual('category not found');
    });
  });

   describe("deleteCategory test", () => {
    test("should isSuccess = true, statusCode = 200", async () => {
      let res = await categoryUC.deleteCategoryById(1);

      expect(mockCategoryResult.getCategoryById).toHaveBeenCalled();
      expect(mockCategoryResult.deleteCategory).toHaveBeenCalled();
      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
    });

    test("should isSuccess is true,  statusCode = 404, and message 'category not found'", async () => {
      mockCategoryResult.getCategoryById = jest.fn().mockReturnValue(null)
      categoryUC = new CategoryUseCase(mockCategoryResult, mockProductResult);
      let res = await categoryUC.deleteCategoryById(1);

      expect(res.isSuccess).toBeFalsy();
      expect(res.statusCode).toEqual(404);
      expect(res.reason).toEqual('category not found');
    });
  });
});
