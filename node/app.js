const Fastify = require('fastify');
const fastifySwagger = require('@fastify/swagger');
const fastifySwaggerUI = require('@fastify/swagger-ui');
const fastifyJwt = require('@fastify/jwt');
const path = require('path');
const fs = require('fs');
const routes = require('./routes');
const db = require('./db/db.js');
const fp = require('fastify-plugin')

const app = Fastify();
// const openapiPath = path.join(__dirname, './openapi/openapi.json');
// const openapiSpec = JSON.parse(fs.readFileSync(openapiPath, 'utf-8'));

app.register(fastifySwagger, {
    mode: 'static',
    specification: {
      path: path.join(__dirname, './openapi/openapi.json'),
      baseDir:  path.join(__dirname, './openapi')
    },
    exposeRoute: true
  });
app.register(fastifySwaggerUI, {
    routePrefix: '/docs',
    baseDir:  path.join(__dirname, './openapi')
})

app.register(fastifyJwt, { secret: process.env.JWT_SECRET });
app.register(fp(db)).then(() => {
app.register(routes, { prefix: '/api' });
});

app.decorate('authenticate', async function (req, reply) {
  try {
    await req.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

module.exports = app;



