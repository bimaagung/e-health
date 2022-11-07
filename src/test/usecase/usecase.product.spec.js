require('dotenv').config();
const ProductUseCase = require('../../usecase/product');
const mockProduct = require('../mock/product.mock');
const mockCategory = require('../mock/category.mock');

let mockProductReturn, mockCategoryReturn = {};
let productUC = null;

let mediaHandler = {
    cloudinaryUpload: jest.fn().mockReturnValue('http://cloudinary.com/image')
}

describe('product test', () => { 
    beforeEach(() => {
        mockProductReturn = {
            getListProduct: jest.fn().mockReturnValue([mockProduct.product]),
            getProductById: jest.fn().mockReturnValue(mockProduct.product),
            addProduct: jest.fn().mockReturnValue(mockProduct.product),
            updateProduct: jest.fn().mockReturnValue(true),
            deleteProduct: jest.fn().mockReturnValue(true),
            getProductByName: jest.fn().mockReturnValue(mockProduct.product),
        }

        mockCategoryReturn = {
            getCategoryByName: jest.fn().mockReturnValue(mockCategory.category),
            getCategoryById: jest.fn().mockReturnValue(mockCategory.category)
        }

        productUC = new ProductUseCase(mockProductReturn,mockCategoryReturn,mediaHandler);
    });

    describe('addProduct test', () => { 
         let product = {
                id:1,
                name: 'Paracetamol 10MG',
                category_id:1,
                is_strip: true,
                price: 300000,
                description: 'obat penurun panas',
                indication: 'obat untuk menurunkan gejala panas',
                composition: 'Zaproles 5mg',
                dose: 'Sehari 3X',
                use: 'Diminum sesudah makan',
                side_effect: 'alergi seperti pusing',
                segementation: 'MERAH',
                packaging: 'isi 10 strip',
                manufacture: 'PT. Husada Karya Daria',
                url: 'http://cloudinary.com/image',
                createdAt: '2022-09-07 09:36:06.000 +0700',
                updatedAt: '2022-09-07 09:36:08.000 +0700'
            }
        test("should isSuccess = true, statusCode = 200, and data is true", async () => {
            mockProductReturn.getProductByName = jest.fn().mockReturnValue(null);
            productUC = new ProductUseCase(mockProductReturn,mockCategoryReturn,mediaHandler);

            let res = await productUC.createProduct(product);

            expect(res.isSuccess).toBeTruthy();
            expect(res.statusCode).toEqual(200);
            expect(typeof res.data === 'object').toBeTruthy();
            expect(res.data).toHaveProperty('id');
            expect(res.data).toHaveProperty('name');
            expect(res.data).toHaveProperty('category_id');
            expect(res.data).toHaveProperty('is_strip');
            expect(res.data).toHaveProperty('price');
            expect(res.data).toHaveProperty('description');
            expect(res.data).toHaveProperty('indication');
            expect(res.data).toHaveProperty('composition');
            expect(res.data).toHaveProperty('dose');
            expect(res.data).toHaveProperty('use');
            expect(res.data).toHaveProperty('side_effect');
            expect(res.data).toHaveProperty('segementation');
            expect(res.data).toHaveProperty('packaging');
            expect(res.data).toHaveProperty('manufacture');
            expect(res.data).toHaveProperty('url');
        });

        test("if image empty will be default image should isSuccess = true, statusCode = 200, data is true, and url is default ", async () => {
             product = {
                id:1,
                name: 'Paracetamol 10MG',
                category_id:1,
                is_strip: true,
                price: 300000,
                description: 'obat penurun panas',
                general_indication: 'obat untuk menurunkan gejala panas',
                composition: 'Zaproles 5mg',
                dose: 'Sehari 3X',
                use: 'Diminum sesudah makan',
                attention:'jangan diberikan ke anak umur dibawah 2 tahun',
                indication: 'diabetes',
                side_effect: 'alergi seperti pusing',
                segementation: 'MERAH',
                packaging: 'isi 10 strip',
                manufacture: 'PT. Husada Karya Daria',
                no_registration: 'HDJK-783292378JF',
                url: process.env.DEFAULT_IMAGE_PRODUCT,
                createdAt: '2022-09-07 09:36:06.000 +0700',
                updatedAt: '2022-09-07 09:36:08.000 +0700'
            }

            mockProductReturn.getProductByName = jest.fn().mockReturnValue(null);
            mockProductReturn.addProduct= jest.fn().mockReturnValue(product),

            productUC = new ProductUseCase(mockProductReturn,mockCategoryReturn,mediaHandler);

            let res = await productUC.createProduct(product);

            expect(res.isSuccess).toBeTruthy();
            expect(res.statusCode).toEqual(200);
            expect(typeof res.data === 'object').toBeTruthy();
            expect(res.data).toHaveProperty('id');
            expect(res.data).toHaveProperty('name');
            expect(res.data).toHaveProperty('category_id');
            expect(res.data).toHaveProperty('is_strip');
            expect(res.data).toHaveProperty('price');
            expect(res.data).toHaveProperty('description');
            expect(res.data).toHaveProperty('indication');
            expect(res.data).toHaveProperty('composition');
            expect(res.data).toHaveProperty('dose');
            expect(res.data).toHaveProperty('use');
            expect(res.data).toHaveProperty('side_effect');
            expect(res.data).toHaveProperty('segementation');
            expect(res.data).toHaveProperty('packaging');
            expect(res.data).toHaveProperty('manufacture');
            expect(res.data).toHaveProperty('url');
            expect(res.data.url).toEqual(process.env.DEFAULT_IMAGE_CATEGORY);
            
        });

        test("should isSuccess = false, statusCode = 400, and reason = 'product name already exists' ", async () => {
            let res = await productUC.createProduct(product);

            expect(res.isSuccess).toBeFalsy();
            expect(res.statusCode).toEqual(400);
            expect(res.reason).toEqual('product name already exists');
        });

         test("if category is not found should isSuccess = true, statusCode = 200, data is true, and category_id is other ", async () => {
            mockProductReturn.getProductByName = jest.fn().mockReturnValue(null);
            mockCategoryReturn.getCategoryById = jest.fn().mockReturnValue(null);
            productUC = new ProductUseCase(mockProductReturn,mockCategoryReturn,mediaHandler);

            let res = await productUC.createProduct(product);

            expect(res.isSuccess).toBeTruthy();
            expect(res.statusCode).toEqual(200);
            expect(typeof res.data === 'object').toBeTruthy();
            expect(res.data).toHaveProperty('id');
            expect(res.data).toHaveProperty('category_id');
            expect(res.data.category_id).toEqual(1);
        });
     });
 });