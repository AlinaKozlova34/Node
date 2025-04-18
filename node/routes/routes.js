const bcrypt = require('bcrypt');

async function authRoutes(fastify, options) {
    const db = fastify.mongo?.db;
  fastify.post('/register', async (req, reply) => {
    
    if (!db) {
      return reply.code(500).send({ message: 'Database not available' });
    }
    const { email, password } = req.body;
    const existing = await db.collection('users').findOne({ email });
    if (existing) return reply.code(400).send({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    await db.collection('users').insertOne({ email, password: hashed });
    reply.code(201).send({ message: 'User registered' });
  });

  fastify.post('/login', async (req, reply) => {
    const { email, password } = req.body;
    const user = await db.collection('users').findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return reply.code(401).send({ message: 'Invalid credentials' });
    }
    const token = fastify.jwt.sign({ id: user._id, email: user.email });
    reply.send({ token });
  });

  fastify.get('/users', { preHandler: [fastify.authenticate] }, async (req, reply) => {
    const users = await db.collection('users')
      .find({}, { projection: { password: 0 } })
      .toArray();
    reply.send(users);
  });
}

module.exports = authRoutes;