//Importar las variables de entorno de nuestro fichero .env
require('dotenv').config();

//Importar las dependencias
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

//Crear el servidor
const app = express();

//Middleware que deserializa un body en formato "raw" creando la propiedad "body" en el objeto request
app.use(express.json());

//Middleware que muestra por consola la informacion de la peticion entrante
app.use(morgan('dev'));

//Middleware que evita problemas con las CORS cuando intentamos conectar el cliente con el servidor.
app.use(cors());

//Middleware de ruta no encontrada
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Ruta no encontrada',
    });
});

//Middleware de error
//eslint-disable-next-line
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message,
    });
});

//El servidor escucha peticiones en un puerto especificado
app.listen(process.env.PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${process.env.PORT}`);
});
