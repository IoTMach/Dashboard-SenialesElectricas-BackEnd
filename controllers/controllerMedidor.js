const { response } = require('express');
const conn = require('../dbConfig');
let medidor1 = [
    [228,132,133,131,49.2,46.8,63.6,37.2,-0.942,-0.934,-0.953,0.935,  0.227,  98.4924,313.2072],
    [228,132,133,131,49.2,48,63.6,37.2,-0.944,-0.937,-0.956,0.936,    0.189,  98.4924,313.2072],
    [228,132,132,131,54,56.4,73.2,32.4,-0.943,-0.94,-0.959,0.923,     0.252,  98.4924,313.2072],

    [228,132,132,131,76.8,81.6,97.2,51.6,0.968,-0.969,0.971,0.965,    0.252,  98.5128,313.272],
    [228,132,133,131,81.6,90,110.4,46.8,0.963,-0.962,0.967,0.957,     0.278,  98.5128,313.2732],
    [228,132,133,131,84,92.4,111.6,46.8,0.965,-0.966,0.966,0.96,      0.315,  98.5128,313.2732],
    
    [229,132,134,132,42,49.2,43.2,36,-0.897,-0.951,-0.875,-0.859,      0.227,  99.8232,316.7952],
    [229,132,134,132,45.6,55.2,42,39.6,-0.887,-0.958,-0.878,-0.803,    0.278,  99.8232,316.7952],
    [229,132,134,132,51.6,56.4,54,45.6,-0.933,-0.958,-0.915,-0.926,    0.252,  99.8232,316.7952],    
]

let medidor2 = [
    [228,132,132,131,10.8,12,9.6,12.4,-0.886,0.878,-0.815,-0.954,      0.0484      ,25.9772,69.2736],
    [227,132,132,130,10.8,12,9.2,12,-0.887,0.883,-0.808,-0.953,        0.0404        ,25.9772,69.2736],
    [227,132,132,130,8.8,10,9.2,8,-0.834,-0.822,-0.818,0.881,          0.0539        ,25.9772,69.2736],

    [227,132,132,130,11.2,12.8,9.2,12.4,-0.898,0.907,-0.815,-0.953,    0.0539       ,25.9828,69.2864],
    [228,132,132,131,9.6,11.2,9.2,8.4,-0.87,-0.897,-0.813,0.902,       0.0593        ,25.9828,69.2864],
    [228,132,132,131,9.2,10.8,9.2,8,-0.859,-0.88,-0.812,0.888,        0.0673        ,25.9828,69.2864],

    [228,132,133,131,14.8,18.8,9.6,16,-0.92,0.973,-0.797,-0.935,       0.0539,     26.4368,70.2284],
    [228,132,133,131,12,15.6,9.6,11.6,-0.905,-0.99,-0.799,-0.88,       0.0404,     26.4368,70.2284],
    [229,132,134,132,12.4,16.8,9.6,11.6,-0.904,-0.985,-0.801,-0.881,  0.0673,     26.4368,70.2284],
]

