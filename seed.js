const Crypto = require('./models/Crypto');

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

async function seedDatabase() {
  try {
    const count = await Crypto.countDocuments();
    if (count === 0) {
      console.log('Database is empty. Seeding initial cryptocurrency data...');
      await Crypto.insertMany(seedData);
      console.log(`Successfully seeded ${seedData.length} cryptocurrencies.`);
    } else {
      console.log(`Database already contains ${count} cryptocurrencies. Skipping seed.`);
    }
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
}

module.exports = seedDatabase;

