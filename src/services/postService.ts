import Post from '../entities/post';
import postRepository from '../repositories/postRepository';

const postService = {
    getPosts: async () => {
        try {
            return await postRepository.find();
        } catch (error) {
            throw 'An unexpected error occurred';
        }
    },

    getPost: async (id: number) => {
        try {
            return await postRepository.findOneBy({ id });
        } catch (error) {
            throw 'An unexpected error occurred';
        }
    },

    addPost: async (post: Post) => {
        try {
            await postRepository.save(post);
        } catch (error) {
            throw 'An unexpected error occurred';
        }
    },

    updatePost: async (post: Post) => {
        try {
            await postRepository.update(post.id, post);
        } catch (error) {
            throw 'An unexpected error occurred';
        }
    },

    deletePost: async (id: number) => {
        try {
            await postRepository.delete(id);
        } catch (error) {
            throw 'An unexpected error occurred';
        }
    }
};

export default postService;
