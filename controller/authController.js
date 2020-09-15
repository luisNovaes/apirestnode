const db = require('../config/db.config.js');
const config = require('../auth/token.js');
const User = db.user;
const Role = db.role;
 
const Op = db.Sequelize.Op;
 
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
 
exports.signup = (req, res) => {
  
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  }).then(user => {
    Role.findAll({
      where: {
      name: {
        [Op.or]: req.body.roles.map(role => role.toUpperCase())
      }
      }
    }).then(roles => {
      user.setRoles(roles).then(() => {
        res.send("Usuário registrado com sucesso!");
            });
    }).catch(err => {
      res.status(500).send("Erro -> " + err);
    });
  }).catch(err => {
    res.status(500).send("Falhou! Erro -> " + err);
  })
}
 
exports.signin = (req, res) => {

  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send('Email não Cadastrado.');
    }
 
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
    }
    
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 3600 // expira em 1 hour
    });
   
    res.status(200).send({ auth: true, accessToken: token });
    
  }).catch(err => {
    res.status(500).send('Erro -> ' + err);
  });
}
 
exports.userContent = (req, res) => {
  User.findOne({
    where: {id: req.userId},
    attributes: ['name', 'email'],
    include: [{
      model: Role,
      attributes: ['id', 'name'],
      through: {
        attributes: ['userId', 'roleId'],
      }
    }]
  }).then(user => {
    res.status(200).json({
      "description": "User Content Page",
      "user": user
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access User Page",
      "error": err
    });
  })
}
 
exports.adminBoard = (req, res) => {
  User.findOne({
    where: {id: req.userId},
    attributes: ['name', 'email'],
    include: [{
      model: Role,
      attributes: ['id', 'name'],
      through: {
        attributes: ['userId', 'roleId'],
      }
    }]
  }).then(user => {
    res.status(200).json({
      "description": "Admin Board",
      "user": user
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access Admin Board",
      "error": err
    });
  })
}
 
exports.managementBoard = (req, res) => {
  User.findOne({
    where: {id: req.userId},
    attributes: ['name', 'email'],
    include: [{
      model: Role,
      attributes: ['id', 'name'],
      through: {
        attributes: ['userId', 'roleId'],
      }
    }]
  }).then(user => {
    res.status(200).json({
      "description": "Management Board",
      "user": user
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access Management Board",
      "error": err
    });
  })
}