require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("@nomicfoundation/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");

const fs = require('fs');
const path = require('path');

const fetchCompilerVersion = require("./version"); // adjust path as needed

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const solidityVersion = process.env.VERSION;

const filePath = path.join(__dirname, "fullsolidityVersion.json");

// Call fetch and save to file (non-blocking)
fetchCompilerVersion(solidityVersion).then((fullVersion) => {
  console.log(`✅ Full Solidity Version for ${solidityVersion}: ${fullVersion}`);

  const jsonContent = JSON.stringify({ fullVersion }, null, 2);

  // Write or overwrite file
  fs.writeFileSync(filePath, jsonContent, 'utf-8');
  console.log("📁 fullsolidityVersion.json created/updated successfully.");
}).catch((err) => {
  console.warn("⚠️ Could not fetch full Solidity version:", err.message);
});

module.exports = {
  solidity: {
    version: solidityVersion,
    settings: {
      evmVersion: process.env.EVM_VERSION,
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    blockdag: {
      url: process.env.RPC_URL,
      accounts: [`${PRIVATE_KEY}`],
    },
  },
  sourcify: {
    enabled: true,
  },
};
