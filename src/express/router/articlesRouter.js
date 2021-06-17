"use strict";
const {Router} = require(`express`);
const {THEMES, PREVIEWS} = require(`../../constants`);
const articlesRouter = new Router();

articlesRouter.get(`/category/:id`, (req, res) => {
  const pageContent = {
    title: `/category/:id`,
  };

  res.render(`articles-by-category`, pageContent);
});

articlesRouter.get(`/add`, (req, res) => {
  const pageContent = {
    title: `add`,
  };

  res.render(`articles-by-category`, pageContent);
});

articlesRouter.get(`/edit/:id`, (req, res) => {
  const pageContent = {
    title: `/edit/:id`,
  };

  res.render(`articles-by-category`, pageContent);
});

articlesRouter.get(`/:id`, (req, res) => {
  const pageContent = {
    title: `/:id`,
    themes: THEMES,
    previews: PREVIEWS,
  };

  res.render(`articles-by-category`, pageContent);
});

module.exports = articlesRouter;
