require('dotenv').config();
const DocterValidationUseCase = require('../../usecase/dockerValidation');
const mockDocterValidation = require('../mock/docterValidation.mock')

let mockDocterValidationResult = {};
let docterValidationUC = null;

let mediaHandler = {
    cloudinaryUpload: jest.fn().mockReturnValue('http://cloudinary.com/image')
}

describe('docterValidation test', () => {
    beforeEach(() => {
        mockDocterValidationResult = {
            addValidationDocter: jest.fn().mockReturnValue(mockDocterValidation.docterValidation),
            getDocterValdationByUserId: jest.fn().mockReturnValue(mockDocterValidation.docterValidation)
        }

        docterValidationUC = new DocterValidationUseCase(mockDocterValidationResult, mediaHandler);
    });

    describe('add docter Validation test', () => {
        test("should isSuccess = true, statusCode = 201, and data is true", async () => {
            mockDocterValidationResult.getDocterValdationByUserId = jest.fn().mockReturnValue(null);
            docterValidationUC = new DocterValidationUseCase(mockDocterValidationResult, mediaHandler);

            let res = await docterValidationUC.addDocterValidation();

            expect(res.isSuccess).toBeTruthy();
            expect(res.statusCode).toEqual(200);
            expect(typeof res.data === 'object').toBeTruthy();
            expect(res.data).toHaveProperty('id');
            expect(res.data).toHaveProperty('docterId');
            expect(res.data).toHaveProperty('urlDoc');
        });
    });
});