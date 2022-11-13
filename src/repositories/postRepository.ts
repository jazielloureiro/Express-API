import dataSource from '../dataSource';
import Post from '../entities/post';

const postRepository = dataSource.getRepository(Post);

export default postRepository;
