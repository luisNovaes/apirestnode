const request = require('supertest');
const app = require('../config_test/index');

describe('Post Endpoints', () => {

  it('Cadastrar usário', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        name: "Agripino",
        email: 'testeapi@gmail.com',
        password: '12345678',
        roles : ["pm"]
      });
    expect(res.statusCode).toEqual(200);
  });

  it('Login Usuário', async () => {
    const res = await request(app)
      .post('/api/auth/signin')
      .send({
        email: 'testeapi@gmail.com',
        password: '12345678'
      });
    expect(res.statusCode).toEqual(200);
  });

  it('Cadastrar local', async () => {
    const res = await request(app)
      .post('/api/local/cadastrar-local')
      .send({
        city: 'Salvador',
        regiao: 'Bahia',
        country: 'Brasil',
        lat :'6.0117',
        lon: '-5.2231',
        nomelocal: 'Amaralina',
        userId: '1'
      });
    expect(res.statusCode).toEqual(200);
  });

  it('Avaliar local', async () => {
    const res = await request(app)
      .post('/api/local/avaliar-local/1')
      .send({
        userId: '1',
        comentario: 'Bahia',
        avaliacao: '1',
      });
    expect(res.statusCode).toEqual(404);
  });

  it('Listar todos os locais', async () => {

    const res = await request(app)
      .get('/api/local/listar-todos-locais');

    expect(res.statusCode).toEqual(200);
  });

  it('Listar todas as avaliações', async () => {

    const res = await request(app)
      .get('/api/local/listar-todas-avaliacoes');

    expect(res.statusCode).toEqual(200);
  });

  it('Listar um local', async () => {
    const res = await request(app)
    .get('/api/local/listar-local-especifico/1');
    expect(res.statusCode).toEqual(200);
  });

  it('Listar Avaliações do local', async () => {
    const res = await request(app)
    .get('/api/local/listar-avaliacoes-local/1');
    expect(res.statusCode).toEqual(200);
  });

  it('Listar Local por usuário', async () => {
    const res = await request(app)
    .get('/api/local/listar-local-por-usuario/1');
    expect(res.statusCode).toEqual(200);
  });

});
