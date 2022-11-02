class AuthUseCase {
  constructor(
    authRepository,
    userRepository,
    emailRepository,
    bcrypt,
    func,
    lodash,
  ) {
    this._authRepository = authRepository;
    this._userRepository = userRepository;
    this._emailRepository = emailRepository;
    this._bcrypt = bcrypt;
    this._func = func;
    this._ = lodash;
  }

  async register(userData) {
    let result = {
      isSuccess: false,
      reason: null,
      statusCode: 404,
      data: null,
      token: null,
    };
    let user = await this._userRepository.getUserByUsernameAndEmail(
      userData.username,
      userData.email,
    );
    if (userData.password !== userData.confirmPassword) {
      result.reason = 'password and confrim password not match';
      return result;
    }
    if (user !== null) {
      result.reason = 'username or email not aviable';
      return result;
    }
    userData.password = this._bcrypt.hashSync(userData.password, 10);
    user = await this._authRepository.register(userData);
    let dataUser = this._.omit(user.dataValues, ['password']);
    result.isSuccess = true;
    result.statusCode = 200;
    result.data = dataUser;
    return result;
  }

  async login(username, password) {
    let result = {
      isSuccess: false,
      reason: null,
      status: 404,
      data: null,
      token: null,
    };

    let user = await this._authRepository.login(username);
    if (user == null) {
      result.reason = 'incorect email or password';
      return result;
    }
    if (!this._bcrypt.compareSync(password, user.password)) {
      result.reason = 'incorect email or password';
      return result;
    }
    let dataUser = this._.omit(user.dataValues, ['password']);
    let token = this._func.generateAccessToken(dataUser);
    result.isSuccess = true;
    result.statusCode = 200;
    result.data = dataUser;
    result.token = token;
    return result;
  }
}
module.exports = AuthUseCase;
