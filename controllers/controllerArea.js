const conn = require('../dbConfig');

const updateArea = async(req, res) =>{
    const id = req.params.id;
    const {piso, area} = req.body;
    const response = await conn.query(`UPDATE public.area
	    SET area=? WHERE piso = $1;`, [area, id]);
    console.log(response)
    res.send(response);
}

module.exports = {
    updateArea
}