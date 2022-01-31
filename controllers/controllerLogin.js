
const { Pool } = require('pg');
const conn = require('../dbConfig');

const getLogin = async (req, res) =>{
    const {id, usuario_nombre, usuario_password} = req.body;
    const response = await conn.query(`select usuario_nombre usuario_password
        from public.usuarios where usuario_nombre = $1 and usuario_password = $2;`,
        [usuario_nombre, usuario_password]);
};

module.exports = {
    getLogin
}