const express = require('express');
//const conexion_pg = require('./dbConfig');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//conexion_pg.connect();

var port=process.env.PORT || 4000;
app.listen(port);