const express = require('express');
const bodyParser = require('body-parser');
const routeSetup = require('./routes');
const Github = require('./resources/github');

const app = express();

const setupApp = async (githubResource = new Github()) => {
  app.use(bodyParser.json());
  app.use('/', routeSetup(githubResource));


  return app;
};

module.exports = {setupApp}
