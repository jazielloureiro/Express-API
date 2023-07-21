import Post from '../entities/post';
import postRepository from '../repositories/postRepository';

const postService = {
    async getPosts() {
        return await postRepository.find({
            select: {
                parentPost: {
                    id: true
                },
                user: {
                    id: true
                }
            },
            relations: {
                user: true,
                parentPost: true
            }
        });
    },

    async getPost(id: number) {
        return await postRepository.findOne({
            select: {
                user: {
                    id: true,
                    username: true
                },
                parentPost: {
                    id: true,
                    content: true,
                    createdAt: true,
                    user: {
                        id: true,
                        username: true
                    }
                }
            },
            where: {
                id
            },
            relations: {
                user: true,
                parentPost: {
                    user: true
                }
            }
        });
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
