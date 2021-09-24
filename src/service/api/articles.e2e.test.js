"use strict";

const express = require(`express`);
const request = require(`supertest`);

const articles = require(`./articles`);
const DataService = require(`../data-service/articles`);

const {HttpCode} = require(`../../constants`);
const CommentService = require(`../data-service/comments`);

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
      },
      {
        "id": `332`,
        "text": `Comment`
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

const createAPI = () => {
  const app = express();
  app.use(express.json());
  const cloneData = JSON.parse(JSON.stringify(mockArticles));
  articles(app, new DataService(cloneData), new CommentService(cloneData));
  return app;
};

describe(`API returns articles list`, () => {
  let response;

  beforeAll(async () => {
    const app = createAPI();
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 4 articles`, () => expect(response.body.length).toBe(4));

  test(`First article's id equals "sdziY3YYdq25E1-B7gebT"`, () => expect(response.body[0].id).toBe(`sdziY3YYdq25E1-B7gebT`));
});

describe(`API returns an article with given id`, () => {
  let response;

  beforeAll(async () => {
    const app = createAPI();
    response = await request(app)
      .get(`/articles/zHN1eqzlKQsIuUo4ey9_x`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Article's title is "Борьба с прокрастинацией"`, () => expect(response.body.title).toBe(`Борьба с прокрастинацией`));
});

describe(`API creates an article if data is valid`, () => {
  const newArticle = {
    title: `minimum 30 characters minimum 30 characters minimum 30 characters minimum 30 characters`,
    image: `image.png`,
    createdDate: `2021-07-19T13:42:40.784Z`,
    category: [`Деревья`],
    announce: `new post 1 new post 1 new post 1 new post 1 new post 1 new post 1 new post 1 new post 1 new post 1 `,
    fullText: `new post`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).post(`/articles`).send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Offers count is changed`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(5))
  );
});

describe(`API refuses to create an article if data is invalid`, () => {
  const newArticle = {
    title: `minimum 30 characters minimum 30 characters minimum 30 characters minimum 30 characters`,
    image: `image.png`,
    createdDate: `2021-07-19T13:42:40.784Z`,
    category: [`Деревья`],
    announce: `new post 1 new post 1 new post 1 new post 1 new post 1 new post 1 new post 1 new post 1 new post 1 `,
    fullText: `new post`
  };

  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API changes existent article`, () => {
  const newArticle = {
    title: `minimum 30 characters minimum 30 characters minimum 30 characters minimum 30 characters`,
    image: `image.png`,
    createdDate: `2031-07-19T13:42:40.784Z`,
    category: [`30`],
    announce: `new post 1 new post 1 new post 1 new post 1 new post 1 new post 1 new post 1 new post 1 new post 1 `,
    fullText: `new post`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/zHN1eqzlKQsIuUo4ey9_x`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Article is really changed`, () => request(app)
    .get(`/articles/zHN1eqzlKQsIuUo4ey9_x`)
    .expect((res) => expect(res.body.title).toBe(`minimum 30 characters minimum 30 characters minimum 30 characters minimum 30 characters`))
  );

});

test(`API returns status code 404 when trying to change non-existent article`, () => {
  const app = createAPI();
  const newArticle = {
    title: `minimum 30 characters minimum 30 characters minimum 30 characters minimum 30 characters`,
    image: `image.png`,
    createdDate: `2031-07-19T13:42:40.784Z`,
    category: [`30`],
    announce: `new post 1 new post 1 new post 1 new post 1 new post 1 new post 1 new post 1 new post 1 new post 1 `,
    fullText: `new post`
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(newArticle)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {
  const app = createAPI();
  const invalidArticle = {
    title: `minimum 30 characters`,
    image: `image.png`,
    createdDate: `2031-07-19T13:42:40.784Z`,
    category: [`30`],
    announce: `new post 1 new post 1 new post 1 new post 1 new post 1 new post 1 new post 1 new post 1 new post 1 `,
    fullText: `new post`
  };

  return request(app)
    .put(`/articles/zHN1eqzlKQsIuUo4ey9_x`)
    .send(invalidArticle)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/zHN1eqzlKQsIuUo4ey9_x`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted article`, () => expect(response.body.id).toBe(`zHN1eqzlKQsIuUo4ey9_x`));

  test(`Article count is 4 now`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(4))
  );
});

test(`API refuses to delete non-existent article`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});

describe(`API returns a list of comments to given article`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles/SFUR7eT2NB_Qdlwt0mID3/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 2 comments`, () => expect(response.body.length).toBe(2));

  test(`First comment's text is "Совсем немного..."`,
      () => expect(response.body[0].text).toBe(`Совсем немного...`));
});

describe(`API creates a comment if data is valid`, () => {
  const app = createAPI();
  let response;
  const newComment = {text: `Валидному комментарию достаточно этих полей`};

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles/SFUR7eT2NB_Qdlwt0mID3/comments`)
      .send(newComment);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Comments count is changed`, () => request(app)
    .get(`/articles/SFUR7eT2NB_Qdlwt0mID3/comments`)
    .expect((res) => expect(res.body.length).toBe(3))
  );
});

test(`API refuses to create a comment to non-existent article and returns status code 404`, async () => {
  const app = createAPI();

  return request(app)
    .post(`/articles/fakeId/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, async () => {
  const invalidComment = {
    test: `Неверное поле`
  };

  const app = await createAPI();

  return request(app)
    .post(`/articles/SFUR7eT2NB_Qdlwt0mID3/comments`)
    .send(invalidComment)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes a comment`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/sdziY3YYdq25E1-B7gebT/comments/t5tFCjqCZJY9QKljfVbDU`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Comments count is 1 now`, () => request(app)
    .get(`/articles/sdziY3YYdq25E1-B7gebT/comments`)
    .expect((res) => expect(res.body.length).toBe(1))
  );
});

test(`API refuses to delete non-existent comment`, async () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/sdziY3YYdq25E1-B7gebT/comments/NOTEXIST`)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to delete a comment to non-existent article`, async () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/NOTEXIST/comments/1`)
    .expect(HttpCode.NOT_FOUND);

});
