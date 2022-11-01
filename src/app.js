require('dotenv').config();

const express = require('express');
const cors = require('cors');
const _ = require('lodash');
const func = require('./libs/function');
const mediaHandler = require('./lib/mediaHandler');
const serverError = require('./middleware/serverError');

const app = express();

// User Case
const AuthUseCase = require('./usecase/auth');
const CategoryUseCase = require('./usecase/category');

// Repository
const AuthRepository = require('./repository/auth');
const UserRepository = require('./repository/user');
const OtpRepository = require('./repository/otp');
const EmailRepository = require('./repository/email');
const CategoryRepository = require('./repository/category');

// Router
const adminRouter = require('./routes/admin');

const authUC = new AuthUseCase(
  new AuthRepository(),
  new UserRepository(),
  new EmailRepository(),
  new OtpRepository(), 
  func,
  _,
);
const categoryUC = new CategoryUseCase(new CategoryRepository(), mediaHandler);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.authUC = authUC;
  req.categoryUC = categoryUC;

  next();
});

app.get('/', (req, res) => {
  res.send('Welcome E-Health');
});

app.use('/api/admin', adminRouter);

app.use(serverError);

module.exports = app;
