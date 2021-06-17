"use strict";
const {Router} = require(`express`);
const searchRouter = new Router();

searchRouter.get(`/`, (req, res) => {
  const pageContent = {
    title: `search`,
  };

  res.render(`search`, pageContent);
});

module.exports = searchRouter;
