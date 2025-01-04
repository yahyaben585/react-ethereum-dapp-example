const HDWalletProvider = require('@truffle/hdwallet-provider');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (Ganache or local Ethereum node)
      port: 8545,            // Default Ganache port
      network_id: "*",       // Match any network id
    },
    rinkeby: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC,       // Wallet's mnemonic phrase (loaded from .env)
        `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}` // Infura Rinkeby endpoint
      ),
      network_id: 4,              // Rinkeby's network id
      gas: 5500000,               // Gas limit
      gasPrice: 10000000000,      // Gas price in wei (10 Gwei)
    },
    mainnet: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC,       // Wallet's mnemonic
        `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}` // Infura Mainnet endpoint
      ),
      network_id: 1,              // Mainnet's network id
      gas: 5500000,               // Gas limit
      gasPrice: 10000000000,      // Gas price in wei (10 Gwei)
    },
  },
  compilers: {
    solc: {
      version: "^0.8.0",  // Solidity version
    },
  },
};
