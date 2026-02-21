#!/bin/bash

# Android App Setup Script
# Run this script to set up your React app for Android

set -e  # Exit on error

echo "🚀 Starting Android App Setup..."
echo ""

# Step 1: Install dependencies
echo "📦 Step 1: Installing Capacitor dependencies..."
npm install

# Step 2: Build web app
echo ""
echo "🔨 Step 2: Building React web app..."
npm run build

# Step 3: Add Android platform
echo ""
echo "📱 Step 3: Adding Android platform..."
npx cap add android

# Step 4: Sync assets
echo ""
echo "🔄 Step 4: Syncing web assets to Android project..."
npx cap sync

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Open Android Studio: npx cap open android"
echo "2. Wait for Gradle sync (first time: 5-10 minutes)"
echo "3. Connect Android device or start emulator"
echo "4. Click Run button to test"
echo ""
echo "For detailed instructions, see: android-setup/QUICK_START.md"


