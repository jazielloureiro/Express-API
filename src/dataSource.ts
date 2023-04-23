import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import Post from './entities/post';
import User from './entities/user';
import { Setup1672232849551 } from './migrations/1672232849551-Setup';

dotenv.config();

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Post, User],
    migrations: [Setup1672232849551],
    migrationsRun: true,
    logging: false
});

export default dataSource;
