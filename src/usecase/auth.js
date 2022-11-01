class Auth {
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
    result.status = 200;
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

    let user = await this.AuthRepository.loginUser(username);
    if (user == null) {
      result.reason = 'incorect email or password';
      return result;
    }
    if (!this.bcrypt.compareSync(password, user.password)) {
      result.reason = 'incorect email or password';
      return result;
    }
    let dataUser = this._.omit(user.dataValues, ['password']);
    let token = this.generateToken(dataUser);
    result.isSuccess = true;
    result.status = 200;
    result.data = dataUser;
    result.token = token;
    return result;
  }
  async loginGoogle(idToken) {
    let result = {
      isSuccess: false,
      reason: null,
      status: 404,
      data: null,
      token: null,
    };

    let data = await this.googleOauth(idToken);
    let user = await this.AuthRepository.loginWithGoogle(data.email);

    if (user == null) {
      const userData = {
        name: data.name,
        username: data.given_name + this.func.generateRandomNumber(3),
        image: this.defaultImage.DEFAULT_AVATAR,
        email: data.email,
        is_admin: false,
      };
      user = await this.AuthRepository.registerUser(userData);
    }
    let dataUser = this._.omit(user.dataValues, ['password']);
    let token = this.generateToken(dataUser);

    result.isSuccess = true;
    result.status = 200;
    result.data = user;
    result.data = dataUser;
    result.token = token;
    return result;
 }
}
module.exports = Auth;
