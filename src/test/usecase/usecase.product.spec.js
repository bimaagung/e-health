require('dotenv').config();
const ProductUseCase = require('../../usecase/product');
const mockProduct = require('../mock/product.mock');
const mockCategory = require('../mock/category.mock');

let mockProductReturn, mockCategoryReturn, mediaHandler = {};
let productUC = null;



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

        mediaHandler = {
            cloudinaryUpload: jest.fn().mockReturnValue('http://cloudinary.com/image')
        }

        productUC = new ProductUseCase(mockProductReturn, mockCategoryReturn, mediaHandler);
    });

    describe('addProduct test', () => { 
         let product = {
                name: 'Paracetamol 10MG',
                categoryId:1,
                isStrip: true,
                price: 300000,
                description: 'obat penurun panas',
                indication: 'obat untuk menurunkan gejala panas',
                composition: 'Zaproles 5mg',
                dose: 'Sehari 3X',
                use: 'Diminum sesudah makan',
                sideEffect: 'alergi seperti pusing',
                segmentation: 'MERAH',
                packaging: 'isi 10 strip',
                manufacture: 'PT. Husada Karya Daria',
                stock: 20,
                urlImage: null,
                expiredAt: '2023-09-07',
            }
        test("should isSuccess = true, statusCode = 200, and data is true", async () => {
            mockProductReturn.getProductByName = jest.fn().mockReturnValue(null);
            productUC = new ProductUseCase(mockProductReturn, mockCategoryReturn, mediaHandler);

            let res = await productUC.createProduct(product, { path:'C:/Image.jpg' });

            expect(mockProductReturn.getProductByName).toHaveBeenCalled();
            expect(mockCategoryReturn.getCategoryById).toHaveBeenCalled();
            expect(mediaHandler.cloudinaryUpload).toHaveBeenCalled();
            expect(mockProductReturn.addProduct).toHaveBeenCalled();

            expect(res.isSuccess).toBeTruthy();
            expect(res.statusCode).toEqual(200);
            expect(typeof res.data === 'object').toBeTruthy();
            expect(res.data).toHaveProperty('id');
            expect(res.data).toHaveProperty('name');
            expect(res.data).toHaveProperty('categoryId');
            expect(res.data).toHaveProperty('isStrip');
            expect(res.data).toHaveProperty('price');
            expect(res.data).toHaveProperty('description');
            expect(res.data).toHaveProperty('indication');
            expect(res.data).toHaveProperty('composition');
            expect(res.data).toHaveProperty('dose');
            expect(res.data).toHaveProperty('use');
            expect(res.data).toHaveProperty('sideEffect');
            expect(res.data).toHaveProperty('segmentation');
            expect(res.data).toHaveProperty('packaging');
            expect(res.data).toHaveProperty('manufacture');
            expect(res.data).toHaveProperty('stock');
            expect(res.data).toHaveProperty('urlImage');
            expect(res.data).toHaveProperty('expiredAt');
        });

        test("should isSuccess = false, statusCode = 400, and reason = 'product name already exists' ", async () => {
            let res = await productUC.createProduct(product, { path:'C:/Image.jpg' });

            expect(res.isSuccess).toBeFalsy();
            expect(res.statusCode).toEqual(400);
            expect(res.reason).toEqual('product name already exists');
        });

         test("if category is not found should isSuccess = true, statusCode = 200, data is true, and category_id is other ", async () => {
            mockProductReturn.getProductByName = jest.fn().mockReturnValue(null);
            mockCategoryReturn.getCategoryById = jest.fn().mockReturnValue(null);
            productUC = new ProductUseCase(mockProductReturn,mockCategoryReturn,mediaHandler);

            let res = await productUC.createProduct(product, { path:'C:/Image.jpg' });

            expect(res.isSuccess).toBeTruthy();
            expect(res.statusCode).toEqual(200);
            expect(typeof res.data === 'object').toBeTruthy();
            expect(res.data).toHaveProperty('id');
            expect(res.data).toHaveProperty('categoryId');
            expect(res.data.categoryId).toEqual(1);
        });
     });
 });