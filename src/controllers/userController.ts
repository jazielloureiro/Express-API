import { Request, Response } from 'express';
import User from '../entities/user';
import userService from '../services/userService';
import userRepository from '../repositories/userRepository';

const userController = {
    addUser(req: Request, res: Response) {
        /*
            #swagger.tags = ['Users']
            #swagger.summary = 'Create an user.'
            #swagger.requestBody = {
                required: true,
                content: { "application/json": { schema: { $ref: "#/components/schemas/user" } } }
            }
            #swagger.responses[201] = { description: 'Created' }
            #swagger.responses[400] = { description: 'Invalid body' }
        */

        const user = userRepository.create(req.body as User);

        userService.addUser(user).then(() => res.status(201).send());
    },

    login(req: Request, res: Response) {
        /*
            #swagger.tags = ['Users']
            #swagger.summary = 'Get authorization token.'
            #swagger.requestBody = {
                required: true,
                content: { "application/json": { schema: { $ref: "#/components/schemas/user" } } }
            }
            #swagger.responses[200] = {
                description: 'Ok',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/jwtToken' } } }
            }
            #swagger.responses[400] = { description: 'Invalid body' }
        */

        const user = userRepository.create(req.body as User);

        userService
            .login(user)
            .then((token) => res.status(200).send({ token }))
            .catch((error) => res.status(400).send({ error }));
    }
};

export default userController;
