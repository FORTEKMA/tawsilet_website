const fs = require('fs');
const { execSync } = require('child_process');

// Get current branch
const getCurrentBranch = () => {
  try {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  } catch (error) {
    console.error('Error getting current branch:', error.message);
    return 'main'; // fallback to main
  }
};

// Copy environment file based on branch
const setupEnvironment = () => {
  const currentBranch = getCurrentBranch();
  console.log(`Current branch: ${currentBranch}`);
  
  let sourceFile;
  let targetFile = '.env';
  
  switch (currentBranch) {
    case 'dev':
    case 'development':
      sourceFile = '.env.development';
      console.log('Setting up development environment...');
      break;
    case 'main':
    case 'master':
      sourceFile = '.env.production';
      console.log('Setting up production environment...');
      break;
    default:
      // For any other branch, use development by default
      sourceFile = '.env.development';
      console.log(`Unknown branch "${currentBranch}", using development environment...`);
  }
  
  if (fs.existsSync(sourceFile)) {
    fs.copyFileSync(sourceFile, targetFile);
    console.log(`✅ Environment file copied from ${sourceFile} to ${targetFile}`);
  } else {
    console.error(`❌ Source environment file ${sourceFile} not found!`);
    process.exit(1);
  }
};

// Run the setup
setupEnvironment(); 