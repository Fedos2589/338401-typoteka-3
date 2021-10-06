"use strict";

const FILE_NAME = `mocks.json`;
const FILE_SENTENCES_PATH = `src/data/sentences.txt`;
const FILE_TITLES_PATH = `src/data/titles.txt`;
const FILE_CATEGORIES_PATH = `src/data/categories.txt`;
const FILE_COMMENTS_PATH = `src/data/comments.txt`;
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
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400
};

const THEMES = [{
  title: `Автомобили`,
  sup: 88,
}, {
  title: `Удаленная работа`,
  sup: 13
}, {
  title: `Бизнес`,
  sup: 13
}, {
  title: `Путешествия`,
  sup: 13
}, {
  title: `Дизайн и обустройство`,
  sup: 13
}, {
  title: `Производство игрушек`,
  sup: 22
}, {
  title: `UX & UI`,
  sup: 22
}];

const HOTLIST = [{
  text: `Билл Гейтс впервые за два года возглавил рейтинг самых богатых людей мира по версии Bloomberg`,
  sup: 12
},
{
  text: `Сервис для аналитики Telegram-чатов Combot попал под блокировку из-за информации на служебной`,
  sup: 15
},
{
  text: `Модель Кайли Дженнер продаст 51% своей компании Kylie Cosmetics владельцу Factor за $600 млн`,
  sup: 52
},
{
  text: `Tesla получила 146 тысяч предзаказов на электрический пикап Cybertruck за двое суток`,
  sup: 153
}];

const COMMENTS = [
  {
    avatar: `img/avatar-small-1.png`,
    user: `Анна Артамонова`,
    text: `Сервис аренды жилья Airbnb стал глобальным партнером Международного олимпийского комитета (МОК) на девять лет, в течение которых пройдет пять Олимпиад, в том числе в Токио в 2020 году.`,
    strong: `Игровая студия Playrix из Вологды потратила более $100 млн на покупку конкурентов в 2018 году`
  },
  {
    avatar: `img/avatar-small-2.png`,
    user: `Александр Петров`,
    text: `Главреды «Дождя», Forbes и других СМИ попросили Роскомнадзор разъяснить штрафы за ссылки на сайты с матом`,
    strong: `«Яндекс.Метрика» запустила бесплатный сервис для оценки эффективности баннеров и видеорекламы в реальном времени`
  },
  {
    avatar: `img/avatar-small-3.png`,
    user: `Игорь Шманский`,
    text: `Что-то все электрокары в последнее время все на одно лицо делаются))`,
    strong: `Игровая студия Playrix из Вологды потратила более $100 млн на покупку конкурентов в 2018 году`
  }
];

const PREVIEWS = [
  {
    breadcrumbs: [`Дизайн`, `Удаленная работа`],
    img: `img/skyscraper@1x.jpg`,
    srcset: `static/img/skyscraper@1x.jpg 1x, static/img/skyscraper@2x.jpg 2x`,
    alt: `Фотография небоскреба`,
    datetime: `2019-03-21T20:33`,
    datetimeFormatted: `21.03.2019, 20:33`,
    heading: `Я ничего не понял`,
    text: `Если вы сами пишете такие письма — почитайте Ильяхова. А в этой заметке я расскажу про заклинание, которое от таких писем помогает.`
  },
  {
    breadcrumbs: [`Фриланс`],
    img: `img/sea@1x.jpg`,
    srcset: `static/img/sea@1x.jpg 1x, static/img/sea@2x.jpg 2x`,
    alt: `Фотография моря`,
    datetime: `2019-03-21T20:33`,
    datetimeFormatted: `21.03.2019, 20:33`,
    heading: `Путешествие в Голландию`,
    text: `Если вы сами пишете такие письма — почитайте Ильяхова. А в этой заметке я расскажу про заклинание, которое от таких писем помогает.`
  },
  {
    breadcrumbs: [`Фриланс`],
    datetime: `2019-03-21T20:33`,
    datetimeFormatted: `21.03.2019, 20:33`,
    heading: `Путин подписал закон о предустановке российских приложений на смартфоны и другую электронику`,
    text: `Президент России Владимир Путин подписал закон об обязательной предустановке российского программного обеспечения на электронную технику, продаваемую в России. Документ опубликован на официальном сайте правовой информации.`
  },
  {
    breadcrumbs: [`Дизайн`, `Удаленная работа`],
    img: `img/forest@1x.jpg`,
    srcset: `static/img/forest@1x.jpg 1x, static/img/forest@2x.jpg 2x`,
    alt: `Фотография леса`,
    datetime: `2019-03-21T20:33`,
    datetimeFormatted: `21.03.2019, 20:33`,
    heading: `Я понял, но не все`,
    text: `Если вы сами пишете такие письма — почитайте Ильяхова. А в этой заметке я расскажу про заклинание, которое от таких писем помогает.`
  }
];

const NOTES = [`Huawei открыла в России предзаказ на смартфон Mate 30 Pro без сервисов Google`, `Facebook разрешит пользователям копировать фотографии из соцсети в «Google Фото»`];

module.exports = {
  FILE_NAME,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH,
  DEFAULT_COUNT,
  DEFAULT_PORT,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  MAX_COUNT_ERROR_TEXT,
  CountRestrict,
  ExitCode,
  HttpCode,
  NOT_FOUND,
  THEMES,
  HOTLIST,
  COMMENTS,
  PREVIEWS,
  NOTES,
};
