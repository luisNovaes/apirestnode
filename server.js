var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
 
require('./routes/auth.js')(app);
require('./routes/local.js')(app);
 
const db = require('./config/db.config.js');
 
const Role = db.role;
const ValorAvaliacao = db.valorAvaliacao;
  
// force: true irá remover a tabela se ela já existir
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  initial();
  avaliacao();
});
 
 
var server = app.listen(8080, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})
 
 //Cria os roles necessários para o cadastro do usuàrio
function initial(){
  Role.create({
    id: 1,
    name: "USER"
  });
  
  Role.create({
    id: 2,
    name: "ADMIN"
  });
  
  Role.create({
    id: 3,
    name: "PM"
  });
}

//Criaq os valores da avaliação necessários para avaliar o local.
function avaliacao(){
  ValorAvaliacao.create({
    id: 1,
    valorAvaliacao: "1"
  });
  
  ValorAvaliacao.create({
    id: 2,
    valorAvaliacao: "2"
  });
  
  ValorAvaliacao.create({
    id: 3,
    valorAvaliacao: "3"
  });
  
  ValorAvaliacao.create({
    id: 4,
    valorAvaliacao: "4"
  });
  
  ValorAvaliacao.create({
    id: 5,
    valorAvaliacao: "5"
  }); 
}