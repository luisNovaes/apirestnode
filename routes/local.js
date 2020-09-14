const localController = require('../controller/localController.js');
const verifyCadastro = require('../util/verifycadastro.js');
const authJwt = require('../auth/verifyJwtToken');

var express = require('express');

 module.exports = function(app) {
 
  app.post('/api/local/cadastrar-local', [authJwt.verifyToken,  authJwt.isPmOrAdmin], localController.cadastrarlocal);
  app.post('/api/local/avaliar-local/:localId', [verifyCadastro.checkAvaliacao, authJwt.verifyToken,  authJwt.isPmOrAdmin], localController.avaliarlocal);
  
  app.get('/api/local/listar-todos-locais', [authJwt.verifyToken, authJwt.isPmOrAdmin],localController.listartodoslocais);
  app.get('/api/local/listar-todas-avaliacoes', [authJwt.verifyToken, authJwt.isPmOrAdmin], localController.listartodasavaliacoes);

  
  app.post('/api/local/listar-todas-proximidade-lat-lng', [authJwt.verifyToken, authJwt.isPmOrAdmin], localController.listalocalordemproximidaqdelatlng);


  app.get('/api/local/listar-local-especifico/:id', [authJwt.verifyToken, authJwt.isPmOrAdmin], localController.listarlocal);
  app.get('/api/local/listar-avaliacoes-local/:id', [authJwt.verifyToken, authJwt.isPmOrAdmin], localController.listaravaliacoeslocal);

  app.get('/api/local/listar-local-por-usuario/:userId', [authJwt.verifyToken, authJwt.isPmOrAdmin], localController.listarlocalporuser);

} 