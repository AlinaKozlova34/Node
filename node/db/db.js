const { MongoClient } = require('mongodb');

async function dbConnector(fastify, options) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    fastify.decorate('mongo', {
      client,
      db: client.db(),
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    throw new Error('Database connection failed');
  }
}

module.exports = dbConnector;
