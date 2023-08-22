const { Router } = require('express');
const {  getPlayerByTag } = require('../controllers/getPlayer.controller.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const register = require('./userRoutes.js');
const login = require('./loginRoute.js');
const sale = require('./saleIntentRoute.js');
const buy = require('./getAllSaleIntentsRoute.js');
const userDetail = require('./getUserDetailRoute.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.get('/players', getAllPlayers);
router.get('/players/:tag', getPlayerByTag);
router.use('/register', register);
router.use('/login', login);
router.use('/sale', sale);
router.use('/buy', buy);
router.use('/user', userDetail);


module.exports = router;
