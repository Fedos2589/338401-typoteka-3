"use strict";
const express = require(`express`);
const articlesRouter = require(`./router/articlesRouter`);
const categoriesRouter = require(`./router/categoriesRouter`);
const loginRouter = require(`./router/loginRouter`);
const myRouter = require(`./router/myRouter`);
const registerRouter = require(`./router/registerRouter`);
const searchRouter = require(`./router/searchRouter`);
const port = 8080;
const app = express();

app.get(`/`, (req, res) => res.send(`/`));
app.use(`/articles`, articlesRouter);
app.use(`/categories`, categoriesRouter);
app.use(`/login`, loginRouter);
app.use(`/my`, myRouter);
app.use(`/register`, registerRouter);
app.use(`/search`, searchRouter);

app.listen(port, () => console.log(`Сервер запущен на порту: ${port}`));
