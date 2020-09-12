var express = require('express');
const db = require('../config/db.config.js');
const ValorAvaliacao = db.valorAvaliacao;
const Avaliacao = db.avaliacao;
const Local = db.local;
const Op = db.Sequelize.Op;

exports.cadastrarlocal = (req, res) => {

  console.log("Processing func -> cadastrar local");
  console.log(req.userId);
  
  Local.create({
    city: req.body.city,
    regiao: req.body.regiao,
    country: req.body.country,
    lat: req.body.lat,
    lon: req.body.lon,
    nomelocal: req.body.nomelocal,
    userId: req.userId
  }).then(() => {
        res.send("Local registrado com sucesso!");
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    });
}

exports.avaliarlocal = (req, res) => {
  
  console.log("Processing func -> cadastrar local");
  console.log(req.userId);
  
  Avaliacao.create({
    userId: req.userId,
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
        res.send("Avaliação do local registrado com sucesso!");
            });
    }).catch(err => {
      res.status(500).send("Error -> " + err);
    });
  }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
  });
}



exports.listartodoslocais = (req, res, next) => {
  console.log(req.userId);
    Local.findAll({}, (err, locais) => {

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

exports.listartodasavaliacoes = (req, res) =>{
  console.log(req.userId);
  Avaliacao.findAll({}, (err, avaliacoes) => {

  }).then(avaliacao => {
      res.status(200).json({
        "description": "Lista de todos os locais cadastrados.",
        "local": avaliacao.sort()
      });
    }).catch(err => {
      res.status(500).json({
        "description": "Tente novamente mais tarde.",
        "error": err
      });
    })

}


exports.listarlocal = (rec, res) =>{


}

exports.listaravaliacoeslocal = (rec, res) =>{
  
}


exports.listarporuser = (req, res, next) => {
    console.log(req.userId);
    Local.findByPk(req.params.userId, (err, locais)  =>{
       
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

