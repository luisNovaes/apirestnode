var express = require('express');
const db = require('../config/db.config.js');
const Avaliacao = db.avaliacao;
const Local = db.local;
const Op = db.Sequelize.Op;

exports.cadastrar = (req, res) => {
  // Save User to Database
  console.log("Processing func -> cadastrar local");
  console.log(req.userId);
  
  Local.create({
    city: req.body.city,
    regiao: req.body.regiao,
    country: req.body.country,
    lat: req.body.lat,
    lon: req.body.lon,
    organization: req.body.organization,
    comentario: req.body.comentario,
    userId: req.userId
  }).then(local => {
    Avaliacao.findAll({
      where: {
      avaliacao: {
        [Op.or]: req.body.avaliacao
      }
      }
    }).then(avaliacoes => {
        local.setAvaliacoes(avaliacoes).then(() => {
        res.send("Local registrado com sucesso!");
            });
    }).catch(err => {
      res.status(500).send("Error -> " + err);
    });
  }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
  });
}

exports.listarcadastros = function(req, res, next) {
      
    Local.findAll({}, function(err, locais) {

    }).then(local => {
        res.status(200).json({
          "description": "Lista de todos os locais cadastrados.",
          "local": local
        });
      }).catch(err => {
        res.status(500).json({
          "description": "Tente novamente mais tarde.",
          "error": err
        });
      })
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

