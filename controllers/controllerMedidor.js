const { response } = require('express');
const conn = require('../dbConfig');
 
let n = 0;

let num = 39;
let encendido = 0;

let kilo1 = 0;
let kilo2 = 0;
let kilo3 = 0;

let  ael11 = 0;
let  ael12 = 0;
let  ael13 = 0;
let  re3ph1 = 0;
let  rel11 = 0;
let  rel12 = 0;
let  rel13 = 0;

let  ael21 = 0;
let  ael22 = 0;
let  ael23 = 0;
let  re3ph2 = 0;
let  rel21 = 0;
let  rel22 = 0;
let  rel23 = 0;

let  ael31 = 0;
let  ael32 = 0;
let  ael33 = 0;
let  re3ph3 = 0;
let  rel31 = 0;
let  rel32 = 0;
let  rel33 = 0;



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
    res.send(response);
}

//--- Simulación --- 

const createSimulacion = async(req, res) =>{ 
    try{
        encendido = req.params.id;
        const response = await conn.query(`SELECT ae3ph, ael1, ael2, ael3, re3ph, rel1, rel2, rel3, piso FROM public.medi where 
        "time" = (SELECT MAX("time") from public.medi)`);
        res.status(200).json(response.rows);
        kilo1 = response.rows[0].ae3ph
        kilo2 = response.rows[1].ae3ph
        kilo3 = response.rows[2].ae3ph

        ael11 = response.rows[0].ael1 
        ael12 = response.rows[0].ael2 
        ael13 = response.rows[0].ael3 
        re3ph1 = response.rows[0].re3ph
        rel11 = response.rows[0].rel1 
        rel12 = response.rows[0].rel2 
        rel13 = response.rows[0].rel3 

        ael21 = response.rows[1].ael1 
        ael22 = response.rows[1].ael2 
        ael23 = response.rows[1].ael3 
        re3ph2 = response.rows[1].re3ph
        rel21 = response.rows[1].rel1 
        rel22 = response.rows[1].rel2 
        rel23 = response.rows[1].rel3 

        ael31 = response.rows[2].ael1 
        ael32 = response.rows[2].ael2 
        ael33 = response.rows[2].ael3 
        re3ph3 = response.rows[2].re3ph
        rel31 = response.rows[2].rel1 
        rel32 = response.rows[2].rel2 
        rel33 = response.rows[2].rel3 
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

            n = random(0,17)
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

                ael11 += medidor1.rows[0].ael1 
                ael12 += medidor1.rows[0].ael2 
                ael13 += medidor1.rows[0].ael3 
                re3ph1 += medidor1.rows[0].re3ph
                rel11 += medidor1.rows[0].rel1 
                rel12 += medidor1.rows[0].rel2 
                rel13 += medidor1.rows[0].rel3 

                ael21 += medidor2.rows[0].ael1 
                ael22 += medidor2.rows[0].ael2 
                ael23 += medidor2.rows[0].ael3 
                re3ph2 += medidor2.rows[0].re3ph
                rel21 += medidor2.rows[0].rel1 
                rel22 += medidor2.rows[0].rel2 
                rel23 += medidor2.rows[0].rel3 

                ael31 += medidor3.rows[0].ael1 
                ael32 += medidor3.rows[0].ael2 
                ael33 += medidor3.rows[0].ael3 
                re3ph3 += medidor3.rows[0].re3ph
                rel31 += medidor3.rows[0].rel1 
                rel32 += medidor3.rows[0].rel2 
                rel33 += medidor3.rows[0].rel3 

                const response1  = await conn.query (`INSERT INTO public.medi(
                    "time", v3ph, vl1, vl2, vl3, i3ph, il1, il2, il3, pf3ph, pfl1, pfl2, pfl3, ap3ph, apl1, apl2,
                     apl3, rp3ph, rpl1, rpl2, rpl3, freq, ae3ph, ael1, ael2, ael3, re3ph, rel1, rel2, rel3, piso)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18,
                        $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31);`,
                    [fe, medidor1.rows[0].v3ph, medidor1.rows[0].vl1, medidor1.rows[0].vl2, 
                    medidor1.rows[0].vl3, medidor1.rows[0].i3ph, medidor1.rows[0].il1, 
                    medidor1.rows[0].il2, medidor1.rows[0].il3, medidor1.rows[0].pf3ph,
                    medidor1.rows[0].pfl1, medidor1.rows[0].pfl2, medidor1.rows[0].pfl3, 
                    medidor1.rows[0].ap3ph, medidor1.rows[0].apl1, medidor1.rows[0].apl2, 
                    medidor1.rows[0].apl3, medidor1.rows[0].rp3ph, medidor1.rows[0].rpl1, 
                    medidor1.rows[0].rpl2, medidor1.rows[0].rpl3, medidor1.rows[0].freq,
                    kilo1, ael11, ael12, ael13 , re3ph1, rel11, rel12, rel13, 1]);
                        console.log(response1) 
                const response12  = await conn.query (`INSERT INTO public.ocupacion(
                    "time", piso, num)
                    VALUES ($1, $2, $3);`,
                    [ fe, 1, num]);
                        console.log(response12)


                const response21  = await conn.query (`INSERT INTO public.medi(
                    "time", v3ph, vl1, vl2, vl3, i3ph, il1, il2, il3, pf3ph, pfl1, pfl2, pfl3, ap3ph, apl1, 
                    apl2, apl3, rp3ph, rpl1, rpl2, rpl3, freq, ae3ph, ael1, ael2, ael3, re3ph, rel1, rel2, rel3, piso)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18,
                        $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31);` ,
                    [fe, medidor2.rows[0].v3ph, medidor2.rows[0].vl1, medidor2.rows[0].vl2, 
                    medidor2.rows[0].vl3, medidor2.rows[0].i3ph, medidor2.rows[0].il1, 
                    medidor2.rows[0].il2, medidor2.rows[0].il3, medidor2.rows[0].pf3ph,
                    medidor2.rows[0].pfl1, medidor2.rows[0].pfl2, medidor2.rows[0].pfl3, 
                    medidor2.rows[0].ap3ph, medidor2.rows[0].apl1, medidor2.rows[0].apl2, 
                    medidor2.rows[0].apl3, medidor2.rows[0].rp3ph, medidor2.rows[0].rpl1, 
                    medidor2.rows[0].rpl2, medidor2.rows[0].rpl3, medidor2.rows[0].freq,
                    kilo2, ael21, ael22, ael23 , re3ph2, rel21, rel22, rel23, 2]);
                        console.log(response21) 
                const response22  = await conn.query (`INSERT INTO public.ocupacion(
                    "time", piso, num)
                    VALUES ($1, $2, $3);`,
                    [ fe, 2, num]);
                        console.log(response22)


                const response31  = await conn.query (`INSERT INTO public.medi(
                    "time", v3ph, vl1, vl2, vl3, i3ph, il1, il2, il3, pf3ph, pfl1, pfl2, pfl3, ap3ph, apl1, 
                    apl2, apl3, rp3ph, rpl1, rpl2, rpl3, freq, ae3ph, ael1, ael2, ael3, re3ph, rel1, rel2, rel3, piso)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18,
                        $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31);`,
                    [fe, medidor3.rows[0].v3ph, medidor3.rows[0].vl1, medidor3.rows[0].vl2, 
                    medidor3.rows[0].vl3, medidor3.rows[0].i3ph, medidor3.rows[0].il1, 
                    medidor3.rows[0].il2, medidor3.rows[0].il3, medidor3.rows[0].pf3ph,
                    medidor3.rows[0].pfl1, medidor3.rows[0].pfl2, medidor3.rows[0].pfl3, 
                    medidor3.rows[0].ap3ph, medidor3.rows[0].apl1, medidor3.rows[0].apl2, 
                    medidor3.rows[0].apl3, medidor3.rows[0].rp3ph, medidor3.rows[0].rpl1, 
                    medidor3.rows[0].rpl2, medidor3.rows[0].rpl3, medidor3.rows[0].freq,
                    kilo3, ael31, ael32, ael33 , re3ph3, rel31, rel32, rel33, 3]);
                        console.log(response31) 
                const response32  = await conn.query (`INSERT INTO public.ocupacion(
                    "time", piso, num)
                    VALUES ($1, $2, $3);`,
                    [ fe, 3, num]);
                        console.log(response32)

                const response41  = await conn.query (`INSERT INTO public.medi(
                    "time", v3ph, vl1, vl2, vl3, i3ph, il1, il2, il3, pf3ph, pfl1, pfl2, pfl3, ap3ph, apl1, 
                    apl2, apl3, rp3ph, rpl1, rpl2, rpl3, freq, ae3ph, ael1, ael2, ael3, re3ph, rel1, rel2, rel3, piso)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18,
                        $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31);`,
                    [fe, (medidor2.rows[0].v3ph + medidor3.rows[0].v3ph)/2, 
                    (medidor2.rows[0].vl1 + medidor3.rows[0].vl1)/2 , (medidor2.rows[0].vl2 + medidor3.rows[0].vl2)/2, 
                    (medidor2.rows[0].vl3 + medidor3.rows[0].vl3)/2, (medidor2.rows[0].i3ph + medidor3.rows[0].i3ph)/2,
                    (medidor2.rows[0].il1 + medidor3.rows[0].il1)/2, (medidor2.rows[0].il2 + medidor3.rows[0].il2)/2,
                    (medidor2.rows[0].il3 + medidor3.rows[0].il3)/2, (medidor2.rows[0].pf3ph + medidor3.rows[0].pf3ph)/2,
                    (medidor2.rows[0].pfl1 + medidor3.rows[0].pfl1)/2, (medidor2.rows[0].pfl2 + medidor3.rows[0].pfl2)/2,
                    (medidor2.rows[0].pfl3 + medidor3.rows[0].pfl3)/2, (medidor2.rows[0].ap3ph + medidor3.rows[0].ap3ph)/2,
                    (medidor2.rows[0].apl1 + medidor3.rows[0].apl1)/2, (medidor2.rows[0].apl2 + medidor3.rows[0].apl2)/2,
                    (medidor2.rows[0].apl3 + medidor3.rows[0].apl3)/2, (medidor2.rows[0].rp3ph + medidor3.rows[0].rp3ph)/2,
                    (medidor2.rows[0].rpl1 + medidor3.rows[0].rpl1)/2, (medidor2.rows[0].rpl2 + medidor3.rows[0].rpl2)/2,
                    (medidor2.rows[0].rpl3 + medidor3.rows[0].rpl3)/2, (medidor2.rows[0].freq + medidor3.rows[0].freq)/2,

                    kilo1 - (kilo2 + kilo3), ael11 - (ael21 +ael31), ael12 - (ael22 +ael32), ael13 - (ael23 +ael33),
                    re3ph1 - (re3ph2 + re3ph3), rel11 - (rel21 +rel31), rel12 - (rel22 +rel32), rel13 - (rel23 +rel33), 4]);
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
    const response = await conn.query(`select * from public.medi where "time" between $1 and $2 and piso = $3;`,
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

const getMedidorDiaReporte = async(req, res) => {
    fInicio = req.params.id.split('n')[0];
    let piso = req.params.id.split('n')[1];
    const response = await conn.query(`SELECT AVG(v3ph)voltajeTriPro,
     max(v3ph) voltajeTriMax, min(v3ph) voltajeTriMin,
	AVG(vl1)voltajel1Pro, max(vl1) voltajel1Max, min(vl1) voltajel1Min,
	AVG(vl2)voltajel2Pro, max(vl2) voltajel2Max, min(vl2) voltajel2Min,
	AVG(vl3)voltajel3Pro, max(vl3) voltajel3Max, min(vl3) voltajel3Min,

    AVG(i3ph)intencidadTriPro, max(i3ph) intencidadtrimax, min(i3ph) intencidadtrimin,
	AVG(il1)intencidadl1pro, max(il1) intencidadl1max, min(il1) intencidadl1min,
	AVG(il2)intencidadl2pro, max(il2) intencidadl2max, min(il2) intencidadl2min,
	AVG(il3)intencidadl3pro, max(il3) intencidadl3max, min(il3) intencidadl3min,
	
	AVG(ap3ph)potenciaTriPro, max(ap3ph) potenciatrimax, min(ap3ph) potenciatrimin,
	AVG(apl1)potencial1pro, max(apl1) potencial1max, min(apl1) potencial1min,
	AVG(apl2)potencial2pro, max(apl2) potencial2max, min(apl2) potencial2min,
	AVG(apl3)potencial3pro, max(apl3) potencial3max, min(apl3) potencial3min

	FROM public.medi where "time" between $1 and $2 and piso = $3;`,
    [fInicio, fInicio + " 23:59:59" , piso]);
    res.status(200).json(response.rows);  
}
// graficos en mes
const getMedidorMesReporte = async(req, res) => {
    fInicio = req.params.id.split('n')[0];
    fFinal = req.params.id.split('n')[1];
    let piso = req.params.id.split('n')[2];
    const response = await conn.query(`SELECT AVG(v3ph)voltajeTriPro,
    max(v3ph) voltajeTriMax, min(v3ph) voltajeTriMin,
   AVG(vl1)voltajel1Pro, max(vl1) voltajel1Max, min(vl1) voltajel1Min,
   AVG(vl2)voltajel2Pro, max(vl2) voltajel2Max, min(vl2) voltajel2Min,
   AVG(vl3)voltajel3Pro, max(vl3) voltajel3Max, min(vl3) voltajel3Min,

   AVG(i3ph)intencidadTriPro, max(i3ph) intencidadtrimax, min(i3ph) intencidadtrimin,
   AVG(il1)intencidadl1pro, max(il1) intencidadl1max, min(il1) intencidadl1min,
   AVG(il2)intencidadl2pro, max(il2) intencidadl2max, min(il2) intencidadl2min,
   AVG(il3)intencidadl3pro, max(il3) intencidadl3max, min(il3) intencidadl3min,
   
   AVG(ap3ph)potenciaTriPro, max(ap3ph) potenciatrimax, min(ap3ph) potenciatrimin,
   AVG(apl1)potencial1pro, max(apl1) potencial1max, min(apl1) potencial1min,
   AVG(apl2)potencial2pro, max(apl2) potencial2max, min(apl2) potencial2min,
   AVG(apl3)potencial3pro, max(apl3) potencial3max, min(apl3) potencial3min

   FROM public.medi where "time" between $1 and $2 and piso = $3;`,
    [fInicio, fFinal, piso]);
    res.status(200).json(response.rows);
}

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
    getMedidorAnioDatos,getMedidorAnioOcupacion, getMedidorDiaReporte, getMedidorMesReporte
}