//Importar dependencias
const bcrypt = require('bcrypt');

//Importar la funcion que nos permite obtener una conexion libre con la base de datos.
const getDb = require('../../db/getDb');

//Importar los errores.
const {
    emailAlreadyRegisteredError,
    userAlreadyRegisteredError,
} = require('../../services/errorService');

//Funcion que se conectara a la base de datos y creara un usuario.
const insertUserModel = async (username, email, passwod) => {
    let connection;

    try {
        connection = await getDb();

        //Busca en la base de datos algun usuario con ese email
        let [users] = await connection.query(
            `SELECT id FROM users WHERE email = ?`,
            [email]
        );

        //Si existe algun usuario con ese email lanzamos un error
        if (users.length > 0) {
            emailAlreadyRegisteredError();
        }

        //Busca en la base de datos algun usuario con ese username
        [users] = await connection.query(
            `SELECT id FROM users WHERE username = ?`,
            [username]
        );

        //Si existe algun usuario con ese nombre lanzamos un error
        if (users.length > 0) {
            userAlreadyRegisteredError();
        }

        //Encripta la contraseña
        const hashedPass = await bcrypt.hash(passwod, 10);

        //Creamos el usuario
        await connection.query(
            `INSERT INTO users (email, username, password) VALUES(?, ?, ?)`,
            [email, username, hashedPass]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUserModel;
