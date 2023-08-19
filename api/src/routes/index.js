const { Router } = require('express');
const {  getPlayerByTag } = require('../controllers/getPlayer.controller.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.get('/players', getAllPlayers);
router.get('/players/:tag', getPlayerByTag);


module.exports = router;
