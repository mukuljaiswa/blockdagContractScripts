require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

// ✅ Path to Solidity input JSON file
const SOLIDITY_INPUT_PATH = "solidity-standard-json-input.json";

// ✅ Path to the full version JSON file
const SOLIDITY_VERSION_PATH = "fullsolidityVersion.json";

// ✅ Contract address from command line
const CONTRACT_ADDRESS = process.argv[2];
const CODE_FORMAT = "solidity-standard-json-input";

// ✅ Environment selection from .env

const ENV = process.env.ENVIRONMENT?.toUpperCase() ;


// ✅ API endpoint configuration
let CSRF_TOKEN_URL, VERIFY_CONTRACT_URL;

if (ENV === "STAGE") {
  CSRF_TOKEN_URL = "https://api-explorer.devdomain123.com/v1/api/csrf-token";
  VERIFY_CONTRACT_URL = "https://api-explorer.devdomain123.com/v1/api/contract/verifyContract";
} else if (ENV === "PRIMORDIAL") {
  CSRF_TOKEN_URL = "https://api.primordial.bdagscan.com/v1/api/csrf-token";
  VERIFY_CONTRACT_URL = "https://api.primordial.bdagscan.com/v1/api/contract/verifyContract";
} else {
  throw new Error("❌ Invalid ENVIRONMENT in .env file. Must be STAGE or PRIMORDIAL");
}

console.log("Verify for the contract address:", CONTRACT_ADDRESS);
console.log("Selected environment:", ENV);

async function verifyContract() {
  try {
    // Step 1: Read the Solidity Standard JSON Input
    const sourceCodeJson = fs.readFileSync(SOLIDITY_INPUT_PATH, "utf8");

    // Step 2: Read compiler version from fullsolidityVersion.json
    const versionData = JSON.parse(fs.readFileSync(SOLIDITY_VERSION_PATH, "utf8"));
    const COMPILER_VERSION = versionData.fullVersion;
    console.log("Compiler Version:", COMPILER_VERSION);

    if (!COMPILER_VERSION) {
      throw new Error("❌ Compiler version not found in fullsolidityVersion.json");
    }

    // Step 3: Fetch dynamic CSRF token
    const csrfRes = await axios.get(CSRF_TOKEN_URL);
    const csrfToken = csrfRes.data.csrfToken;

    if (!csrfToken) {
      throw new Error("❌ CSRF token not found in response");
    }

    // Step 4: Prepare form-data
    const form = new FormData();
    form.append("contractaddress", CONTRACT_ADDRESS);
    form.append("codeformat", CODE_FORMAT);
    form.append("compilerversion", COMPILER_VERSION);
    form.append("sourceCode", sourceCodeJson);

    // Step 5: Send contract verification request
    const response = await axios.post(VERIFY_CONTRACT_URL, form, {
      headers: {
        ...form.getHeaders(),
        "csrf-token": csrfToken,
      },
    });

    console.log("✅ Contract verification response:");
    console.log(response.data);

  } catch (err) {
    console.error("❌ Error during verification:");
    console.error(err.message || err);
    //console.error("response.data....",response.data);
  }
}

verifyContract();
