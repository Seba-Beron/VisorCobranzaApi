// RUTAS DE USUARIOS

const router = require("express").Router();
const usuarioController = require('../controllers/usuario.controller')
const verifyAuth = require('../middlewares/seguridad')


router.get('/prueba', verifyAuth, usuarioController.prueba)
router.post('/login', usuarioController.login)
router.post('/register', usuarioController.register)


module.exports = router;