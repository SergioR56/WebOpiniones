//Importar los modelos
const insertUserModel = require('../../models/users/insertUserModel');

//Importamos los errores
const { missingFieldsError } = require('../../services/errorService');

//Funcion controladora final que inserta un nuevo usuario
const newUserController = async (req, res, next) => {
    try {
        //Se importan los datos del body
        const { username, email, password } = req.body;

        //Si falta algun campo se lanza un error
        if (!username || !email || !password) {
            missingFieldsError();
        }

        //Se inserta el usuario
        await insertUserModel(username, email, password);

        res.send({
            status: 'OK',
            message: 'Usuario creado correctamente',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newUserController;
