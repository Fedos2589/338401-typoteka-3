"use strict";
const {Router} = require(`express`);
const registerRouter = new Router();

registerRouter.get(`/`, (req, res) => {
  const pageContent = {
    title: `sign`,
  };

  res.render(`sign-up`, pageContent);
});

module.exports = registerRouter;
