import { ErrorRequestHandler, NextFunction, Response } from 'express';
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
