const { Router } = require('express');
const router = Router();

const { DatosSimulacion,postSimulacion, putSimulacion } = require('../controllers/controllerSimulacion');

router.get('/medidor/simular/datos/:id', DatosSimulacion );
router.post('/medidor/simular/agregar', postSimulacion );
router.put('/medidor/simular/editar', putSimulacion );


module.exports = router;