#!/bin/bash

# Build Android APK Script
# This script builds your React app and creates an Android APK
# No Android Studio required - just Java JDK

set -e  # Exit on error

echo "🚀 Building Android APK..."
echo ""

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed!"
    echo "   Install with: brew install openjdk@17"
    echo "   Or download from: https://adoptium.net/"
    exit 1
fi

echo "✅ Java found: $(java -version 2>&1 | head -n 1)"
echo ""

# Step 1: Build web app
echo "📦 Step 1: Building React web app..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist folder not found"
    exit 1
fi

echo "✅ Web app built successfully"
echo ""

# Step 2: Sync to Android
echo "🔄 Step 2: Syncing to Android project..."
npx cap sync

echo "✅ Assets synced"
echo ""

# Step 3: Build APK
echo "🤖 Step 3: Building Android APK..."
echo "   (First time: This will download Gradle and dependencies - 5-10 minutes)"
echo ""

cd android

# Make gradlew executable
chmod +x gradlew

# Build debug APK
./gradlew assembleDebug

# Check if APK was created
if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
    APK_SIZE=$(ls -lh app/build/outputs/apk/debug/app-debug.apk | awk '{print $5}')
    echo ""
    echo "✅ APK built successfully!"
    echo ""
    echo "📱 APK Details:"
    echo "   Location: android/app/build/outputs/apk/debug/app-debug.apk"
    echo "   Size: $APK_SIZE"
    echo ""
    echo "📲 To install on your Android device:"
    echo ""
    echo "   Option 1: Manual Install"
    echo "   1. Transfer the APK to your Android device (email, USB, cloud)"
    echo "   2. On device: Settings → Security → Enable 'Install from Unknown Sources'"
    echo "   3. Open the APK file on your device"
    echo "   4. Tap 'Install'"
    echo ""
    echo "   Option 2: Using ADB (if installed)"
    echo "   adb install app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "   Option 3: Open file location"
    echo "   open app/build/outputs/apk/debug/"
    echo ""
else
    echo "❌ Build failed - APK not found"
    echo "   Check the errors above"
    exit 1
fi


