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
            getOrderById: jest.fn().mockReturnValue(orderMock.order),
        };
        mockUserReturn = {
            getOrderById: jest.fn().mockReturnValue(userMock.user),
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
        test("should isSuccess = true, statusCode = 200, and data is true", async () => {
            let res = await prescriptionUC.getPrescriptionById(1);
            expect(res.isSuccess).toBeTruthy();
            expect(res.statusCode).toEqual(200);
            expect(typeof res.data === "object").toBeTruthy();
        });
    });
});
