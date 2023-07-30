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
        const savedPost = await this.getPost(post.id);

        if (!savedPost) {
            throw "There's no post for the given id";
        } else if (savedPost.user.id !== post.user.id) {
            throw "User can't edit this post";
        }

        await postRepository.update(post.id, { content: post.content });
    },

    async deletePost(post: Post) {
        const savedPost = await this.getPost(post.id);

        if (!savedPost) {
            throw "There's no post for the given id";
        } else if (savedPost.user.id !== post.user.id) {
            throw "User can't delete this post";
        }

        await postRepository.delete(post.id);
    }
};

export default postService;
