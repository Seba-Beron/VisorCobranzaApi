// RUTAS DE USUARIOS

const router = require("express").Router(); // importar express.Router()

const usuarioController = require('../controllers/usuario.controller') // importar el archivo de controladores de usuarios
const verifyToken = require('../middlewares/seguridad');


router.get('/prueba', verifyToken, usuarioController.prueba)
router.post('/login', usuarioController.login)
router.post('/register', usuarioController.register)



module.exports = router;