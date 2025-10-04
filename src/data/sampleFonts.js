/**
 * Sample Font Data Structure
 * This simulates the backend API response for fonts
 * Each font has an ID, name, family, and loading information
 */

// Font map from backend with IDs and names
const fontMap = {
    '145': 'Abel',
    '29047': 'Aboreto',
    '14': 'Abril Fatface',
    '29048': 'Agdasima',
    '29104': 'Alegreya Sans',
    '51': 'Alfa Slab One',
    '55': 'Alice',
    '32': 'Alike',
    '36': 'Allura',
    '28996': 'Almarai',
    '37': 'Amatic SC',
    '29049': 'Anek Telugu',
    '29050': 'Anek Telugu Condensed',
    '29051': 'Anek Telugu Expanded',
    '1': 'Annie Use Your Telescope',
    '33': 'Antic',
    '146': 'Anton',
    '28997': 'Anybody',
    '29101': 'Anybody Condensed',
    '29102': 'Anybody Expanded',
    '28998': 'Archivo',
    '147': 'Archivo Narrow',
    '34': 'Arimo',
    '29055': 'Arsenal',
    '29105': 'Atkinson Hyperlegible',
    '29056': 'Bagel Fat One',
    '148': 'Bebas Neue',
    '29057': 'Bellota Text',
    '29058': 'Bodoni Moda 18pt',
    '29106': 'Bowlby One',
    '28999': 'Bricolage Grotesque',
    '29059': 'Brygada 1918',
    '56': 'Cantarell',
    '24': 'Cantora One',
    '29107': 'Changa',
    '29108': 'Chivo',
    '150': 'Cinzel',
    '149': 'Cinzel Black',
    '151': 'Clicker Script',
    '29109': 'Climate Crisis',
    '152': 'Concert One',
    '153': 'Cormorant Garamond',
    '154': 'Cormorant Garamond Light',
    '155': 'Cormorant Garamond Medium',
    '156': 'Cormorant Garamond SemiBold',
    '38': 'Courgette',
    '25': 'Coustard',
    '54': 'Crimson Text',
    '157': 'Dancing Script',
    '29000': 'Darker Grotesque',
    '29015': 'Dela Gothic One',
    '29110': 'DM Sans',
    '58': 'Dosis',
    '3284': 'EB Garamond',
    '29111': 'Fahkwang',
    '41': 'Fauna One',
    '29001': 'Figtree',
    '29060': 'Fira Sans',
    '4': 'Fjalla One',
    '29062': 'Forum',
    '29065': 'Fraunces 9pt',
    '29063': 'Fraunces 9pt Soft',
    '29064': 'Fraunces 9pt SuperSoft',
    '158': 'Fredericka the Great',
    '42': 'Fugaz One',
    '29066': 'Gayathri',
    '45': 'Gentium Basic',
    '52': 'Gentium Book Basic',
    '26': 'Glegoo',
    '29067': 'Gloock',
    '29068': 'Gothic A1',
    '29112': 'Gotu',
    '159': 'Grand Hotel',
    '18': 'Gravitas One',
    '15': 'Great Vibes',
    '23': 'Hammersmith One',
    '29113': 'Hubot Sans',
    '29114': 'IBM Plex Sans',
    '160': 'Indie Flower',
    '29002': 'Instrument Sans',
    '29003': 'Instrument Sans Condensed',
    '29069': 'Instrument Serif',
    '29004': 'Inter 24pt',
    '29116': 'Inter Tight',
    '161': 'Italiana',
    '29115': 'Jomolhari',
    '22': 'Josefin Sans',
    '162': 'Josefin Slab',
    '163': 'Josefin Slab Light',
    '164': 'Josefin Slab SemiBold',
    '165': 'Josefin Slab Thin',
    '27': 'Julius Sans One',
    '3289': 'Just Me Again Down Here',
    '29070': 'Kaisei Decol',
    '29071': 'Kalnia',
    '29072': 'Karma',
    '39': 'Kaushan Script',
    '29073': 'Krub',
    '3282': 'Lato',
    '166': 'League Gothic',
    '167': 'Ledger',
    '40': 'Libre Baskerville',
    '29119': 'Libre Franklin',
    '17': 'Limelight',
    '3286': 'Lobster',
    '5': 'Lora',
    '29074': 'Major Mono Display',
    '29005': 'Manrope',
    '29075': 'Marcellus',
    '168': 'Marck Script',
    '28': 'Merriweather',
    '29122': 'Mona Sans',
    '43': 'Monda',
    '169': 'Monoton',
    '21': 'Montserrat',
    '3288': 'Mouse Memoirs',
    '20': 'Mrs Sheppards',
    '57': 'Mulish',
    '29076': 'Neonderthaw',
    '29077': 'Neuton',
    '29078': 'Newsreader 9pt',
    '170': 'Nexa Demo',
    '53': 'Nixie One',
    '29006': 'Noto Sans Mono',
    '29103': 'Noto Sans Mono ExtraCondensed',
    '29079': 'Noto Serif',
    '29080': 'Noto Serif Display',
    '29081': 'Noto Serif Display Condensed',
    '29123': 'Nunito',
    '46': 'Old Standard TT',
    '3287': 'Open Sans',
    '29082': 'Oranienbaum',
    '171': 'Ostrich Sans',
    '172': 'Ostrich Sans Dashed',
    '173': 'Ostrich Sans Inline',
    '174': 'Ostrich Sans Rounded',
    '3285': 'Oswald',
    '29124': 'Oxygen',
    '12': 'Pacifico',
    '175': 'Palanquin',
    '176': 'Palanquin Dark',
    '6': 'Parisienne',
    '29007': 'Pathway Extreme',
    '29083': 'Petit Formal Script',
    '177': 'Philosopher',
    '29084': 'Phudu',
    '29085': 'Pinyon Script',
    '29086': 'Platypi',
    '7': 'Playfair Display',
    '8': 'Playfair Display SC',
    '29087': 'Playwrite AU SA',
    '178': 'Poiret One',
    '179': 'Pompiere ',
    '29126': 'Poppins',
    '180': 'Prata',
    '3283': 'PT Sans',
    '11': 'PT Serif',
    '29008': 'Public Sans',
    '29': 'Quando',
    '47': 'Questrial',
    '13': 'Quicksand',
    '10': 'Raleway',
    '29128': 'Raleway Dots',
    '29009': 'Red Hat Text',
    '181': 'Reenie Beanie',
    '2': 'Roboto',
    '3': 'Roboto Slab',
    '19': 'Rozha One',
    '29010': 'Rubik',
    '16': 'Sacramento',
    '30': 'Sanchez',
    '29088': 'Sawarabi Mincho',
    '29127': 'Schibsted Grotesk',
    '50': 'Slabo 13px',
    '29090': 'Sofia Sans',
    '29091': 'Source Serif 4 18pt',
    '29011': 'Space Grotesk',
    '182': 'Stalemate',
    '29092': 'STIX Two Text',
    '29012': 'Syne',
    '29093': 'Thasadith',
    '29094': 'Trirong',
    '29095': 'Trocchi',
    '49': 'Ultra',
    '29014': 'Unbounded',
    '44': 'Unica One',
    '48': 'Vast Shadow',
    '31': 'Vidaloka',
    '35': 'Vollkorn',
    '29096': 'WindSong',
    '183': 'Wire One',
    '29097': 'Wix Madefor Display',
    '9': 'Yellowtail',
    '29098': 'Yeseva One',
    '29099': 'Young Serif',
    '29100': 'Zilla Slab'
};

