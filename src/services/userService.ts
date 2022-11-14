import bcrypt from 'bcrypt';
import User from '../entities/user';
import userRepository from '../repositories/userRepository';

const userService = {
    addUser: async (user: User) => {
        const saltRounds = 10;

        user.password = await bcrypt.hash(user.password, saltRounds);
        user.isAdmin = false;

        await userRepository.save(user);
    }
};

export default userService;
