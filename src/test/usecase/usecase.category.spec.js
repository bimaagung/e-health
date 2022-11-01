require('dotenv').config();
const CategoryUseCase = require('../../usecase/category');
const mockCategoryRepo = require('../mock/repository.category.mock');

let categoryResult = {};
let categoryUC = null;

let mediaHandler = {
    cloudinaryUpload: jest.fn().mockReturnValue('http://cloudinary.com/image')
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

        categoryUC = new CategoryUseCase(mockCategoryRepo(categoryResult, mediaHandler));
    });

    describe('addCategory test', () => { 
        test("should isSuccess = true, statusCode = 200, and data is true", async () => {
            categoryResult.getCategoryByName = null;
            categoryUC = new CategoryUseCase(mockCategoryRepo(categoryResult), mediaHandler);

            let res = await categoryUC.addCategory({name:'flu dan batuk', filePath:'c:/images/'});

            expect(res.isSuccess).toBeTruthy();
            expect(res.statusCode).toEqual(200);
            expect(typeof res.data === 'object').toBeTruthy();
            expect(res.data).toHaveProperty('id');
            expect(res.data).toHaveProperty('name');
            expect(res.data).toHaveProperty('url');
        });

        test("if url empty will be default url should isSuccess = true, statusCode = 200, data is true, and url is default ", async () => {
            const category = {
                id:1,
                name: 'flu dan batuk',
                url: process.env.DEFAULT_IMAGE_CATEGORY,
                createdAt: '2022-09-07 09:36:06.000 +0700',
                updatedAt: '2022-09-07 09:36:08.000 +0700'
            }

            categoryResult.getCategoryByName = null;
            categoryResult.addCategory = category;

            categoryUC = new CategoryUseCase(mockCategoryRepo(categoryResult), mediaHandler);

            let res = await categoryUC.addCategory({name:'flu dan batuk', filePath:''});

            expect(res.isSuccess).toBeTruthy();
            expect(res.statusCode).toEqual(200);
            expect(typeof res.data === 'object').toBeTruthy();
            expect(res.data).toHaveProperty('id');
            expect(res.data).toHaveProperty('name');
            expect(res.data).toHaveProperty('url');
            expect(res.data.url).toEqual(process.env.DEFAULT_IMAGE_CATEGORY);
            
        });

        test("should isSuccess = false, statusCode = 400, and reason = 'category name already exists' ", async () => {
             let res = await categoryUC.addCategory({name:'flu dan batuk', filePath:'c:/images/'});

            expect(res.isSuccess).toBeFalsy();
            expect(res.statusCode).toEqual(400);
            expect(res.reason).toEqual('category name already exists');
        });
     })
 })