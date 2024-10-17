//Importamos express y creamos un router
const express = require('express');
const router = express.Router();

//Importamos las funciones controladoras finales
const { newUserController } = require('../controllers/users/index');

//Registro de usuario
router.post('/users/register', newUserController);

module.exports = router;
