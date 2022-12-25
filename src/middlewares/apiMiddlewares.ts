import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({ error: 'Invalid token' });
    } else {
        next(err);
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

export const validateUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).send({ error: 'Invalid body' });
    } else {
        next();
    }
};
