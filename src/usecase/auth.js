class UserUseCase {
  constructor(userRepository, bcrypt, tokenManager) {
    this._userRepository = userRepository;
    this._bcrypt = bcrypt;
    this._tokenManager = tokenManager;
  }

  async login(user) {
    const result = {
      isSuccess: false,
      reason: null,
      statusCode: null,
      tokenManager: null,
    };

    // check username/email is existing
    const userResult = await this._userRepository.getUserByUsernameOrEmail(user.usernameOrEmail);

    if (userResult === null) {
      result.reason = 'username and password incorrect';
      result.statusCode = 400;
      return result;
    }

    // compare password
    const comparePassword = await this._bcrypt.compareSync(user.password, userResult.password);

    if (comparePassword === null) {
      result.reason = 'username and password incorrect';
      result.statusCode = 400;
      return result;
    }

    const userObj = {
      id: userResult.id,
      username: userResult.username,
      first_name: userResult.firstName,
      last_name: userResult.lastName,
      email: userResult.email,
    };

    // getToken
    const tokenManager = await this._tokenManager.generateToken(userObj);

    result.isSuccess = true;
    result.statusCode = 200;
    result.token = tokenManager;

    return result;
  }
}

module.exports = UserUseCase;
