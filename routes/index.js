const { Router } = require('express');

const authController = require('../controller/authController');
const localController = require('../controller/localController');
const verifyCadastro = require('../util/verifycadastro.js');
const verifySignUp = require('../auth/verifySignUp');
const authJwt = require('../auth/verifyJwtToken');

const router = Router();

router.post('/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], authController.signup); 
router.post('/auth/signin', authController.signin);

router.post('/local/cadastrar-local', localController.cadastrarlocal);
router.post('local/avaliar-local/:localId', localController.avaliarlocal);
  
router.get('/local/listar-todos-locais', localController.listartodoslocais);
router.get('/local/listar-todas-avaliacoes', localController.listartodasavaliacoes);

router.get('/local/listar-local-especifico/:id', localController.listarlocal);
router.get('/local/listar-avaliacoes-local/:id', localController.listaravaliacoeslocal);

router.get('/local/listar-local-por-usuario/:userId', localController.listarlocalporuser);

module.exports = router;