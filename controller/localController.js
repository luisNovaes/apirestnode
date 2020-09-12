var express = require('express');
const db = require('../config/db.config.js');
const ValorAvaliacao = db.valorAvaliacao;
const Avaliacao = db.avaliacao;
const Local = db.local;
const Op = db.Sequelize.Op;

exports.cadastrar = (req, res) => {
  // Save User to Database
  console.log("Processing func -> cadastrar local");
  console.log(req.userId);
  
  Local.create({
    localNome: req.body.localNome,
    city: req.body.city,
    regiao: req.body.regiao,
    country: req.body.country,
    lat: req.body.lat,
    lon: req.body.lon,
    comentario: req.body.comentario,
    userId: req.userId
  }).then(() => {
        res.send("Local registrado com sucesso!");
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    });
}




exports.listarcadastros = function(req, res, next) {
      
    Local.findAll({}, function(err, locais) {

    }).then(local => {
        res.status(200).json({
          "description": "Lista de todos os locais cadastrados.",
          "local": local.sort()
        });
      }).catch(err => {
        res.status(500).json({
          "description": "Tente novamente mais tarde.",
          "error": err
        });
      })
}


exports.avaliarlocal = (req, res) => {
  // Save User to Database
  console.log("Processing func -> cadastrar local");
  console.log(req.userId);
  
  Avaliacao.create({
    userId: req.body.userId,
    localId: req.body.localId,
    comentario: req.body.comentario,
  }).then(avaliacao => {
    ValorAvaliacao.findAll({
      where: {
      valorAvaliacao: {
        [Op.or]: req.body.avaliacao
      }
      }
    }).then(valoresAvaliacao => {
        avaliacao.setValoresAvaliacaos(valoresAvaliacao).then(() => {
        res.send("Local registrado com sucesso!");
            });
    }).catch(err => {
      res.status(500).send("Error -> " + err);
    });
  }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
  });
}

exports.listarporuser = function(req, res, next) {
    console.log(req.userId);
    Local.findByPk("1", function(err, locais) {
       
    }).then(local => {
        res.status(200).json({
          "description": "Locais cadastrdos por usuários.",
          "local": local,
          
        });
      }).catch(err => {
        res.status(500).json({
          "description": "Tente novamente mais tarde.",
          "error": err
        });
      })

}

