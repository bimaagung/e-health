const categoryController = require('../../controller/category');
const resData = require('../../helper/response');

let mockCategoryUC = {
    addCategory: jest.fn().mockReturnValue(null)
}

const mockRequest = (body={}, query={}, params={}, file={}, user={}, useCases={}) => {
    return {
        body: body,
        query: query,
        params: params,
        file: file,
        user: user,
        ...useCases
    }
}

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    return res;
}

const next = () => jest.fn().mockReturnValue({
    status: 500,
    json: {
        status: 'failed',
        message: 'internal server error',
    }
});

describe('category controller test', () => { 
    describe('addCategory', () => { 

        const categoryResult = {
            id:1,
            name: 'flu dan batuk',
            url: 'http://cloudinary.com/image',
            createdAt: '2022-09-07 09:36:06.000 +0700',
            updatedAt: '2022-09-07 09:36:08.000 +0700'
        }
        
        test('should status = 200 and data is true', async () => { 
            mockCategoryUC.addCategory = jest.fn().mockReturnValue({
                isSuccess: true, reason: null, data:categoryResult, statusCode:200
            });

            let req = mockRequest({name:'flu dan batuk'}, {},{},{path:'c/image.png'},{}, {categoryUC: mockCategoryUC})
            let res = mockResponse();

            await categoryController.addCategory(req, res, next);
                
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith(resData.success(categoryResult));
         });

        test("should status = 400 and message = 'category name already exists'", async () => { 
           mockCategoryUC.addCategory = jest.fn().mockReturnValue({
                isSuccess: false, reason: 'category name already exists', data:null, statusCode:400
            });

            let req = mockRequest({name:'flu dan batuk'}, {},{},{path:'c/image.png'},{}, {categoryUC: mockCategoryUC})
            let res = mockResponse();

            await categoryController.addCategory(req, res, next);

            expect(res.status).toBeCalledWith(400);
            expect(res.json).toBeCalledWith(resData.failed('category name already exists'));
         });

        test("should status = 500 and message = 'internal server error'", async () => { 
            mockCategoryUC.addCategory = jest.fn().mockImplementation(() => {
                throw new Error();
            });

            let req = mockRequest({name:'flu dan batuk'}, {},{},{path:'c/image.png'},{}, {categoryUC: mockCategoryUC})
            let res = mockResponse();
            let serverError = next();

            await categoryController.addCategory(req, res, next);

            expect(serverError().status).toEqual(500);
            expect(serverError().json.message).toEqual('internal server error');
         });
     })
 })