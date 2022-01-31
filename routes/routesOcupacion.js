const { Router } = require('express');
const router = Router();

const { createOcupacion} = require('../controllers/controllerOcupacion');

router.get('/ocupacion', createOcupacion );

module.exports = router;