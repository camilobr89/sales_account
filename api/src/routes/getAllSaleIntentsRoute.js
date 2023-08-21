const express = require('express');
const router = express.Router();
const { getAllSaleIntents } = require('../controllers/getAllSaleIntents.controller.js');

router.get('/', getAllSaleIntents);

module.exports = router;
