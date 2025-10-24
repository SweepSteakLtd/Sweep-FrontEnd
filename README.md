# SweepSteak Frontend

A React Native mobile application for SweepSteak - the social golf sweeps platform.

## 🏌️ About

SweepSteak is a social golf sweepstake platform that allows users to participate in golf-based competitions and track prize payouts.

## 🚀 Tech Stack

- **React Native** (0.76.9) - Cross-platform mobile development
- **Expo** (SDK 52) - Development framework and build tooling
- **TypeScript** - Type-safe code
- **Firebase Authentication** - User authentication and authorization
- **React Navigation** - Navigation and routing
- **Styled Components** - Component styling
- **React Query** - Server state management

## 📋 Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- iOS Simulator (for iOS development on macOS)
- Android Studio & Android SDK (for Android development)
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli` (for building)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone git@github.com:SweepSteakLtd/Sweep-FrontEnd.git
cd Sweep-FrontEnd
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
# .env.development and .env.production are included in the repo
# No additional configuration needed for basic setup
```

## 🏃 Available Commands

### Development

```bash
yarn start           # Start Expo development server
yarn ios             # Run on iOS simulator
yarn android         # Run on Android emulator
yarn web             # Run in web browser
```

### Building

**Test Builds** (for internal testing):
```bash
yarn build:test:android    # Build test APK for Android
yarn build:test:ios        # Build test for iOS
yarn build:test:all        # Build test for both platforms
```

**Production Builds** (for stores):
```bash
yarn build:prod:android       # Build production AAB for Google Play
yarn build:prod:ios           # Build production for App Store
yarn build:prod:all           # Build production for both platforms
```

**Web Build**:
```bash
yarn build:web               # Build for web deployment
```

### Testing & Development

```bash
yarn test:android            # Install and run test build on Android emulator
yarn format                  # Format code with Prettier
yarn type-check             # Run TypeScript type checking
yarn lint                    # Run ESLint
yarn generate-schemas        # Generate API schemas from OpenAPI spec
yarn verify-schemas          # Verify schemas match OpenAPI spec
yarn export-mocks            # Export mock API documentation
```

### Code Quality & Pre-commit Checks

The project uses pre-commit hooks to ensure code quality. When you attempt to commit, the following checks run automatically:

1. **Mock API Documentation** - Exports and stages updated mock documentation
2. **Schema Verification** - Verifies API schemas match the OpenAPI specification
3. **Code Formatting** - Runs Prettier on staged files
4. **Linting** - Runs ESLint on staged files
5. **Type Checking** - Runs TypeScript type checker

#### Troubleshooting Failed Commits

If your commit is blocked, here's how to fix each type of failure:

**❌ Schema Mismatch**
```bash
# Error: "Schema mismatch detected! Commit blocked."
# Fix: Regenerate schemas from the latest API
yarn generate-schemas

# Then try committing again
git commit -m "your message"
```

**❌ ESLint Errors**
```bash
# Error: "ESLint found errors"
# Fix: Run ESLint and fix issues
yarn lint

# Or auto-fix where possible
yarn lint --fix

# Then try committing again
git commit -m "your message"
```

**❌ TypeScript Errors**
```bash
# Error: "Type check failed"
# Fix: Run type checker to see errors
yarn type-check

# Fix the TypeScript errors shown
# Then try committing again
git commit -m "your message"
```

**⚠️ API Unavailable**
```bash
# Warning: "Failed to fetch OpenAPI spec"
# This is just a warning - your commit will proceed automatically
# Fix schemas later when API is available:
yarn generate-schemas
```

**Note:** Code formatting (Prettier) runs automatically and stages the formatted files, so you don't need to do anything if only formatting issues are found.

## 🏗️ Project Structure

```
Sweep-FrontEnd/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Alert/
│   │   ├── AnimatedAmount/
│   │   ├── Button/
│   │   ├── Checkbox/
│   │   ├── Icon/
│   │   ├── Input/
│   │   └── Typography/
│   ├── contexts/            # React contexts (Auth, etc.)
│   ├── features/            # Feature-based modules
│   │   ├── auth/           # Authentication screens & logic
│   │   └── dashboard/      # Dashboard screens
│   ├── lib/                # Third-party library configs
│   ├── navigation/         # Navigation setup
│   ├── services/           # API services
│   └── theme/              # Theme configuration
├── assets/                 # Static assets (images, fonts)
├── .env.development        # Development environment variables
├── .env.production         # Production environment variables
├── app.json               # Expo configuration
├── eas.json               # EAS Build configuration
└── package.json
```

## 🚢 Deployment

### Firebase Hosting (Web)

Automatic deployment via GitHub Actions on push to `master`:
```bash
# Build and deploy automatically triggered
# View at: https://sweepsteak-64dd0.web.app
```

### Mobile App Distribution

**Android:**
- Test builds create APK files
- Production builds create AAB files for Google Play Store

**iOS:**
- Test builds for TestFlight or ad-hoc distribution
- Production builds for App Store submission

Access builds at: https://expo.dev/accounts/karamvir.mangat/projects/sweepsteak/builds

## 🧪 Testing

Testing on Android Emulator:
```bash
# List available emulators
~/Library/Android/sdk/emulator/emulator -list-avds

# Start emulator
~/Library/Android/sdk/emulator/emulator -avd Pixel_5_API_32 &

# Install and run test build
yarn test:android
```
