import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.json';
import postController from './controllers/postController';
import userController from './controllers/userController';
import {
    errorMiddleware,
    validatePost,
    validateUser
} from './middlewares/apiMiddlewares';
import { decodeJWT, isAdmin } from './middlewares/authMiddlewares';

const router = Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.get('/posts', postController.getPosts);
router.get('/posts/:id', postController.getPost);
router.post('/posts', decodeJWT, isAdmin, validatePost, postController.addPost);
router.put(
    '/posts/:id',
    decodeJWT,
    isAdmin,
    validatePost,
    postController.updatePost
);
router.delete('/posts/:id', decodeJWT, isAdmin, postController.deletePost);

router.post('/users', validateUser, userController.addUser);
router.post('/users/login', validateUser, userController.login);

router.use(errorMiddleware);

export default router;
