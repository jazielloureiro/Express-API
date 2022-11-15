import { Router } from 'express';
import postController from './controllers/postController';
import userController from './controllers/userController';

const router = Router();

router.get('/posts', postController.getPosts);
router.get('/posts/:id', postController.getPost);
router.post('/posts', postController.addPost);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);

router.post('/users', userController.addUser);
router.post('/users/login', userController.login);

export default router;
