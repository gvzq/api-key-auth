require('dotenv').config();

const authenticateKey = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (apiKey !== process.env.API_KEY) {
    res.status(403).send({ error: { code: 403, message: 'You not allowed.' } });
  }
  next();
};

exports.default = authenticateKey;
