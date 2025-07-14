const fs = require('fs');
const path = require('path');

// Function to get the latest build info file
function getLatestBuildInfo() {
  const buildInfoDir = path.join(__dirname, 'artifacts/build-info');
  
  // Read all files in the directory
  const files = fs.readdirSync(buildInfoDir);
  
  if (files.length === 0) {
    throw new Error('No build info files found in artifacts/build-info');
  }
  
  // Get full paths and stats for all files
  const filesWithStats = files.map(file => {
    const filePath = path.join(buildInfoDir, file);
    return {
      name: file,
      path: filePath,
      time: fs.statSync(filePath).mtime.getTime()
    };
  });
  
  // Sort by modified time (newest first)
  filesWithStats.sort((a, b) => b.time - a.time);
  
  // Return the newest file
  return filesWithStats[0].path;
}

function processBuildInfo() {
  const outputFilePath = path.join(__dirname, 'solidity-standard-json-input.json');

  try {
    // Get the latest build info file path dynamically
    const inputFilePath = getLatestBuildInfo();
    console.log(`Using latest build info file: ${inputFilePath}`);

    const rawText = fs.readFileSync(inputFilePath, 'utf8');

    const inputStartIndex = rawText.indexOf('"input":');
    const outputStartIndex = rawText.indexOf('"output":');

    if (inputStartIndex === -1 || outputStartIndex === -1 || outputStartIndex < inputStartIndex) {
      throw new Error('"input" and "output" keys not found in proper order');
    }

    // Extract text after "input": and before "output":
    const inputJsonRaw = rawText.substring(inputStartIndex + 8, outputStartIndex).trim();

    // Ensure the input section is a clean JSON object
    let cleaned = inputJsonRaw;
    if (cleaned.endsWith(',')) {
      cleaned = cleaned.slice(0, -1);
    }

    const finalJsonText = cleaned.trim().startsWith('{') ? cleaned.trim() : `{${cleaned.trim()}}`;

    // 🔍 Log the extracted string before parsing
    console.log('\n🧪 Preview of extracted JSON before parsing:\n');
    console.log('--- START ---');
    console.log(finalJsonText.substring(0, 300)); // Only preview first 300 characters
    console.log('--- END ---\n');

    // Try parsing the final JSON string
    const parsedInput = JSON.parse(finalJsonText);

    // Write to new file (will overwrite if exists)
    fs.writeFileSync(outputFilePath, JSON.stringify(parsedInput, null, 2), 'utf8');
    console.log(`✅ Successfully ${fs.existsSync(outputFilePath) ? 'overwrote' : 'saved'} file: ${outputFilePath}`);
    
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);

    if (err instanceof SyntaxError) {
      console.log('\n📛 JSON that failed to parse:\n');
      console.log('--- START ---');
      console.log(err.stack);
      console.log('--- END ---');
    }
    process.exit(1);
  }
}

// Execute the processing
processBuildInfo();