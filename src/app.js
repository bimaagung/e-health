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
const validationStatus = require('./internal/constant/doctorValidation');

// User Case
const CategoryUseCase = require('./usecase/category');
const OTPUseCase = require('./usecase/otp');
const AuthseCase = require('./usecase/auth');
const DoctorValidationUseCase = require('./usecase/doctorValidation');
const ApprovedValidationUseCase = require('./usecase/apporvedValidation');
const AvailableScheduleUseCase = require('./usecase/availableSchedule');

// Repository
const CategoryRepository = require('./repository/category');
const OTPRepository = require('./repository/otp');
const EmailRepository = require('./repository/email');
const UserRepository = require('./repository/user');
const DoctorValidationRepository = require('./repository/doctorValidation');
const AvailableScheduleRepository = require('./repository/availableSchedule');

// Router
const adminRouter = require('./routes/admin');
const categoryRouter = require('./routes/category');
const otpRouter = require('./routes/otp');
const authRouter = require('./routes/auth');
const doctorValidationRouter = require('./routes/docterValidation');
const availableScheduleRouter = require('./routes/availableSchedule');

const categoryUC = new CategoryUseCase(new CategoryRepository(), mediaHandler);
const otpUC = new OTPUseCase(new OTPRepository(), new EmailRepository(), typeOtp);
const authUC = new AuthseCase(new UserRepository(), new OTPRepository(), bcrypt, tokenManager, mediaHandler);
const doctorValidationUC = new DoctorValidationUseCase(new DoctorValidationRepository(), new UserRepository(), mediaHandler, validationStatus);
const approvedValidationUC = new ApprovedValidationUseCase(new DoctorValidationRepository(), new UserRepository(), validationStatus, _);
const availableScheduleUC = new AvailableScheduleUseCase(new AvailableScheduleRepository(), new DoctorValidationRepository(), _);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.categoryUC = categoryUC;
  req.otpUC = otpUC;
  req.authUC = authUC;
  req.doctorValidationUC = doctorValidationUC;
  req.approvedValidationUC = approvedValidationUC;
  req.availableScheduleUC = availableScheduleUC;
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome E-Health');
});

app.use('/api/admin', adminRouter);
app.use('/api/category', categoryRouter);
app.use('/api/otp', otpRouter);
app.use('/api/auth', authRouter);
app.use('/api/doctor', doctorValidationRouter);
app.use('/api/schedule', availableScheduleRouter);

app.use(serverError);

module.exports = app;
