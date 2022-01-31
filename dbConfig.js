require("dotenv").config();

const { Pool, Connection  } = require("pg");

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    ssl: false
}

const conexion_pg = new Pool(config);

conexion_pg.connect()
    .then(db_pg => console.log('Conexión exitosa con base de datos PostgreSQL'))
    .catch(err => console.log('Error al conectar con base de datos PostgreSQL ' + err));

module.exports = conexion_pg;