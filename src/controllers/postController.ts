import { Request, Response } from 'express';
import Post from '../entities/post';
import postService from '../services/postService';

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

        postService
            .addPost(post)
            .then(() => res.status(201).send())
            .catch((error) => res.status(500).send({ error }));
    }
};

export default postController;
