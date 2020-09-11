var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
 
require('./routes/auth.js')(app);
require('./routes/local.js')(app);
 
const db = require('./config/db.config.js');
 
const Role = db.role;
const Avaliacao = db.avaliacao;
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync with { force: true }');
  //initial();
  //avaliacao();
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
  Avaliacao.create({
    id: 1,
    avaliacao: "1"
  });
  
  Avaliacao.create({
    id: 2,
    avaliacao: "2"
  });
  
  Avaliacao.create({
    id: 3,
    avaliacao: "3"
  });
  
  Avaliacao.create({
    id: 4,
    avaliacao: "4"
  });
  
  Avaliacao.create({
    id: 5,
    avaliacao: "5"
  }); 
}