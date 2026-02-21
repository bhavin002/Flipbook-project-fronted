# Quick Start Guide

Follow these steps in order to convert your React app to Android APK.

## Prerequisites Check

```bash
# Check Node.js
node --version  # Should be v18+

# Check Java
java -version  # Should be JDK 17 or 21

# Check Android Studio is installed
# Open Android Studio to verify
```

## Step 1: Install Dependencies (5 minutes)

```bash
# Install all Capacitor packages
npm install

# This installs:
# - @capacitor/core, @capacitor/cli, @capacitor/android
# - All required plugins (camera, filesystem, etc.)
```

## Step 2: Build Web App (2 minutes)

```bash
# Build your React app
npm run build

# Verify dist/ folder was created
ls dist/
```

## Step 3: Add Android Platform (5 minutes)

```bash
# Add Android platform (creates android/ folder)
npx cap add android

# Sync web assets to Android project
npx cap sync
```

## Step 4: Configure Android (10 minutes)

1. **Update AndroidManifest.xml** (see `ANDROID_MANIFEST.md`)
   - Add required permissions
   - Configure app settings

2. **Update build.gradle** (see `BUILD_CONFIG.md`)
   - Set SDK versions
   - Configure signing (for release)

## Step 5: Integrate Mobile Code (30 minutes)

Follow `INTEGRATION_GUIDE.md` to:
- Update file downloads
- Add back button handling
- Update external links
- Add mobile file upload
- Add pull-to-refresh

## Step 6: Setup Assets (15 minutes)

1. Create `android-assets/` folder
2. Add `icon.png` (1024x1024)
3. Add `splash.png` (2732x2732)
4. Generate assets:

```bash
npx @capacitor/assets generate \
  --iconBackgroundColor '#ffffff' \
  --iconBackgroundColorDark '#000000' \
  --splashBackgroundColor '#ffffff' \
  --splashBackgroundColorDark '#000000'
```

## Step 7: Test in Android Studio (30 minutes)

```bash
# Open in Android Studio
npx cap open android
```

In Android Studio:
1. Wait for Gradle sync (first time: 5-10 minutes)
2. Connect Android device or start emulator
3. Click "Run" (green play button)
4. Test all features

## Step 8: Create Release Keystore (5 minutes)

```bash
keytool -genkey -v -keystore android/app/flipdrag-release.keystore \
  -alias flipdrag -keyalg RSA -keysize 2048 -validity 10000
```

**Important**: Save password and keystore file securely!

## Step 9: Build Release AAB (10 minutes)

In Android Studio:
1. Build → Generate Signed Bundle / APK
2. Select "Android App Bundle"
3. Choose your keystore
4. Build

Output: `android/app/build/outputs/bundle/release/app-release.aab`

## Step 10: Submit to Play Store (1-2 hours)

Follow `PLAY_STORE_CHECKLIST.md`:
1. Create Play Console account ($25)
2. Create app listing
3. Upload AAB
4. Complete store listing
5. Submit for review

## Common Commands Reference

```bash
# Build and sync
npm run build && npx cap sync

# Open Android Studio
npm run cap:android

# Generate assets
npm run android:assets

# Full build workflow
npm run android:build
```

## Troubleshooting

### "SDK location not found"
Create `android/local.properties`:
```
sdk.dir=/Users/yourusername/Library/Android/sdk
```

### "Gradle sync failed"
- Update Android Studio
- Update Gradle: `cd android && ./gradlew wrapper --gradle-version 8.0`

### "Module not found"
- Run `npm install`
- Check file paths in imports
- Verify `jsconfig.json` has `@` alias

### App crashes on launch
- Check Logcat in Android Studio
- Verify `webDir` in `capacitor.config.js` is "dist"
- Ensure all plugins are installed

## Next Steps

After setup:
1. ✅ Test thoroughly on real device
2. ✅ Fix any issues
3. ✅ Create app icon and splash screen
4. ✅ Build release AAB
5. ✅ Submit to Play Store

## Need Help?

- See detailed guides in `android-setup/` folder
- Check Capacitor docs: https://capacitorjs.com/docs
- Check Android docs: https://developer.android.com

Good luck! 🚀


