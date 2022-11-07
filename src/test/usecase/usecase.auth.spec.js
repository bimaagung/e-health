const AuthUseCase = require('../../usecase/auth');
const userMock = require('../mock/user.mock');
const otpMock = require('../mock/otp.mock');


let mockUserReturn, mockOTPReturn,bcrypt, tokenManager, mockRoleReturn, mockMediaHandler= {};
let userUC = null;

describe('user test', () => {
  beforeEach(() => {
    mockUserReturn = {
      getUserByUsernameOrEmail: jest.fn().mockReturnValue(userMock.user),
      addUser: jest.fn().mockReturnValue(userMock.user),
      verifyPhoneNumber: jest.fn().mockReturnValue(userMock.user),
    }

    bcrypt = {
        compareSync: jest.fn().mockReturnValue(true),
        hashSync: jest.fn().mockReturnValue('sdjsdkjnfjfw&*23672(%^SHGHGSjhsjkh87623')
    }

    mockMediaHandler = {
      cloudinaryUpload: jest.fn().mockReturnValue('https://cloudinary.com/upload/image.png'),
    }

    mockOTPReturn = {
      verifyOTPByOTPCode : jest.fn().mockReturnValue(otpMock.otp)
    }

    tokenManager = {
        generateToken: jest.fn().mockReturnValue(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
        eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
        SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`)
    }


    userUC = new AuthUseCase(mockUserReturn, mockOTPReturn, bcrypt, tokenManager, mockMediaHandler);
  });

  describe('login test', () => {

    user = {
        'usernameOrEmail' : 'test',
        'password': '12345678',
    }

    test("should isSuccess true , statusCode is 200 and data is valid", async () => {
      userUC = new AuthUseCase(mockUserReturn, mockOTPReturn, bcrypt, tokenManager, mockMediaHandler);

      const res = await userUC.login(user);

      expect(mockUserReturn.getUserByUsernameOrEmail).toHaveBeenCalled();
      expect(bcrypt.compareSync).toHaveBeenCalled();
      expect(tokenManager.generateToken).toHaveBeenCalledWith({
        id: 1,
        username: 'test',
        first_name: 'test',
        last_name: 'unit',
        email: 'test@example.com',
    });
      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
      expect(res).toHaveProperty('token');
      expect(typeof res.token === 'string').toBeTruthy();
    });

    test("when username/email not found should isSuccess is false, statusCode is 400 and reason is 'username and password incorrect'", async () => {
        mockUserReturn.getUserByUsernameOrEmail = jest.fn().mockReturnValue(null),
        userUC = new AuthUseCase(mockUserReturn, mockOTPReturn, bcrypt, tokenManager, mockMediaHandler);
        const res = await userUC.login(user);

      expect(mockUserReturn.getUserByUsernameOrEmail).toHaveBeenCalled();
      expect(res.isSuccess).toBeFalsy();
      expect(res.statusCode).toEqual(400);
      expect(res.reason).toEqual('username and password incorrect');
    });

    test("when password incorrect should isSuccess is false, statusCode is 400 and reason is 'username and password incorrect'", async () => {
      bcrypt.compareSync = jest.fn().mockReturnValue(null);
      userUC = new AuthUseCase(mockUserReturn, mockOTPReturn, bcrypt, tokenManager, mockMediaHandler);

      const res = await userUC.login(user);
      
      expect(bcrypt.compareSync).toHaveBeenCalled();
      expect(res.isSuccess).toBeFalsy();
      expect(res.statusCode).toEqual(400);
      expect(res.reason).toEqual('username and password incorrect');
    });
  });

  describe('register test', () => {
    let user = {}

    beforeEach(() => {
      user = {
        username: "test",
        firstName: "test",
        lastName: "unit",
        email: "test@example.com",
        password: "12345678",
        confirmPassword: "12345678",
        phone: "086473674763",
        otp_code : "512312",
        file : {path: "C:/Image.png"}, 
        roleId: 3
      }
    })

    test("should isSuccess true , statusCode is 200 and data is valid", async () => {
      mockUserReturn.getUserByUsernameOrEmail = jest.fn().mockReturnValue(null);
      mockUserReturn.verifyPhoneNumber = jest.fn().mockReturnValue(null);
      userUC = new AuthUseCase(mockUserReturn, mockOTPReturn, bcrypt, tokenManager, mockMediaHandler);

      const res = await userUC.register(user);

      expect(mockOTPReturn.verifyOTPByOTPCode).toHaveBeenCalled();
      expect(mockUserReturn.getUserByUsernameOrEmail).toHaveBeenCalled();
      expect(mockUserReturn.verifyPhoneNumber).toHaveBeenCalled();
      expect(mockUserReturn.addUser).toHaveBeenCalled();
      expect(bcrypt.hashSync).toHaveBeenCalled();
      expect(tokenManager.generateToken).toHaveBeenCalledWith({
        id: 1,
        firstName: "test",
        lastName: "unit",
        username: "test",
        email: "test@example.com",
        avatar: "https://cloudinary.com/upload/image.png",
        roleId: 3
    });
      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
      expect(typeof res.data.user === 'object').toBeTruthy();
      expect(res.data).toHaveProperty('token');
      expect(res.data.user).toHaveProperty('id');
      expect(res.data.user).toHaveProperty('firstName');
      expect(res.data.user).toHaveProperty('lastName');
      expect(res.data.user).toHaveProperty('username');
      expect(res.data.user).toHaveProperty('email');
      expect(res.data.user).toHaveProperty('avatar');
      expect(res.data.user).toHaveProperty('roleId');
    });

    test("when photo undefined/null should isSuccess is true, statusCode is 200 and data is valid", async () => {
      user.file = undefined;

      mockUserReturn.getUserByUsernameOrEmail = jest.fn().mockReturnValue(null);
      mockUserReturn.verifyPhoneNumber = jest.fn().mockReturnValue(null);
      userUC = new AuthUseCase(mockUserReturn, mockOTPReturn, bcrypt, tokenManager, mockMediaHandler);

      const res = await userUC.register(user);

      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
      expect(typeof res.data.user === 'object').toBeTruthy();
      expect(res.data).toHaveProperty('token');
      expect(res.data.user).toHaveProperty('id');
      expect(res.data.user).toHaveProperty('firstName');
      expect(res.data.user).toHaveProperty('lastName');
      expect(res.data.user).toHaveProperty('username');
      expect(res.data.user).toHaveProperty('email');
      expect(res.data.user).toHaveProperty('avatar');
      expect(res.data.user.avatar).toEqual(`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`);
      expect(res.data.user).toHaveProperty('roleId');

    });

    test("when email/username existing should isSuccess is false, statusCode is 400 and reason is 'username or email is existing'", async () => {
      const res = await userUC.register(user);
      
      expect(res.isSuccess).toBeFalsy();
      expect(res.statusCode).toEqual(400);
      expect(res.reason).toEqual('username or email is existing');
    });

    test("when phone number existing should isSuccess is false, statusCode is 400 and reason is 'phone already used'", async () => {
      mockUserReturn.getUserByUsernameOrEmail = jest.fn().mockReturnValue(null);
      userUC = new AuthUseCase(mockUserReturn, mockOTPReturn, bcrypt, tokenManager, mockMediaHandler);

      const res = await userUC.register(user);
      
      expect(res.isSuccess).toBeFalsy();
      expect(res.statusCode).toEqual(400);
      expect(res.reason).toEqual('phone already used');
    });

    test("invalid otp code should isSuccess is false, statusCode is 400 and reason is 'invalid otp'", async () => {
      mockOTPReturn.verifyOTPByOTPCode = jest.fn().mockReturnValue(null)
    
      userUC = new AuthUseCase(mockUserReturn, mockOTPReturn, bcrypt, tokenManager, mockMediaHandler);

      const res = await userUC.register(user);

      expect(res.isSuccess).toBeFalsy();
      expect(res.statusCode).toEqual(400);
      expect(res.reason).toEqual('invalid otp');
    });

    test("password  and confirm passwor not match should isSuccess is false, statusCode is 400 and reason is 'invalid password and confirm password'", async () => {
      user.confirmPassword = "hdj7849",

      mockOTPReturn.verifyOTPByOTPCode = jest.fn().mockReturnValue(null)
    
      userUC = new AuthUseCase(mockUserReturn, mockOTPReturn, bcrypt, tokenManager, mockMediaHandler);

      const res = await userUC.register(user);
      
      expect(res.isSuccess).toBeFalsy();
      expect(res.statusCode).toEqual(400);
      expect(res.reason).toEqual('invalid password and confirm password');
    });

  });
});
