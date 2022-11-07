const OTPUseCase = require('../../usecase/otp');
const emailMock = require('../mock/email.mock');
const otpMock = require('../mock/otp.mock');
const typeOtp = require('../../internal/constant/typeOtp')

let mockOTPReturn, mockEmailReturn = {};
let OTPUC = null;

describe('otp test', () => {
  beforeEach(() => {
    mockOTPReturn = {
      verifyOTPByEmail: jest.fn().mockReturnValue(otpMock.otp),
      addOTP: jest.fn().mockReturnValue(otpMock.otp),
      deleteOTP:jest.fn().mockReturnValue(true),
    }

    mockEmailReturn = {
      sendEmail: jest.fn().mockReturnValue(true),
      verifyEmail: jest.fn().mockReturnValue(emailMock.getEmail),
    }

    OTPUC = new OTPUseCase(mockOTPReturn, mockEmailReturn, typeOtp);
  });

  describe('generateOTP', () => {
    test("should isSuccess true , statusCode is 200 and reason 'check your email'", async () => {
      mockOTPReturn.verifyOTPByEmail = jest.fn().mockReturnValue(null),
      OTPUC = new OTPUseCase(mockOTPReturn, mockEmailReturn, typeOtp);

      let res = await OTPUC.generateOTP('test@example.com', 'REGISTRATION');

      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
      expect(res.reason).toEqual('check your email');
      
    });

    test("should isSuccess failed and reason is 'type otp not found'", async () => {
      const res = await OTPUC.generateOTP('test@example.com', 'REGISTERED');

      expect(res.isSuccess).toBeFalsy();
      expect(res.statusCode).toEqual(404);
      expect(res.reason).toEqual('type otp not found');
    });

    test("should isSuccess failed and reason is 'waiting otp until recode'", async () => {
      const res = await OTPUC.generateOTP('test@example.com', 'REGISTRATION');

      expect(res.isSuccess).toBeFalsy();
      expect(res.statusCode).toEqual(400);
    });
  });
});
