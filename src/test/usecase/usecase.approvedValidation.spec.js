const approvedValidationUseCase = require('../../usecase/apporvedValidation')
const docterValidationMock = require('../mock/docterValidation.mock')
const userMock = require('../mock/user.mock')
const validationStatus = require('../../internal/constant/doctorValidation')
const _ = require('loadsh')

let mockDocterValidationReturn, mockUserReturn, mockValidationStatusReturn = {};
let approvedValidationUC = null;

describe('approve validation test', ()=>{
    beforeEach(()=>{
        mockDocterValidationReturn = {
            addDoctorValidation: jest.fn().mockReturnValue(docterValidationMock.doctorValidation),
            getDoctorValdationByUserId: jest.fn().mockReturnValue(docterValidationMock.doctorValidation),
            getDoctorValdationById: jest.fn().mockReturnValue(docterValidationMock.doctorValidation),
            getListPendingDoctorValidation: jest.fn().mockReturnValue(docterValidationMock.doctorValidation),
            updateDoctorValidation: jest.fn().mockReturnValue(true),
        }

        mockUserReturn = {
            updateUser: jest.fn().mockReturnValue(true)
        }
        mockValidationStatusReturn = {
            validationStatus:jest.fn().mockReturnValue(true)
        }

        approvedValidationUC = new approvedValidationUseCase(mockDocterValidationReturn, mockUserReturn, validationStatus, _)
    })
    describe('apporve validation', ()=>{
        test("should isSuccess true. statusCode is 200", async ()=>{
            let res = await approvedValidationUC.approvedValidation('COMPLETED', 1)
           
            expect(res.isSuccess).toBeTruthy();
            expect(res.statusCode).toEqual(200);
    
        })
        test("should isSucces false and reason is 'document not found'", async ()=>{
            mockDocterValidationReturn.getDoctorValdationById = jest.fn().mockReturnValue(null),
            approvedValidationUC = new approvedValidationUseCase(mockDocterValidationReturn, mockUserReturn, validationStatus, _)

            let res = await approvedValidationUC.approvedValidation('COMPLETED', 1)

            expect(res.isSuccess).toBeFalsy();
            expect(res.statusCode).toEqual(404);
            expect(res.reason).toEqual('document not found');
        })
        test("should isSucces false and reason is 'Document status is not pending'", async ()=>{
            mockValidationStatusReturn.validationStatus = jest.fn().mockReturnValue(false),
            approvedValidationUC = new approvedValidationUseCase(mockDocterValidationReturn, mockUserReturn, validationStatus, _)

            let res = await approvedValidationUC.approvedValidation('COMPLETED', 1)

            expect(res.isSuccess).toBeFalsy();
            expect(res.statusCode).toEqual(400);
            expect(res.reason).toEqual('Document status is not pending');
        })
    })
    describe('Reject validation', ()=>{
        test("should isSuccess true. statusCode is 200", async ()=>{
            let res = await approvedValidationUC.rejectedValidation()
           
            expect(res.isSuccess).toBeTruthy();
            expect(res.statusCode).toEqual(200);
    
        })
        test("should isSucces false and reason is 'document not found'", async ()=>{
            mockDocterValidationReturn.getDoctorValdationById = jest.fn().mockReturnValue(null),
            approvedValidationUC = new approvedValidationUseCase(mockDocterValidationReturn, mockUserReturn, validationStatus, _)

            let res = await approvedValidationUC.approvedValidation()

            expect(res.isSuccess).toBeFalsy();
            expect(res.statusCode).toEqual(404);
            expect(res.reason).toEqual('document not found');
        })
        test("should isSucces false and reason is 'Document status is not pending'", async ()=>{
            mockValidationStatusReturn.validationStatus = jest.fn().mockReturnValue(false),
            approvedValidationUC = new approvedValidationUseCase(mockDocterValidationReturn, mockUserReturn, validationStatus, _)

            let res = await approvedValidationUC.approvedValidation('COMPLETED', 1)

            expect(res.isSuccess).toBeFalsy();
            expect(res.statusCode).toEqual(400);
            expect(res.reason).toEqual('Document status is not pending');
        })
    })
    describe('get list doctor validation pending', ()=>{
        test("should isSuccess true. statusCode is 200 and data valid", async ()=>{
            let res = await approvedValidationUC.getListPendingDoctorValidation()
           
            expect(res.isSuccess).toBeTruthy();
            expect(res.statusCode).toEqual(200);
    
        })
    })

})


