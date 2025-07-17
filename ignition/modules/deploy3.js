require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying MyToken...");

  const initialOwner = process.env.OWNER_ADDRESS;
  if (!initialOwner) {
    throw new Error("OWNER_ADDRESS not defined in .env");
  }

  const tokenFactory = await ethers.getContractFactory("contracts/cont1.sol:MyToken");

  const tokenContract = await tokenFactory.deploy(initialOwner, {
    gasLimit: process.env.GAS_LIMIT || 30000000,
  });

  await tokenContract.waitForDeployment();

  const contractAddress = await tokenContract.getAddress();
  console.log("✅ MyToken deployed to:", contractAddress);

  // Write address to file
  fs.writeFileSync(path.join(__dirname, "impl_address.txt"), contractAddress.trim());
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
});


