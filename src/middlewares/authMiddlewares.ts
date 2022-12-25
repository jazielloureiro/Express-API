import { NextFunction, Response } from 'express';
import { expressjwt, Request as JWTRequest } from 'express-jwt';

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
