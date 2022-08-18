const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../utils/errors/unauthorized');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (e) {
    next(new UnauthorizedError('Необходима авторизация'));

    // пропускаем запрос дальше
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // ???????????
};
