'use strict';

const {Router} = require(`express`);
const category = require(`./categories`);
const article = require(`./articles`);
const search = require(`./search`);
const {
  CategoryService,
  SearchService,
  ArticleService,
  CommentService,
} = require(`../data-service`);
const getMockData = require(`../lib/getMocksData`);

// const sequelize = require(`../lib/sequelize`);
// const defineModels = require(`../models`);

const app = new Router();

// defineModels(sequelize);

(async () => {
  const mocks = await getMockData();
  category(app, new CategoryService(mocks));
  search(app, new SearchService(mocks));
  article(app, new ArticleService(mocks), new CommentService(mocks));
})();

module.exports = app;
