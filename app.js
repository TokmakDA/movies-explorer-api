const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/loggers');
const routes = require('./routes');
const { MONGO_URL } = require('./config');
const { handleError } = require('./errors/errors');
const { corsOptions } = require('./data');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(MONGO_URL).catch((err) => {
  console.log(err);
});

app.use(requestLogger); // подключаем логгер запросов
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use(routes);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
// централизованный обработчик ошибок
app.use((err, req, res, next) => {
  handleError(err, req, res, next);
  next();
});

app.listen(PORT, () => {
  console.log(`Start server, port:${PORT}`);
  console.log(process.env.NODE_ENV);
});
