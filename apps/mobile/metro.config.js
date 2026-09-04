const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch project root and monorepo folders if present
config.watchFolders = [
  path.resolve(projectRoot, 'src'),
  monorepoRoot,
];

// Let Metro know where to resolve packages
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Exclude Next.js build artifacts from bundling
config.resolver.blockList = [
  /.*\.next.*/,
];

module.exports = config;
