import { Router } from 'express';
import postController from './controllers/postController';
import userController from './controllers/userController';
import { decodeJWT } from './middlewares';

const router = Router();

router.get('/posts', postController.getPosts);
router.get('/posts/:id', postController.getPost);
router.post('/posts', decodeJWT, postController.addPost);
router.put('/posts/:id', decodeJWT, postController.updatePost);
router.delete('/posts/:id', decodeJWT, postController.deletePost);

router.post('/users', userController.addUser);
router.post('/users/login', userController.login);

export default router;
