import Post from '../entities/post';
import postRepository from '../repositories/postRepository';

const postService = {
    addPost: async (post: Post) => {
        try {
            return await postRepository.save(post);
        } catch (error) {
            throw 'An unexpected error occurred';
        }
    }
};

export default postService;
