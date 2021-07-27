'use strict';

const articlesPostValidationRules = {
  title: {
    required: true,
    length: {
      min: 30,
      max: 250
    }
  },
  image: {
    format: [`jpg`, `png`]
  },
  createdDate: {
    required: true,
  },
  category: {
    required: true,
    length: {
      min: 1
    }
  },
  announce: {
    required: true,
    length: {
      min: 30,
      max: 250
    }
  },
  fullText: {
    length: {
      max: 1000
    }
  }
};

const commentPostValidation = {
  text: {
    length: {
      min: 20
    }
  }
};

module.exports = {
  articlesPostValidationRules,
  commentPostValidation
};
