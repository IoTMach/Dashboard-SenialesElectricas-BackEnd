const conn = require('../dbConfig');

const DatosSimulacion = async(req, res) =>{
    const response = await conn.query(`select * from simulacion where piso = $1;`, 
    [req.params.id]);
    res.status(200).json(response.rows); 
}

module.exports = {
    DatosSimulacion
}