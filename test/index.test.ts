import request from 'supertest';
import express from 'express';
import dataSource from '../src/dataSource';
import router from '../src/router';
import postRepository from '../src/repositories/postRepository';
import userRepository from '../src/repositories/userRepository';

const app = express();

app.use(express.json());
app.use(router);

const postData = { content: 'Awesome text' };
const userData = { username: 'john', password: '123' };

beforeAll(async () => {
    await dataSource.initialize();
});

beforeEach(async () => {
    await postRepository.createQueryBuilder().delete().from('Post').execute();
    await userRepository.createQueryBuilder().delete().from('User').execute();
});

afterAll(async () => {
    await dataSource.destroy();
});

describe('E2E tests', () => {
    it('POST /posts', async () => {
        await request(app).post('/users').send(userData);

        const loginResponse = await request(app)
            .post('/users/login')
            .send(userData);

        const response = await request(app)
            .post('/posts')
            .auth(loginResponse.body.token, { type: 'bearer' })
            .send(postData);

        const posts = await postRepository.find();

        expect(response.statusCode).toBe(201);
        expect(posts.length).toBe(1);
        expect(posts[0].content).toBe(postData.content);
    });

    it('POST /users', async () => {
        const response = await request(app).post('/users').send(userData);
        const users = await userRepository.find();

        expect(response.statusCode).toBe(201);
        expect(users.length).toBe(1);
        expect(users[0].username).toBe(userData.username);
        expect(users[0].password).not.toBe(userData.password);
    });

    it('POST /users/login', async () => {
        await request(app).post('/users').send(userData);

        const response = await request(app).post('/users/login').send(userData);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});
