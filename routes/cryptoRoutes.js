const express = require('express');
const router = express.Router();
const { getAllCrypto, getGainers, getNewListings, addCrypto } = require('../controllers/cryptoController');

// GET /crypto - All cryptocurrencies
router.get('/', getAllCrypto);

// GET /crypto/gainers - Top gainers
router.get('/gainers', getGainers);

// GET /crypto/new - New listings
router.get('/new', getNewListings);

// POST /crypto - Add new cryptocurrency
router.post('/', addCrypto);

module.exports = router;

