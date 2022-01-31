const { Router } = require('express');
const router = Router();

const { updateArea} = require('../controllers/controllerArea');

router.get('/area/', updateArea );

module.exports = router;