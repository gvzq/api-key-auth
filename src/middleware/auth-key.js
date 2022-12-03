require('dotenv').config();

const authenticateKey = (req, res, next) => {
  const apiKey = req.get('x-api-key');
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).send({ error: { code: 403, message: 'You not allowed.' } });
  }
  return next();
};

exports.default = authenticateKey;
