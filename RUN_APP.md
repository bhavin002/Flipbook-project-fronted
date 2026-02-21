# How to Run Your Android App

## Option 1: Install Android Studio (Recommended)

### Step 1: Download and Install Android Studio

1. **Download Android Studio**:
   - Visit: https://developer.android.com/studio
   - Download for macOS
   - Install the .dmg file

2. **First Launch Setup**:
   - Open Android Studio
   - Choose "Standard" installation
   - Let it download Android SDK components (this takes 10-20 minutes)
   - Accept licenses when prompted

3. **Verify Installation**:
   ```bash
   # Check if Android Studio is installed
   ls /Applications/Android\ Studio.app
   ```

### Step 2: Open Your Project

```bash
cd /Users/techuplabs/Desktop/Temp/shadcn-flipbook
npx cap open android
```

This will open your Android project in Android Studio.

### Step 3: Wait for Gradle Sync

- Android Studio will automatically start Gradle sync
- First time: This takes 5-10 minutes (downloads dependencies)
- You'll see progress in the bottom status bar
- Wait until "Gradle sync finished" appears

### Step 4: Connect Device or Start Emulator

**Option A: Use Real Android Device**
1. Enable Developer Options on your Android device:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
2. Enable USB Debugging:
   - Settings → Developer Options → USB Debugging (ON)
3. Connect device via USB
4. Accept USB debugging prompt on device
5. Device will appear in Android Studio's device list

**Option B: Use Android Emulator**
1. In Android Studio: Tools → Device Manager
2. Click "Create Device"
3. Select a device (e.g., Pixel 5)
4. Select a system image (API 33 recommended)
5. Download if needed
6. Click "Finish"
7. Click "Play" button to start emulator

### Step 5: Run the App

1. Click the green "Run" button (▶️) in Android Studio toolbar
2. Or press `Shift + F10` (Mac: `Ctrl + R`)
3. Select your device/emulator
4. App will build and install automatically
5. App will launch on your device!

## Option 2: Build APK and Install Manually

If you can't use Android Studio, you can build an APK:

### Prerequisites

You need Android SDK command-line tools:

```bash
# Install via Homebrew (if you have it)
brew install --cask android-commandlinetools

# Or download manually from:
# https://developer.android.com/studio#command-tools
```

### Build Debug APK

```bash
cd /Users/techuplabs/Desktop/Temp/shadcn-flipbook/android

# Make gradlew executable (first time)
chmod +x gradlew

# Build debug APK
./gradlew assembleDebug
```

APK will be at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### Install on Device

1. Transfer APK to your Android device
2. Enable "Install from Unknown Sources" in device settings
3. Open APK file on device
4. Install and run

## Troubleshooting

### "Android Studio not found"
- Install Android Studio from https://developer.android.com/studio
- Or set path: `export CAPACITOR_ANDROID_STUDIO_PATH="/path/to/Android Studio.app"`

### "Gradle sync failed"
- Check internet connection
- Update Android Studio
- In Android Studio: File → Invalidate Caches → Restart

### "No devices found"
- For USB: Enable USB debugging on device
- For emulator: Create and start emulator first
- Check: `adb devices` (if ADB is in PATH)

### "Build failed"
- Check Android Studio's Build output for errors
- Ensure Java JDK is installed (Android Studio includes it)
- Try: File → Sync Project with Gradle Files

### "App crashes on launch"
- Check Logcat in Android Studio (bottom panel)
- Verify `dist/` folder exists and has files
- Run `npm run build && npx cap sync` again

## Quick Test Commands

```bash
# Rebuild web app and sync
npm run build && npx cap sync

# Open in Android Studio
npx cap open android

# Check if Android project exists
ls android/app/src/main/assets/public/index.html
```

## Next Steps After Running

Once the app runs successfully:

1. ✅ Test all features on device
2. ✅ Fix any issues
3. ✅ Create app icon and splash screen
4. ✅ Build release version
5. ✅ Submit to Play Store

## Need Help?

- See `android-setup/` folder for detailed guides
- Android Studio documentation: https://developer.android.com/studio
- Capacitor docs: https://capacitorjs.com/docs

---

**Your Android app is ready!** Just install Android Studio and open the project. 🚀


