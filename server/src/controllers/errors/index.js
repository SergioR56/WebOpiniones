//Importar controladores finales de errores
const errorController = require('./errorController');
const notFoundController = require('./notFoundController');

module.exports = {
    notFoundController,
    errorController,
};
