// routes.js
const express = require('express');
const router = express.Router();
const { createSaleIntent } = require('../controllers/saleIntent.controller');

router.post('/', createSaleIntent);

module.exports = router;
