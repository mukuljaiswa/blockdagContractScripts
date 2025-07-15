#!/bin/bash

# Run deployment script and see all console logs
npx hardhat run --network blockdag ignition/modules/deploy.js

# Read the implementation address from file
implAddress=$(cat ignition/modules/impl_address.txt)

echo

echo "Generating latest solidity-standard-json-input.json file......."

node solidity-standard-json-input_file_Generator.js

echo "Verifying Smart Contract......."

echo

node verify_contract.js "$implAddress"






