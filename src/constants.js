"use strict";

const FILE_NAME = `mocks.json`;
const FILE_SENTENCES_PATH = `src/data/sentences.txt`;
const FILE_TITLES_PATH = `src/data/titles.txt`;
const FILE_CATEGORIES_PATH = `src/data/categories.txt`;
const DEFAULT_COUNT = 1;
const DEFAULT_PORT = 3000;
const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const MAX_COUNT_ERROR_TEXT = `Не больше 1000 публикаций`;
const NOT_FOUND = `Not found`;

const CountRestrict = {
  MIN: 1,
  MAX: 1000,
};

const ExitCode = {
  success: 0,
  error: 1,
};

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

module.exports = {
  FILE_NAME,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  DEFAULT_COUNT,
  DEFAULT_PORT,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  MAX_COUNT_ERROR_TEXT,
  CountRestrict,
  ExitCode,
  HttpCode,
  NOT_FOUND,
};
