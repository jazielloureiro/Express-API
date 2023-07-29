import swagger from 'swagger-autogen';

const doc = {
    info: {
        title: 'Express API',
        description: 'A microblogging platform API',
        version: '1.0.0'
    },
    securityDefinitions: {
        jwtAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
        }
    },
    components: {
        schemas: {
            post: {
                $content: 'Awesome text',
                parentPost: 1
            },
            postContent: {
                $content: 'Awesome text'
            },
            detailedPost: {
                $id: 1,
                $createdAt: '2000-00-00T00:00:00.000Z',
                $content: 'Awesome text',
                $user: {
                    $id: 1,
                    $username: 'johndoe'
                },
                parentPost: {
                    $id: 1,
                    $createdAt: '2000-00-00T00:00:00.000Z',
                    $content: 'Awesome text',
                    $user: {
                        $id: 1,
                        $username: 'johndoe'
                    }
                }
            },
            posts: [
                {
                    $id: 1,
                    $createdAt: '2000-00-00T00:00:00.000Z',
                    $content: 'Awesome text',
                    $user: { $id: 1 },
                    parentPost: { $id: 1 }
                }
            ],
            jwtToken: {
                $token: 'eyJ...w5c'
            },
            user: {
                $username: 'johndoe',
                $password: 'passwd123'
            }
        },
        parameters: {
            id: {
                in: 'path',
                name: 'id',
                required: true,
                schema: {
                    type: 'integer'
                }
            }
        }
    }
};

const output = './swagger.json';

const endpoints = ['./router.ts'];

swagger({ openapi: '3.0.0' })(output, endpoints, doc);
