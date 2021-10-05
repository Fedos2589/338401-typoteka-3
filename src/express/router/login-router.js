"use strict";
const {Router} = require(`express`);
const loginRouter = new Router();

loginRouter.get(`/`, (req, res) => {
  const pageContent = {
    title: `title`
  };

  res.render(`login`, pageContent);
});

module.exports = loginRouter;
