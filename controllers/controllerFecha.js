const { response } = require('express');
const conn = require('../dbConfig');

const getFechas = async(req, res) => {
    const response = await conn.query(`SELECT MAX(to_char("time",'YYYY-MM-DD')),
     min(to_char("time",'YYYY-MM-DD')) FROM medi
    where piso = $1`,[req.params.id]);
    res.status(200).json(response.rows);
}

const getFechasMes = async(req, res) => {
    const response = await conn.query(`SELECT MAX(to_char("time",'YYYY-MM')),
     min(to_char("time",'YYYY-MM')) FROM medi
    where piso = $1`,[req.params.id]);
    res.status(200).json(response.rows);
}

const getFechasAnio = async(req, res) => {
    const response = await conn.query(`SELECT distinct to_char("time",'YYYY') FROM medi
    where piso = $1`,[req.params.id]);
    res.status(200).json(response.rows);
}

module.exports = {
    getFechas, getFechasMes, getFechasAnio
}