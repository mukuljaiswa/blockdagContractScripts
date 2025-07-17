require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying SimpleNFT...");

  const nftFactory = await ethers.getContractFactory("MyToken");

  const contract = await nftFactory.deploy({
    gasLimit: process.env.GAS_LIMIT || 30000000,
  });

  await contract.waitForDeployment(); // Optional: wait for confirmation

  const contractAddress = await contract.getAddress();
  console.log("✅ SimpleNFT deployed to:", contractAddress);



  // Save contract address to file
  fs.writeFileSync(path.join(__dirname, "impl_address.txt"), contractAddress.trim());
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
});
