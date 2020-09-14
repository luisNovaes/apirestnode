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
  
  Avaliacao.create({
    userId: req.userId,
    localId: req.params.localId,
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
        res.send("Local avaliado com sucesso!");
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
      Local.findAll({  
        order: [
          ['city', 'ASC'],
          ['nomelocal', 'ASC'],
        ]
    }).then(local => {
        res.status(200).json({ 
          "description": "Lista de todos os locais em ordem alfabética.",
          "local": local,
          
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
  Avaliacao.findAll({
    include: [{
      model: ValorAvaliacao 
    }]
  }, (err, avaliacoes) => {

  }).then(avaliacao => {
      res.status(200).json({
        "description": "Lista de todas as avaliações.",
        "local": avaliacao.sort()
      });
    }).catch(err => {
      res.status(500).json({
        "description": "Tente novamente mais tarde.",
        "error": err
      });
    })

}

exports.listarlocal= (req, res) =>{
  console.log(req.userId);
      Local.findAll({
        where: {
          id: req.params.id
        }   
    }).then(local => {
        res.status(200).json({ 
          "description": "Local especifico.",
          "local": local
        });
      }).catch(err => {
        res.status(500).json({
          "description": "Tente novamente mais tarde.",
          "error": err
        });
      })
}

exports.listaravaliacoeslocal = (req, res) =>{

  console.log(req.userId);
      Avaliacao.findAll({
        where: {
          localId: req.params.id
        },
        include: [{
      model: ValorAvaliacao 
    }]   
    }).then(avaliacao => {
        res.status(200).json({ 
          "description": "Lista de avaliações de locais.",
          "local": avaliacao
        });
      }).catch(err => {
        res.status(500).json({
          "description": "Tente novamente mais tarde.",
          "error": err
        });
      })
  
}

exports.listarlocalporuser = (req, res, next) => {
    console.log(req.userId);
      Local.findAll({
        where: {
          userId: req.params.userId
        },  
        order: [
          ['nomelocal', 'ASC'],
        ]
    }).then(local => {
        res.status(200).json({ 
          "description": "Locais locais por usuários.",
          "local": local,
          
        });
      }).catch(err => {
        res.status(500).json({
          "description": "Tente novamente mais tarde.",
          "error": err
        });
      })
}


exports.listalocalordemproximidaqdelatlng = (req, res, next) => {

          Local.findAll({
            where: {
              lat: {
                [Op.or]: {
                  [Op.gte]: req.body.latitude, 
                  [Op.eq]: null
                }
              },
              lon: {
                [Op.or]: {
                  [Op.gte]: req.body.longetude, 
                  [Op.eq]: null
                }
              },
              lat: {
                [Op.or]: {
                  [Op.lte]: req.body.latitude, 
                  [Op.eq]: null
                }
              },
              lon: {
                [Op.or]: {
                  [Op.lte]: req.body.longetude, 
                  [Op.eq]: null
                }
              }            
          },  
      }).then(local => {
          res.status(200).json({ 
            "description": "Locais por coordenadas Geograficas.",
            "local": local
            
          });
        }).catch(err => {
          res.status(500).json({
            "description": "Tente novamente mais tarde.",
            "error": err
        });
    })
}


