require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const mediaHandler = require('./libs/mediaHandler');
const serverError = require('./middleware/serverError');
const tokenManager = require('./helper/tokenManager');

const app = express();

const typeOtp = require('./internal/constant/typeOtp');
const validationStatus = require('./internal/constant/docterValidation');

// User Case
const CategoryUseCase = require('./usecase/category');
const OTPUseCase = require('./usecase/otp');
const AuthseCase = require('./usecase/auth');
const DocterValidationUseCase = require('./usecase/docterValidation');
const ApprovedValidationUseCase = require('./usecase/apporvedValidation');

// Repository
const CategoryRepository = require('./repository/category');
const OTPRepository = require('./repository/otp');
const EmailRepository = require('./repository/email');
const UserRepository = require('./repository/user');
const DocterValidationRepository = require('./repository/docterValidation');

// Router
const adminRouter = require('./routes/admin');
const categoryRouter = require('./routes/category');
const otpRouter = require('./routes/otp');
const authRouter = require('./routes/auth');
const docterValidationRouter = require('./routes/docterValidation');

const categoryUC = new CategoryUseCase(new CategoryRepository(), mediaHandler);
const otpUC = new OTPUseCase(new OTPRepository(), new EmailRepository(), typeOtp);
const authUC = new AuthseCase(new UserRepository(), new OTPRepository(), bcrypt, tokenManager, mediaHandler);
const docterValidationUC = new DocterValidationUseCase(new DocterValidationRepository(), new UserRepository(), mediaHandler, validationStatus);
const approvedValidationUC = new ApprovedValidationUseCase(new DocterValidationRepository(), new UserRepository(), validationStatus, _);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.categoryUC = categoryUC;
  req.otpUC = otpUC;
  req.authUC = authUC;
  req.docterValidationUC = docterValidationUC;
  req.approvedValidationUC = approvedValidationUC;
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome E-Health');
});

app.use('/api/admin', adminRouter);
app.use('/api/category', categoryRouter);
app.use('/api/otp', otpRouter);
app.use('/api/auth', authRouter);
app.use('/api/docter', docterValidationRouter);

app.use(serverError);

module.exports = app;
