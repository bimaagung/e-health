require('dotenv').config();
const DoctorValidationUseCase = require('../../usecase/doctorValidation');
const mockDoctorValidation = require('../mock/doctorValidation.mock')

let mockDoctorValidationResult = {};
let doctorValidationUC = null;

let mediaHandler = {
    cloudinaryUpload: jest.fn().mockReturnValue('http://cloudinary.com/image')
}

describe('doctorValidation test', () => {
    beforeEach(() => {
        mockDoctorValidationResult = {
            addDoctorValidation: jest.fn().mockReturnValue(mockDoctorValidation.doctorValidation),
            getDoctorValdationByUserId : jest.fn().mockReturnValue(mockDoctorValidation.doctorValidation)
        }

        doctorValidationUC = new DoctorValidationUseCase(mockDoctorValidationResult, mediaHandler);
    });

    describe('add doctor Validation test', () => { 
        const validation = {
            userId: 1,
            urlDoc: "c:/str.pdf"
        }

        test("should isSuccess = true, statusCode = 201, and data is true", async () => {
            mockDoctorValidationResult.getDoctorValdationByUserId = jest.fn().mockReturnValue(null);
            doctorValidationUC = new DoctorValidationUseCase(mockDoctorValidationResult, mediaHandler);

            let res = await doctorValidationUC.addDoctorValidation(validation);

            expect(res.isSuccess).toBeTruthy();
            expect(res.statusCode).toEqual(201);
            expect(typeof res.data === 'object').toBeTruthy();
            expect(res.data).toHaveProperty('id');
            expect(res.data).toHaveProperty('doctorId');
            expect(res.data).toHaveProperty('urlDoc');
        });
    });
});