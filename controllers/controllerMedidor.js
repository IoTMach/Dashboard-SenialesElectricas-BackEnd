const { response } = require('express');
const conn = require('../dbConfig');
 
let n = 0;

let num = 39;
let encendido = 0;

let kilo1 = 0;
let kilo2 = 0;
let kilo3 = 0;

let fInicio = "";
let fFinal = "";


const getMedidor = async(req, res) => {
    const response = await conn.query(`SELECT "time", v3ph, vl1, vl2, vl3, i3ph, il1, 
    il2, il3, pf3ph, pfl1, pfl2, pfl3, ae3ph, re3ph, se3ph, piso
	FROM public.medidores;`);

    res.status(200).json(response.rows);
};

const createMedidor = async( req, res) => {
    const { time, v3ph, vl1, vl2, vl3, i3ph, il1, 
    il2, il3, pf3ph, pfl1, pfl2, pfl3, ae3ph, re3ph, se3ph, piso} = req.body;
    const response  = await conn.query (`INSERT INTO public.medidores(
        "time", v3ph, vl1, vl2, vl3, i3ph, il1, il2, il3, pf3ph, pfl1, pfl2, pfl3, ae3ph, re3ph, se3ph, piso)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);`,
        [ time, v3ph, vl1, vl2, vl3, i3ph, il1, 
            il2, il3, pf3ph, pfl1, pfl2, pfl3, ae3ph, re3ph, se3ph, piso]);
    //console.log(response)
    res.send(response);
}

//--- Simulación --- 

const createSimulacion = async(req, res) =>{ 
    try{
        encendido = req.params.id;
        const response = await conn.query(`SELECT ae3ph, piso FROM public.medi where 
        "time" = (SELECT MAX("time") from public.medi)`);
        res.status(200).json(response.rows);
        kilo1 = response.rows[0].ae3ph
        kilo2 = response.rows[1].ae3ph
        kilo3 = response.rows[2].ae3ph
    } catch (error) {
        console.log('Error en la funcion createSimulacion ')
    }
    if(encendido == 1){
        simu()
    }else{
        console.log("apagado")
    }
}

