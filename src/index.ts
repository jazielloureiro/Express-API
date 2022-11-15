import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

import dataSource from './dataSource';
import router from './router';

const app = express();
const port = process.env.APP_PORT;

app.use(express.json());
app.use(router);

dataSource
    .initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}.`);
        });
    })
    .catch((error) => console.log(error));
