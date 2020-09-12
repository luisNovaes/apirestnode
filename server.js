var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
 
require('./routes/auth.js')(app);
require('./routes/local.js')(app);
 
const db = require('./config/db.config.js');
 
const Role = db.role;
const ValorAvaliacao = db.valorAvaliacao;
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  initial();
  avaliacao();
});
 
//require('./app/route/project.route.js')(app);
 
// Create a Server
var server = app.listen(8080, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})
 
 
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