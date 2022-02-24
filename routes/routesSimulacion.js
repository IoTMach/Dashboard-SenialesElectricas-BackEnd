const { Router } = require('express');
const router = Router();

const { DatosSimulacion,postSimulacion, putSimulacion, deleteSimulacion } = require('../controllers/controllerSimulacion');

router.get('/medidor/simular/datos/:id', DatosSimulacion );
router.post('/medidor/simular/agregar', postSimulacion );
router.put('/medidor/simular/editar/:id', putSimulacion );
router.delete('/medidor/simular/eliminar/:id', deleteSimulacion );


module.exports = router;