const { Router } = require('express');
const router = Router();

const { getLogin } = require('../controllers/controllerLogin');

router.get('/login/:id', getLogin );

module.exports = router;