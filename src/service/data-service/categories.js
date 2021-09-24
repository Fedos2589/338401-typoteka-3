'use strict';

class CategoryService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    return [...new Set(this._articles.reduce((acc, cur) => [...acc, ...cur.category], []))];
  }
}

module.exports = CategoryService;
