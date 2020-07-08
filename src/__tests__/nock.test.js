const supertest = require('supertest');
const app = require('../../src/app.js');
const nock = require('nock');

describe('Github resource with nock', () => {
  let request;

  beforeAll(async function() {
    request = supertest(app);
    // nock.cleanAll();
  });

  // afterEach(() => {
  //   nock.cleanAll();
  // });

  afterAll(async () => await closeApp());

  describe('nock', () => {

      test('sei lá', async () => {

        nock('https://api.github.com')
          .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
          .get('/users/waldemarnt')
          .reply(200, {
            followers: 120,
          });

        const response = await request.get('/waldemarnt/followers');
        expect(response.body).toEqual({ followers: 120 });

      });

      test('outro', async () => {

        nock('/')
          .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
          .get('qwerytqwueyrtquiweytrquity')
          .reply(200, "FILHO DA PUTA");

        const response = await request.get('/caralho');
        expect(response.body).toEqual('merda');

      });




  });
});
