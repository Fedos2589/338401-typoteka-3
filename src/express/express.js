"use strict";
const express = require(`express`);
const path = require(`path`);
const articlesRouter = require(`./router/articlesRouter`);
const categoriesRouter = require(`./router/categoriesRouter`);
const loginRouter = require(`./router/loginRouter`);
const myRouter = require(`./router/myRouter`);
const registerRouter = require(`./router/registerRouter`);
const searchRouter = require(`./router/searchRouter`);
const {THEMES, HOTLIST, COMMENTS, PREVIEWS} = require(`../constants`);
const port = 8080;
const app = express();

app.set(`views`, path.join(__dirname, `./templates`));
app.set(`view engine`, `pug`);
app.use(`/static`, express.static(path.join(__dirname, `./public`)));

app.get(`/`, (req, res) => {
  const pageContent = {
    title: `Main Page`,
    themes: THEMES,
    hotlist: HOTLIST,
    comments: COMMENTS,
    previews: PREVIEWS,
    pageCount: 5,
    activePage: 2,
  };

  res.render(`main`, pageContent);
});

app.get(`/post`, (req, res) => {
  const pageContent = {
    title: `post`,
    themes: THEMES,
    comments: COMMENTS,
  };

  res.render(`post`, pageContent);
});

app.get(`/comments`, (req, res) => {
  const pageContent = {
    title: `comments`,
    comments: COMMENTS,
  };

  res.render(`comments`, pageContent);
});

app.get(`/new`, (req, res) => {
  const pageContent = {
    title: `new post`,
  };

  res.render(`new-post`, pageContent);
});

app.get(`/500`, (req, res) => {
  const pageContent = {
    title: `500`,
  };

  res.render(`500`, pageContent);
});

app.get(`/404`, (req, res) => {
  const pageContent = {
    title: `404`,
  };

  res.render(`404`, pageContent);
});

app.use(`/articles`, articlesRouter);
app.use(`/categories`, categoriesRouter);
app.use(`/login`, loginRouter);
app.use(`/my`, myRouter);
app.use(`/register`, registerRouter);
app.use(`/search`, searchRouter);

app.listen(port, () => console.log(`Сервер запущен на порту: ${port}`));
