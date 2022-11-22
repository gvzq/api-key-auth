require('dotenv').config();
const express = require('express');
const Wappalyzer = require('wappalyzer');
const log = require('../middleware/logger').default;

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

// get list of tech used by website
router.get('/analyze/:website', async (req, res) => {
  const { website } = req.params;
  const isValidWebsite = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)/gm;
  let tech = [];

  if (!website.match(isValidWebsite)) {
    res.sendStatus(206);
  }

  const wappalyzer = new Wappalyzer();
  try {
    await wappalyzer.init();
    const site = await wappalyzer.open(website);
    site.on('error', (e) => {
      log.error(`wappalyzer error: ${e}`);
    });
    tech = await site.analyze();
    await wappalyzer.destroy();
  } catch (error) {
    log.error(error);
  }

  tech = tech?.technologies.filter((elem) => elem.confidence === 100);
  res.status(200).send(tech);
});

module.exports = router;
