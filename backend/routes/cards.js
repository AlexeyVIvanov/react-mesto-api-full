const router = require('express').Router();

const { cardSchemaValidate, likeSchemaValidate, cardDeleteSchemaValidate } = require('../utils/celebrate/celebrate');

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:cardId', cardDeleteSchemaValidate, deleteCard);
router.post('/', cardSchemaValidate, createCard);
router.put('/:cardId/likes', likeSchemaValidate, likeCard);
router.delete('/:cardId/likes', likeSchemaValidate, dislikeCard);

module.exports = router;
