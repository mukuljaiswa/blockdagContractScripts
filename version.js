const axios = require('axios');

const fetchCompilerVersion = async (version = null) => {
  try {
    const response = await axios.get("https://binaries.soliditylang.org/bin/list.json");
    const data = response.data;

    if (!data || !data.releases) {
      console.error("❌ No release data found.");
      return;
    }

    const versions = Object.entries(data.releases).map(([key, value]) => ({
      value: key,
      title: value.replace(/^soljson-|\.js$/g, ""),
    }));

    if (version) {
      const match = versions.find(v => v.value === version.replace(/['"]/g, ""));
      if (match) {
        return match.title;
      } else {
        console.warn(`⚠️ Version ${version} not found.`);
        return null;
      }
    } else {
      console.log("✅ Fetched Solidity Compiler Versions:", versions);
      return versions;
    }
  } catch (err) {
    console.error("❌ Error fetching versions:", err.message);
  }
};

module.exports = fetchCompilerVersion;
