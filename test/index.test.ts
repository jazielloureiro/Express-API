import request from 'supertest';
import dataSource from '../src/dataSource';
import postRepository from '../src/repositories/postRepository';
import userRepository from '../src/repositories/userRepository';
import {
    app,
    getJwtToken,
    postData,
    postData2,
    savePost,
    userData
} from './utils';

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
        const jwtToken = await getJwtToken(userData);
        const response = await savePost(jwtToken, postData);

        const posts = await postRepository.find();

        expect(response.statusCode).toBe(201);
        expect(posts.length).toBe(1);
        expect(posts[0].content).toBe(postData.content);
    });

    it('PUT /posts', async () => {
        const jwtToken = await getJwtToken(userData);
        await savePost(jwtToken, postData);

        let posts = await postRepository.find();

        const response = await request(app)
            .put(`/posts/${posts[0].id}`)
            .auth(jwtToken, { type: 'bearer' })
            .send(postData2);

        posts = await postRepository.find();

        expect(response.statusCode).toBe(204);
        expect(posts[0].content).toBe(postData2.content);
    });

    it('DELETE /posts', async () => {
        const jwtToken = await getJwtToken(userData);
        await savePost(jwtToken, postData);

        let posts = await postRepository.find();

        const response = await request(app)
            .delete(`/posts/${posts[0].id}`)
            .auth(jwtToken, { type: 'bearer' });

        posts = await postRepository.find();

        expect(response.statusCode).toBe(204);
        expect(posts.length).toBe(0);
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
