import { Request, Response } from 'express';
import Post from '../entities/post';
import postService from '../services/postService';
import postRepository from '../repositories/postRepository';

const postController = {
    getPosts(req: Request, res: Response) {
        postService.getPosts().then((posts) => res.status(200).send({ posts }));
    },

    getPost(req: Request, res: Response) {
        const id = Number(req.params.id);

        postService.getPost(id).then((post) => res.status(200).send({ post }));
    },

    addPost(req: Request, res: Response) {
        const post = postRepository.create(req.body as Post);

        postService.addPost(post).then(() => res.status(201).send());
    },

    updatePost(req: Request, res: Response) {
        const id = Number(req.params.id);

        const post = postRepository.create({ ...req.body, id } as Post);

        postService.updatePost(post).then(() => res.status(200).send());
    },

    deletePost(req: Request, res: Response) {
        const id = Number(req.params.id);

        postService.deletePost(id).then(() => res.status(200).send());
    }
};

export default postController;
