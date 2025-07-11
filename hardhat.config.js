require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("@nomicfoundation/hardhat-ethers");
require('@openzeppelin/hardhat-upgrades');

/** @type import('hardhat/config').HardhatUserConfig */
// const ALCHEMY_API_KEY = "Japd4jMfawgqY0HuVrZlKNlAMCDEplKW";
const PRIVATE_KEY = "e4843ef6113472221280f583526b6815df317cbe1ad7a03b32f60233aab96759";

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      evmVersion: "london", // You can change to istanbul, berlin, paris, etc. as needed
      optimizer: {
        enabled: true,
        runs: 200,
      }
    }
  },
  networks: {
    holesky: {
      url: `https://eth-holesky.public.blastapi.io`,
      accounts: [`${PRIVATE_KEY}`]
    },
    blockdag: {
      url: `http://34.212.58.112:18545`,
      accounts: [`${PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: "Y6PMZSW9N93SV5ZHMTMXXX4FJRAVMEZ7KC"
  },
  sourcify: {
    enabled: true
  },
};
