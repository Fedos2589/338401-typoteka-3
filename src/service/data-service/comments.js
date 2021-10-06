'use strict';

const {nanoid} = require(`nanoid`);

class CommentService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll(articleId) {
    const currentArticle = this._articles.find((article) => article.id === articleId);
    return currentArticle.comments;
  }

  findOne(articleId, commentId) {
    const comments = this.findAll(articleId);
    return comments.find((comment) => comment.id === commentId);
  }

  drop(articleId, commentId) {
    const currentArticle = this._articles.find((article) => article.id === articleId);
    const indexOfArticle = this._articles.indexOf(currentArticle);
    const comments = currentArticle.comments.filter((comment) => comment.id !== commentId);
    currentArticle.comments = comments;
    this._articles[indexOfArticle] = currentArticle;
    return currentArticle;
  }

  create(articleId, text) {
    const currentArticle = this._articles.find((article) => article.id === articleId);
    const indexOfArticle = this._articles.indexOf(currentArticle);
    const newComment = {text, id: nanoid()};
    currentArticle.comments.push(newComment);
    this._articles[indexOfArticle] = currentArticle;
    return currentArticle;
  }
}

module.exports = CommentService;