let medidor3 = [
    [228,133,132,131,8.4,9.3,7.2,9.3,0.86,-0.953,0.823,0.791,     0.0248        ,11.094,34.5966],
    [228,133,131,131,8.7,9.6,7.8,9.3,0.856,-0.954,0.822,0.795,    0.0207        ,11.094,34.5966],
    [227,132,131,130,8.7,9.6,7.8,9.3,0.86,-0.953,0.819,0.799,     0.0275        ,11.094,34.5966],

    [227,132,131,130,13.2,10.5,15.3,14.4,0.965,-0.945,0.942,1,    0.0275   ,11.0976,34.6077],
    [228,133,132,131,13.2,10.5,15.6,13.8,0.963,-0.945,0.937,1,    0.0275   ,11.0976,34.6083],
    [228,133,132,131,13.2,10.5,15.3,13.8,0.963,-0.945,0.937,1,    0.0275   ,11.0976,34.6083],

    [229,134,132,132,9,0,18,9.3,-0.819,2,-0.905,-0.655,           0.0275  ,11.3076,35.0412],
    [229,134,132,132,14.7,0,26.1,18.3,-0.839,2,-0.961,-0.666,     0.0303        ,11.3079,35.0415],
    [229,134,132,132,15,0,26.7,18.9,-0.843,2,-0.96,-0.678,        0.0344        ,11.3079,35.0415],
]

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
    
    simu()
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

            kilo1 += medidor1[n][12];
            kilo2 += medidor2[n][12];
            kilo3 += medidor3[n][12];

            try{    
                const response1  = await conn.query (`INSERT INTO public.medi(
                    "time", v3ph, vl1, vl2, vl3, i3ph, il1, il2, il3, pf3ph, pfl1, pfl2, pfl3, ae3ph, re3ph, se3ph, piso)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);`,
                    [fe, medidor1[n][0], medidor1[n][1], medidor1[n][2], medidor1[n][3], medidor1[n][4], medidor1[n][5], 
                    medidor1[n][6], medidor1[n][7], medidor1[n][8], medidor1[n][9], medidor1[n][10], medidor1[n][11], 
                    kilo1, medidor1[n][13], medidor1[n][14], 1]);
                        console.log(response1) 
                const response12  = await conn.query (`INSERT INTO public.ocupacion(
                    "time", piso, num)
                    VALUES ($1, $2, $3);`,
                    [ fe, 1, num]);
                        console.log(response12)


                const response21  = await conn.query (`INSERT INTO public.medi(
                    "time", v3ph, vl1, vl2, vl3, i3ph, il1, il2, il3, pf3ph, pfl1, pfl2, pfl3, ae3ph, re3ph, se3ph, piso)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);`,
                    [fe, medidor2[n][0], medidor2[n][1], medidor2[n][2], medidor2[n][3], medidor2[n][4], medidor2[n][5], 
                    medidor2[n][6], medidor2[n][7], medidor2[n][8], medidor2[n][9], medidor2[n][10], medidor2[n][11], 
                    kilo2, medidor2[n][13], medidor2[n][14], 2]);
                        console.log(response21) 
                const response22  = await conn.query (`INSERT INTO public.ocupacion(
                    "time", piso, num)
                    VALUES ($1, $2, $3);`,
                    [ fe, 2, num]);
                        console.log(response22)


                const response31  = await conn.query (`INSERT INTO public.medi(
                    "time", v3ph, vl1, vl2, vl3, i3ph, il1, il2, il3, pf3ph, pfl1, pfl2, pfl3, ae3ph, re3ph, se3ph, piso)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);`,
                    [fe, medidor3[n][0], medidor3[n][1], medidor3[n][2], medidor3[n][3], medidor3[n][4], medidor3[n][5], 
                    medidor3[n][6], medidor3[n][7], medidor3[n][8], medidor3[n][9], medidor3[n][10], medidor3[n][11], 
                    kilo3, medidor3[n][13], medidor3[n][14], 3]);
                        console.log(response31) 
                const response32  = await conn.query (`INSERT INTO public.ocupacion(
                    "time", piso, num)
                    VALUES ($1, $2, $3);`,
                    [ fe, 3, num]);
                        console.log(response32)
            } catch (error) {
                console.log('Error en la funcion createSimulacion ')
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
    fFinal = req.params.id.split('n')[1];
    let piso = req.params.id.split('n')[2];
    const response = await conn.query(`select "time", v3ph, i3ph, pf3ph
    from public.medi where "time" between $1 and $2 and piso = $3;`,
    [fInicio, fFinal, piso]);
    //console.log(response.rows.map((response) => response.v3ph));
    res.status(200).json(response.rows);

}

const getMedidorDiakw = async(req, res) => {
    fInicio = req.params.id.split('n')[0];
    fFinal = req.params.id.split('n')[1];
    let piso = req.params.id.split('n')[2];
    const response = await conn.query(`SELECT MAX(ae3ph) FROM medi
    where "time" between $1 and $2 and piso = $3`,
    [fInicio, fFinal, piso]);
    const response1 = await conn.query(`SELECT min(ae3ph) FROM medi
    where "time" between $1 and $2 and piso = $3`,
    [fInicio, fFinal, piso]);
    //console.log(response.rows)
    let kw = response.rows[0].max - response1.rows[0].min ;
    //console.log(kw)
    res.status(200).json([{dato: kw}]);
}

const getMedidorDiaOcupacion = async(req, res) => {
    fInicio = req.params.id.split('n')[0];
    fFinal = req.params.id.split('n')[1];
    let piso = req.params.id.split('n')[2];
    const response = await conn.query(`SELECT  MAX(num) FROM ocupacion
    where "time" between $1 and $2 and piso = $3`,
    [fInicio, fFinal, piso]);
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
    from public.medidores where "time" between $1 and $2 and piso = $3;`,
    [fInicio, fFinal, piso]);
    res.status(200).json(response.rows);
}


// -- Operaciones  ---

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

module.exports = {
    getMedidor, createMedidor, createSimulacion, getMedidorDiagrafica, getMedidorDiakw,
    getMedidorDiaOcupacion, getMedidorDiaSuperficie, getMedidorMesgrafica, getMedidorAniografica
}