const conn = require('../dbConfig');

const DatosSimulacion = async(req, res) =>{
    const response = await conn.query(`select * from simulacion where piso = $1;`, 
    [req.params.id]);
    res.status(200).json(response.rows); 
}

const postSimulacion = async( req, res) => {
    const { v3ph, vl1, vl2, vl3, i3ph, il1, il2, il3, pf3ph, pfl1, pfl2, pfl3, ap3ph, apl1, apl2, apl3, rp3ph, rpl1, rpl2,
        rpl3, freq, ae3ph, ael1, ael2, ael3, re3ph, rel1, rel2, rel3, piso, id} = req.body;
    const response  = await conn.query (`INSERT INTO public.simulacion(
       v3ph, vl1, vl2, vl3, i3ph, il1, il2, il3, pf3ph, pfl1, pfl2, pfl3, ap3ph, apl1, apl2, apl3, rp3ph, rpl1, rpl2, rpl3, freq, ae3ph, ael1, ael2, ael3, re3ph, rel1, rel2, rel3, piso, id)
       VALUES  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, 
           $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31);`,
       [ v3ph, vl1, vl2, vl3, i3ph, il1, il2, il3, pf3ph, pfl1, pfl2, pfl3, ap3ph, apl1, apl2, apl3, rp3ph, rpl1, rpl2,
            rpl3, freq, ae3ph, ael1, ael2, ael3, re3ph, rel1, rel2, rel3, piso, id]);
   res.send(response);
}

const putSimulacion = async( req, res) => {
    const ide = req.params.id;
    const { v3ph, vl1, vl2, vl3, i3ph, il1, il2, il3, pf3ph, pfl1, pfl2, pfl3, ap3ph, apl1, apl2, apl3, rp3ph, rpl1, rpl2,
         rpl3, freq, ae3ph, ael1, ael2, ael3, re3ph, rel1, rel2, rel3, piso, id} = req.body;
    const response  = await conn.query (`
    UPDATE public.simulacion
	SET v3ph=$1, vl1=$2, vl2=$3, vl3=$4, i3ph=$5, il1=$6, il2=$7, il3=$8, pf3ph=$9, 
    pfl1=$10, pfl2=$11, pfl3=$12, ap3ph=$13, apl1=$14, apl2=$15, apl3=$16, rp3ph=$17, rpl1=$18,
    rpl2=$19, rpl3=$20, freq=$21, ae3ph=$22, ael1=$23, ael2=$24, ael3=$25, re3ph=$26, rel1=$27, 
    rel2=$28, rel3=$29, piso=$30, id=$31
	WHERE id = $32 and piso = $30;`,
        [ v3ph, vl1, vl2, vl3, i3ph, il1, il2, il3, pf3ph, pfl1, pfl2, pfl3, ap3ph, apl1, apl2, apl3, rp3ph, rpl1, rpl2,
             rpl3, freq, ae3ph, ael1, ael2, ael3, re3ph, rel1, rel2, rel3, piso, id, ide]);
    res.send(response);
}

const deleteSimulacion = async(req, res) =>{
    let id = req.params.id.split('n')[0];
    let piso = req.params.id.split('n')[1];
    const response = await conn.query(`DELETE FROM public.simulacion WHERE id = $1 and piso = $2;`, 
    [id, piso]);
    res.status(200).json(response.rows); 
}

module.exports = {
    DatosSimulacion, postSimulacion, putSimulacion, deleteSimulacion
}