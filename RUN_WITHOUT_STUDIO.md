# Run Android App Without Android Studio

Yes! You can build and run your Android app without installing Android Studio. Here are your options:

## Option 1: Build APK with Gradle (Easiest)

### Prerequisites

You need Java JDK installed:

```bash
# Check if Java is installed
java -version

# If not installed, install via Homebrew:
brew install openjdk@17
# Or download from: https://adoptium.net/
```

### Build Debug APK

```bash
cd /Users/techuplabs/Desktop/Temp/shadcn-flipbook/android

# Make gradlew executable (first time only)
chmod +x gradlew

# Build debug APK (this will download Gradle and dependencies on first run)
./gradlew assembleDebug
```

**First time**: This will download Gradle wrapper and dependencies (5-10 minutes)

**Output**: APK will be at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### Install on Device

**Method 1: Using ADB (if you have Android SDK Platform Tools)**

```bash
# Install ADB via Homebrew
brew install --cask android-platform-tools

# Connect your Android device via USB
# Enable USB debugging on device (Settings → Developer Options)

# Install APK
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Launch app
adb shell am start -n com.flipdrag.app/.MainActivity
```

**Method 2: Manual Install**

1. Transfer `app-debug.apk` to your Android device (email, USB, cloud storage)
2. On device: Settings → Security → Enable "Install from Unknown Sources"
3. Open the APK file on your device
4. Tap "Install"
5. Open the app from app drawer

## Option 2: Install Android SDK Command-Line Tools Only

If you want to use ADB and other tools without the full Android Studio:

### Install via Homebrew

```bash
# Install Android SDK command-line tools
brew install --cask android-commandlinetools

# Or install platform-tools only (smaller, just ADB)
brew install --cask android-platform-tools
```

### Set Environment Variables

Add to `~/.zshrc` or `~/.bash_profile`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

Then:
```bash
source ~/.zshrc  # or source ~/.bash_profile
```

### Use ADB

```bash
# Check connected devices
adb devices

# Install APK
adb install app-debug.apk

# View logs
adb logcat
```

## Option 3: Use Online Build Services

### GitHub Actions (Free)

Create `.github/workflows/build-apk.yml`:

```yaml
name: Build Android APK

on:
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '17'
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Build web app
        run: npm run build
      - name: Sync Capacitor
        run: npx cap sync
      - name: Build APK
        run: |
          cd android
          chmod +x gradlew
          ./gradlew assembleDebug
      - name: Upload APK
        uses: actions/upload-artifact@v3
        with:
          name: app-debug.apk
          path: android/app/build/outputs/apk/debug/app-debug.apk
```

Then download the APK from GitHub Actions artifacts.

## Option 4: Use Capacitor CLI (Limited)

Capacitor CLI has limited run support without Android Studio:

```bash
# This requires Android SDK to be set up
npx cap run android
```

But this still needs Android SDK tools installed.

## Recommended: Build APK with Gradle

**Easiest approach** - Just need Java:

```bash
# 1. Install Java (if not installed)
brew install openjdk@17

# 2. Build APK
cd /Users/techuplabs/Desktop/Temp/shadcn-flipbook/android
chmod +x gradlew
./gradlew assembleDebug

# 3. Find your APK
ls -lh app/build/outputs/apk/debug/app-debug.apk

# 4. Transfer to device and install
```

## Quick Build Script

I'll create a script to make this easier:

```bash
#!/bin/bash
# build-apk.sh

echo "🔨 Building Android APK..."

# Build web app
echo "📦 Building web app..."
npm run build

# Sync to Android
echo "🔄 Syncing to Android..."
npx cap sync

# Build APK
echo "🤖 Building APK..."
cd android
chmod +x gradlew
./gradlew assembleDebug

# Show result
if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
    echo "✅ APK built successfully!"
    echo "📱 Location: android/app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "To install on device:"
    echo "  1. Transfer APK to your Android device"
    echo "  2. Enable 'Install from Unknown Sources' in device settings"
    echo "  3. Open APK file and install"
else
    echo "❌ Build failed. Check errors above."
fi
```

## Troubleshooting

### "Java not found"
```bash
# Install Java
brew install openjdk@17

# Set JAVA_HOME
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
```

### "Gradle permission denied"
```bash
chmod +x android/gradlew
```

### "Build failed - SDK not found"
The Gradle wrapper should handle this, but if it fails:
- You may need to install Android SDK command-line tools
- Or use Android Studio (it includes everything)

### "APK installs but crashes"
- Check device logs: `adb logcat` (if ADB installed)
- Ensure you ran `npm run build && npx cap sync` before building
- Verify `dist/` folder has files

## Comparison

| Method | Setup Time | Complexity | Best For |
|--------|-----------|------------|----------|
| **Gradle Build** | 5 min | Easy | Quick testing |
| **ADB Install** | 10 min | Medium | Regular development |
| **Android Studio** | 30 min | Easy | Full development |
| **GitHub Actions** | 15 min | Medium | CI/CD, automated builds |

## Recommendation

**For quick testing**: Use Gradle to build APK, then install manually on device.

**For development**: Install Android Studio (it's free and makes everything easier).

Let me create the build script for you!


