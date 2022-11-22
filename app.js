require('dotenv').config();
const express = require('express');
const logger = require('./src/middleware/logger').middleware;
const log = require('./src/middleware/logger').default;
const apiRouter = require('./src/routes/api');

const port = process.env.PORT;
const app = express();

app.use(logger);
app.use(express.json());

app.use('/api', apiRouter);

app.get('/*', (req, res) => {
  res.sendStatus(404);
});

app.listen(port, (err) => {
  if (err) {
    log.error('Failure to launch server');
    return;
  }
  log.info('App started');
});
