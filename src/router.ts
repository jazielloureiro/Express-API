import { Router } from 'express';
import postController from './controllers/postController';
import userController from './controllers/userController';
import { decodeJWT, isAdmin, errorMiddleware } from './middlewares';

const router = Router();

router.get('/posts', postController.getPosts);
router.get('/posts/:id', postController.getPost);
router.post('/posts', decodeJWT, isAdmin, postController.addPost);
router.put('/posts/:id', decodeJWT, isAdmin, postController.updatePost);
router.delete('/posts/:id', decodeJWT, isAdmin, postController.deletePost);

router.post('/users', userController.addUser);
router.post('/users/login', userController.login);

router.use(errorMiddleware);

export default router;
