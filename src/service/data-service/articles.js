'use strict';

const {nanoid} = require(`nanoid`);

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((article) => article.id === id);
  }

  create(article) {
    const newArticle = {...article, id: nanoid(), comments: []};
    this._articles.push(newArticle);
    return newArticle;
  }

  update(id, article) {
    let articleIndex;
    const oldArticle = this._articles.find((item, index) => {
      if (item.id === id) {
        articleIndex = index;
        return true;
      }
      return false;
    });
    const newArticle = {...oldArticle, ...article};
    this._articles[articleIndex] = newArticle;
    return newArticle;
  }

  drop(id) {
    const articleToDelete = this._articles.find((article) => article.id === id);

    if (!articleToDelete) {
      return null;
    }

    this._articles = this._articles.filter((article) => article.id !== id);
    return articleToDelete;
  }
}

module.exports = ArticleService;
