'use strict';

const express = require(`express`);
const fs = require(`fs`).promises;
const {DEFAULT_PORT, FILE_NAME} = require(`../../constants`);

const app = express();
app.use(express.json());

app.get(`/posts`, async (req, res) => {
  const fileContent = await fs.readFile(FILE_NAME);
  const mocks = JSON.parse(fileContent);

  res.send(mocks);
});

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    try {
      app.listen(port, (err) => {
        if (err) {
          return console.log(`Произошла ошибка: ${err.message}`);
        }

        return console.log(`Сервер запущен на порту: ${port}`);
      });

    } catch (err) {
      console.log(`Произошла ошибка: ${err.message}`);
      process.exit(1);
    }
  }
};
