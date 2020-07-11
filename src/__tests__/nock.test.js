const supertest = require('supertest');
const app = require('../../src/app.js');
const nock = require('nock');

describe('Github resource with nock', () => {
  let request;

  beforeAll(async function () {
    request = supertest(app);
    nock.cleanAll();
    // nock.disableNetConnect()
    // nock.enableNetConnect('127.0.0.1')
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

      nock('http://localhost')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .persist()
        .get('/other')
        .reply(200, "sem efeito");

      const response = await request.get('/other');
      expect(response.body).toEqual('sem efeito');

    });

  });
});
