const auth = require('./routes');
const profile = require('./reg');

async function routes(fastify, options) {
    fastify.get('/', async (req, reply) => {
      reply.send({
        message: 'Welcome to Fastify Auth API',
        docs: '/docs',
        register: '/api/register',
        login: '/api/login',
        users: '/api/users',
        profile: '/api/profile'
      });
    });
  
    await auth(fastify, options);
    await profile(fastify, options);
  }
  
module.exports = routes;