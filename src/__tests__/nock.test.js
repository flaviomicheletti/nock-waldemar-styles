const supertest = require('supertest');
const app = require('../../src/app.js');
const nock = require('nock');

describe('Github resource with nock', () => {
  let request;

  beforeAll(async function() {
    request = supertest(app);
    nock.cleanAll();
  });

  afterAll(async () => await closeApp());

  describe('nock', () => {

      test('primeiro endpoint', async () => {

        nock('https://api.github.com')
          .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
          .get('/users/waldemarnt')
          .reply(200, {
            followers: 120,
          });

        const response = await request.get('/waldemarnt/followers');
        expect(response.body).toEqual({ followers: 120 });

      });

      test('outro endpoint', async () => {

        nock('/nao-existe')
          .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
          .get('qulquer-coisa')
          .reply(200, "sem efeito");

        const response = await request.get('/other');
        expect(response.body).toEqual('ok');

      });

  });
});
