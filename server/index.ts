import path from 'path';
import config from 'config';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import routes from './routes';

// import commonData from 'middlewares/common-data';

// Создаём экземпляр приложения
const app = express();

// // Определяем директорию для хранения шаблонов
// // Для работы с директориями всегда используем модуль «path»
// // и преобразуем относительные пути в абсолютные
// const viewsDir = path.join(__dirname, 'views');
//
// // Определяем директорию для хранения отдельных частей шаблонов
// const partialsDir = path.join(viewsDir, 'partials');
//
// // Определяем директорию для статичных файлов (изображений, стилей и скриптов)
// const publicDir = path.join(__dirname, 'public');

// // Подключаем шаблонизатор
// app.set('view engine', 'hbs');
//
// // Подключаем директорию с шаблонами
// app.set('views', viewsDir);

// Логируем запросы к приложению в debug-режиме
if (config.get('debug')) {
    app.use(morgan('dev'));
}

// Отдаём статичные файлы из соответствующей директории
app.use(express.static(publicDir));

// Собираем общие данные для всех страниц приложения
app.use(commonData);

// Подключаем маршруты
routes(app);

// Фиксируем фатальную ошибку и отправляем ответ с кодом 500
/*eslint-disable */
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    res.sendStatus(500);
});
/* eslint-enable */

// Подключаем директорию с отдельными частями шаблонов
// Этот метод асинхронный и мы запускаем сервер только после того,
// как все частичные шаблоны будут прочитаны
hbs.registerPartials(partialsDir, () => {
    const port = config.get('port');

    app.listen(port, () => {
        console.info(`Server started on ${port}`);
        console.info(`Open http://localhost:${port}/`);
    });
});

app.use(express.static(__dirname));

// Логируем запросы к приложению в debug-режиме
if (config.get('debug')) {
    app.use(morgan('dev'));
}

const port = config.get('port');



app.listen(port, () => {
    console.info(`Server started on ${port}`);
    console.info(`Open http://localhost:${port}/`);
});