import { DataSource } from 'typeorm';
import Post from './entities/post';
import User from './entities/user';

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [Post, User],
    synchronize: true,
    logging: false
});

export default dataSource;