async function simu (){
    let f = new Date();
    let fe = ""
        do {
            f = new Date();
            fe = f.toISOString().split('.')[0];
            fe = fe.replace("T"," ")  
            console.log(fe)

            n = random(0,8)
            try{    
                
                const medidor1 = await conn.query(`select * from simulacion where piso = $1 and id = $2`,
                        [ 1, n]);
                const medidor2 = await conn.query(`select * from simulacion where piso = $1 and id = $2`,
                        [ 2, n]);
                const medidor3 = await conn.query(`select * from simulacion where piso = $1 and id = $2`,
                        [ 3, n]);

                kilo1 += medidor1.rows[0].ae3ph;
                kilo2 += medidor2.rows[0].ae3ph;
                kilo3 += medidor3.rows[0].ae3ph;

                const response1  = await conn.query (`INSERT INTO public.medi(
                    "time", v3ph, vl1, vl2, vl3, i3ph, il1, il2, il3, pf3ph, pfl1, pfl2, pfl3, ae3ph, re3ph, se3ph, piso)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);`,
                    [fe, medidor1.rows[0].v3ph, medidor1.rows[0].vl1, medidor1.rows[0].vl2, 
                    medidor1.rows[0].vl3, medidor1.rows[0].i3ph, medidor1.rows[0].il1, 
                    medidor1.rows[0].il2, medidor1.rows[0].il3, medidor1.rows[0].pf3ph,
                    medidor1.rows[0].pfl1, medidor1.rows[0].pfl2, medidor1.rows[0].pfl3, 
                    kilo1, medidor1.rows[0].re3ph, medidor1.rows[0].se3ph, 1]);
                        console.log(response1) 
                const response12  = await conn.query (`INSERT INTO public.ocupacion(
                    "time", piso, num)
                    VALUES ($1, $2, $3);`,
                    [ fe, 1, num]);
                        console.log(response12)


                const response21  = await conn.query (`INSERT INTO public.medi(
                    "time", v3ph, vl1, vl2, vl3, i3ph, il1, il2, il3, pf3ph, pfl1, pfl2, pfl3, ae3ph, re3ph, se3ph, piso)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);`,
                    [fe, medidor2.rows[0].v3ph, medidor2.rows[0].vl1, medidor2.rows[0].vl2, 
                    medidor2.rows[0].vl3, medidor2.rows[0].i3ph, medidor2.rows[0].il1, 
                    medidor2.rows[0].il2, medidor2.rows[0].il3, medidor2.rows[0].pf3ph,
                    medidor2.rows[0].pfl1, medidor2.rows[0].pfl2, medidor2.rows[0].pfl3, 
                    kilo2, medidor2.rows[0].re3ph, medidor2.rows[0].se3ph, 2]);
                        console.log(response21) 
                const response22  = await conn.query (`INSERT INTO public.ocupacion(
                    "time", piso, num)
                    VALUES ($1, $2, $3);`,
                    [ fe, 2, num]);
                        console.log(response22)


                const response31  = await conn.query (`INSERT INTO public.medi(
                    "time", v3ph, vl1, vl2, vl3, i3ph, il1, il2, il3, pf3ph, pfl1, pfl2, pfl3, ae3ph, re3ph, se3ph, piso)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);`,
                    [fe, medidor3.rows[0].v3ph, medidor3.rows[0].vl1, medidor3.rows[0].vl2, 
                    medidor3.rows[0].vl3, medidor3.rows[0].i3ph, medidor3.rows[0].il1, 
                    medidor3.rows[0].il2, medidor3.rows[0].il3, medidor3.rows[0].pf3ph,
                    medidor3.rows[0].pfl1, medidor3.rows[0].pfl2, medidor3.rows[0].pfl3, 
                    kilo3, medidor3.rows[0].re3ph, medidor3.rows[0].se3ph, 3]);
                        console.log(response31) 
                const response32  = await conn.query (`INSERT INTO public.ocupacion(
                    "time", piso, num)
                    VALUES ($1, $2, $3);`,
                    [ fe, 3, num]);
                        console.log(response32)

                const response41  = await conn.query (`INSERT INTO public.medi(
                    "time", v3ph, vl1, vl2, vl3, i3ph, il1, il2, il3, pf3ph, pfl1, pfl2, pfl3, ae3ph, re3ph, se3ph, piso)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);`,
                    [fe, (medidor2.rows[0].v3ph + medidor3.rows[0].v3ph)/2, 
                    (medidor2.rows[0].vl1 + medidor3.rows[0].vl1)/2 , (medidor2.rows[0].vl2 + medidor3.rows[0].vl2)/2, 
                    (medidor2.rows[0].vl3 + medidor3.rows[0].vl3)/2, (medidor2.rows[0].i3ph + medidor3.rows[0].i3ph)/2,
                    (medidor2.rows[0].il1 + medidor3.rows[0].il1)/2, (medidor2.rows[0].il2 + medidor3.rows[0].il2)/2,
                    (medidor2.rows[0].il3 + medidor3.rows[0].il3)/2, (medidor2.rows[0].pf3ph + medidor3.rows[0].pf3ph)/2,
                    (medidor2.rows[0].pfl1 + medidor3.rows[0].pfl1)/2, (medidor2.rows[0].pfl2 + medidor3.rows[0].pfl2)/2,
                    (medidor2.rows[0].pfl3 + medidor3.rows[0].pfl3)/2,
                    kilo1 - (kilo2 + kilo3), (medidor2.rows[0].re3ph + medidor3.rows[0].re3ph)/2, 
                    (medidor2.rows[0].se3ph + medidor3.rows[0].se3ph)/2, 4]);
                        console.log(response41) 
                const response42  = await conn.query (`INSERT INTO public.ocupacion(
                    "time", piso, num)
                    VALUES ($1, $2, $3);`,
                    [ fe, 4, num]);
                        console.log(response42)

            } catch (error) {
                console.log(error)
            }
            await delay(60)
            console.log(encendido)
        } while (encendido < 2);
}

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve, n*1000)
    })
}
//            --- Dia ----

