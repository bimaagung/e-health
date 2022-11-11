require("dotenv").config();
const DoctorValidationUseCase = require('../../usecase/doctorValidation')
const mockDoctorValidation = require('../mock/docterValidation.mock')
const validationStatus = require('../../internal/constant/doctorValidation')

let mockDoctorValidationReturn, mediaHandler = {};
let doctorValidationUC = null;


describe('doctor validaton test', ()=>{
    beforeEach(()=>{
        mockDoctorValidationReturn = {
            getDoctorValdationByUserId: jest.fn().mockReturnValue(mockDoctorValidation.doctorValidation),
            addDoctorValidation: jest.fn().mockReturnValue(mockDoctorValidation.doctorValidation)
        }
        mediaHandler = {
            cloudinaryUpload: jest.fn().mockReturnValue(true)
        }
        func = {
            verifyPdf: jest.fn().mockReturnValue('pdf')
        }
       
        doctorValidationUC = new DoctorValidationUseCase(mockDoctorValidationReturn, mediaHandler, validationStatus, func) 
    })
    describe('add docter validation test', ()=>{
        let validation = {
            id:1,
            urlDoc: 'http://cloudinary.com/image',
            doctorId: 5,
            adminId: null,
            status: 'PENDING',
            message: null,
            medicalSpecialistId: 1,
        }
        test('should isSuccess = true, statusCode 201, and data is true',async () => { 
            mockDoctorValidationReturn.getDoctorValdationByUserId = jest.fn().mockReturnValue(null);
            doctorValidationUC = new DoctorValidationUseCase(mockDoctorValidationReturn, mediaHandler, validationStatus, func);

            let res = await doctorValidationUC.addDoctorValidation(validation, { path:'C:/doc.pdf' })
            expect(res.isSuccess).toEqual(true);
            expect(res.statusCode).toEqual(201);
            expect(typeof res.data === 'object').toBeTruthy();
            expect(res.data).toHaveProperty('id');
            expect(res.data).toHaveProperty('doctorId');
            expect(res.data).toHaveProperty('urlDoc');
         })
         test('should isSuccess = false, statusCode 400, and data is null',async () => { 

            let res = await doctorValidationUC.addDoctorValidation(validation)
            expect(res.isSuccess).toEqual(false);
            expect(res.statusCode).toEqual(400);
            expect(typeof res.data === 'object').toBeTruthy();
            expect(res.reason).toEqual('please insert document');
         })
    })
})