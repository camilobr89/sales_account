const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/getPlayer.controller'); // Asegúrate de que la ruta sea correcta

router.post('/', registerUser);

module.exports = router;
