// No mock data - use real DB
const Crypto = require('../models/Crypto');

// Get all cryptocurrencies
exports.getAllCrypto = async (req, res) => {
  res.status(200).json({
    success: true,
    count: 0,
    data: []
  });
};

// Get top gainers (sorted by 24h change highest to lowest)
exports.getGainers = async (req, res) => {
  res.status(200).json({
    success: true,
    count: 0,
    data: []
  });
};

// Get new listings (sorted by createdAt newest to oldest)
exports.getNewListings = async (req, res) => {
  res.status(200).json({
    success: true,
    count: 0,
    data: []
  });
};

// Add new cryptocurrency
exports.addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    if (!name || !symbol || !price || !image || change24h === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, symbol, price, image, and 24h change'
      });
    }

    const existingCrypto = await Crypto.findOne({ symbol: symbol.toUpperCase() });
    if (existingCrypto) {
      return res.status(409).json({
        success: false,
        message: 'Cryptocurrency with this symbol already exists'
      });
    }

    const crypto = await Crypto.create({
      name,
      symbol: symbol.toUpperCase(),
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
