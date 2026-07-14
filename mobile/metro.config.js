const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Zustand publishes an ESM development branch that contains `import.meta`.
// Metro's classic web export is not emitted as a module script, so direct the
// two imports we use to the package's equivalent CommonJS builds.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "zustand") {
    return {
      filePath: path.join(__dirname, "node_modules/zustand/index.js"),
      type: "sourceFile",
    };
  }

  if (moduleName === "zustand/middleware") {
    return {
      filePath: path.join(__dirname, "node_modules/zustand/middleware.js"),
      type: "sourceFile",
    };
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
