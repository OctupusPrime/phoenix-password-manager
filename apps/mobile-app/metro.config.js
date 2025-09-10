/* eslint-env node */
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Get the project root (monorepo root)
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

// Watch all files within the monorepo
config.watchFolders = [monorepoRoot];

// Map node_modules to the monorepo root
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];
config.resolver.disableHierarchicalLookup = true;

// Ensure we resolve symlinks (important for pnpm)
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.startsWith('@repo/')) {
    // Handle workspace packages
    const packagePath = path.resolve(
      monorepoRoot,
      'packages',
      moduleName.replace('@repo/', ''),
    );
    return {
      filePath: packagePath,
      type: 'sourceFile',
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
