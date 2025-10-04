# Dynamic Font Management System

A comprehensive font management system that handles dynamic font loading by ID, similar to Flipsnack's implementation. This system supports Google Fonts, system fonts, and custom fonts with dynamic injection via script/link tags.

## 🎯 Key Features

### ✅ **ID-Based Font Management**
- Each font has a unique ID for backend integration
- Fonts are referenced by ID rather than name
- Easy integration with backend APIs

### ✅ **Dynamic Font Loading**
- On-demand font loading from Google Fonts API
- Automatic script/link tag injection
- Loading status tracking and error handling

### ✅ **Font Categories & Filtering**
- Categorized fonts (Sans Serif, Serif, Display, Script, Monospace)
- Search by name, family, or tags
- Real-time filtering and search

### ✅ **Font Preview System**
- Font names displayed in their actual typeface
- Preview images for visual font selection
- Sample text preview with selected font

### ✅ **Performance Optimized**
- Lazy loading of fonts
- Preloading of common fonts
- Caching and status tracking

## 📁 File Structure

```
src/
├── data/
│   └── sampleFonts.js          # Sample font data structure
├── utils/
│   └── dynamicFontManager.js   # Font management utilities
├── components/
│   ├── EditorLayoutComponents/
│   │   └── widgetSidebar/
│   │       └── Text.jsx        # Updated Text component
│   └── DynamicFontDemo.jsx     # Demo component
└── DYNAMIC_FONT_SYSTEM_README.md
```

## 🚀 Quick Start

### 1. Import the Font Manager

```javascript
import dynamicFontManager from '@/utils/dynamicFontManager';
```

### 2. Load Fonts by ID

```javascript
// Load a single font
const isLoaded = await dynamicFontManager.loadFontById('fbf553490-1230-4c9c-970c-dc73de115be3');

// Load multiple fonts
const results = await dynamicFontManager.loadFontsByIds([
    'fbf553490-1230-4c9c-970c-dc73de115be3',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
]);
```

### 3. Use Fonts in Components

```javascript
// Get font family for CSS
const fontFamily = dynamicFontManager.getFontFamily('fbf553490-1230-4c9c-970c-dc73de115be3');

// Apply to element
<div style={{ fontFamily: `"${fontFamily}", Arial, sans-serif` }}>
    Your text here
</div>
```

## 📊 Font Data Structure

### Sample Font Object

```javascript
{
    id: "fbf553490-1230-4c9c-970c-dc73de115be3",
    name: "Abril Fatface",
    family: "Abril Fatface",
    type: "google",                    // 'google', 'system', 'custom'
    weights: [400],
    styles: ["normal"],
    url: "https://fonts.googleapis.com/css2?family=Abril+Fatface:wght@400&display=swap",
    preview: "https://cdn.flipsnack.com/library/fonts/fe242dbd3-df03-4afe-8848-fea7ab9c81c3_lg_m",
    category: "display",
    tags: ["decorative", "bold", "headline"]
}
```

### Font Types

- **System Fonts**: Always available, no loading required
- **Google Fonts**: Loaded from Google Fonts API
- **Custom Fonts**: User-uploaded fonts (future feature)

## 🔧 API Reference

### Font Manager Methods

| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| `getAllFonts()` | Get all available fonts | - | `Array<Font>` |
| `getFontById(id)` | Get font by ID | `id: string` | `Font \| null` |
| `loadFontById(id)` | Load font by ID | `id: string` | `Promise<boolean>` |
| `loadFontsByIds(ids)` | Load multiple fonts | `ids: string[]` | `Promise<Object>` |
| `isFontLoaded(id)` | Check if font is loaded | `id: string` | `boolean` |
| `getFontFamily(id)` | Get font family name | `id: string` | `string` |
| `searchFonts(query)` | Search fonts | `query: string` | `Array<Font>` |
| `getFontsByCategory(category)` | Get fonts by category | `category: string` | `Array<Font>` |

### Text Component Integration

The Text component has been updated to use the dynamic font system:

