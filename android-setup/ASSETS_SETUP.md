# App Icon and Splash Screen Setup

## Why This Matters

- **App Icon**: First impression users see in Play Store and on their device
- **Splash Screen**: Professional loading screen while app initializes
- **Play Store Requirement**: High-quality assets are required for approval

## Required Source Images

Create these source images in a design tool (Figma, Photoshop, etc.):

### 1. App Icon
- **Size**: 1024x1024 pixels
- **Format**: PNG (with transparency or solid background)
- **Content**: Your app logo centered
- **Background**: Transparent or solid color
- **File**: Save as `android-assets/icon.png`

**Design Tips**:
- Keep important content in center (icons get rounded on Android)
- Use high contrast colors
- Avoid text (it becomes unreadable at small sizes)
- Test at 48x48px to see how it looks small

### 2. Splash Screen
- **Size**: 2732x2732 pixels (or 2048x2048 minimum)
- **Format**: PNG
- **Content**: Your logo centered on background
- **Background**: Solid color (matches your app theme)
- **File**: Save as `android-assets/splash.png`

**Design Tips**:
- Logo should be centered
- Use your brand colors
- Keep it simple (splash shows for 1-2 seconds)
- Ensure logo is readable on background

## Folder Structure

Create this folder structure:

```
android-assets/
  ├── icon.png          (1024x1024)
  └── splash.png        (2732x2732)
```

## Generate Assets

### Using Capacitor Assets CLI

```bash
# Install if not already installed
npm install --save-dev @capacitor/assets

# Generate all icon and splash screen sizes
npx @capacitor/assets generate \
  --iconBackgroundColor '#ffffff' \
  --iconBackgroundColorDark '#000000' \
  --splashBackgroundColor '#ffffff' \
  --splashBackgroundColorDark '#000000'
```

**What This Does**:
- Reads `android-assets/icon.png` and `android-assets/splash.png`
- Generates all required sizes for Android
- Updates Android resource files automatically
- Creates adaptive icons (Android 8.0+)

### Parameters Explained

- `--iconBackgroundColor`: Background color for light mode icons
- `--iconBackgroundColorDark`: Background color for dark mode icons
- `--splashBackgroundColor`: Background color for splash screen (light mode)
- `--splashBackgroundColorDark`: Background color for splash screen (dark mode)

### Alternative: Manual Generation

If you prefer to create assets manually, you need these sizes:

#### Icons (mipmap folders)
- `mipmap-mdpi/ic_launcher.png`: 48x48
- `mipmap-hdpi/ic_launcher.png`: 72x72
- `mipmap-xhdpi/ic_launcher.png`: 96x96
- `mipmap-xxhdpi/ic_launcher.png`: 144x144
- `mipmap-xxxhdpi/ic_launcher.png`: 192x192

#### Adaptive Icons (Android 8.0+)
- `mipmap-anydpi-v26/ic_launcher.xml`: Vector drawable
- Foreground and background layers

#### Splash Screens
- `drawable/splash.png`: Various sizes
- `drawable-land/splash.png`: Landscape versions

**Recommendation**: Use the CLI tool - it's much easier!

## Verify Assets

After generation:

1. Check `android/app/src/main/res/` folder
2. Verify mipmap folders exist with icons
3. Verify drawable folders exist with splash screens
4. Open Android Studio and preview assets

## Testing

1. Build and run app: `npm run android:run`
2. Check app icon appears correctly on device
3. Verify splash screen shows on launch
4. Test on different screen sizes if possible

## Play Store Assets

For Play Store submission, you also need:

### Feature Graphic
- **Size**: 1024x500 pixels
- **Format**: PNG or JPG
- **Content**: Promotional image for Play Store listing
- **Usage**: Shown at top of Play Store listing

### Screenshots
- **Phone**: At least 2 screenshots (recommended: 4-8)
- **Tablet** (optional): If your app supports tablets
- **Sizes**: 
  - Phone: 16:9 or 9:16 aspect ratio, min 320px, max 3840px
  - Tablet: 16:9 or 9:16 aspect ratio
- **Format**: PNG or JPG
- **Content**: Show your app's key features

### High-Res Icon
- **Size**: 512x512 pixels
- **Format**: PNG (32-bit with alpha channel)
- **Usage**: Play Store listing icon

## Tips

1. **Consistency**: Use same logo/colors across all assets
2. **Testing**: Test icons on actual devices (they look different than in design tools)
3. **Adaptive Icons**: Android 8.0+ uses adaptive icons - ensure your design works when cropped to circle/square
4. **Splash Duration**: Splash shows for ~2 seconds - don't make it too complex
5. **Dark Mode**: Consider dark mode versions of assets

## Troubleshooting

### "Icon not found" error
- Ensure `android-assets/icon.png` exists
- Check file is exactly 1024x1024px
- Verify file is valid PNG

### "Splash not showing"
- Check `capacitor.config.js` has SplashScreen plugin configured
- Verify splash assets were generated
- Check AndroidManifest.xml references splash

### Icons look blurry
- Ensure source image is high resolution (1024x1024)
- Check all mipmap sizes were generated
- Verify you're testing on appropriate device density

## Next Steps

After setting up assets:
1. Test on device
2. Adjust colors/sizes if needed
3. Regenerate if changes made
4. Include in Play Store submission


