import { Request, Response } from 'express';
import Post from '../entities/post';
import postService from '../services/postService';
import postRepository from '../repositories/postRepository';

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

        postService.getPosts().then((posts) => res.status(200).send({ posts }));
    },

    getPost(req: Request, res: Response) {
        /*
            #swagger.tags = ['Posts']
            #swagger.summary = 'Get a post by Id.'
            #swagger.parameters['$ref'] = ['#/components/parameters/id']
            #swagger.responses[200] = {
                description: 'Ok',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/post' } } }
            }
        */

        const id = Number(req.params.id);

        postService.getPost(id).then((post) => res.status(200).send({ post }));
    },

    addPost(req: Request, res: Response) {
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
            #swagger.responses[403] = { description: 'Admin access required' }
        */

        const post = postRepository.create(req.body as Post);

        postService.addPost(post).then(() => res.status(201).send());
    },

    updatePost(req: Request, res: Response) {
        /*
            #swagger.tags = ['Posts']
            #swagger.summary = 'Update a post by id.'
            #swagger.security = [{ jwtAuth: [] }]
            #swagger.parameters['$ref'] = ['#/components/parameters/id']
            #swagger.requestBody = {
                required: true,
                content: { "application/json": { schema: { $ref: "#/components/schemas/post" } } }
            }
            #swagger.responses[200] = { description: 'Ok' }
            #swagger.responses[400] = { description: 'Invalid body' }
            #swagger.responses[401] = { description: 'Invalid JWT token' }
            #swagger.responses[403] = { description: 'Admin access required' }
        */

        const id = Number(req.params.id);

        const post = postRepository.create({ ...req.body, id } as Post);

        postService.updatePost(post).then(() => res.status(200).send());
    },

    deletePost(req: Request, res: Response) {
        /*
            #swagger.tags = ['Posts']
            #swagger.summary = 'Delete a post by id.'
            #swagger.security = [{ jwtAuth: [] }]
            #swagger.parameters['$ref'] = ['#/components/parameters/id']
            #swagger.responses[200] = { description: 'Ok' }
            #swagger.responses[401] = { description: 'Invalid JWT token' }
            #swagger.responses[403] = { description: 'Admin access required' }
        */

        const id = Number(req.params.id);

        postService.deletePost(id).then(() => res.status(200).send());
    }
};

export default postController;
