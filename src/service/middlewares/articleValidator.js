'use strict';
const Joi = require(`joi`);
const {HttpCode} = require(`../../constants`);

const ErrorOfferMessage = {
  TITLE_MIN: `Заголовок содержит меньше 30 символов`,
  TITLE_MAX: `Заголовок не может содержать более 250 символов`,
  IMAGE: `Изображение не выбрано или тип изображения не поддерживается`,
  DATE: `Дата не указана`,
  CATEGORIES: `Не выбрана ни одна категория объявления`,
  ANNOUNCE_MIN: `Описание содержит меньше 30 символов`,
  ANNOUNCE_MAX: `Описание не может содержать более 250 символов`,
  TEXT: `Текс статьи не может содержать более 1000 символов`,
};

const schema = Joi.object({
  title: Joi.string().min(30).max(250).required().messages({
    'string.min': ErrorOfferMessage.TITLE_MIN,
    'string.max': ErrorOfferMessage.TITLE_MAX
  }),
  image: Joi.string().required().messages({
    'string.empty': ErrorOfferMessage.IMAGE,
  }),
  createdDate: Joi.string().required().messages({
    'string.empty': ErrorOfferMessage.DATE,
  }),
  category: Joi.array().items(Joi.string()).min(1).required().messages({
    'array.min': ErrorOfferMessage.CATEGORIES
  }),
  announce: Joi.string().min(30).max(250).required().messages({
    'string.min': ErrorOfferMessage.ANNOUNCE_MIN,
    'string.max': ErrorOfferMessage.ANNOUNCE_MAX
  }),
  fullText: Joi.string().max(1000).required().messages({
    'string.max': ErrorOfferMessage.TEXT
  }),
});

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const {error} = schema.validate(newArticle, {abortEarly: true});

  if (error) {
    return res.status(HttpCode.BAD_REQUEST)
      .send(error.details.map((err) => err.message).join(`\n`));
  }

  return next();
};
