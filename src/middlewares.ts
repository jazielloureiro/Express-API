import { ErrorRequestHandler } from 'express';
import { expressjwt } from 'express-jwt';

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
