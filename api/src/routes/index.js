const { Router } = require('express');
const {  getPlayerByTag } = require('../controllers/getPlayer.controller.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const register = require('./userRoutes.js');
const login = require('./loginRoute.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.get('/players', getAllPlayers);
router.get('/players/:tag', getPlayerByTag);
router.use('/register', register);
router.use('/login', login);


module.exports = router;
