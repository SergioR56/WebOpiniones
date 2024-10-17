//Importamos express y creamos un router
const express = require('express');
const router = express.Router();

//Importamos las rutas
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

//Middleware que indica a express donde se encuentran las rutas de los usuarios y los posts
router.use(userRoutes);
router.use(postRoutes);

module.exports = router;
