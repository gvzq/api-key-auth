require('dotenv').config();
const { createLogger, format, transports } = require('winston');

const winston = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  winston.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple(),
    ),
  }));
}

function logger(req, res, next) {
  const { params, path } = req;
  winston.info(path, params, req.header('x-api-key'));
  next();
}

exports.default = winston;
exports.middleware = logger;
