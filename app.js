require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const validationErrors = require('celebrate').errors;

const rootRouter = require('./routes/index');

const errors = require('./middlewares/error');

const PORT = process.env.PORT || 3000;
const DATABASE = process.env.DATABASE || 'mongodb://localhost:27017/mestodb';

const app = express();

mongoose.connect(DATABASE);

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use('/', rootRouter);
app.use(validationErrors());
app.use(errors);

app.listen(PORT);
