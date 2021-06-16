"use strict";
const {Router} = require(`express`);
const categoriesRouter = new Router();
const {THEMES} = require(`../../constants`);

categoriesRouter.get(`/`, (req, res) => {
  const pageContent = {
    title: `categories`,
    themes: THEMES
  };

  res.render(`all-categories`, pageContent);
});

module.exports = categoriesRouter;
