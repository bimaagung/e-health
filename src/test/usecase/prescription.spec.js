const PrescriptionUseCase = require("../../usecase/prescription");
const prescriptionMock = require("../mock/prescription.mock");
const orderMock = require("../mock/order.mock");
const userMock = require("../mock/user.mock");

let mockPrescriptionReturn,
    mockOrderReturn,
    mockUserReturn,
    mediaHandler = {};

let prescriptionUC = null;

describe("Prescription Test", () => {
    beforeEach(() => {
        mockPrescriptionReturn = {
            getPrescriptionById: jest
                .fn()
                .mockReturnValue(prescriptionMock.prescription),
            getAllPrescription: jest
                .fn()
                .mockReturnValue([prescriptionMock.prescription]),
            addPrescription: jest.fn().mockReturnValue(prescriptionMock.prescription),
        };
        mockOrderReturn = {
            getPendingOrderByUserId: jest.fn().mockReturnValue(orderMock.order),
            updateOrder: jest.fn().mockReturnValue(true),
        };
        mockUserReturn = {
            getUserById: jest.fn().mockReturnValue(userMock.user),
        };
        
        mediaHandler = {
            cloudinaryUpload: jest.fn().mockReturnValue('http://cloudinary.com/image')
        }

        prescriptionUC = new PrescriptionUseCase(
            mockPrescriptionReturn,
            mockOrderReturn,
            mockUserReturn,
            mediaHandler
        );
    });
    describe("get Precription by ID", () => {
        test("should isSuccess = true, statusCode = 200, and data is true", async () => {
            let res = await prescriptionUC.getPrescriptionById(1);
            expect(res.isSuccess).toBeTruthy();
            expect(res.statusCode).toEqual(200);
            expect(typeof res.data === "object").toBeTruthy();
            expect(res.data).toHaveProperty("id");
            expect(res.data).toHaveProperty("urlPrescription");
            expect(res.data).toHaveProperty("userId");
            expect(res.data).toHaveProperty("orderId");
        });
        test("should isSuccess = false, statusCode = 404, and data null", async () => {
            mockPrescriptionReturn.getPrescriptionById = jest.fn().mockReturnValue(null)
            let res = await prescriptionUC.getPrescriptionById(1);
            expect(res.isSuccess).toBeFalsy();
            expect(res.statusCode).toEqual(404);
            expect(res.reason).toEqual('prescription not found');
            
        });
    });
    describe("Create Precription", () => {
        test("should isSuccess = true, statusCode = 200, and data is true", async () => {
            prescriptionUC = new PrescriptionUseCase(
                mockPrescriptionReturn,
                mockOrderReturn,
                mockUserReturn,
                mediaHandler
            );
            let res = await prescriptionUC.addPrescription(prescriptionMock.prescription,  {path:'C:/Image.jpg' });
            expect(res.isSuccess).toBeTruthy();
            expect(res.statusCode).toEqual(201);
            expect(typeof res.data === "object").toBeTruthy();
            expect(res.data).toHaveProperty("id");
            expect(res.data).toHaveProperty("urlPrescription");
            expect(res.data).toHaveProperty("userId");
            expect(res.data).toHaveProperty("orderId");
        });


        test("should isSuccess = false, statusCode = 404, and order not found", async () => {
            mockOrderReturn.getPendingOrderByUserId = jest.fn().mockReturnValue(null)
            let res = await prescriptionUC.addPrescription(prescriptionMock.prescription, {path:'C:/Image.jpg' });
            expect(res.isSuccess).toBeFalsy();
            expect(res.statusCode).toEqual(404);
            expect(res.reason).toEqual('order not found');
            
        });

        test("should isSuccess = false, statusCode = 404, and user not found", async () => {
            mockUserReturn.getUserById = jest.fn().mockReturnValue(null)
            let res = await prescriptionUC.addPrescription(prescriptionMock.prescription, {path:'C:/Image.jpg' });
            expect(res.isSuccess).toBeFalsy();
            expect(res.statusCode).toEqual(404);
            expect(res.reason).toEqual('user not found');
            
        });

        test("should isSuccess = false, statusCode = 404, plese insert document", async () => {

            let res = await prescriptionUC.addPrescription(prescriptionMock.prescription, undefined);
            expect(res.isSuccess).toBeFalsy();
            expect(res.statusCode).toEqual(400);
            expect(res.reason).toEqual('please insert Prescription');
            
        });
    });
});
