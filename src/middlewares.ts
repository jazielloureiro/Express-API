import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { expressjwt, Request as JWTRequest } from 'express-jwt';

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({ error: 'Invalid token' });
    } else {
        next(err);
    }
};

export const decodeJWT = expressjwt({
    secret: process.env.SECRET_KEY ?? '',
    algorithms: ['HS256']
});

export const isAdmin = (req: JWTRequest, res: Response, next: NextFunction) => {
    if (req.auth?.isAdmin) {
        next();
    } else {
        res.status(403).send({ error: 'Admin access required' });
    }
};

export const validatePost = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title, content } = req.body;

    if (!title || !content) {
        res.status(400).send({ error: 'Invalid body' });
    } else {
        next();
    }
};
