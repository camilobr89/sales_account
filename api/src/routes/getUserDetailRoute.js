const express = require('express');
const router = express.Router();
const { getUserDetailsBySaleId } = require('../controllers/getUserDetails.controller.js'); // Asegúrate de que la ruta sea correcta

router.get('/:sale_id/detail', getUserDetailsBySaleId);

module.exports = router;