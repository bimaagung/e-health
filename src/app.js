require('dotenv').config();

const express = require('express');
const cors = require('cors');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const func = require('./libs/function');
const emailMessage = require('./internal/constant/emailMessage')
const mediaHandler = require('./lib/mediaHandler');
const serverError = require('./middleware/serverError');

const app = express();

// User Case
const AuthUseCase = require('./usecase/auth');
const CategoryUseCase = require('./usecase/category');
const OtpUseCase = require('./usecase/otp');

// Repository
const AuthRepository = require('./repository/auth');
const UserRepository = require('./repository/user');
const OtpRepository = require('./repository/otp');
const EmailRepository = require('./repository/email');
const CategoryRepository = require('./repository/category');

// Router
const authRouter = require('./routes/auth');
const otpRouter = require('./routes/otp');
const adminRouter = require('./routes/admin');

const authUC = new AuthUseCase(
  new AuthRepository(),
  new UserRepository(),
  new EmailRepository(),
  new OtpRepository(),
  bcrypt,
  func,
  _,
);
const categoryUC = new CategoryUseCase(new CategoryRepository(), mediaHandler);
const OtpUC = new OtpUseCase(new OtpRepository(), new EmailRepository(), emailMessage)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.authUC = authUC;
  req.categoryUC = categoryUC;
  req.otpUC = OtpUC;

  next();
});

app.get('/', (req, res) => {
  res.send('Welcome E-Health');
});

app.use('/api', authRouter);
app.use('/api', otpRouter);
app.use('/api/admin', adminRouter);
app.use(serverError);

module.exports = app;
