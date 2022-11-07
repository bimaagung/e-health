const AuthUseCase = require('../../usecase/auth');
const userMock = require('../mock/user.mock');

let mockUserReturn, bcrypt, token= {};
let userUC = null;

describe('user test', () => {
  beforeEach(() => {
    mockUserReturn = {
      getUserByUsernameOrEmail: jest.fn().mockReturnValue(userMock.user),
    }

    bcrypt = {
        compareSync: jest.fn().mockReturnValue('sdjsdkjnfjfw&*23672(%^SHGHGSjhsjkh87623')
    }

    tokenManager = {
        generateToken: jest.fn().mockReturnValue(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
        eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
        SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`)
    }


    userUC = new AuthUseCase(mockUserReturn, bcrypt, tokenManager);
  });

  describe('login test', () => {

    user = {
        'usernameOrEmail' : 'test',
        'password': '12345678',
    }

    test("should isSuccess true , statusCode is 200 and data is valid", async () => {
      userUC = new AuthUseCase(mockUserReturn, bcrypt, tokenManager);

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
        userUC = new AuthUseCase(mockUserReturn, bcrypt, token);

        const res = await userUC.login(user);

      expect(mockUserReturn.getUserByUsernameOrEmail).toHaveBeenCalled();
      expect(res.isSuccess).toBeFalsy();
      expect(res.statusCode).toEqual(400);
      expect(res.reason).toEqual('username and password incorrect');
    });

    test("when password incorrect should isSuccess is false, statusCode is 400 and reason is 'username and password incorrect'", async () => {
      bcrypt.compareSync = jest.fn().mockReturnValue(null);
      userUC = new AuthUseCase(mockUserReturn, bcrypt, token);

      const res = await userUC.login(user);
      
      expect(bcrypt.compareSync).toHaveBeenCalled();
      expect(res.isSuccess).toBeFalsy();
      expect(res.statusCode).toEqual(400);
      expect(res.reason).toEqual('username and password incorrect');
    });
  });
});
