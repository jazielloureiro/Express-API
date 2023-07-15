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
                $content: 'Awesome text'
            },
            posts: [{ $ref: '#/components/schemas/post' }],
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
