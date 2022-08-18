const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const { errors } = require('celebrate');

const { login, createUser } = require('./controllers/users');

const { userSchemaValidate, loginValidate } = require('./utils/celebrate/celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { auth } = require('./middlewares/auth');

const NotFoundError = require('./utils/errors/not-found');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger); // подключаем логгер запросов

app.post('/signin', loginValidate, login);
app.post('/signup', userSchemaValidate, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use('/', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'Внутренняя ошибка сервера'
        : message,
    });
  next();
});

app.listen(PORT);
