require("dotenv").config();

const fs = require("fs");
const path = require("path");

const { ethers, upgrades } = require('hardhat');

async function main() {
  const { ethers, upgrades } = require('hardhat');
  const erc1155Fact = await ethers.getContractFactory("MyToken");
  console.log('Deploying Smart Contract...');
  const owner = process.env.OWNER_ADDRESS;
  const name = "Just for fun";
  const symbol = "Fun";
  
  const erc1155 = await upgrades.deployProxy(
    erc1155Fact,
    [owner, owner, name, symbol],
    {
      initializer: "initialize",
      gasLimit: process.env.GAS_LIMIT , // Use the gas limit from .env or default to 30 million
      kind: "transparent"
    }
  );


  console.log("Contract deployed to:", erc1155.target);

  await new Promise(resolve => setTimeout(resolve, 5000));

  const proxyAddress = erc1155.target;
  const implAddress = await upgrades.erc1967.getImplementationAddress(proxyAddress);

  console.log('Implementation address:',implAddress);

  // ✅ Write it to a file
  fs.writeFileSync(path.join(__dirname, "impl_address.txt"), implAddress.trim());
}

main();
