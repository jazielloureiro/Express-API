import { Router } from 'express';
import postController from './controllers/postController';

const router = Router();

router.post('/post', postController.addPost);

export default router;
