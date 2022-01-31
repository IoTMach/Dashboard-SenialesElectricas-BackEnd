const conn = require('../dbConfig');

const createOcupacion = async( req, res) => {
    const { time, piso, num} = req.body;
    const response  = await conn.query (`INSERT INTO public.ocupacion(
        "time", piso, num)
        VALUES ($1, $2, $3);`,
        [ time, piso, num]);
            console.log(response)
        res.send(response);
}

module.exports = {
    createOcupacion
}