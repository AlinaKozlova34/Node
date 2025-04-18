async function profileRoutes(fastify, options) {
  fastify.get('/profile', { preHandler: [fastify.authenticate] }, async (req, reply) => {
    reply.send({ user: req.user });
  });
}

module.exports = profileRoutes;
