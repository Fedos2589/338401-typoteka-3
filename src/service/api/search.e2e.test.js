"use strict";

const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const DataService = require(`../data-service/search`);

const {HttpCode} = require(`../../constants`);

// const mockCategories = [
//   `Деревья`,
//   `Кино`,
//   `IT`
// ];

// const mockUsers = [
//   {
//     name: `Иван Иванов`,
//     email: `ivanov@example.com`,
//     passwordHash: passwordUtils.hashSync(`ivanov`),
//     avatar: `avatar01.jpg`
//   },
//   {
//     name: `Пётр Петров`,
//     email: `petrov@example.com`,
//     passwordHash: passwordUtils.hashSync(`petrov`),
//     avatar: `avatar02.jpg`
//   }
// ];

const mockArticles = [
  {
    "title": `Как собрать камни бесконечности`,
    "announce": `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Достичь успеха помогут ежедневные повторения. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Первая большая ёлка была установлена только в 1938 году.`,
    "fullText": `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Как начать действовать? Для начала просто соберитесь. Он написал больше 30 хитов. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Программировать не настолько сложно, как об этом говорят. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Из под его пера вышло 8 платиновых альбомов.`,
    "createdDate": `2021-07-19T13:42:40.784Z`,
    "category": [
      `Деревья`
    ],
    "id": `sdziY3YYdq25E1-B7gebT`,
    "comments": [
      {
        "id": `t5tFCjqCZJY9QKljfVbDU`,
        "text": `Плюсую, но слишком много буквы!`
      },
      {
        "id": `fKxndI2EYkBjw8b-nUC1F`,
        "text": `Это где ж такие красоты?`
      }
    ]
  },
  {
    "title": `Борьба с прокрастинацией`,
    "announce": `Простые ежедневные упражнения помогут достичь успеха. Ёлки — это не просто красивое дерево. Это прочная древесина. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Из под его пера вышло 8 платиновых альбомов.`,
    "fullText": `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Это один из лучших рок-музыкантов.`,
    "createdDate": `2021-07-19T13:42:40.785Z`,
    "category": [
      `Кино`
    ],
    "id": `zHN1eqzlKQsIuUo4ey9_x`,
    "comments": [
      {
        "id": `K8tkexNkuty9XvpFSt9oR`,
        "text": `Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `KiOu3dHlb4IXC6diipJs-`,
        "text": `Совсем немного...`
      },
      {
        "id": `o-NWLIrUBUqU4ikT2oeRv`,
        "text": `Это где ж такие красоты?`
      },
      {
        "id": `LzakYhyD5Vt4T-Xi4YtXj`,
        "text": `Хочу такую же футболку :-)`
      }
    ]
  },
  {
    "title": `Ёлки. История деревьев`,
    "announce": `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Как начать действовать? Для начала просто соберитесь. Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    "fullText": `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Достичь успеха помогут ежедневные повторения. Собрать камни бесконечности легко, если вы прирожденный герой. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
    "createdDate": `2021-07-19T13:42:40.785Z`,
    "category": [
      `IT`
    ],
    "id": `SFUR7eT2NB_Qdlwt0mID3`,
    "comments": [
      {
        "id": `om2sZCWFlAE9BfAgGFM2n`,
        "text": `Совсем немного...`
      }
    ]
  },
  {
    "title": `Как перестать беспокоиться и начать жить`,
    "announce": `Как начать действовать? Для начала просто соберитесь. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Собрать камни бесконечности легко, если вы прирожденный герой.`,
    "fullText": `Это один из лучших рок-музыкантов. Достичь успеха помогут ежедневные повторения.`,
    "createdDate": `2021-07-19T13:42:40.785Z`,
    "category": [
      `Кино`
    ],
    "id": `7VbXdHwfYHspanXmvL2qH`,
    "comments": [
      {
        "id": `CGU8kQMlhZY8aqji9CjNJ`,
        "text": `Планируете записать видосик на эту тему`
      }
    ]
  },
];

const app = express();
app.use(express.json());
search(app, new DataService(mockArticles));

describe(`API returns articles list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `Борьба`
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`1 article found`, () => expect(response.body.length).toBe(1));
  test(`Article has correct id`, () => expect(response.body[0].id).toBe(`zHN1eqzlKQsIuUo4ey9_x`));
});

test(`API returns code 404 if nothing is found`,
    () => request(app)
      .get(`/search`)
      .query({
        query: `Продам свою душу`
      })
      .expect(HttpCode.NOT_FOUND)
);

test(`API returns 400 when query string is absent`,
    () => request(app)
      .get(`/search`)
      .expect(HttpCode.BAD_REQUEST)
);
