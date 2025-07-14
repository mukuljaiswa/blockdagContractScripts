const fs = require('fs');
const path = require('path');

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
  return {
    filename: filesWithStats[0].name,
    path: filesWithStats[0].path,
    content: JSON.parse(fs.readFileSync(filesWithStats[0].path, 'utf8'))
  };
}

// Usage example
try {
  const latestBuild = getLatestBuildInfo();
  console.log('Latest build info file:', latestBuild.filename);  
  // Use the filename or content as needed
} catch (error) {
  console.error('Error getting build info:', error);
}