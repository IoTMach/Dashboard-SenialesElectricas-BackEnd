const { Router } = require('express');
const router = Router();

const { getLogin } = require('../controllers/controllerLogin');

router.post('/login/', getLogin );

module.exports = router;