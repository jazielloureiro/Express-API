import Post from '../entities/post';
import postRepository from '../repositories/postRepository';

const postService = {
    async getPosts() {
        return await postRepository.find();
    },

    async getPost(id: number) {
        return await postRepository.findOneBy({ id });
    },

    async addPost(post: Post) {
        await postRepository.save(post);
    },

    async updatePost(post: Post) {
        await postRepository.update(post.id, post);
    },

    async deletePost(id: number) {
        await postRepository.delete(id);
    }
};

export default postService;
