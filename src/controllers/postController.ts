import { Request, Response } from 'express';
import { Request as JwtRequest } from 'express-jwt';
import Post from '../entities/post';
import postService from '../services/postService';
import postRepository from '../repositories/postRepository';
import userRepository from '../repositories/userRepository';

const postController = {
    getPosts(req: Request, res: Response) {
        /*
            #swagger.tags = ['Posts']
            #swagger.summary = 'Get all posts.'
            #swagger.responses[200] = {
                description: 'Ok',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/posts' } } }
            }
        */

        postService.getPosts().then((posts) => res.status(200).send(posts));
    },

    getPost(req: Request, res: Response) {
        /*
            #swagger.tags = ['Posts']
            #swagger.summary = 'Get a post by id.'
            #swagger.parameters['$ref'] = ['#/components/parameters/id']
            #swagger.responses[200] = {
                description: 'Ok',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/detailedPost' } } }
            }
            #swagger.responses[404] = { description: 'Post not found' }
        */

        const id = Number(req.params.id);

        postService
            .getPost(id)
            .then((post) => res.status(200).send(post))
            .catch((error) => res.status(404).send({ error }));
    },

    addPost(req: JwtRequest, res: Response) {
        /*
            #swagger.tags = ['Posts']
            #swagger.summary = 'Create a post.'
            #swagger.security = [{ jwtAuth: [] }]
            #swagger.requestBody = {
                required: true,
                content: { "application/json": { schema: { $ref: "#/components/schemas/post" } } }
            }
            #swagger.responses[201] = { description: 'Created' }
            #swagger.responses[400] = { description: 'Invalid body' }
            #swagger.responses[401] = { description: 'Invalid JWT token' }
        */

        const userId = req.auth?.id;
        const user = userRepository.create({ id: userId });

        const post = postRepository.create({ ...req.body, user } as Post);

        postService.addPost(post).then(() => res.status(201).send());
    },

    updatePost(req: JwtRequest, res: Response) {
        /*
            #swagger.tags = ['Posts']
            #swagger.summary = 'Update a post by id.'
            #swagger.security = [{ jwtAuth: [] }]
            #swagger.parameters['$ref'] = ['#/components/parameters/id']
            #swagger.requestBody = {
                required: true,
                content: { "application/json": { schema: { $ref: "#/components/schemas/postContent" } } }
            }
            #swagger.responses[204] = { description: 'Success' }
            #swagger.responses[400] = { description: 'Invalid body' }
            #swagger.responses[401] = { description: 'Invalid JWT token' }
            #swagger.responses[422] = { description: 'Unprocessable entity' }
        */

        const userId = req.auth?.id;
        const user = userRepository.create({ id: userId });

        const id = Number(req.params.id);
        const post = postRepository.create({ ...req.body, id, user } as Post);

        postService
            .updatePost(post)
            .then(() => res.status(204).send())
            .catch((error) => res.status(422).send({ error }));
    },

    deletePost(req: JwtRequest, res: Response) {
        /*
            #swagger.tags = ['Posts']
            #swagger.summary = 'Delete a post by id.'
            #swagger.security = [{ jwtAuth: [] }]
            #swagger.parameters['$ref'] = ['#/components/parameters/id']
            #swagger.responses[204] = { description: 'Success' }
            #swagger.responses[401] = { description: 'Invalid JWT token' }
            #swagger.responses[422] = { description: 'Unprocessable entity' }
        */

        const userId = req.auth?.id;
        const user = userRepository.create({ id: userId });

        const id = Number(req.params.id);
        const post = postRepository.create({ id, user });

        postService
            .deletePost(post)
            .then(() => res.status(204).send())
            .catch((error) => res.status(422).send({ error }));
    }
};

export default postController;
