//Importar dependencias
const bcrypt = require('bcrypt');

//Importar la funcion que nos permite obtener una conexion libre con la base de datos.
const getDb = require('../../db/getDb');

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
            const err = new Error('Ya existe un usuario con ese email', 409);
            err.httpStatus = 409;
            throw err;
        }

        //Busca en la base de datos algun usuario con ese username
        [users] = await connection.query(
            `SELECT id FROM users WHERE username = ?`,
            [username]
        );

        //Si existe algun usuario con ese nombre lanzamos un error
        if (users.length > 0) {
            const err = new Error('Ya existe un usuario con ese nombre', 409);
            err.httpStatus = 409;
            throw err;
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
