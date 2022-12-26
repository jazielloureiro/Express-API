import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../entities/user';
import userRepository from '../repositories/userRepository';

const userService = {
    async addUser(user: User) {
        const saltRounds = 10;

        user.password = await bcrypt.hash(user.password, saltRounds);
        user.isAdmin = false;

        await userRepository.save(user);
    },

    async login(user: User) {
        const savedUser = await userRepository.findOneBy({
            username: user.username
        });

        if (!savedUser) {
            throw 'Login failed';
        }
        
        const { id, username, isAdmin, password } = savedUser; 
        const isMatch = await bcrypt.compare(user.password, password);

        if (!isMatch) {
            throw 'Login failed';
        }
        
        const token = jwt.sign({ id, username, isAdmin }, process.env.SECRET_KEY ?? '');

        return token;
    }
};

export default userService;
