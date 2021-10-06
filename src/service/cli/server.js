'use strict';

const express = require(`express`);
const {DEFAULT_PORT, HttpCode} = require(`../../constants`);
const routes = require(`../api`);

const app = express();
app.use(express.json());

const logger = require(`pino`)({
  name: `pino-and-express`,
  level: process.env.LOG_LEVEL || `info`
});

const pino = require(`express-pino-logger`)({logger});
app.use(pino);

app.use(`/api`, routes);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  logger.error(`Route not found: ${req.url}`);
});

app.listen(DEFAULT_PORT, () => logger.info(`server start on ${DEFAULT_PORT}`))
  .on(`error`, (err) => logger.error(`Server can't start. Error: ${err}`));
