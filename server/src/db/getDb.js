//Importar las dependencias
const mysql = require('mysql2/promise');

//Obtener las variables de entorno necesarias
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

//Variable que almacenará un grupo de conexiones
let pool;

//Funcion que retorna una conexion libre con la base de datos
const getDb = async () => {
    try {
        //Si la variable "pool" es indefinida...
        if (!pool) {
            //Crear una conexion con el servidor MySQL
            const connection = await mysql.createConnection({
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                timezone: 'Z',
            });

            //Creamos la base de datos si no existe
            await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);

            //Creamos el grupo de conexiones
            pool = mysql.createPool({
                connectionLimit: 10,
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_NAME,
                timezone: 'Z',
            });
        }
        //Retornamos una conexion libre con la base de datos
        return await pool.getConnection();
    } catch (err) {
        console.error(err);
    }
};

//Exportacion de la funcion
module.exports = getDb;
