require('dotenv').config();
const express = require('express');
const Wappalyzer = require('wappalyzer');
const log = require('../middleware/logger').default;
const authenticateKey = require('../middleware/auth-key').default;

const router = express.Router();

// TODO: create a static user, let others register in memory.
// const users = [{
//   _id: 1,
//   api_key: process.env.API_KEY,
//   username: 'test',
//   usage: [{ date: '2022-10-10', count: 0 }],
// }];

router.post('/register', (req, res) => {
  const { username } = req.body;
  //  TODO: const user = createUser(username);
  res.status(201).send({ data: username });
});

router.post('/analyze/', authenticateKey, async (req, res) => {
  let { website } = req.body;

  if (!/^https?:\/\//i.test(website)) {
    website = `http://${website}`;
  }

  const wappalyzer = new Wappalyzer();
  try {
    await wappalyzer.init();
    const site = await wappalyzer.open(website);
    site.on('error', (e) => {
      log.error(`wappalyzer error: ${e}`);
    });
    const tech = await site.analyze();
    tech.technologies = tech?.technologies
      .filter((elem) => elem?.confidence > 0 && elem?.categories.at(0)?.id !== 19)
      .sort((a, b) => {
        const keyA = a?.categories.at(0)?.id;
        const keyB = b?.categories.at(0)?.id;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
    await wappalyzer.destroy();
    res.status(200).send(tech);
  } catch (error) {
    log.error(error);
    res.sendStatus(400);
  }
});

module.exports = router;
