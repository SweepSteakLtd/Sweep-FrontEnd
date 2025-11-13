#!/usr/bin/env bash

set -e

echo "EAS Build Pre-Install Hook: Starting..."

# Install bundler and gems (including CocoaPods) before dependencies are installed
if [ -f "Gemfile" ]; then
  echo "Installing Ruby gems from Gemfile..."
  gem install bundler
  bundle install
  echo "✅ Ruby gems installed"
fi

# Create .xcode.env.local to tell React Native to use bundler for CocoaPods
# This file will be created after expo prebuild generates the ios directory
mkdir -p ios
cat > ios/.xcode.env.local << 'EOF'
# Override to use bundle exec for CocoaPods
export USE_BUNDLER=1
EOF
echo "✅ Created ios/.xcode.env.local to enable bundler"

echo "EAS Build Pre-Install Hook: Complete"
