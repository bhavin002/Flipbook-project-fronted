# Flipdrag Android App - Complete Setup Guide

This guide will walk you through converting your React SaaS app into a production-ready Android app using Capacitor.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Install Dependencies](#step-1-install-dependencies)
3. [Step 2: Configure Capacitor](#step-2-configure-capacitor)
4. [Step 3: Add Native Plugins](#step-3-add-native-plugins)
5. [Step 4: Mobile-Specific Code](#step-4-mobile-specific-code)
6. [Step 5: Build Configuration](#step-5-build-configuration)
7. [Step 6: Assets Setup](#step-6-assets-setup)
8. [Step 7: Build APK/AAB](#step-7-build-apkaab)
9. [Step 8: Play Store Submission](#step-8-play-store-submission)

---

## Prerequisites

### Required Software

1. **Node.js** (v18+ recommended) - Already installed ✓
2. **Java JDK 17 or 21** (required for Android builds)
   - Download: https://adoptium.net/
   - Verify: `java -version`
3. **Android Studio** (latest stable version)
   - Download: https://developer.android.com/studio
   - Install Android SDK (API 33+ recommended)
   - Install Android SDK Build-Tools
   - Install Android SDK Platform-Tools
4. **Android SDK Command Line Tools** (optional, for CLI builds)

### Environment Setup

After installing Android Studio:
1. Open Android Studio → SDK Manager
2. Install:
   - Android SDK Platform 33 (or latest)
   - Android SDK Build-Tools
   - Android SDK Platform-Tools
   - Android Emulator (for testing)

Set environment variables (add to `~/.zshrc` or `~/.bash_profile`):

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

---

## Step 1: Install Dependencies

### Why This Step?
Capacitor and its plugins provide the bridge between your React web app and native Android features.

### Commands

```bash
# Install Capacitor core packages
npm install @capacitor/core @capacitor/cli @capacitor/android

# Install required plugins for your app features
npm install @capacitor/app @capacitor/filesystem @capacitor/camera @capacitor/device @capacitor/network @capacitor/splash-screen @capacitor/status-bar @capacitor/haptics @capacitor/browser @capacitor/share @capacitor/preferences

# Install development dependencies
npm install --save-dev @capacitor/assets
```

### What Each Plugin Does

- **@capacitor/app**: App lifecycle, back button handling, app state
- **@capacitor/filesystem**: File read/write operations, downloads
- **@capacitor/camera**: Camera and photo library access
- **@capacitor/device**: Device information
- **@capacitor/network**: Network status monitoring
- **@capacitor/splash-screen**: Custom splash screen
- **@capacitor/status-bar**: Status bar styling
- **@capacitor/haptics**: Vibration feedback
- **@capacitor/browser**: Open external links in system browser
- **@capacitor/share**: Native share dialog
- **@capacitor/preferences**: Key-value storage

---

## Step 2: Configure Capacitor

### Why This Step?
Capacitor needs to know your app's identity, where your web assets are, and how to configure native features.

### Files Created

1. **capacitor.config.js** (root) - Main configuration
2. **capacitor.config.ts** (if using TypeScript)

The configuration file has been created in the root directory. Key settings:

- **appId**: Your unique app identifier (com.flipdrag.app)
- **appName**: Display name in Android
- **webDir**: Where Vite outputs your built files (dist)
- **server**: Development server settings
- **android**: Android-specific configurations

---

## Step 3: Add Native Plugins

### Why This Step?
Native plugins enable features that web browsers can't access directly (camera, file system, device info).

### Commands

```bash
# Add Android platform (creates android/ folder)
npx cap add android

# Sync web assets to native project
npx cap sync
```

### What Happens

- Creates `android/` folder with native Android project
- Copies your `dist/` files to `android/app/src/main/assets/public/`
- Generates native code for all installed plugins
- Updates AndroidManifest.xml with required permissions

---

## Step 4: Mobile-Specific Code

### Why This Step?
Your web app needs mobile-specific handling:
- Back button navigation
- Pull-to-refresh
- File downloads to device storage
- Camera/document picker integration
- External link handling

### Files Created

1. **src/utils/capacitor.ts** - Capacitor initialization and utilities
2. **src/hooks/useBackButton.ts** - Back button handling
3. **src/hooks/usePullToRefresh.ts** - Pull-to-refresh functionality
4. **src/utils/fileDownload.ts** - Native file downloads
5. **src/components/mobile/MobileFileUpload.tsx** - Mobile file upload component

These files integrate Capacitor plugins into your React app.

---

## Step 5: Build Configuration

### Why This Step?
Android apps need proper configuration for:
- Permissions (camera, storage, network)
- App signing (for Play Store)
- Build variants (debug/release)
- ProGuard rules (code obfuscation)

### Files Created

1. **android/app/src/main/AndroidManifest.xml** - App permissions and configuration
2. **android/app/build.gradle** - Build configuration
3. **android/keystore.properties.example** - Signing configuration template

---

## Step 6: Assets Setup

### Why This Step?
Your app needs:
- App icon (multiple sizes for different screen densities)
- Splash screen (loading screen)
- Adaptive icons (Android 8.0+)

### Commands

```bash
# Generate icons and splash screens from source images
npx @capacitor/assets generate --iconBackgroundColor '#ffffff' --iconBackgroundColorDark '#000000' --splashBackgroundColor '#ffffff' --splashBackgroundColorDark '#000000'
```

### Required Source Images

Place in `android-assets/` folder:
- **icon.png** - 1024x1024px (square, transparent or solid background)
- **splash.png** - 2732x2732px (centered logo on background)

The tool will generate all required sizes automatically.

---

## Step 7: Build APK/AAB

### Why This Step?
You need a signed release build to publish on Play Store. AAB (Android App Bundle) is required for Play Store.

### Commands

#### Debug Build (for testing)

```bash
# Build web app
npm run build

# Sync to Android
npx cap sync

# Open in Android Studio
npx cap open android

# In Android Studio: Build → Build Bundle(s) / APK(s) → Build APK(s)
```

#### Release Build (for Play Store)

1. **Create Keystore** (one-time setup):

```bash
keytool -genkey -v -keystore flipdrag-release.keystore -alias flipdrag -keyalg RSA -keysize 2048 -validity 10000
```

2. **Configure Signing** (see `android/keystore.properties.example`)

3. **Build AAB**:

```bash
# In Android Studio: Build → Generate Signed Bundle / APK → Android App Bundle
# Or via command line:
cd android
./gradlew bundleRelease
```

Output: `android/app/build/outputs/bundle/release/app-release.aab`

---

## Step 8: Play Store Submission

### Why This Step?
Google Play Store has specific requirements to prevent "WebView-only" app rejections and ensure quality.

### Checklist

See `PLAY_STORE_CHECKLIST.md` for complete submission requirements.

Key points:
- ✅ App must have native features (not just a WebView)
- ✅ Proper app description and screenshots
- ✅ Privacy policy URL
- ✅ Content rating questionnaire
- ✅ App signing key security

---

## Quick Start Commands

```bash
# 1. Install dependencies
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/app @capacitor/filesystem @capacitor/camera @capacitor/device @capacitor/network @capacitor/splash-screen @capacitor/status-bar @capacitor/haptics @capacitor/browser @capacitor/share @capacitor/preferences
npm install --save-dev @capacitor/assets

# 2. Build web app
npm run build

# 3. Add Android platform
npx cap add android

# 4. Sync assets
npx cap sync

# 5. Open in Android Studio
npx cap open android

# 6. In Android Studio: Build → Build Bundle(s) / APK(s)
```

---

## Troubleshooting

### Common Issues

1. **"SDK location not found"**
   - Set `ANDROID_HOME` environment variable
   - Or create `local.properties` in `android/` folder: `sdk.dir=/path/to/android/sdk`

2. **"Gradle sync failed"**
   - Update Android Studio to latest version
   - Update Gradle wrapper: `cd android && ./gradlew wrapper --gradle-version 8.0`

3. **"App crashes on launch"**
   - Check Logcat in Android Studio
   - Verify `webDir` in `capacitor.config.js` matches your build output
   - Ensure all Capacitor plugins are properly installed

4. **"File downloads don't work"**
   - Check AndroidManifest.xml has storage permissions
   - Verify Filesystem plugin is installed
   - Check file path permissions

---

## Next Steps

After completing this setup:

1. Test on real Android device
2. Test all features (upload, download, camera, etc.)
3. Create app icon and splash screen assets
4. Build release AAB
5. Submit to Play Store

For detailed code explanations, see the individual files in this folder.


