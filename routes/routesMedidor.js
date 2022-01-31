const { Router } = require('express');
const router = Router();

const { getMedidor, createMedidor, createSimulacion, getMedidorDiagrafica, 
    getMedidorDiakw, getMedidorDiaOcupacion, getMedidorDiaSuperficie,getMedidorMesgrafica,
    getMedidorAniografica   } = require('../controllers/controllerMedidor');

router.get('/medidor/optener', getMedidor );
router.post('/medidor/ingresar', createMedidor );
router.get('/medidor/simular/:id', createSimulacion );
router.get('/medidor/dia/:id', getMedidorDiagrafica );
router.get('/medidor/diakw/:id', getMedidorDiakw );
router.get('/medidor/diakwocupacion/:id', getMedidorDiaOcupacion );
router.get('/medidor/diakwosuperf/:id', getMedidorDiaSuperficie );
router.get('/medidor/mes/:id', getMedidorMesgrafica );
router.get('/medidor/anio/:id', getMedidorAniografica );

module.exports = router;