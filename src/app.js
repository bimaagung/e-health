require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mediaHandler = require('./lib/mediaHandler');
const serverError = require('./middleware/serverError');

const app = express();

const typeOtp = require('./internal/constant/typeOtp');

// User Case
const CategoryUseCase = require('./usecase/category');
const OTPUseCase = require('./usecase/otp');

// Repository
const CategoryRepository = require('./repository/category');
const OTPRepository = require('./repository/otp');
const EmailRepository = require('./repository/email');

// Router
const adminRouter = require('./routes/admin');
const categoryRouter = require('./routes/category');
const otpRouter = require('./routes/otp');

const categoryUC = new CategoryUseCase(new CategoryRepository(), mediaHandler);
const otpUC = new OTPUseCase(new OTPRepository(), new EmailRepository(), typeOtp);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.categoryUC = categoryUC;
  req.otpUC = otpUC;
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome E-Health');
});

app.use('/api/admin', adminRouter);
app.use('/api/category', categoryRouter);
app.use('/api/otp', otpRouter);

app.use(serverError);

module.exports = app;
