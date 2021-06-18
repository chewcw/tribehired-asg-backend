const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

const { models } = require('./models');
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const registerRouter = require('./routes/register');

const app = express();

app.use(cors({
    origin: '*',
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, _, next) => {
    req.context = {
        models,
    };
    next();
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/register', registerRouter);

module.exports = app;
