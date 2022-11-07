require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mediaHandler = require('./lib/mediaHandler');
const serverError = require('./middleware/serverError');

const app = express();

const typeOtp = require('./internal/constant/typeOtp');
const validationStatus = require('./internal/constant/docterValidation');

// User Case
const CategoryUseCase = require('./usecase/category');
const DocterValidationUseCase = require('./usecase/docterValidation');

// Repository
const CategoryRepository = require('./repository/category');
const UserRepository = require('./repository/user');
const DocterValidationRepository = require('./repository/docterValidation');

// Router
const adminRouter = require('./routes/admin');
const categoryRouter = require('./routes/category');
const otpRouter = require('./routes/otp');

const categoryUC = new CategoryUseCase(new CategoryRepository(), mediaHandler);
const dockterValidationUC = new DocterValidationUseCase(
  new DocterValidationRepository(), new UserRepository(), mediaHandler, validationStatus);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.categoryUC = categoryUC;
  req.docterValidationUC = dockterValidationUC;

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
