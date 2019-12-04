import path from 'path';
import config from 'config';
import express, { Request, Response } from 'express';
import morgan from 'morgan';

const app = express();

app.use(express.static(__dirname));

if (config.get('environment') === 'development') {
    app.use(morgan('dev'));
}

const port = config.get('port');

app.use(express.static(path.join(__dirname, '..')));

app.get('/', function (req: Request, res: Response) {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(port, () => {
    console.info(`Server started on ${port}`);
    console.info(`Open http://localhost:${port}/`);
});