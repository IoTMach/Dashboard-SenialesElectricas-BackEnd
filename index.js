const express = require('express');
const conexion_pg = require('./dbConfig');
const cors = require('cors');

const app = express();

app.use(cors()); 

app.use(express.json());
app.use(express.urlencoded({extended: false}));

conexion_pg.connect();

app.use(require('./routes/routesArea'));
app.use(require('./routes/routesLogin'));
app.use(require('./routes/routesMedidor'));
app.use(require('./routes/routesOcupacion'));
app.use(require('./routes/routesFecha'));

var port=process.env.PORT || 4000;
app.listen(port);