```javascript
// Font selection handler
const handleFontSelect = async (fontId) => {
    const isLoaded = await dynamicFontManager.loadFontById(fontId);
    if (isLoaded) {
        updateItem('fontId', fontId);
        updateItem('fontFamily', font.family);
    }
};
```

## 🎨 UI Components

### Font Picker Interface

The updated Text component includes:

- **Search Bar**: Find fonts by name or tags
- **Category Tabs**: Filter by font category
- **Font Grid**: Visual font selection with previews
- **Loading Status**: Real-time loading indicators
- **Font Info**: Selected font details

### Font Preview

```javascript
// Font name in actual typeface
<div style={{ fontFamily: font.family }}>
    {font.name}
</div>

// Sample text preview
<div style={{ fontFamily: `"${font.family}", Arial, sans-serif` }}>
    {sampleText}
</div>
```

## 🔄 Font Loading Process

### 1. Font Selection
```javascript
// User selects font by ID
const fontId = 'fbf553490-1230-4c9c-970c-dc73de115be3';
```

### 2. Font Loading
```javascript
// Check if already loaded
if (!dynamicFontManager.isFontLoaded(fontId)) {
    // Load font from Google Fonts API
    await dynamicFontManager.loadFontById(fontId);
}
```

### 3. Script Injection
```javascript
// Font is injected as <link> tag
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Abril+Fatface:wght@400&display=swap">
```

### 4. Font Application
```javascript
// Apply font to text element
<div style={{ fontFamily: `"Abril Fatface", Arial, sans-serif` }}>
    Your text
</div>
```

## 📈 Performance Features

### Lazy Loading
- Fonts are loaded only when needed
- Reduces initial page load time
- Improves user experience

### Preloading
```javascript
// Preload common fonts
const commonFontIds = ['system-arial', 'system-helvetica'];
await dynamicFontManager.preloadFonts(commonFontIds);
```

### Caching
- Loaded fonts are cached
- Prevents duplicate loading
- Tracks loading status

### Status Tracking
```javascript
// Check loading status
const status = dynamicFontManager.getLoadingStatus(['font1', 'font2']);
console.log(status.loaded);    // ['font1']
console.log(status.loading);   // ['font2']
console.log(status.notLoaded); // []
```

## 🎯 Backend Integration

### Font API Response

Your backend should return fonts in this format:

```javascript
{
    "fonts": [
        {
            "id": "fbf553490-1230-4c9c-970c-dc73de115be3",
            "name": "Abril Fatface",
            "family": "Abril Fatface",
            "type": "google",
            "url": "https://fonts.googleapis.com/css2?family=Abril+Fatface:wght@400&display=swap",
            "preview": "https://your-cdn.com/fonts/abril-fatface-preview.png",
            "category": "display",
            "tags": ["decorative", "bold", "headline"]
        }
    ]
}
```

### API Integration

```javascript
// Fetch fonts from backend
const fetchFonts = async () => {
    const response = await fetch('/api/fonts');
    const data = await response.json();
    
    // Update font manager with backend data
    dynamicFontManager.updateFonts(data.fonts);
};
```

## 🔍 Search & Filtering

### Search by Name
```javascript
const results = dynamicFontManager.searchFonts('roboto');
// Returns fonts with 'roboto' in name, family, or tags
```

### Filter by Category
```javascript
const sansSerifFonts = dynamicFontManager.getFontsByCategory('sans-serif');
```

### Custom Filtering
```javascript
const modernFonts = fonts.filter(font => 
    font.tags.includes('modern') && 
    font.type === 'google'
);
```

## 🎨 Styling & Theming

### Font Preview Styling
```css
.font-preview {
    font-family: var(--selected-font), Arial, sans-serif;
    font-size: 1.2rem;
    line-height: 1.4;
}
```

### Loading States
```css
.font-loading {
    opacity: 0.6;
    pointer-events: none;
}

.font-loaded {
    opacity: 1;
    transition: opacity 0.3s ease;
}
```

## 🐛 Error Handling

### Font Loading Errors
```javascript
try {
    const isLoaded = await dynamicFontManager.loadFontById(fontId);
    if (!isLoaded) {
        console.error('Failed to load font:', fontId);
        // Fallback to system font
        applyFallbackFont();
    }
} catch (error) {
    console.error('Font loading error:', error);
}
```

