import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import Post from './entities/post';
import User from './entities/user';
import { Setup1672232849551 } from './migrations/1672232849551-Setup';

dotenv.config();

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [Post, User],
    migrations: [Setup1672232849551],
    logging: false
});

export default dataSource;