// Helper function to determine font category
const getFontCategory = (fontName) => {
    const scriptFonts = ['Dancing Script', 'Great Vibes', 'Pacifico', 'Allura', 'Amatic SC', 'Clicker Script', 'Courgette', 'Fredericka the Great', 'Grand Hotel', 'Kaushan Script', 'Marck Script', 'Parisienne', 'Petit Formal Script', 'Pinyon Script', 'Sacramento', 'Yellowtail', 'WindSong', 'Annie Use Your Telescope', 'Clicker Script', 'Fredericka the Great', 'Grand Hotel', 'Indie Flower', 'Italiana', 'Just Me Again Down Here', 'Kaushan Script', 'Marck Script', 'Mouse Memoirs', 'Mrs Sheppards', 'Neonderthaw', 'Parisienne', 'Petit Formal Script', 'Pinyon Script', 'Pompiere', 'Reenie Beanie', 'Sacramento', 'Stalemate', 'Yellowtail', 'WindSong'];
    const displayFonts = ['Abril Fatface', 'Alfa Slab One', 'Anton', 'Bebas Neue', 'Bowlby One', 'Cinzel', 'Cinzel Black', 'Concert One', 'Fjalla One', 'Fugaz One', 'Gravitas One', 'Hammersmith One', 'League Gothic', 'Limelight', 'Lobster', 'Monoton', 'Mrs Sheppards', 'Ostrich Sans', 'Ostrich Sans Dashed', 'Ostrich Sans Inline', 'Ostrich Sans Rounded', 'Poiret One', 'Rozha One', 'Ultra', 'Unica One', 'Vast Shadow', 'Wire One', 'Alfa Slab One', 'Anton', 'Bowlby One', 'Cinzel', 'Cinzel Black', 'Concert One', 'Fjalla One', 'Fugaz One', 'Gravitas One', 'Hammersmith One', 'League Gothic', 'Limelight', 'Lobster', 'Monoton', 'Ostrich Sans', 'Ostrich Sans Dashed', 'Ostrich Sans Inline', 'Ostrich Sans Rounded', 'Poiret One', 'Rozha One', 'Ultra', 'Unica One', 'Vast Shadow', 'Wire One'];
    const serifFonts = ['Crimson Text', 'Cormorant Garamond', 'Cormorant Garamond Light', 'Cormorant Garamond Medium', 'Cormorant Garamond SemiBold', 'EB Garamond', 'Gentium Basic', 'Gentium Book Basic', 'Libre Baskerville', 'Lora', 'Merriweather', 'Old Standard TT', 'PT Serif', 'Playfair Display', 'Playfair Display SC', 'Vidaloka', 'Vollkorn', 'Young Serif', 'Bodoni Moda 18pt', 'Cormorant Garamond', 'Cormorant Garamond Light', 'Cormorant Garamond Medium', 'Cormorant Garamond SemiBold', 'EB Garamond', 'Fraunces 9pt', 'Fraunces 9pt Soft', 'Fraunces 9pt SuperSoft', 'Gentium Basic', 'Gentium Book Basic', 'Instrument Serif', 'Italiana', 'Libre Baskerville', 'Lora', 'Marcellus', 'Merriweather', 'Newsreader 9pt', 'Noto Serif', 'Noto Serif Display', 'Noto Serif Display Condensed', 'Old Standard TT', 'PT Serif', 'Playfair Display', 'Playfair Display SC', 'Source Serif 4 18pt', 'STIX Two Text', 'Vidaloka', 'Vollkorn', 'Young Serif', 'Zilla Slab'];
    
    if (scriptFonts.some(font => fontName.includes(font))) return 'script';
    if (displayFonts.some(font => fontName.includes(font))) return 'display';
    if (serifFonts.some(font => fontName.includes(font))) return 'serif';
    return 'sans-serif';
};

