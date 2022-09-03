require('dotenv').config();

const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../utils/errors/unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (e) {
    next(new UnauthorizedError('Необходима авторизация'));

    // пропускаем запрос дальше
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // ???????????
};
