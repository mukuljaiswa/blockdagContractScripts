require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { ethers } = require("hardhat");

async function main() {
  const contractPath = process.env.CONTRACT_PATH;
  const gasLimit = process.env.GAS_LIMIT 
  const rawArgs = process.env.CONSTRUCTOR_ARGS || "[]";

  if (!contractPath) {
    throw new Error("❌ CONTRACT_PATH is not defined in .env");
    
  }

  let constructorArgs;
  try {
    constructorArgs = JSON.parse(rawArgs);
    if (!Array.isArray(constructorArgs)) throw new Error();
  } catch (err) {
    throw new Error("❌ Invalid CONSTRUCTOR_ARGS. Must be a valid JSON array.");
  }

  console.log(`📦 Deploying contract from: ${contractPath}`);
  console.log(`🧾 Constructor args:`, constructorArgs);

  const contractFactory = await ethers.getContractFactory(contractPath);
  const contract = await contractFactory.deploy(...constructorArgs, {
    gasLimit: gasLimit,
  });

  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();

  console.log(`✅ Contract deployed at: ${contractAddress}`);

  // Save address to file
  fs.writeFileSync(
    path.join(__dirname, "impl_address.txt"),
    contractAddress.trim()
  );
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
});