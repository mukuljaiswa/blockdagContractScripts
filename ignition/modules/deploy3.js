require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { ethers } = require("hardhat");

async function main() {

  const Contract_path=process.env.CONTRACT_PATH ;

  console.log("Deploying Contract...",Contract_path);

  const initialOwner = process.env.OWNER_ADDRESS;

  if (!initialOwner) {
    throw new Error("OWNER_ADDRESS not defined in .env");
  }

  const tokenFactory = await ethers.getContractFactory(Contract_path);
  
  const tokenContract = await tokenFactory.deploy(initialOwner, {
    gasLimit: process.env.GAS_LIMIT 
  });

  await tokenContract.waitForDeployment();

  const contractAddress = await tokenContract.getAddress();
  console.log(Contract_path," deployed to:", contractAddress);

  // Write address to file
  fs.writeFileSync(path.join(__dirname, "impl_address.txt"), contractAddress.trim());
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exit(1);
});


