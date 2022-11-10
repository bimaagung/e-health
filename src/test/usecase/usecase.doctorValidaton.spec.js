require("dotenv").config();
const DoctorValidationUseCase = require('../../usecase/doctorValidation')
const mockDoctorValidation = require('../mock/docterValidation.mock')

let mockDoctorValidationResult = {};
let doctoValidationUC = null;

let mediaHandler = {
    cloudinaryUpload: jest.fn().mockReturnValue("http://cloudinary.com/image"),
  };
  

describe('doctor validaton test', ()=>{
    beforeEach(()=>{
        mockDoctorValidationResult = {
            getDoctorValdationByUserId: jest.fn().mockReturnValue(mockDoctorValidation.doctorValidation),
            addDoctorValidation: jest.fn().mockReturnValue(mockDoctorValidation.doctorValidation)
        }
        doctoValidationUC = new DoctorValidationUseCase(mockDoctorValidationResult, mediaHandler) 
    })
    describe('add docter validation test', ()=>{
        const validation = {
            doctorId: 1,
            file: "c:/str.pdf",
            status : null,
            adminId : null,
        }
        test('should isSuccess = true, statusCode 201, and data is true',async () => { 
            mockDoctorValidationResult.getDoctorValdationByUserId = jest.fn().mockReturnValue(null);
            doctoValidationUC = new DoctorValidationUseCase(mockDoctorValidationResult, mediaHandler);

            let res = await doctoValidationUC.addDoctorValidation(validation)
            expect(res.isSuccess).toEqual(true);
            expect(res.statusCode).toEqual(201);
            expect(typeof res.data === 'object').toBeTruthy();
            expect(res.data).toHaveProperty('id');
            expect(res.data).toHaveProperty('doctorId');
            expect(res.data).toHaveProperty('urlDoc');
         })
         test('should isSuccess = false, statusCode 400, and data is null',async () => { 

            let res = await doctoValidationUC.addDoctorValidation(validation)
            expect(res.isSuccess).toEqual(false);
            expect(res.statusCode).toEqual(400);
            expect(typeof res.data === 'object').toBeTruthy();
            expect(res.data).toHaveProperty('id');
            expect(res.data).toHaveProperty('doctorId');
            expect(res.data).toHaveProperty('urlDoc');
         })
    })
})