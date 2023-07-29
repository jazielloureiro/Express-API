import express from 'express';
import request from 'supertest';
import router from '../src/router';

export const app = express();

app.use(express.json());
app.use(router);

interface Post {
    content: string;
}

export const postData = { content: 'Awesome text' };
export const postData2 = { content: 'Awesome content' };

interface User {
    username: string;
    password: string;
}

export const userData = { username: 'john', password: '123' };

export const getJwtToken = async (userData: User) => {
    await request(app).post('/users').send(userData);

    const loginResponse = await request(app)
        .post('/users/login')
        .send(userData);

    return loginResponse.body.token;
};

export const savePost = async (jwtToken: string, postData: Post) => {
    return await request(app)
        .post('/posts')
        .auth(jwtToken, { type: 'bearer' })
        .send(postData);
};