### Network Issues
```javascript
// Handle network failures
const loadFontWithRetry = async (fontId, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            return await dynamicFontManager.loadFontById(fontId);
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
};
```

## 📱 Responsive Design

### Mobile Font Picker
```javascript
// Responsive font grid
const getGridCols = () => {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
};
```

### Touch-Friendly Interface
```javascript
// Larger touch targets on mobile
const fontItemClass = `font-item ${isMobile ? 'touch-friendly' : ''}`;
```

## 🚀 Future Enhancements

### Planned Features
- [ ] Custom font upload support
- [ ] Font subsetting for smaller file sizes
- [ ] Font pairing suggestions
- [ ] Font usage analytics
- [ ] Offline font caching
- [ ] Font licensing validation

### Advanced Features
- [ ] Font variable support
- [ ] Font fallback chains
- [ ] Font loading performance metrics
- [ ] A/B testing for font choices
- [ ] Font accessibility features

## 📊 Usage Statistics

The font manager provides usage statistics:

```javascript
const stats = dynamicFontManager.getStats();
console.log({
    totalFonts: stats.totalFonts,      // 26
    loadedFonts: stats.loadedFonts,    // 5
    loadingFonts: stats.loadingFonts,  // 2
    injectedLinks: stats.injectedLinks, // 3
    systemFonts: stats.systemFonts,    // 6
    googleFonts: stats.googleFonts,    // 20
    customFonts: stats.customFonts     // 0
});
```

## 🔧 Configuration

### Font Manager Configuration
```javascript
// Configure font manager
dynamicFontManager.configure({
    preloadCommonFonts: true,
    maxConcurrentLoads: 5,
    retryAttempts: 3,
    timeout: 10000
});
```

### Font Loading Strategy
```javascript
// Aggressive preloading
const preloadStrategy = {
    immediate: ['system-arial', 'system-helvetica'],
    onHover: ['google-fonts'],
    onDemand: ['custom-fonts']
};
```

## 📝 Examples

### Basic Font Selection
```javascript
import dynamicFontManager from '@/utils/dynamicFontManager';

const FontSelector = () => {
    const [fonts, setFonts] = useState([]);
    const [selectedFont, setSelectedFont] = useState('system-arial');

    useEffect(() => {
        setFonts(dynamicFontManager.getAllFonts());
    }, []);

    const handleFontSelect = async (fontId) => {
        await dynamicFontManager.loadFontById(fontId);
        setSelectedFont(fontId);
    };

    return (
        <div>
            {fonts.map(font => (
                <button
                    key={font.id}
                    onClick={() => handleFontSelect(font.id)}
                    style={{ fontFamily: font.family }}
                >
                    {font.name}
                </button>
            ))}
        </div>
    );
};
```

### Font Preview Component
```javascript
const FontPreview = ({ fontId, text = "Sample Text" }) => {
    const [font, setFont] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const font = dynamicFontManager.getFontById(fontId);
        setFont(font);
        
        if (font) {
            dynamicFontManager.loadFontById(fontId).then(setIsLoaded);
        }
    }, [fontId]);

    if (!font) return null;

    return (
        <div
            style={{
                fontFamily: `"${font.family}", Arial, sans-serif`,
                opacity: isLoaded ? 1 : 0.6
            }}
        >
            {text}
        </div>
    );
};
```

## 🎯 Best Practices

### 1. Font Loading Strategy
- Preload essential fonts
- Load decorative fonts on demand
- Use system fonts as fallbacks

### 2. Performance Optimization
- Limit concurrent font loads
- Use font-display: swap
- Implement proper fallbacks

### 3. User Experience
- Show loading states
- Provide font previews
- Handle loading errors gracefully

### 4. Accessibility
- Ensure sufficient contrast
- Provide font size options
- Support screen readers

## 📄 License

This dynamic font management system is part of the shadcn-flipbook project and follows the same licensing terms.

---

**Note**: This system is designed to be similar to Flipsnack's font management, providing a robust, scalable solution for dynamic font loading in web applications.

