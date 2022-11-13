import { Request, Response } from 'express';
import postRepository from '../repositories/postRepository';
import Post from '../entities/post';

const postController = {
    addPost: (req: Request, res: Response) => {
        const { title, content } = req.body;

        if (!title || !content) {
            res.status(400).send({ error: 'Invalid body' });
            return;
        }

        const post = new Post();
        post.title = title;
        post.content = content;

        postRepository
            .save(post)
            .then(() => res.status(201).send())
            .catch(() =>
                res.status(500).send({ error: 'An unexpected error occurred' })
            );
    }
};

export default postController;
