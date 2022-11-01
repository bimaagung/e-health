require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mediaHandler = require('./lib/mediaHandler');
const serverError = require('./middleware/serverError');

const app = express();

// User Case
const CategoryUseCase = require('./usecase/category');

// Repository
const CategoryRepository = require('./repository/category');

// Router
const adminRouter = require('./routes/admin');
const categoryRouter = require('./routes/category');

const categoryUC = new CategoryUseCase(new CategoryRepository(), mediaHandler);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.categoryUC = categoryUC;

  next();
});

app.get('/', (req, res) => {
  res.send('Welcome E-Health');
});

app.use('/api/admin', adminRouter);
app.use('/api/category', categoryRouter);

app.use(serverError);

module.exports = app;
