require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan")
require('dotenv').config(); 
require("hardhat-gas-reporter")
require("./tasks/block-number")
require("solidity-coverage")
/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https://eth-goerli"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key" 
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key" 

module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.8",
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY], 
      chainId: 5
    },
    localhost:{
      url: "http://127.0.0.1:8545/",
      chainId: 31337
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  gasReporter:{
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "INR",
    // coinmarketcap: COINMARKETCAP_API_KEY,
    token: "MATIC"
  }
};
