const express = require('express');
const router = express.Router();
const { getAllSaleIntents, cancelSaleIntent, completeSaleIntent } = require('../controllers/getAllSaleIntents.controller.js');

router.get('/', getAllSaleIntents);
router.put('/cancel/:sale_id', cancelSaleIntent);
router.put('/complete/:sale_id', completeSaleIntent);

module.exports = router;
