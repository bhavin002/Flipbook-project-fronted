# Install Android SDK to Build APK

To build the Android APK, you need the Android SDK. Here are your options:

## Option 1: Install Android SDK Command-Line Tools (Recommended - Smaller)

This installs just the SDK tools without Android Studio:

### Using Homebrew

```bash
# Install Android SDK command-line tools
brew install --cask android-commandlinetools

# This installs to: ~/Library/Android/sdk
```

### Manual Installation

1. Download: https://developer.android.com/studio#command-tools
2. Extract to: `~/Library/Android/sdk/cmdline-tools/latest/`
3. Accept licenses:
   ```bash
   ~/Library/Android/sdk/cmdline-tools/latest/bin/sdkmanager --licenses
   ```
4. Install required packages:
   ```bash
   ~/Library/Android/sdk/cmdline-tools/latest/bin/sdkmanager "platform-tools" "platforms;android-33" "build-tools;34.0.0"
   ```

### Then Set SDK Location

Create `android/local.properties`:

```properties
sdk.dir=/Users/techuplabs/Library/Android/sdk
```

Or set environment variable:

```bash
export ANDROID_HOME=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

## Option 2: Install Android Studio (Easier - Includes Everything)

1. Download: https://developer.android.com/studio
2. Install Android Studio
3. Open it once to let it download SDK components
4. SDK will be at: `~/Library/Android/sdk`

Then create `android/local.properties`:

```properties
sdk.dir=/Users/techuplabs/Library/Android/sdk
```

## Option 3: Quick Setup Script

After installing SDK (Option 1 or 2), run:

```bash
# Create local.properties
echo "sdk.dir=$HOME/Library/Android/sdk" > android/local.properties

# Then build again
cd android
export JAVA_HOME=/Users/techuplabs/Documents/jdk/jdk-21.0.9.jdk/Contents/Home
./gradlew assembleDebug
```

## What You Need

Minimum required:
- Android SDK Platform (API 33 recommended)
- Android SDK Build-Tools (34.0.0 or latest)
- Android SDK Platform-Tools

## After Installing SDK

Once SDK is installed, you can build the APK:

```bash
cd /Users/techuplabs/Desktop/Temp/shadcn-flipbook

# Set Java
export JAVA_HOME=/Users/techuplabs/Documents/jdk/jdk-21.0.9.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH

# Create local.properties (if not auto-created)
echo "sdk.dir=$HOME/Library/Android/sdk" > android/local.properties

# Build APK
cd android
./gradlew assembleDebug
```

## Current Status

✅ Java JDK: Installed and working  
✅ Web App: Built successfully  
✅ Android Project: Created and synced  
❌ Android SDK: **Not installed** (needed to build APK)

## Quick Install (Homebrew)

If you have Homebrew:

```bash
# Install Android SDK command-line tools
brew install --cask android-commandlinetools

# Accept licenses
yes | ~/Library/Android/sdk/cmdline-tools/latest/bin/sdkmanager --licenses

# Install required components
~/Library/Android/sdk/cmdline-tools/latest/bin/sdkmanager "platform-tools" "platforms;android-33" "build-tools;34.0.0"

# Create local.properties
echo "sdk.dir=$HOME/Library/Android/sdk" > /Users/techuplabs/Desktop/Temp/shadcn-flipbook/android/local.properties

# Then build
cd /Users/techuplabs/Desktop/Temp/shadcn-flipbook/android
export JAVA_HOME=/Users/techuplabs/Documents/jdk/jdk-21.0.9.jdk/Contents/Home
./gradlew assembleDebug
```

---

**Next Step**: Install Android SDK using one of the options above, then we can build the APK!


