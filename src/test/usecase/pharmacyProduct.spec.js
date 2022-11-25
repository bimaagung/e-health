const PharmacyProductUseCase =  require('../../usecase/pharmacyProduct')
const mockPharmacyProduct = require('../mock/pharmacyProduct.mock')
const mockProduct = require('../mock/product.mock')

let mockPharmacyProductReturn, mockProductReturn = {};
let pharmacyProductUC = null;

describe('pharmacy product test', () => { 
    beforeEach(() => {
        mockPharmacyProductReturn = {
            addPharmacyProduct : jest.fn().mockReturnValue(mockPharmacyProduct.pharmacyProduct),
            getPharmacyProductByProductId : jest.fn().mockReturnValue(mockPharmacyProduct.pharmacyProduct),
            updatePharmacyProduct : jest.fn().mockReturnValue(true),
        }

        mockProductReturn = {
            getProductById: jest.fn().mockReturnValue(mockProduct.product),
        }

        pharmacyProductUC = new PharmacyProductUseCase(mockPharmacyProductReturn, mockProductReturn);
    });

    const product = {
        productId: 1,
        price: 32000,
        stock: 20,
        pharmacyId:1
    }

  
    describe('addPharmacyProduct test ', () => {
          /*
            Add Product Pharmacy
            1. should isSuccess is true, statusCode 200
            2. should isSuccess is false, statusCode 400, reason 'product is already exists'  
            3. when productId not found should isSuccess is false, statusCode 404, reason 'product not found'  
        */
        
        test("should success is true, statusCode 200", async () => {
            mockPharmacyProductReturn.getPharmacyProductByProductId = jest.fn().mockReturnValue(null)
            pharmacyProductUC = new PharmacyProductUseCase(mockPharmacyProductReturn, mockProductReturn);

            let res = await pharmacyProductUC.addPharmacyProduct(product)

            expect(mockProductReturn.getProductById).toHaveBeenCalled();
            expect(mockPharmacyProductReturn.getPharmacyProductByProductId).toHaveBeenCalled();
            expect(mockPharmacyProductReturn.addPharmacyProduct).toHaveBeenCalled();

            expect(res.isSuccess).toBeTruthy();
            expect(res.statusCode).toEqual(200);
        });

        test("should success is false, statusCode 400, reason 'product is already exists'", async () => {
            let res = await pharmacyProductUC.addPharmacyProduct(product)

            expect(mockProductReturn.getProductById).toHaveBeenCalled();
            expect(mockPharmacyProductReturn.getPharmacyProductByProductId).toHaveBeenCalled();

            expect(res.isSuccess).toBeFalsy();
            expect(res.statusCode).toEqual(400);
            expect(res.reason).toEqual('product is already exists');
        });

        test("should success is false, statusCode 404, reason 'productId not found'", async () => {
            
           mockProductReturn.getProductById = jest.fn().mockReturnValue(null)
           pharmacyProductUC = new PharmacyProductUseCase(mockPharmacyProductReturn, mockProductReturn);


            let res = await pharmacyProductUC.addPharmacyProduct(product)

            expect(mockProductReturn.getProductById).toHaveBeenCalled();

            expect(res.isSuccess).toBeFalsy();
            expect(res.statusCode).toEqual(404);
            expect(res.reason).toEqual('productId not found');
        });
    });
    describe('updatePharmacyProduct test ', () => {
          /*
            Update Product Pharmacy
            1. should isSuccess is true, statusCode 200
            2. when productId not found should isSuccess is false, statusCode 404, reason 'product not found'  
        */
        
        const product = {
            price: 32000,
            stock: 20,
            pharmacyId:1
        }

        test("should success is true, statusCode 200", async () => {

            let res = await pharmacyProductUC.updatePharmacyProduct(1, product)

            expect(mockPharmacyProductReturn.getPharmacyProductByProductId).toHaveBeenCalled();
            expect(mockPharmacyProductReturn.updatePharmacyProduct).toHaveBeenCalled();

            expect(res.isSuccess).toBeTruthy();
            expect(res.statusCode).toEqual(200);
        });

        test("should success is false, statusCode 404, reason 'product not found'", async () => {
            
           mockPharmacyProductReturn.getPharmacyProductByProductId = jest.fn().mockReturnValue(null)
           pharmacyProductUC = new PharmacyProductUseCase(mockPharmacyProductReturn, mockProductReturn);

            let res = await pharmacyProductUC.updatePharmacyProduct(1, product)

            expect(mockPharmacyProductReturn.getPharmacyProductByProductId).toHaveBeenCalled();

            expect(res.isSuccess).toBeFalsy();
            expect(res.statusCode).toEqual(404);
            expect(res.reason).toEqual('product not found');
        });
    });
 })