const db = require('../config/db.config.js');
const config = require('../model/enumAvaliacao.js');
const Avaliacoes = config.Avaliacao; 
const User = db.user;
 
checkAvaliacao = (req, res, next) => {  
  for(let i=0; i<req.body.avaliacao.length; i++){
    if(!Avaliacoes.includes(req.body.avaliacao[i].toUpperCase())){
      res.status(400).send("Fail -> Does NOT exist Avaliação = " + req.body.avaliacao[i]);
      return;
    }
  }
  next();
}
 
const cadastroVerify = {};

cadastroVerify.checkAvaliacao = checkAvaliacao;
 
module.exports = cadastroVerify;