// Helper function to get font tags
const getFontTags = (fontName, category) => {
    const tags = [];
    
    if (category === 'script') {
        tags.push('handwriting', 'elegant', 'decorative');
    } else if (category === 'display') {
        tags.push('bold', 'headline', 'decorative');
    } else if (category === 'serif') {
        tags.push('readable', 'traditional', 'classic');
    } else {
        tags.push('modern', 'clean', 'readable');
    }
    
    // Add specific tags based on font characteristics
    if (fontName.toLowerCase().includes('condensed')) tags.push('condensed');
    if (fontName.toLowerCase().includes('mono')) tags.push('monospace');
    if (fontName.toLowerCase().includes('rounded')) tags.push('rounded');
    if (fontName.toLowerCase().includes('slab')) tags.push('slab');
    if (fontName.toLowerCase().includes('thin')) tags.push('thin');
    if (fontName.toLowerCase().includes('light')) tags.push('light');
    if (fontName.toLowerCase().includes('black')) tags.push('black');
    if (fontName.toLowerCase().includes('bold')) tags.push('bold');
    
    return tags;
};

// Convert fontMap to SAMPLE_FONTS array and sort alphabetically
export const SAMPLE_FONTS = Object.entries(fontMap)
    .map(([id, name]) => {
        const category = getFontCategory(name);
        const tags = getFontTags(name, category);
        
        // Generate Google Fonts URL
        const fontFamily = name.replace(/\s+/g, '+');
        const url = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@300;400;500;600;700&display=swap`;
        
        return {
            id: id,
            name: name,
            family: name,
            type: 'google',
            weights: [300, 400, 500, 600, 700],
            styles: ['normal', 'italic'],
            url: url,
            preview: `https://cdn.flipsnack.com/library/fonts/${id}_preview.png`,
            category: category,
            tags: tags
        };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

// System fonts (always available)
export const SYSTEM_FONTS = [
    {
        id: "system-arial",
        name: "Arial",
        family: "Arial",
        type: "system",
        weights: [400, 700],
        styles: ["normal", "italic"],
        category: "sans-serif",
        tags: ["web-safe", "neutral", "readable"]
    },
    {
        id: "system-helvetica",
        name: "Helvetica",
        family: "Helvetica",
        type: "system",
        weights: [400, 700],
        styles: ["normal", "italic"],
        category: "sans-serif",
        tags: ["web-safe", "neutral", "readable"]
    },
    {
        id: "system-times",
        name: "Times New Roman",
        family: "Times New Roman",
        type: "system",
        weights: [400, 700],
        styles: ["normal", "italic"],
        category: "serif",
        tags: ["web-safe", "traditional", "readable"]
    },
    {
        id: "system-courier",
        name: "Courier New",
        family: "Courier New",
        type: "system",
        weights: [400, 700],
        styles: ["normal", "italic"],
        category: "monospace",
        tags: ["web-safe", "monospace", "code"]
    },
    {
        id: "system-verdana",
        name: "Verdana",
        family: "Verdana",
        type: "system",
        weights: [400, 700],
        styles: ["normal", "italic"],
        category: "sans-serif",
        tags: ["web-safe", "readable", "screen"]
    },
    {
        id: "system-georgia",
        name: "Georgia",
        family: "Georgia",
        type: "system",
        weights: [400, 700],
        styles: ["normal", "italic"],
        category: "serif",
        tags: ["web-safe", "readable", "traditional"]
    }
];

// Font categories for filtering
export const FONT_CATEGORIES = [
    { id: "all", name: "All Fonts", icon: "🔤" },
    { id: "sans-serif", name: "Sans Serif", icon: "📝" },
    { id: "serif", name: "Serif", icon: "📖" },
    { id: "display", name: "Display", icon: "🎨" },
    { id: "script", name: "Script", icon: "✍️" },
    { id: "monospace", name: "Monospace", icon: "💻" }
];

// Font tags for filtering
export const FONT_TAGS = [
    "modern", "readable", "elegant", "bold", "friendly", "clean", "versatile",
    "decorative", "headline", "traditional", "web-safe", "technical", "rounded",
    "geometric", "high-contrast", "neutral", "professional", "book", "condensed",
    "humanist", "handwriting", "casual", "classic", "thin", "monospace", "code",
    "light", "black", "slab", "script", "display", "serif", "sans-serif"
];

export default {
    SAMPLE_FONTS,
    SYSTEM_FONTS,
    FONT_CATEGORIES,
    FONT_TAGS
};