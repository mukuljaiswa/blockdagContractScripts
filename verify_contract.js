const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

// ✅ Path to Solidity input JSON file
const SOLIDITY_INPUT_PATH = "solidity-standard-json-input.json";

// ✅ Contract details
const CONTRACT_ADDRESS = "0x9376bF4cd3d36795CB1EF7f91aaACb9D062Ca436";
const COMPILER_VERSION = "v0.8.24+commit.e11b9ed9";
const CODE_FORMAT = "solidity-standard-json-input";

// ✅ API endpoints
const CSRF_TOKEN_URL = "https://api-explorer.devdomain123.com/v1/api/csrf-token";
const VERIFY_CONTRACT_URL = "https://api-explorer.devdomain123.com/v1/api/contract/verifyContract";

async function verifyContract() {
  try {
    // Step 1: Read the Solidity Standard JSON Input
    const sourceCodeJson = fs.readFileSync(SOLIDITY_INPUT_PATH, "utf8");

    // Step 2: Fetch dynamic CSRF token
    const csrfRes = await axios.get(CSRF_TOKEN_URL);
    const csrfToken = csrfRes.data.csrfToken;

    if (!csrfToken) {
      throw new Error("❌ CSRF token not found in response");
    }

    console.log("✅ CSRF Token:", csrfToken);

    // Step 3: Prepare form-data
    const form = new FormData();
    form.append("contractaddress", CONTRACT_ADDRESS);
    form.append("codeformat", CODE_FORMAT);
    form.append("compilerversion", COMPILER_VERSION);
    form.append("sourceCode", sourceCodeJson);

    // Step 4: Send contract verification request
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
  }
}

verifyContract();
