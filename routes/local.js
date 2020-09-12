const localController = require('../controller/localController.js');
const verifyCadastro = require('../util/verifycadastro.js');
const authJwt = require('../auth/verifyJwtToken');

var express = require('express');

 module.exports = function(app) {
 
  app.post('/api/local/cadastrar', [authJwt.verifyToken,  authJwt.isPmOrAdmin], localController.cadastrar);
  app.get('/api/local/listar-todos', [authJwt.verifyToken, authJwt.isPmOrAdmin],localController.listarcadastros);
  app.post('/api/local/avaliar-local', [verifyCadastro.checkAvaliacao, authJwt.verifyToken,  authJwt.isPmOrAdmin], localController.avaliarlocal);
  app.get('/api/local/listar-por-usuario', localController.listarporuser);
  
} 