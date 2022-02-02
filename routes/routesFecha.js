const { Router } = require('express');
const router = Router();

const { getFechas, getFechasMes, getFechasAnio } = require('../controllers/controllerFecha');

router.get('/fecha/dia/max_min/:id', getFechas );
router.get('/fecha/mes/max_min/:id', getFechasMes );
router.get('/fecha/anio/:id', getFechasAnio );


module.exports = router;