import 'reflect-metadata';
import express, { Request, Response } from 'express';
import dataSource from './dataSource';

const app = express();
const port = process.env.APP_PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

dataSource
    .initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}.`);
        });
    })
    .catch((error) => console.log(error));
