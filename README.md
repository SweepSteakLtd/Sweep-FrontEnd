# SweepSteak Frontend

A React Native mobile application for SweepSteak - the social golf sweeps platform.

## 🏌️ About

SweepSteak is a social golf sweepstake platform that allows users to participate in golf-based competitions and track prize payouts.

### Key Features

- 🔐 **User Authentication** - Firebase-based authentication with secure credential management
- 🏆 **Tournament Management** - Create and manage golf tournaments with multiple games
- 🎮 **Game Types** - Support for various golf sweepstake formats
- 💰 **Transaction Tracking** - Monitor bets and prize payouts
- 📱 **Cross-Platform** - Native iOS, Android, and Web support
- 🎨 **Modern UI** - Responsive design with React Native Elements and Styled Components
- 🔄 **Real-time Updates** - TanStack Query for efficient data synchronization
- 🧪 **Mock API Mode** - Development mode with mock data for testing
- ✅ **Type Safety** - Full TypeScript support with Zod schema validation

### Architecture Highlights

- **Feature-based Architecture** - Modular feature organization for better maintainability
- **Automated Code Quality** - Pre-commit hooks for linting, formatting, and type checking
- **API Schema Validation** - Automatic schema generation from OpenAPI specification
- **Component Library** - Reusable, well-documented UI components
- **Custom Hooks** - Shared business logic via React hooks
- **Theme System** - Centralized styling and theming

## 🚀 Tech Stack

- **React Native** (0.76.9) - Cross-platform mobile development
- **Expo** (~52.0.0) - Development framework and build tooling
- **TypeScript** (~5.9.2) - Type-safe code
- **React** (18.3.1) - UI library
- **Firebase** (^11.2.0) - Authentication and backend services
- **React Navigation** (^7.x) - Navigation and routing
- **Styled Components** (^6.1.13) - Component styling
- **TanStack Query** (^5.62.7) - Server state management (formerly React Query)
- **Zod** (^4.1.12) - Schema validation
- **React Native Elements** (@rneui) - UI component library

## 📋 Prerequisites

