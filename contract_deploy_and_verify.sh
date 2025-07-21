#!/bin/bash

# Exit immediately if any command fails
set -e

echo "🚀 Starting smart contract deployment..."

# Step 1: Run deployment script
echo "📦 Deploying contract..."
npx hardhat run --network blockdag ignition/modules/deploy.js

# Step 2: Read the deployed contract address from file
implAddress=$(cat ignition/modules/impl_address.txt)

echo
echo "✅ Contract deployed at address: $implAddress"

# Step 3: Generate Solidity JSON input file
echo "🛠️ Generating solidity-standard-json-input.json file..."
node solidity-standard-json-input_file_Generator.js

# Step 4: Verify the deployed contract
echo
echo "🔍 Verifying smart contract on explorer..."
node verify_contract.js "$implAddress"

echo
echo "🎉 All steps completed successfully."
