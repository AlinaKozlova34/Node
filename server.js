require('dotenv').config();
const app = require('./node/app');

const PORT = process.env.PORT || 3000;
app.listen({ port: process.env.PORT, host: '0.0.0.0' }, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on port ${PORT}`);
  console.log(`Swagger: http://127.0.0.1:${PORT}/docs`);
});
