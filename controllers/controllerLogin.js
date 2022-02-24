
const { Pool } = require('pg');
const conn = require('../dbConfig');

const getLogin = async (req, res) =>{
    usuario_nombre = req.params.id.split('-')[0];
    usuario_password = req.params.id.split('-')[1];
    const response = await conn.query(`select * from public.usuarios where
     usuario_nombre = $1 and usuario_password = $2;`,
        [usuario_nombre, usuario_password]);
    res.status(200).json(response.rows);  
};

module.exports = {
    getLogin
}