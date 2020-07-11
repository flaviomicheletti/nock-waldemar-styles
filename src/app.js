const express    = require('express');
const bodyParser = require('body-parser');
const axios      = require('axios');

const app = express();

app.use(bodyParser.json());

app.get('/:login/followers', async (req, res) => {
  const { login } = req.params;

  let response;
  try {

    const { data } = await axios.get(`https://api.github.com/users/${login}`);
    response = { followers: data.followers };

  } catch (error) {
    const { status, data } = error.response;
    if (status == 404) {
      response = { error: data };
    } else {
      response = { error: 'Error' };
    }
  }

  res.json(response);
});

app.get('/other', async (req, res) => {
  res.json('ok123');
});

module.exports = app;
