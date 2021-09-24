'use strict';

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll(queryString) {
    return this._articles.filter((article) => article.title.indexOf(queryString) !== -1);
  }
}

module.exports = SearchService;
