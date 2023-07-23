import { expressjwt } from 'express-jwt';

export const decodeJWT = expressjwt({
    secret: process.env.SECRET_KEY ?? '',
    algorithms: ['HS256']
});
