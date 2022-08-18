const Card = require('../models/card');

const NotFoundError = require('../utils/errors/not-found');

const ForbiddenError = require('../utils/errors/forbidden');

const BadRequestError = require('../utils/errors/bad-request');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const owner = req.user._id;
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      if (owner !== card.owner._id.toString()) {
        throw new ForbiddenError('У вас нет прав на удаление карточки');
      }
      return Card.deleteOne(card)
        .then(() => {
          res.send({ data: card });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неверный запрос'));
      } else {
        next(err);
      }
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверный запрос'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    }
    res.send({ data: user });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Неверный запрос'));
    } else {
      next(err);
    }
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    }
    res.send({ data: user });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Неверный запрос'));
    } else {
      next(err);
    }
  });
