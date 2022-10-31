const CategoryUseCase = require('../../usecase/category');
const mockCategoryRepo = require('../mock/repository.category.mock');

let categoryResult = {};
let categoryUC = null;

let cloudinary = {
    uploadImage: jest.fn().mockReturnValue('http://cloudinary.com/image')
}

describe('category test', () => { 
    beforeEach(() => {
        categoryResult = {
            getListCategory: true,
            getCategoryById: true,
            addCategory: true,
            updateCategory: true,
            deleteCategory: true,
            getCategoryByName: true
        }

        categoryUC = new CategoryUseCase(mockCategoryRepo(categoryResult, cloudinary));
    });

    describe('addCategory test', () => { 
        test("should isSuccess = true, statusCode = 200, and data is true", async () => {
            categoryResult.getCategoryByName = null;
            categoryUC = new CategoryUseCase(mockCategoryRepo(categoryResult), cloudinary);

            let res = await categoryUC.addCategory({name:'flu dan batuk', filePath:'c:/images/'});

            expect(res.isSuccess).toBeTruthy();
            expect(res.statusCode).toEqual(200);
            expect(typeof res.data === 'object').toBeTruthy();
            expect(res.data).toHaveProperty('id');
            expect(res.data).toHaveProperty('name');
            expect(res.data).toHaveProperty('url');
        });

        test("should isSuccess = false, statusCode = 400, and reason = 'category name already exists' ", async () => {
             let res = await categoryUC.addCategory({name:'flu dan batuk', filePath:'c:/images/'});

            expect(res.isSuccess).toBeFalsy();
            expect(res.statusCode).toEqual(400);
            expect(res.reason).toEqual('category name already exists');
        });
     })
 })