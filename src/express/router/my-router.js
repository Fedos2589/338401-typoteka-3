"use strict";
const {Router} = require(`express`);
const {NOTES} = require(`../../constants`);
const myRouter = new Router();

myRouter.get(`/`, (req, res) => {
  const pageContent = {
    title: `publications`,
    notes: NOTES
  };

  res.render(`my`, pageContent);
});
myRouter.get(`/comments`, (req, res) => {
  const pageContent = {
    title: `my comments`,
  };

  res.render(`login`, pageContent);
});

module.exports = myRouter;
