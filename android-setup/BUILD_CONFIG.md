# Android Build Configuration

## build.gradle Configuration

After `npx cap add android`, update `android/app/build.gradle`:

### 1. Update SDK Versions

```gradle
android {
    compileSdkVersion 34
    
    defaultConfig {
        applicationId "com.flipdrag.app"
        minSdkVersion 22  // Android 5.0+
        targetSdkVersion 34  // Android 14
        versionCode 1
        versionName "1.0.0"
    }
}
```

### 2. Add Signing Configuration

Create `android/keystore.properties` (DO NOT commit to git):

```properties
storeFile=../flipdrag-release.keystore
storePassword=your_keystore_password
keyAlias=flipdrag
keyPassword=your_key_password
```

Add to `build.gradle`:

```gradle
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    signingConfigs {
        release {
            if (keystorePropertiesFile.exists()) {
                storeFile file(keystoreProperties['storeFile'])
                storePassword keystoreProperties['storePassword']
                keyAlias keystoreProperties['keyAlias']
                keyPassword keystoreProperties['keyPassword']
            }
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 3. Add ProGuard Rules

Create/update `android/app/proguard-rules.pro`:

```proguard
# Keep Capacitor classes
-keep class com.capacitorjs.** { *; }
-keep class com.getcapacitor.** { *; }

# Keep React Native WebView
-keep class com.reactnativecommunity.webview.** { *; }

# Keep your app's JavaScript interface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

# Keep JavaScript bridge
-keep class org.apache.cordova.** { *; }
-dontwarn org.apache.cordova.**
```

### 4. Enable Multi-Dex (if needed)

If you get "method count" errors:

```gradle
android {
    defaultConfig {
        multiDexEnabled true
    }
}

dependencies {
    implementation 'androidx.multidex:multidex:2.0.1'
}
```

## Creating Release Keystore

### One-time Setup

```bash
keytool -genkey -v -keystore android/app/flipdrag-release.keystore \
  -alias flipdrag \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

**Important**: 
- Save the keystore file securely
- Remember the password
- Store credentials in password manager
- **You cannot recover a lost keystore!**

### Add to .gitignore

```
android/app/*.keystore
android/keystore.properties
android/app/build/
android/.gradle/
```

## Building Release AAB

### In Android Studio

1. Build → Generate Signed Bundle / APK
2. Select "Android App Bundle"
3. Choose release keystore
4. Select release variant
5. Build

### Via Command Line

```bash
cd android
./gradlew bundleRelease
```

Output: `android/app/build/outputs/bundle/release/app-release.aab`

## Building Release APK (for testing)

```bash
cd android
./gradlew assembleRelease
```

Output: `android/app/build/outputs/apk/release/app-release.apk`

## Version Management

### Update Version Code and Name

In `android/app/build.gradle`:

```gradle
defaultConfig {
    versionCode 2  // Increment for each release
    versionName "1.0.1"  // User-visible version
}
```

Also update in:
- `package.json`: `"version": "1.0.1"`
- `capacitor.config.js`: (if you add version there)

## Build Variants

### Debug Build
- Unsigned
- Includes debug symbols
- Not optimized
- For testing only

### Release Build
- Signed with your keystore
- Optimized and minified
- ProGuard enabled
- For Play Store

## Testing Release Build

Before submitting to Play Store:

1. Build release AAB
2. Install on device (convert AAB to APK or use internal testing)
3. Test all features
4. Verify performance
5. Check for crashes

## Troubleshooting

### "SDK location not found"
Create `android/local.properties`:
```
sdk.dir=/Users/yourusername/Library/Android/sdk
```

### "Gradle sync failed"
- Update Android Studio
- Update Gradle: `cd android && ./gradlew wrapper --gradle-version 8.0`

### "Build failed: OutOfMemoryError"
Increase memory in `android/gradle.properties`:
```
org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=512m
```

### "Signing config not found"
- Verify `keystore.properties` exists
- Check file paths are correct
- Ensure keystore file exists


