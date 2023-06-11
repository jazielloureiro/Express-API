import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../entities/user';
import userRepository from '../repositories/userRepository';

const userService = {
    async addUser(user: User) {
        const saltRounds = 10;

        user.password = await bcrypt.hash(user.password, saltRounds);

        await userRepository.save(user);
    },

    async login(user: User) {
        const savedUser = await userRepository.findOneBy({
            username: user.username
        });

        if (!savedUser) {
            throw 'Login failed';
        }

        const isMatch = await bcrypt.compare(user.password, savedUser.password);

        if (!isMatch) {
            throw 'Login failed';
        }

        const token = jwt.sign(
            {
                id: savedUser.id,
                username: savedUser.username
            },
            process.env.SECRET_KEY ?? ''
        );

        return token;
    }
};

export default userService;
