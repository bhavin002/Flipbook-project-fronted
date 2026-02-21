# Android APK Conversion Guide

This guide will help you convert your React app to an Android APK file using Capacitor.

## Prerequisites

1. **Node.js** (already installed)
2. **Java Development Kit (JDK)** - Version 11 or higher
   - Download from: https://adoptium.net/ or https://www.oracle.com/java/technologies/downloads/
   - Verify installation: `java -version`
3. **Android Studio** - Required for building APK
   - Download from: https://developer.android.com/studio
   - Install Android SDK and build tools through Android Studio

## Step 1: Install Capacitor Dependencies

Run the following command in your project directory:

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

## Step 2: Initialize Capacitor

After installing dependencies, initialize Capacitor:

```bash
npx cap init
```

When prompted:
- **App name**: FlipDrag (or your preferred name)
- **App ID**: com.flipdrag.app (or your preferred bundle ID)
- **Web dir**: dist

Or you can skip this step since `capacitor.config.js` is already created.

## Step 3: Build Your React App

Build your React app for production:

```bash
npm run build
```

This creates the `dist` folder with your production-ready app.

## Step 4: Add Android Platform

Add the Android platform to your project:

```bash
npx cap add android
```

This creates an `android` folder in your project root.

## Step 5: Sync Your App

Sync your web assets with the native Android project:

```bash
npx cap sync
```

This command:
- Copies your `dist` folder contents to the Android project
- Updates native dependencies
- Syncs configuration

## Step 6: Open in Android Studio

Open the Android project in Android Studio:

```bash
npx cap open android
```

Or use the npm script:

```bash
npm run cap:android
```

## Step 7: Build APK in Android Studio

1. **Wait for Gradle Sync**: Android Studio will automatically sync Gradle dependencies (this may take a few minutes on first run)

2. **Configure Signing (Optional for testing)**:
   - For testing, you can use the debug keystore (already configured)
   - For production, you'll need to create a release keystore

3. **Build APK**:
   - Go to **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
   - Or use the terminal in Android Studio: `./gradlew assembleDebug` (for debug APK)
   - Or `./gradlew assembleRelease` (for release APK - requires signing)

4. **Find Your APK**:
   - Debug APK: `android/app/build/outputs/apk/debug/app-debug.apk`
   - Release APK: `android/app/build/outputs/apk/release/app-release.apk`

## Step 8: Install on Device

You can install the APK on an Android device by:
- Transferring the APK file to your device and installing it
- Using Android Studio's device manager to run directly on a connected device or emulator

## Quick Commands Reference

```bash
# Build and sync in one command
npm run android:build

# Just sync after building
npm run build && npm run cap:sync

# Open Android Studio
npm run cap:android
```

## Important Notes

1. **App ID**: The `appId` in `capacitor.config.js` (com.flipdrag.app) is your app's unique identifier. Change it if needed.

2. **Permissions**: If your app needs specific permissions (camera, location, etc.), you may need to add them to `android/app/src/main/AndroidManifest.xml`

3. **API URLs**: If your app makes API calls, ensure they use HTTPS or configure network security in Android.

4. **Production Build**: For a production APK:
   - Create a keystore for signing
   - Update `android/app/build.gradle` with signing config
   - Build release APK

5. **Testing**: Always test on a real device or emulator before distributing.

## Troubleshooting

- **Gradle sync fails**: Make sure you have the latest Android SDK and build tools installed
- **Build errors**: Check Android Studio's build output for specific error messages
- **App crashes**: Check Logcat in Android Studio for runtime errors
- **Network issues**: Ensure your API endpoints are accessible and use HTTPS

## Next Steps

After successfully building your APK:
1. Test thoroughly on multiple devices
2. Set up proper app signing for production
3. Consider publishing to Google Play Store
4. Update app version in `package.json` and `capacitor.config.js` for future releases


