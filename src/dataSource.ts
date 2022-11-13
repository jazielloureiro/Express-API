import { DataSource } from 'typeorm';
import Post from './entities/post';
import dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [Post],
    synchronize: true,
    logging: false
});

export default dataSource;