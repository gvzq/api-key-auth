require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('./src/middleware/logger').middleware;
const apiRouter = require('./src/routes/api');

const app = express();
app.use(logger);
app.use(express.json());
app.use(cors());
app.use('/api', apiRouter);
app.get('/*', (req, res) => {
  res.sendStatus(404);
});

module.exports.app = app;
