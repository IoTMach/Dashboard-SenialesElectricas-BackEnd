const conn = require('../dbConfig');

const DatosSimulacion = async(req, res) =>{
    const response = await conn.query(`select * from simulacion where piso = $1;`, 
    [req.params.id]);
    res.status(200).json(response.rows); 
}

const postSimulacion = async( req, res) => {
    const { time, v3ph, vl1, vl2, vl3, i3ph, il1, 
    il2, il3, pf3ph, pfl1, pfl2, pfl3, ae3ph, re3ph, se3ph, piso} = req.body;
    const response  = await conn.query (`INSERT INTO public.medidores(
        "time", v3ph, vl1, vl2, vl3, i3ph, il1, il2, il3, pf3ph, pfl1, pfl2, pfl3, ae3ph, re3ph, se3ph, piso)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);`,
        [ time, v3ph, vl1, vl2, vl3, i3ph, il1, 
            il2, il3, pf3ph, pfl1, pfl2, pfl3, ae3ph, re3ph, se3ph, piso]);
    res.send(response);
}

const putSimulacion = async( req, res) => {
    const { time, v3ph, vl1, vl2, vl3, i3ph, il1, 
    il2, il3, pf3ph, pfl1, pfl2, pfl3, ae3ph, re3ph, se3ph, piso} = req.body;
    const response  = await conn.query (`INSERT INTO public.medidores(
        "time", v3ph, vl1, vl2, vl3, i3ph, il1, il2, il3, pf3ph, pfl1, pfl2, pfl3, ae3ph, re3ph, se3ph, piso)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);`,
        [ time, v3ph, vl1, vl2, vl3, i3ph, il1, 
            il2, il3, pf3ph, pfl1, pfl2, pfl3, ae3ph, re3ph, se3ph, piso]);
    res.send(response);
}

module.exports = {
    DatosSimulacion, postSimulacion, putSimulacion
}