# Step-by-Step Implementation Guide

Follow these steps in order. Each step builds on the previous one.

## Step 1: Update package.json

**Why**: Add all required Capacitor dependencies and build scripts.

**Action**: The `package.json` has been updated with:
- All Capacitor plugins
- Build scripts for Android
- Development dependencies

**Verify**: Run `npm install` to install all packages.

---

## Step 2: Configure Capacitor

**Why**: Capacitor needs to know your app configuration.

**Files**:
- `capacitor.config.js` (root) - Main config

**Key Settings Explained**:
```javascript
appId: 'com.flipdrag.app'  // Unique identifier (change if needed)
appName: 'FlipDrag'        // Display name
webDir: 'dist'             // Where Vite builds your app
```

**Action**: Review and adjust `appId` if needed (must be unique).

---

## Step 3: Install Dependencies

**Why**: Install all required packages.

**Command**:
```bash
npm install
```

**What Gets Installed**:
- Capacitor core and CLI
- Android platform
- All native plugins (camera, filesystem, etc.)

---

## Step 4: Build Your Web App

**Why**: Capacitor wraps your built web app, not source code.

**Command**:
```bash
npm run build
```

**Verify**: Check that `dist/` folder exists and contains:
- `index.html`
- `assets/` folder with JS and CSS

---

## Step 5: Add Android Platform

**Why**: Creates the native Android project structure.

**Command**:
```bash
npx cap add android
```

**What Happens**:
- Creates `android/` folder
- Sets up Gradle build system
- Creates Android project structure

**Verify**: Check that `android/` folder exists.

---

## Step 6: Sync Assets

**Why**: Copies your built web app into the Android project.

**Command**:
```bash
npx cap sync
```

**What Happens**:
- Copies `dist/` to `android/app/src/main/assets/public/`
- Updates native dependencies
- Regenerates plugin code

**Important**: Run this after every `npm run build`!

---

## Step 7: Add Mobile-Specific Code

**Why**: Your app needs mobile features that don't exist in web.

**Files to Integrate**:
1. Update `src/main.jsx` to initialize Capacitor
2. Add back button handling
3. Add file download utilities
4. Add mobile file upload component

**Action**: The code files have been created. You need to integrate them (see integration guide).

---

## Step 8: Configure Android Permissions

**Why**: Android requires explicit permission declarations.

**File**: `android/app/src/main/AndroidManifest.xml`

**Permissions Added**:
- INTERNET (for API calls)
- READ_EXTERNAL_STORAGE (for file access)
- WRITE_EXTERNAL_STORAGE (for downloads)
- CAMERA (for camera access)
- READ_MEDIA_IMAGES (Android 13+)

**Action**: Review AndroidManifest.xml after `npx cap add android`.

---

## Step 9: Setup App Icons and Splash

**Why**: Professional app needs proper branding.

**Prerequisites**:
- Create `android-assets/` folder
- Add `icon.png` (1024x1024px)
- Add `splash.png` (2732x2732px)

**Command**:
```bash
npx @capacitor/assets generate \
  --iconBackgroundColor '#ffffff' \
  --iconBackgroundColorDark '#000000' \
  --splashBackgroundColor '#ffffff' \
  --splashBackgroundColorDark '#000000'
```

**What Happens**:
- Generates all icon sizes
- Generates splash screens
- Updates Android resources

---

## Step 10: Test in Android Studio

**Why**: Verify everything works before building release.

**Command**:
```bash
npx cap open android
```

**In Android Studio**:
1. Wait for Gradle sync (first time takes 5-10 minutes)
2. Connect Android device or start emulator
3. Click "Run" button (green play icon)
4. Test all features:
   - File upload
   - Downloads
   - Camera
   - Navigation
   - Back button

---

## Step 11: Create Release Keystore

**Why**: Play Store requires signed apps.

**Command** (one-time):
```bash
keytool -genkey -v -keystore android/app/flipdrag-release.keystore \
  -alias flipdrag -keyalg RSA -keysize 2048 -validity 10000
```

**Important**: 
- Save the keystore file securely (you can't recover it!)
- Remember the password and alias
- Store credentials in password manager

**Action**: Create `android/keystore.properties` (see example file).

---

## Step 12: Configure Release Signing

**Why**: Android needs signing configuration for release builds.

**File**: `android/app/build.gradle`

**Action**: The signing config has been added. Update `keystore.properties` with your credentials.

---

## Step 13: Build Release AAB

**Why**: Play Store requires AAB format (not APK).

**In Android Studio**:
1. Build → Generate Signed Bundle / APK
2. Select "Android App Bundle"
3. Select release keystore
4. Choose release variant
5. Build

**Output**: `android/app/build/outputs/bundle/release/app-release.aab`

**Or via Command Line**:
```bash
cd android
./gradlew bundleRelease
```

---

## Step 14: Test Release Build

**Why**: Verify release build works before submission.

**Install AAB on Device**:
```bash
# Convert AAB to APK for testing (optional)
bundletool build-apks --bundle=app-release.aab --output=app.apks

# Or install via Android Studio
```

**Test**:
- All features work
- No crashes
- Performance is acceptable
- UI looks correct

---

## Step 15: Prepare Play Store Assets

**Why**: Play Store needs screenshots, descriptions, etc.

**Required**:
- App icon (512x512px)
- Feature graphic (1024x500px)
- Screenshots (phone and tablet)
- App description
- Privacy policy URL
- Content rating

**See**: `PLAY_STORE_CHECKLIST.md` for complete list.

---

## Step 16: Submit to Play Store

**Why**: Make your app available to users.

**Steps**:
1. Create Google Play Console account ($25 one-time fee)
2. Create new app
3. Fill in store listing
4. Upload AAB
5. Complete content rating
6. Submit for review

**Timeline**: Usually 1-3 days for review.

---

## Integration Checklist

After setup, integrate mobile code:

- [ ] Update `src/main.jsx` with Capacitor initialization
- [ ] Add back button handling to router
- [ ] Replace file download functions with native versions
- [ ] Update file upload to use camera/document picker
- [ ] Add pull-to-refresh where needed
- [ ] Test external links open in browser
- [ ] Test all features on real device

See individual code files for integration details.


