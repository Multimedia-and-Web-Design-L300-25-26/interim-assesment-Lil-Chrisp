const Crypto = require('../models/Crypto');

// Get all cryptocurrencies
exports.getAllCrypto = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: cryptos.length,
      data: cryptos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching cryptocurrencies',
      error: error.message
    });
  }
};

// Get top gainers (sorted by 24h change highest to lowest)
exports.getGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find().sort({ change24h: -1 });

    res.status(200).json({
      success: true,
      count: gainers.length,
      data: gainers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching top gainers',
      error: error.message
    });
  }
};

// Get new listings (sorted by createdAt newest to oldest)
exports.getNewListings = async (req, res) => {
  try {
    const newListings = await Crypto.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: newListings.length,
      data: newListings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching new listings',
      error: error.message
    });
  }
};

// Add new cryptocurrency
exports.addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    // Validate required fields
    if (!name || !symbol || !price || !image || change24h === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, symbol, price, image, and 24h change'
      });
    }

    // Check if crypto already exists
    const existingCrypto = await Crypto.findOne({ symbol: symbol.toUpperCase() });
    if (existingCrypto) {
      return res.status(409).json({
        success: false,
        message: 'Cryptocurrency with this symbol already exists'
      });
    }

    const crypto = await Crypto.create({
      name,
      symbol,
      price,
      image,
      change24h
    });

    res.status(201).json({
      success: true,
      message: 'Cryptocurrency added successfully',
      data: crypto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error adding cryptocurrency',
      error: error.message
    });
  }
};

