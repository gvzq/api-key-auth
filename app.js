require('dotenv').config();
const express = require('express');
const port = process.env.PORT;
const app = express();

app.listen(port, (err)=> {
  if (err) {
    console.error('Failure to launch server');
    return;
  }
  console.log(`Listening on port ${port}`);
});