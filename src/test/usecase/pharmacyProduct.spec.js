const PharmacyProductUseCase =  require('../../usecase/pharmacyProduct')
const mockPharmacyProduct = require('../mock/pharmacyProduct.mock')

let mockPharmacyProductReturn = {};
let pharmacyProductUC = null;

describe('pharmacy product test', () => { 
    beforeEach(() => {
        mockPharmacyProductReturn = {
            addPharmacyProduct : jest.fn().mockReturnValue(mockPharmacyProduct.pharmacyProduct),
            getPharmacyProductByProductId : jest.fn().mockReturnValue(mockPharmacyProduct.pharmacyProduct)
        }

        pharmacyProductUC = new PharmacyProductUseCase(mockPharmacyProductReturn);
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
            1. should success is true, statusCode 200
            2. should success is false, statusCode 400, reason 'product is already exists'  
        */
        
        test("should success is true, statusCode 200", async () => {
            mockPharmacyProductReturn.getPharmacyProductByProductId = jest.fn().mockReturnValue(null)
            pharmacyProductUC = new PharmacyProductUseCase(mockPharmacyProductReturn);

            let res = await pharmacyProductUC.addPharmacyProduct(product)

            expect(mockPharmacyProductReturn.getPharmacyProductByProductId).toHaveBeenCalled();
            expect(mockPharmacyProductReturn.addPharmacyProduct).toHaveBeenCalled();

            expect(res.isSuccess).toBeTruthy();
            expect(res.statusCode).toEqual(200);
        });

        test("should success is false, statusCode 400, reason 'product is already exists'", async () => {
            
            let res = await pharmacyProductUC.addPharmacyProduct(product)

            expect(mockPharmacyProductReturn.getPharmacyProductByProductId).toHaveBeenCalled();

            expect(res.isSuccess).toBeFalsy();
            expect(res.statusCode).toEqual(400);
            expect(res.reason).toEqual('product is already exists');
        });
    });
 })