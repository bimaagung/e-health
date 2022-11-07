require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mediaHandler = require('./lib/mediaHandler');
const serverError = require('./middleware/serverError');
const tokenManager = require('./helper/tokenManager');

const app = express();

const typeOtp = require('./internal/constant/typeOtp');

// User Case
const CategoryUseCase = require('./usecase/category');
const OTPUseCase = require('./usecase/otp');
const AuthseCase = require('./usecase/auth');

// Repository
const CategoryRepository = require('./repository/category');
const OTPRepository = require('./repository/otp');
const EmailRepository = require('./repository/email');
const UserRepository = require('./repository/user');

// Router
const adminRouter = require('./routes/admin');
const categoryRouter = require('./routes/category');
const otpRouter = require('./routes/otp');
const authRouter = require('./routes/auth');

const categoryUC = new CategoryUseCase(new CategoryRepository(), mediaHandler);
const otpUC = new OTPUseCase(new OTPRepository(), new EmailRepository(), typeOtp);
const userUC = new AuthseCase(new UserRepository(), bcrypt, tokenManager);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.categoryUC = categoryUC;
  req.otpUC = otpUC;
  req.userUC = userUC;
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome E-Health');
});

app.use('/api/admin', adminRouter);
app.use('/api/category', categoryRouter);
app.use('/api/otp', otpRouter);
app.use('/api/auth', authRouter);

app.use(serverError);

module.exports = app;
