const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/login.controller'); // Asegúrate de que la ruta sea correcta

router.post('/', loginUser);

module.exports = router;