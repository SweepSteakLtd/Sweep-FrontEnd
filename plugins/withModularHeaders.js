const { withDangerousMod } = require('@expo/config-plugins');

/**
 * Configures Podfile for Firebase compatibility with React Native 0.76
 * - Adds targeted modular headers for Firebase pods
 * - Sets up dynamic frameworks for better compatibility
 */
const withFirebasePodfileConfig = (config) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const fs = require('fs');
      const path = require('path');
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');

      if (fs.existsSync(podfilePath)) {
        let podfileContent = fs.readFileSync(podfilePath, 'utf-8');

        // Add Firebase pod declarations with modular headers inside the target block
        // This must be added after use_expo_modules! but before use_react_native!
        if (!podfileContent.includes("pod 'GoogleUtilities', :modular_headers => true")) {
          podfileContent = podfileContent.replace(
            /target ['"].*['"] do\s+use_expo_modules!/,
            (match) => {
              return `${match}\n\n  # Required for Firebase - enable modular headers for all Firebase pods\n  pod 'GoogleUtilities', :modular_headers => true\n  pod 'FirebaseCore', :modular_headers => true\n  pod 'FirebaseCoreInternal', :modular_headers => true\n  pod 'FirebaseAuth', :modular_headers => true`;
            },
          );
          console.log('✅ Added Firebase pod configurations with modular headers');
        }

        fs.writeFileSync(podfilePath, podfileContent, 'utf-8');
      }

      return config;
    },
  ]);
};

module.exports = withFirebasePodfileConfig;
