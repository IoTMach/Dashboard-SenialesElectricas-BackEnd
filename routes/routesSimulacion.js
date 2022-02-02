const { Router } = require('express');
const router = Router();

const { DatosSimulacion } = require('../controllers/controllerSimulacion');

router.get('/medidor/simular/datos/:id', DatosSimulacion );


module.exports = router;