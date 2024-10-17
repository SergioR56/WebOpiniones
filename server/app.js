//Importar las variables de entorno de nuestro fichero .env
require('dotenv').config();

//Importar las dependencias
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

//Importar las rutas
const routes = require('./src/routes');

//Importar las funciones controladoras de errores
const {
    errorController,
    notFoundController,
} = require('./src/controllers/errors');

//Crear el servidor
const app = express();

//Middleware que deserializa un body en formato "raw" creando la propiedad "body" en el objeto request
app.use(express.json());

//Middleware que muestra por consola la informacion de la peticion entrante
app.use(morgan('dev'));

//Middleware que evita problemas con las CORS cuando intentamos conectar el cliente con el servidor.
app.use(cors());

//Middleware que indica a express donde se encuentran las rutas
app.use(routes);

//Middleware de ruta no encontrada
app.use(notFoundController);

//Middleware de error
app.use(errorController);

//El servidor escucha peticiones en un puerto especificado
app.listen(process.env.PORT, () => {
    console.log(`Server is running at https://localhost:${process.env.PORT}`);
});