// graficos en día
const getMedidorDiagrafica = async(req, res) => {
    fInicio = req.params.id.split('n')[0];
    let piso = req.params.id.split('n')[1];
    const response = await conn.query(`select "time", v3ph, i3ph, pf3ph
    from public.medi where "time" between $1 and $2 and piso = $3;`,
    [fInicio, fInicio + " 23:59:59" , piso]);
    res.status(200).json(response.rows);

}

const getMedidorDiakw = async(req, res) => {
    fInicio = req.params.id.split('n')[0];
    let piso = req.params.id.split('n')[1];
    const response = await conn.query(`SELECT MAX(ae3ph) FROM medi
    where "time" between $1 and $2 and piso = $3`,
    [fInicio, fInicio + " 23:59:59", piso]);
    const response1 = await conn.query(`SELECT min(ae3ph) FROM medi
    where "time" between $1 and $2 and piso = $3`,
    [fInicio, fInicio + " 23:59:59", piso]); 
    //console.log(response.rows)
    let kw = response.rows[0].max - response1.rows[0].min ;
    //console.log(kw)
    res.status(200).json([{dato: kw}]);
}

const getMedidorDiaOcupacion = async(req, res) => {
    fInicio = req.params.id.split('n')[0];
    let piso = req.params.id.split('n')[1];
    const response = await conn.query(`SELECT  MAX(num) FROM ocupacion
    where "time" between $1 and $2 and piso = $3`,
    [fInicio, fInicio + " 23:59:59", piso]);
    res.status(200).json(response.rows);
}

const getMedidorDiaSuperficie = async(req, res) => {
    const response = await conn.query(`select metros from superficie where piso = $1`,
    [req.params.id]);
    res.status(200).json(response.rows);  
}

// graficos en mes
const getMedidorMesgrafica = async(req, res) => {
    fInicio = req.params.id.split('n')[0];
    fFinal = req.params.id.split('n')[1];
    let piso = req.params.id.split('n')[2];
    const response = await conn.query(`select to_char("time",'YYYY/MM/DD'), v3ph, i3ph, pf3ph
    from public.medi where "time" between $1 and $2 and piso = $3;`,
    [fInicio, fFinal, piso]);
    res.status(200).json(response.rows);
}

// graficos en anio
const getMedidorAniografica = async(req, res) => {
    fInicio = req.params.id.split('n')[0];
    fFinal = req.params.id.split('n')[1];
    let piso = req.params.id.split('n')[2];
    const response = await conn.query(`select to_char("time",'YYYY/MM'), v3ph, i3ph, pf3ph
    from public.medi where "time" between $1 and $2 and piso = $3;`,
    [fInicio, fFinal, piso]);
    res.status(200).json(response.rows);
    
}

const getMedidorAnioDatos = async(req, res) => {
    fInicio = req.params.id.split('n')[0];
    fFinal = req.params.id.split('n')[1];
    let piso = req.params.id.split('n')[2];
    const response = await conn.query(`SELECT MAX(ae3ph) FROM medi
    where "time" between $1 and $2 and piso = $3`,
    [fInicio, fFinal, piso]);
    const response1 = await conn.query(`SELECT min(ae3ph) FROM medi
    where "time" between $1 and $2 and piso = $3`,
    [fInicio, fFinal, piso]);
    let kw = response.rows[0].max - response1.rows[0].min ;
    //console.log(kw)
    res.status(200).json([{dato: kw}]);
}

const getMedidorAnioOcupacion = async(req, res) => {
    fInicio = req.params.id.split('n')[0];
    fFinal = req.params.id.split('n')[1];
    let piso = req.params.id.split('n')[2];
    const response = await conn.query(`SELECT  MAX(num) FROM ocupacion
    where "time" between $1 and $2 and piso = $3`,
    [fInicio, fFinal , piso]);
    res.status(200).json(response.rows); 
}

// -- Operaciones  ---

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

module.exports = {
    getMedidor, createMedidor, createSimulacion, getMedidorDiagrafica, getMedidorDiakw,
    getMedidorDiaOcupacion, getMedidorDiaSuperficie, getMedidorMesgrafica, getMedidorAniografica,
    getMedidorAnioDatos,getMedidorAnioOcupacion
}