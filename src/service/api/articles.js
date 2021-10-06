'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const articleExists = require(`../middlewares/article-exists`);
const articleValidator = require(`../middlewares/article-validator`);
const commentExists = require(`../middlewares/comment-exists`);
const commentValidator = require(`../middlewares/comment-validator`);
const routeParamsValidator = require(`../middlewares/route-params-validator`);

module.exports = (app, articleService, commentService) => {
  const router = new Router();

  app.use(`/articles`, router);

  router.get(`/`, async (req, res) => {
    const articles = await articleService.findAll();
    res.status(HttpCode.OK)
      .json(articles);
  });

  router.get(`/:articleId`, [routeParamsValidator, articleExists(articleService)], async (req, res) => {
    const {articleId} = req.params;
    const article = await articleService.findOne(articleId);
    res.status(HttpCode.OK).json(article);
  });

  router.post(`/`, articleValidator, async (req, res) => {
    const article = await articleService.create(req.body);
    res.status(HttpCode.CREATED)
      .json(article);
  });

  router.put(`/:articleId`, [routeParamsValidator, articleExists(articleService), articleValidator], async (req, res) => {
    const {articleId} = req.params;
    const article = await articleService.update(articleId, req.body);
    res.status(HttpCode.OK)
      .json(article);
  });

  router.delete(`/:articleId`, [routeParamsValidator, articleExists(articleService)], async (req, res) => {
    const {articleId} = req.params;
    const article = await articleService.drop(articleId);
    res.status(HttpCode.OK)
      .json(article);
  });

  router.get(`/:articleId/comments`, [routeParamsValidator, articleExists(articleService)], async (req, res) => {
    const {articleId} = req.params;
    const comments = await commentService.findAll(articleId);
    res.status(HttpCode.OK)
      .json(comments);
  });

  router.delete(`/:articleId/comments/:commentId`, [routeParamsValidator, articleExists(articleService), commentExists(commentService)], async (req, res) => {
    const {articleId, commentId} = req.params;
    const article = await commentService.drop(articleId, commentId);
    res.status(HttpCode.OK)
      .json(article.comments);
  });

  router.post(`/:articleId/comments`, [routeParamsValidator, articleExists(articleService), commentValidator], async (req, res) => {
    const {articleId} = req.params;
    const article = await commentService.create(articleId, req.body);
    res.status(HttpCode.CREATED)
      .json(article);
  });
};
