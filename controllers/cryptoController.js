const seedData = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 67540.23,
    image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    change24h: 2.45
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3520.18,
    image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    change24h: -1.23
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 148.92,
    image: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    change24h: 5.67
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.52,
    image: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
    change24h: -0.89
  },
  {
    name: 'Polkadot',
    symbol: 'DOT',
    price: 7.84,
    image: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png',
    change24h: 3.21
  },
  {
    name: 'Chainlink',
    symbol: 'LINK',
    price: 18.45,
    image: 'https://cryptologos.cc/logos/chainlink-link-logo.png',
    change24h: -2.15
  },
  {
    name: 'Avalanche',
    symbol: 'AVAX',
    price: 42.30,
    image: 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
    change24h: 4.78
  },
  {
    name: 'Polygon',
    symbol: 'MATIC',
    price: 0.74,
    image: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    change24h: -3.42
  },
  {
    name: 'Litecoin',
    symbol: 'LTC',
    price: 82.15,
    image: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png',
    change24h: 1.05
  },
  {
    name: 'Uniswap',
    symbol: 'UNI',
    price: 9.65,
    image: 'https://cryptologos.cc/logos/uniswap-uni-logo.png',
    change24h: 6.33
  }
];

// Get all cryptocurrencies
exports.getAllCrypto = async (req, res) => {
  try {
    const cryptos = seedData.slice().sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

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
    const gainers = seedData.slice().sort((a, b) => b.change24h - a.change24h);

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
    // Simulate 'new' by shuffling or fixed order
    const newListings = seedData.slice().sort((a, b) => Math.random() - 0.5); // or fixed reverse

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

// Add new cryptocurrency (mock - returns success without DB)
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

    // Simulate new crypto with timestamp
    const newCrypto = {
      name,
      symbol: symbol.toUpperCase(),
      price,
      image,
      change24h,
      _id: 'mock' + Date.now(),
      createdAt: new Date()
    };

    res.status(201).json({
      success: true,
      message: 'Cryptocurrency added successfully (mock mode)',
      data: newCrypto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error adding cryptocurrency',
      error: error.message
    });
  }
};

