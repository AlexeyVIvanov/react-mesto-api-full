const { celebrate, Joi } = require('celebrate');

const regex = /^(https|http):\/\/(www\.)?[\w+\-._~:/?#[\]!$&'()*+,;=]+\.[a-z/]{2,}$/i;

const userSchemaValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userIdSchemaValidate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

const cardSchemaValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regex),
  }),
});

const likeSchemaValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const cardDeleteSchemaValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const profileSchemaValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const avatarSchemaValidate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regex),
  }),
});

module.exports = {
  userSchemaValidate,
  userIdSchemaValidate,
  cardSchemaValidate,
  likeSchemaValidate,
  cardDeleteSchemaValidate,
  loginValidate,
  profileSchemaValidate,
  avatarSchemaValidate,
  regex,
};
