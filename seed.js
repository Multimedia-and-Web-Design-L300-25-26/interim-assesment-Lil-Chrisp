require('dotenv').config();
const mongoose = require('mongoose');
const Crypto = require('./models/Crypto');

const seedData = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 67543.21,
    image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    change24h: 2.45
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3521.87,
    image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    change24h: 1.82
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 178.45,
    image: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    change24h: 5.67
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.58,
    image: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
    change24h: -1.23
  },
  {
    name: 'Polkadot',
    symbol: 'DOT',
    price: 7.92,
    image: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png',
    change24h: 3.14
  },
  {
    name: 'Avalanche',
    symbol: 'AVAX',
    price: 38.76,
    image: 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
    change24h: -0.89
  },
  {
    name: 'Chainlink',
    symbol: 'LINK',
    price: 18.34,
    image: 'https://cryptologos.cc/logos/chainlink-link-logo.png',
    change24h: 4.21
  },
  {
    name: 'Polygon',
    symbol: 'MATIC',
    price: 0.72,
    image: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    change24h: -2.45
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Crypto.deleteMany({});
    console.log('Cleared existing crypto data');

    // Insert seed data
    await Crypto.insertMany(seedData);
    console.log(`Inserted ${seedData.length} cryptocurrencies`);

    await mongoose.connection.close();
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

