require('dotenv').config();
const CategoryUseCase = require('../../usecase/category');
// const mockCategoryRepo = require('../mock/repository.category.mock');
const mockCategory = require('../mock/category.mock')

let mockCategoryResult = {};
let categoryUC = null;

let mediaHandler = {
    cloudinaryUpload: jest.fn().mockReturnValue('http://cloudinary.com/image')
}

describe('category test', () => { 
    beforeEach(() => {
        mockCategoryResult = {
            getListCategory: jest.fn().mockReturnValue([mockCategory.category]),
            getCategoryById: jest.fn().mockReturnValue(mockCategory.category),
            addCategory: jest.fn().mockReturnValue(mockCategory.category),
            updateCategory: jest.fn().mockReturnValue(true),
            deleteCategory: jest.fn().mockReturnValue(true),
            getCategoryByName: jest.fn().mockReturnValue(mockCategory.category)
        }

        categoryUC = new CategoryUseCase(mockCategoryResult, mediaHandler);
    });

    describe('addCategory test', () => { 
        test("should isSuccess = true, statusCode = 200, and data is true", async () => {
            mockCategoryResult.getCategoryByName = jest.fn().mockReturnValue(null);
            categoryUC = new CategoryUseCase(mockCategoryResult, mediaHandler);

            let res = await categoryUC.addCategory({name:'flu dan batuk', file:'c:/images/', is_examination: false});

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

            mockCategoryResult.getCategoryByName =  jest.fn().mockReturnValue(null);;
            mockCategoryResult.addCategory =  jest.fn().mockReturnValue(category);

            categoryUC = new CategoryUseCase(mockCategoryResult, mediaHandler);

            let res = await categoryUC.addCategory({name:'flu dan batuk', file:undefined, is_examination: false});

            expect(res.isSuccess).toBeTruthy();
            expect(res.statusCode).toEqual(200);
            expect(typeof res.data === 'object').toBeTruthy();
            expect(res.data).toHaveProperty('id');
            expect(res.data).toHaveProperty('name');
            expect(res.data).toHaveProperty('url');
            expect(res.data.url).toEqual(process.env.DEFAULT_IMAGE_CATEGORY);
            
        });

        test("should isSuccess = false, statusCode = 400, and reason = 'category name already exists' ", async () => {
             let res = await categoryUC.addCategory({name:'flu dan batuk', file:'c:/images/', is_examination: false});

            expect(res.isSuccess).toBeFalsy();
            expect(res.statusCode).toEqual(400);
            expect(res.reason).toEqual('category name already exists');
        });
     });

    describe('getListCategory test', () => { 
        test("should isSuccess = true, statusCode = 200, and type data is array", async () => {
            let res = await categoryUC.getListCategory();

            expect(res.isSuccess).toBeTruthy();
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.data)).toBeTruthy();
            expect(res.data[0]).toHaveProperty('id');
            expect(res.data[0]).toHaveProperty('name');
            expect(res.data[0]).toHaveProperty('url');
            expect(res.data[0]).toHaveProperty('is_examination');
        });

        test("when add query is_examination should isSuccess = true, statusCode = 200, and type data is array", async () => {
            let res = await categoryUC.getListCategory({is_examination: false});

            expect(res.isSuccess).toBeTruthy();
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.data)).toBeTruthy();
            expect(res.data[0]).toHaveProperty('id');
            expect(res.data[0]).toHaveProperty('name');
            expect(res.data[0]).toHaveProperty('url');
            expect(res.data[0]).toHaveProperty('is_examination');
        });
     });
 });