require('dotenv').config();
const express = require('express');
const logger = require('./src/middleware/logger').middleware;
const log = require('./src/middleware/logger').default;

const port = process.env.PORT;
const app = express();

app.use(logger);
app.use(express.json());

app.get('/*', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, (err) => {
  if (err) {
    log.error('Failure to launch server');
    return;
  }
  log.info(`Listening on port ${port}`);
});
