import dataSource from '../dataSource';
import User from '../entities/user';

const userRepository = dataSource.getRepository(User);

export default userRepository;
