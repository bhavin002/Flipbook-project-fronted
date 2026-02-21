# Android Manifest Configuration

After running `npx cap add android`, you'll need to update the AndroidManifest.xml file.

## Location

`android/app/src/main/AndroidManifest.xml`

## Required Permissions

Add these permissions inside the `<manifest>` tag:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    
    <!-- Internet access (required for API calls) -->
    <uses-permission android:name="android.permission.INTERNET" />
    
    <!-- Network state (for checking connectivity) -->
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    
    <!-- File storage (for downloads and uploads) -->
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" 
        android:maxSdkVersion="32" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" 
        android:maxSdkVersion="32" />
    
    <!-- Android 13+ media permissions -->
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
    <uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />
    
    <!-- Camera (for photo capture) -->
    <uses-permission android:name="android.permission.CAMERA" />
    
    <!-- Vibration (for haptic feedback) -->
    <uses-permission android:name="android.permission.VIBRATE" />
    
    <!-- Camera feature declaration -->
    <uses-feature android:name="android.hardware.camera" android:required="false" />
    <uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />
    
    <application
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:allowBackup="true"
        android:usesCleartextTraffic="false"
        android:hardwareAccelerated="true"
        android:supportsRtl="true">
        
        <!-- Main activity -->
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTask"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode"
            android:windowSoftInputMode="adjustResize">
            
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
            
            <!-- Deep links (optional) -->
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="https" android:host="flipdrag.com" />
                <data android:scheme="flipdrag" />
            </intent-filter>
        </activity>
        
    </application>
</manifest>
```

## Why Each Permission

- **INTERNET**: Required for API calls to your backend
- **READ/WRITE_EXTERNAL_STORAGE**: For saving downloaded files (Android 12 and below)
- **READ_MEDIA_IMAGES/VIDEO**: For accessing photos/videos (Android 13+)
- **CAMERA**: For taking photos with camera
- **VIBRATE**: For haptic feedback
- **ACCESS_NETWORK_STATE**: For checking internet connectivity

## File Provider (for file sharing)

Add this inside `<application>` tag for Android 7.0+ file sharing:

```xml
<provider
    android:name="androidx.core.content.FileProvider"
    android:authorities="${applicationId}.fileprovider"
    android:exported="false"
    android:grantUriPermissions="true">
    <meta-data
        android:name="android.support.FILE_PROVIDER_PATHS"
        android:resource="@xml/file_paths" />
</provider>
```

Create `android/app/src/main/res/xml/file_paths.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<paths xmlns:android="http://schemas.android.com/apk/res/android">
    <external-path name="external_files" path="." />
    <external-cache-path name="external_cache" path="." />
    <cache-path name="cache" path="." />
</paths>
```

## Network Security Config

Create `android/app/src/main/res/xml/network_security_config.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <!-- Allow HTTPS connections -->
    <base-config cleartextTraffic="false">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
    
    <!-- For development: allow HTTP on localhost -->
    <domain-config cleartextTraffic="true">
        <domain includeSubdomains="true">localhost</domain>
        <domain includeSubdomains="true">10.0.2.2</domain> <!-- Android emulator -->
    </domain-config>
</network-security-config>
```

Reference in AndroidManifest.xml:

```xml
<application
    ...
    android:networkSecurityConfig="@xml/network_security_config">
```

## Important Notes

1. **Permissions are requested at runtime** (Android 6.0+)
   - Capacitor plugins handle this automatically
   - User will see permission dialogs when needed

2. **maxSdkVersion** on storage permissions
   - Android 13+ uses different permissions
   - The maxSdkVersion prevents requesting old permissions on new Android

3. **android:required="false"** on camera feature
   - App works without camera (optional feature)
   - Prevents Play Store from requiring camera on all devices

4. **Cleartext traffic**
   - Set to `false` for production (HTTPS only)
   - Can enable for development if needed

## After Making Changes

1. Sync Capacitor: `npx cap sync`
2. Rebuild in Android Studio
3. Test on device


