'use strict';

const express = require(`express`);
const fs = require(`fs`).promises;
const {DEFAULT_PORT, FILE_NAME, HttpCode} = require(`../../constants`);
const {getArticle} = require(`../../utils`);
const {nanoid} = require(`nanoid`);
const {articlesPostValidationRules, commentPostValidation} = require(`./validation`);

const routes = {
  articles: `/api/articles`,
  categories: `/api/categories`,
  search: `/api/search`
};
const app = express();
app.use(express.json());

const logger = require(`pino`)({
  name: `pino-and-express`,
  level: process.env.LOG_LEVEL || `info`
});

const pino = require(`express-pino-logger`)({logger});
app.use(pino);

let mocks;

app.use(async (req, res, next) => {
  logger.debug(`Start request to url ${req.url}`);
  const fileContent = await fs.readFile(FILE_NAME);
  mocks = JSON.parse(fileContent);
  next();
});

app.get(routes.articles, (req, res) => {
  try {
    logger.info(`End request with status code ${res.statusCode}`);
    res.send(mocks);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
    logger.error(`End request with error ${err.message}`);
  }
});

app.get(`${routes.articles}/:id`, (req, res) => {
  try {
    logger.info(`End request with status code ${res.statusCode}`);
    res.send(getArticle(mocks, req.params.id));
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
    logger.error(`End request with error ${err.message}`);
  }
});

app.get(`${routes.categories}`, (req, res) => {
  try {
    logger.info(`End request with status code ${res.statusCode}`);
    res.send([...new Set(mocks.reduce((acc, cur) => [...acc, ...cur.category], []))]);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
    logger.error(`End request with error ${err.message}`);
  }
});

app.post(`${routes.articles}`, (req, res) => {
  try {
    const fields = Object.keys(articlesPostValidationRules);

    const validateField = (fieldName) => {
      const data = req.body;
      const fieldLength = articlesPostValidationRules[fieldName].length;
      if (articlesPostValidationRules[fieldName].required && !data[fieldName]) {
        return false;
      }
      if (fieldLength) {
        console.log(fieldLength, data[fieldName].length < fieldLength.min || data[fieldName].length > fieldLength.max);
        if (data[fieldName].length < fieldLength.min || data[fieldName].length > fieldLength.max) {
          return false;
        }
      }
      if (articlesPostValidationRules[fieldName].format) {
        const format = data[fieldName].split(`.`).pop();
        console.log(fieldName, format, articlesPostValidationRules[fieldName].format.includes(format));
        return format && articlesPostValidationRules[fieldName].format.includes(format);
      }
      return true;
    };

    const isValid = fields.filter(validateField).length === fields.length;

    if (isValid) {
      logger.info(`End request with status code ${res.statusCode}`);
      mocks.push(req.body);
      res.send(mocks);
    } else {
      res.status(HttpCode.BAD_REQUEST).send(`validation error`);
      logger.error(`validation error`);
    }
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
    logger.error(`End request with error ${err.message}`);
  }
});

app.put(`${routes.articles}/:id`, (req, res) => {
  try {
    logger.info(`End request with status code ${res.statusCode}`);
    const data = req.body;
    const dataFields = Object.keys(data);
    const article = getArticle(mocks, req.params.id);
    const indexOfArticle = mocks.indexOf(article);
    // eslint-disable-next-line no-return-assign
    dataFields.forEach((field) => article[field] = data[field]);
    mocks[indexOfArticle] = article;
    res.send(mocks);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
    logger.error(`End request with error ${err.message}`);
  }
});

app.delete(`${routes.articles}/:id`, (req, res) => {
  try {
    logger.info(`End request with status code ${res.statusCode}`);
    mocks = mocks.filter((item) => item.id !== req.params.id);
    res.send(mocks);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
    logger.error(`End request with error ${err.message}`);
  }
});

app.get(`${routes.articles}/:id/comments`, (req, res) => {
  try {
    logger.info(`End request with status code ${res.statusCode}`);
    res.send(getArticle(mocks, req.params.id).comments);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
    logger.error(`End request with error ${err.message}`);
  }
});

app.delete(`${routes.articles}/:id/comments/:commentId`, (req, res) => {
  try {
    logger.info(`End request with status code ${res.statusCode}`);
    const article = getArticle(mocks, req.params.id);
    const indexOfArticle = mocks.indexOf(article);
    const comments = article.comments.filter((comment) => comment.id !== req.params.commentId);
    article.comments = comments;
    mocks[indexOfArticle] = article;
    res.send(mocks);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
    logger.error(`End request with error ${err.message}`);
  }
});

app.post(`${routes.articles}/:id/comments`, (req, res) => {
  try {
    const isValid = req.body.text && req.body.text.length > commentPostValidation.text.length.min;
    if (isValid) {
      logger.info(`End request with status code ${res.statusCode}`);
      const article = getArticle(mocks, req.params.id);
      const indexOfArticle = mocks.indexOf(article);
      const newComment = {text: req.body.text, id: nanoid()};
      article.comments.push(newComment);
      mocks[indexOfArticle] = article;
      res.send(mocks);
    } else {
      res.status(HttpCode.BAD_REQUEST).send(`validation error`);
      logger.error(`validation error`);
    }
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
    logger.error(`End request with error ${err.message}`);
  }
});

app.get(`${routes.search}`, (req, res) => {
  try {
    logger.info(`End request with status code ${res.statusCode}`);
    const queryString = req.query.query;
    const searchResult = mocks.filter((item) => item.title.indexOf(queryString) !== -1);
    res.send(searchResult);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
    logger.error(`End request with error ${err.message}`);
  }
});

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`)
);

app.listen(DEFAULT_PORT, () => logger.info(`server start on ${DEFAULT_PORT}`))
  .on(`error`, (err) => logger.error(`Server can't start. Error: ${err}`));
