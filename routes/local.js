const localController = require('../controller/localController.js');
const verifyCadastro = require('../util/verifycadastro.js');
const authJwt = require('../auth/verifyJwtToken');

var express = require('express');

 module.exports = function(app) {
 
    
 
  app.post('/api/local/cadastrar', [authJwt.verifyToken, verifyCadastro.checkAvaliacao, authJwt.isPmOrAdmin], localController.cadastrar);
  
  app.get('/api/local/listar-todos', localController.listarcadastros);
  app.get('/api/local/listar-por-usuario', localController.listarporuser);
} 