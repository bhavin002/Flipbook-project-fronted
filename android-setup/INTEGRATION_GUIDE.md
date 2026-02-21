# Integration Guide

This guide shows you how to integrate the mobile-specific code into your existing React app.

## 1. Update File Downloads

**Why**: Replace browser download behavior with native file saving.

### Find your download functions

Search for places where you download files, like in:
- `src/components/EditorLayoutComponents/Uploads/MediaImageDropDownCom.jsx`
- Any component that uses `window.URL.createObjectURL` or `<a download>`

### Replace with native download

**Before:**
```jsx
const handleDownload = async (mediaId, fileName) => {
  const response = await GeneratePresignedUrlApi(mediaId);
  const presignedUrl = response.data.presignedUrl;
  
  const fileResponse = await fetch(presignedUrl);
  const blob = await fileResponse.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
};
```

**After:**
```jsx
import { downloadFile } from '@/utils/fileDownload';

const handleDownload = async (mediaId, fileName) => {
  const response = await GeneratePresignedUrlApi(mediaId);
  const presignedUrl = response.data.presignedUrl;
  
  // Uses native file system on mobile, falls back to browser on web
  await downloadFile(presignedUrl, fileName);
};
```

---

## 2. Add Back Button Handling

**Why**: Android back button should navigate within app, not exit immediately.

### In your main App component or layout

**File**: `src/layout/AppLayout.jsx` or `src/App.jsx`

```jsx
import { useBackButton } from '@/hooks/useBackButton';
import { useNavigate, useLocation } from 'react-router-dom';

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Handle back button - navigates back in history
  useBackButton();
  
  // Or prevent back on specific pages:
  // usePreventBackButton(); // On login screen
  
  // Or exit app on home:
  // useExitOnBackButton(); // On home screen
  
  return (
    // Your layout
  );
}
```

---

## 3. Update External Links

**Why**: Play Store requires external links to open in system browser, not in-app.

### Find external link handlers

Search for:
- `window.open(url, '_blank')`
- `<a href="..." target="_blank">`
- Links to external websites

### Replace with native browser

**Before:**
```jsx
<a href="https://example.com" target="_blank">External Link</a>
// or
window.open('https://example.com', '_blank');
```

**After:**
```jsx
import { openInBrowser } from '@/utils/capacitor';

const handleExternalLink = (e) => {
  e.preventDefault();
  openInBrowser('https://example.com');
};

<a href="#" onClick={handleExternalLink}>External Link</a>
```

---

## 4. Update File Uploads

**Why**: Use native camera and document picker on mobile.

### Replace file input with MobileFileUpload

**Before:**
```jsx
<input
  type="file"
  accept="image/*"
  onChange={(e) => handleFileSelect(e.target.files[0])}
/>
```

**After:**
```jsx
import { MobileFileUpload } from '@/components/mobile/MobileFileUpload';

<MobileFileUpload
  onFileSelect={(file) => handleFileSelect(file)}
  accept="image/*,application/pdf"
  maxSize={10 * 1024 * 1024} // 10MB
>
  <Button>Upload File</Button>
</MobileFileUpload>
```

### Or integrate into existing upload components

In `src/pages/UploadFiles.jsx` or similar:

```jsx
import { MobileFileUpload } from '@/components/mobile/MobileFileUpload';

// Replace the file input trigger with:
<MobileFileUpload
  onFileSelect={handleFileSelect}
  accept="image/*,application/pdf"
  multiple={true}
>
  <button onClick={() => {}}>Select Files</button>
</MobileFileUpload>
```

---

## 5. Add Pull-to-Refresh

**Why**: Common mobile UX pattern for refreshing content.

### Wrap content with PullToRefresh

**Example in MyFlipbooks page:**

```jsx
import { PullToRefresh } from '@/hooks/usePullToRefresh';

function MyFlipbooks() {
  const { fetchFlipbooks } = useFlipbook();
  
  const handleRefresh = async () => {
    await fetchFlipbooks();
  };
  
  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div>
        {/* Your flipbooks list */}
      </div>
    </PullToRefresh>
  );
}
```

---

## 6. Update Router for Back Button

**Why**: Ensure React Router works with Android back button.

Your router setup should already work, but verify:

```jsx
// In main.jsx - already using createBrowserRouter ✓
import { createBrowserRouter } from "react-router-dom";

// The useBackButton hook automatically uses navigate(-1)
// which works with your existing router
```

---

## 7. Handle Deep Links (Optional)

**Why**: Allow opening specific content via URL.

```jsx
import { setupAppStateListener } from '@/utils/capacitor';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const cleanup = setupAppStateListener({
      onAppUrlOpen: (url) => {
        // Handle deep link
        // e.g., flipdrag://flipbook/123 -> navigate('/flipbook/123')
        const match = url.match(/flipbook\/(\d+)/);
        if (match) {
          navigate(`/details/${match[1]}`);
        }
      }
    });
    
    return cleanup;
  }, [navigate]);
}
```

---

## 8. Test on Device

After integration:

1. Build: `npm run build`
2. Sync: `npx cap sync`
3. Open: `npx cap open android`
4. Run on device/emulator
5. Test:
   - [ ] Back button navigation
   - [ ] File downloads save to device
   - [ ] Camera/photo picker works
   - [ ] External links open in browser
   - [ ] Pull-to-refresh works
   - [ ] App doesn't crash

---

## Common Issues

### "Module not found: @/utils/capacitor"
- Make sure the file exists at `src/utils/capacitor.js`
- Check your `jsconfig.json` or `tsconfig.json` has the `@` alias

### Back button doesn't work
- Make sure `useBackButton()` is called in a component that's always mounted
- Check that React Router is set up correctly

### Downloads don't work
- Check AndroidManifest.xml has storage permissions
- Verify Filesystem plugin is installed
- Test on real device (not emulator for file system)

### Camera doesn't work
- Check AndroidManifest.xml has camera permissions
- Verify Camera plugin is installed
- Test on real device

---

## Next Steps

After integration:
1. Test thoroughly on real Android device
2. Fix any issues
3. Build release AAB
4. Submit to Play Store

See `PLAY_STORE_CHECKLIST.md` for submission requirements.