- **Node.js** (v22.19.0 - specified in `.nvmrc`)
  - Recommended: Use [nvm](https://github.com/nvm-sh/nvm) to manage Node versions
  - Run `nvm use` in the project directory to switch to the correct version
- **Yarn** (1.22.22) - Package manager
- **Expo CLI** - Included as project dependency (no global install needed)
- **EAS CLI** - For building mobile apps: `npm install -g eas-cli`

### Platform-Specific Prerequisites

**For iOS Development (macOS only):**
- Xcode (latest stable version)
- iOS Simulator
- CocoaPods: `sudo gem install cocoapods`

**For Android Development:**
- Android Studio
- Android SDK (API level 34 or higher)
- Java Development Kit (JDK 17 or higher)
- Android Emulator or physical device

**For Web Development:**
- Modern web browser (Chrome, Firefox, Safari, or Edge)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone git@github.com:SweepSteakLtd/Sweep-FrontEnd.git
cd Sweep-FrontEnd
```

2. Set up Node.js version (using nvm):
```bash
nvm use
# If the version isn't installed, run: nvm install
```

3. Install dependencies:
```bash
yarn install
```

4. Set up Git hooks:
```bash
# This happens automatically via the "prepare" script
# Husky will set up pre-commit hooks for code quality checks
```

5. Environment configuration:
```bash
# .env.development and .env.production are included in the repo
# No additional configuration needed for basic setup
# Firebase and API configurations are already set up
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
│   │   ├── Alert/           # Alert/notification component
│   │   ├── AnimatedAmount/  # Animated number display
│   │   ├── BackButton/      # Navigation back button
│   │   ├── Button/          # Primary button component
│   │   ├── Checkbox/        # Checkbox input
│   │   ├── Dropdown/        # Dropdown/select component
│   │   ├── Icon/            # Icon wrapper component
│   │   ├── Input/           # Text input component
│   │   ├── RadioButton/     # Radio button input
│   │   ├── SearchInput/     # Search input with icon
│   │   ├── Skeleton/        # Loading skeleton screens
│   │   ├── Switch/          # Toggle switch component
│   │   ├── TabBar/          # Bottom tab navigation
│   │   └── Typography/      # Text components
│   ├── contexts/            # React contexts (Auth, etc.)
│   ├── features/            # Feature-based modules
│   │   ├── auth/            # Authentication screens & logic
│   │   ├── dashboard/       # Dashboard/home screens
│   │   ├── games/           # Games management
│   │   ├── settings/        # User settings
│   │   └── tournaments/     # Tournament management
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Third-party library configs
│   │   ├── debug/           # Debug utilities
│   │   ├── mocks/           # Mock API data
│   │   └── validation/      # Form validation helpers
│   ├── navigation/          # Navigation setup & routing
│   ├── services/            # API services
│   │   └── apis/            # API endpoints & schemas
│   └── theme/               # Theme configuration & styles
├── assets/                  # Static assets (images, fonts)
├── scripts/                 # Build and development scripts
│   ├── exportMocks.js       # Mock API documentation generator
│   ├── generateSchemas.ts   # OpenAPI schema generator
│   └── verifySchemas.ts     # Schema validation script
├── docs/                    # Documentation
│   └── mocks/               # Generated mock API documentation
├── .husky/                  # Git hooks configuration
├── .env.development         # Development environment variables
├── .env.production          # Production environment variables
├── .nvmrc                   # Node.js version specification
├── app.json                 # Expo configuration
├── eas.json                 # EAS Build configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
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

## 📚 Development Best Practices

### Code Quality

- **Always run tests before committing** - Pre-commit hooks will catch issues, but it's faster to fix them early
- **Follow TypeScript best practices** - Avoid `any` types, use proper type definitions
- **Use Zod schemas** - For all API data validation and type inference
- **Write meaningful commit messages** - Describe what changed and why
- **Keep components small** - Single responsibility principle
- **Use custom hooks** - For reusable logic across components

### API Integration

- **Schema-first development** - API schemas are auto-generated from OpenAPI spec
- **Run `yarn generate-schemas`** - Whenever the backend API changes
- **Use TanStack Query** - For all API calls (provides caching, refetching, error handling)
- **Mock mode available** - Use mock data during development when API is unavailable

### Styling

- **Use theme values** - Access colors, spacing, etc. from the theme system
- **Styled Components** - For component-specific styles
- **React Native Elements** - For standard UI components
- **Consistent spacing** - Use theme spacing units for consistent layout

## 🔧 Common Issues & Solutions

### Issue: Node version mismatch
```bash
# Solution: Use nvm to switch to the correct version
nvm use
```

### Issue: Metro bundler cache issues
```bash
# Solution: Clear cache and restart
yarn start --clear
```

### Issue: iOS build fails
```bash
# Solution: Clean and reinstall iOS dependencies
cd ios && pod deintegrate && pod install && cd ..
```

### Issue: Android emulator not found
```bash
# Solution: Check Android SDK path
echo $ANDROID_HOME
# Should point to: ~/Library/Android/sdk (macOS)

# List available emulators
~/Library/Android/sdk/emulator/emulator -list-avds
```

### Issue: Pre-commit hook blocks commit
See the [Code Quality & Pre-commit Checks](#code-quality--pre-commit-checks) section above for troubleshooting steps.

## 🧪 Mock API System

The app includes a comprehensive mock API system for development and testing without a backend connection.

### Enabling Mocks

1. **In Development**: Use the `DevMockButton` component (appears on Login screen)
2. **Configure Mocks**: Toggle individual endpoints and select response scenarios
3. **Global Toggle**: Enable/disable all mocks at once

### Mock Features

- **Scenario Selection**: Choose different responses (success, error, empty data)
- **Configurable Delays**: Simulate network latency
- **Post Processors**: Dynamic response modifications
- **Persistent Config**: Mock settings saved to AsyncStorage

### Documentation

- See [docs/mocks/README.md](docs/mocks/README.md) for detailed mock system documentation
- See [docs/features/login.md](docs/features/login.md) for login flow documentation
- See [docs/features/create-profile.md](docs/features/create-profile.md) for profile creation documentation

## 📱 Feature Documentation

### Authentication Flow

The app uses Firebase Authentication with a multi-step verification process:

1. **Login** → Firebase authentication
2. **Profile Check** → API call to `/api/users/me`
3. **Routing Logic**:
   - Profile exists + verified → Dashboard
   - Profile exists + unverified → Verification Pending
   - No profile → Create Profile

See [docs/features/login.md](docs/features/login.md) for details.

### Profile Creation Flow

A 6-step wizard for creating user profiles:

1. Basic Info (name)
2. Phone Number Entry
3. Phone Verification (SMS code)
4. Personal Details (DOB, address)
5. Deposit Limits
6. Stake Limits

After submission, GBG identity verification is triggered. See [docs/features/create-profile.md](docs/features/create-profile.md) for details.

### Team Creation Flow

Create fantasy golf teams by selecting players from groups:

1. Select one player per group (A-J)
2. Progress indicator shows completion
3. Name your team
4. Submit to join a league

## 📖 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Styled Components](https://styled-components.com/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Zod](https://zod.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)

## 👥 Contributing

1. Create a feature branch from `master`
2. Make your changes following the coding standards
3. Ensure all pre-commit checks pass
4. Create a pull request with a clear description
5. Wait for code review and approval

## 📄 License

This project is proprietary and confidential.
