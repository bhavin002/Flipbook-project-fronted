import Accessibility from '@/components/CustomizeLayoutComponents/Accessibility';
import Appearance from '@/components/CustomizeLayoutComponents/Appearance';
import Branding from '@/components/CustomizeLayoutComponents/Branding';
import LeadForm from '@/components/CustomizeLayoutComponents/LeadForm';
import MenuControls from '@/components/CustomizeLayoutComponents/MenuControls';
import TableOfContentsComponent from '@/components/CustomizeLayoutComponents/TableOfContentsComponent';
import { FileCode, FileText, Image, CirclePlay, Pencil, SlidersHorizontal, ChartPie, Send, BookOpen, Share2, Home, Bot, Diamond, Settings, Users, Eye, PieChart, TableOfContents, Palette, AlignRight, PersonStanding, LayoutPanelLeft, SquareMousePointer, Type, Upload, Component } from 'lucide-react';

const defaultRoutes = {
    home: '/my-flipbooks',
    automation: '/automation',
    statistics: '/statistics',
    branding: '/branding/profile/settings',
    settings: '/settings/workspace'
};

const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/my-flipbooks' },
    { id: 'automation', icon: Bot, label: 'Automation', path: '/automation' },
    { id: 'statistics', icon: PieChart, label: 'Statistics', path: '/statistics' },
    { id: 'branding', icon: Diamond, label: 'Branding', path: '/branding/profile/settings' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings/workspace' },
];

const editorNavItems = [
    { id: 'templates', icon: LayoutPanelLeft, label: 'Templates' },
    { id: 'interactions', icon: SquareMousePointer, label: 'Interactions' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'uploads', icon: Upload, label: 'Uploads' },
    { id: 'elements', icon: Component, label: 'Elements' },
    { id: 'automation', icon: Bot, label: 'Automation' }
];

const bottomNavItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/my-flipbooks', hasDrawer: true },
    { id: 'automation', icon: Bot, label: 'Automation', path: '/automation', hasDrawer: false },
    { id: 'statistics', icon: PieChart, label: 'Statistics', path: '/statistics', hasDrawer: false },
    { id: 'branding', icon: Diamond, label: 'Branding', path: '/branding/profile/settings', hasDrawer: true },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings/workspace', hasDrawer: true }
];

const settingMenuItems = [
    {
        id: 'workspace',
        label: 'Workspace',
        path: '/settings/workspace',
        subItems: []
    },
    {
        id: 'general',
        label: 'General',
        path: '/settings/general',
        subItems: []
    },
    {
        id: 'billing',
        label: 'Billing',
        path: '/settings/billing',
        subItems: [
            { id: 'subscription', label: 'Subscription', path: '/settings/billing/subscription' },
            { id: 'invoice', label: 'Invoices', path: '/settings/billing/invoice' }
        ]
    },
    {
        id: 'teammates',
        label: 'Teammates',
        path: '/settings/teammates',
        subItems: []
    },
    {
        id: 'readers',
        label: 'Readers',
        path: '/settings/readers',
        subItems: []
    },
    {
        id: 'groups',
        label: 'Groups',
        path: '/settings/groups',
        subItems: []
    },
    {
        id: 'sso',
        label: 'Single Sign-On',
        path: '/settings/sso',
        subItems: []
    },
    {
        id: 'integrations',
        label: 'Integrations',
        path: '/settings/integrations',
        subItems: []
    },
    {
        id: 'access',
        label: 'Workspace Access',
        path: '/settings/access',
        subItems: []
    },
    {
        id: 'logs',
        label: 'Teammate Activity',
        path: '/settings/logs',
        subItems: []
    },
    {
        id: 'permission-settings',
        label: 'Permission Settings',
        path: '/settings/permission-settings',
        subItems: []
    },
    {
        id: 'email-provider',
        label: 'Email Providers',
        path: '/settings/email-provider',
        subItems: []
    }
];

const flipbooks = [
    { id: 1, name: "Flipbook 1", created: "March 05, 2025", status: "draft" },
    { id: 2, name: "Flipbook 2", created: "March 04, 2025", status: "published" },
    { id: 3, name: "Flipbook 3", created: "March 03, 2025", status: "unpublished" },
    { id: 4, name: "Flipbook 4", created: "March 02, 2025", status: "published" },
    { id: 5, name: "Flipbook 5", created: "March 01, 2025", status: "unpublished" },
    { id: 6, name: "Flipbook 6", created: "February 28, 2025", status: "published" },
]

const unpublishedButtons = [
    { icon: Pencil, title: "Edit", value: "edit", color: "text-amber-600", bg: "bg-amber-50", hover: "hover:bg-amber-100" },
    { icon: SlidersHorizontal, title: "Customize", value: "customize", color: "text-blue-600", bg: "bg-blue-50", hover: "hover:bg-blue-100" },
    { icon: Send, title: "Publish", value: "publish", color: "text-green-600", bg: "bg-green-50", hover: "hover:bg-green-100" },
];

const publishedButtons = [
    { icon: Eye, title: "View", value: "view", color: "text-blue-600", bg: "bg-blue-50", hover: "hover:bg-blue-100" },
    { icon: BookOpen, title: "Details", value: "details", color: "text-pink-600", bg: "bg-pink-50", hover: "hover:bg-pink-100" },
    { icon: Pencil, title: "Edit", value: "edit", color: "text-amber-600", bg: "bg-amber-50", hover: "hover:bg-amber-100" },
    { icon: SlidersHorizontal, title: "Customize", value: "customize", color: "text-blue-600", bg: "bg-blue-50", hover: "hover:bg-blue-100" },
    { icon: ChartPie, title: "Statistics", value: "stats", color: "text-amber-600", bg: "bg-amber-50", hover: "hover:bg-amber-100" },
    { icon: Share2, title: "Share", value: "share", color: "text-green-600", bg: "bg-green-50", hover: "hover:bg-green-100" },
];

const sidebarSections = [
    {
        id: 'flipbooks-team',
        icon: Users,
        label: 'Team',
        type: 'flipbooks',
        folders: [
            { id: 'flipbooks-folder-1', name: 'Folder 1' },
            { id: 'flipbooks-folder-2', name: 'Folder 2' },
            { id: 'flipbooks-folder-3', name: 'Folder 3' },
            { id: 'flipbooks-folder-4', name: 'Folder 4' },
        ]
    },
    {
        id: 'template-team',
        icon: Users,
        label: 'Team',
        type: 'template',
        folders: [
            { id: 'template-folder-1', name: 'Folder 1' },
            { id: 'template-folder-2', name: 'Folder 2' },
            { id: 'template-folder-3', name: 'Folder 3' },
            { id: 'template-folder-4', name: 'Folder 4' },
        ]
    }
]

const downloadOptions = [
    {
        id: 1,
        icon: FileCode,
        title: "Download HTML5",
        description: "Download the animated HTML5 flipbook on your computer for offline use self hosting.",
        learnMoreLink: "#",
        isPremium: true,
    },
    {
        id: 2,
        icon: FileText,
        title: "Download PDF for web",
        description: "Download your design as web PDF, if you need it for online sharing.",
        learnMoreLink: "#",
        isPremium: true,
    },
    {
        id: 3,
        icon: FileText,
        title: "Download PDF for print",
        description: "Download the print-ready PDF, if you need to print your design.",
        learnMoreLink: "#",
        isPremium: false,
    },
    {
        id: 4,
        icon: Image,
        title: "Download GIF",
        description: "Perfect for sharing a preview on email and social media. Always accompany it with the catalog link.",
        learnMoreLink: "#",
        isPremium: true,
    },
    {
        id: 5,
        icon: Image,
        title: "Download PNG",
        description: "Perfect for sharing a preview on email and social media. Always accompany it with the catalog link.",
        learnMoreLink: "#",
        isPremium: true,
    },
    {
        id: 6,
        icon: Image,
        title: "Download GPEG",
        description: "Perfect for sharing a preview on email and social media. Always accompany it with the catalog link.",
        learnMoreLink: "#",
        isPremium: false,
    },
    {
        id: 7,
        icon: CirclePlay,
        title: "Download MP4",
        description: "Get a 10-12 seconds teaser trailer of your catalog, perfect for social sharing.",
        learnMoreLink: "#",
        isPremium: true,
    },
];

const brandingMenuItems = [
    {
        id: 'brand-profile',
        label: 'Brand Profile',
        path: '/branding/profile',
        subItems: [
            { id: 'settings', label: 'Settings', path: '/branding/profile/settings' },
            { id: 'personalization', label: 'Personalization', path: '/branding/profile/personalization' }
        ]
    },
    {
        id: 'fonts',
        label: 'Fonts',
        path: '/branding/fonts',
        subItems: []
    },
    {
        id: 'colors',
        label: 'Colors',
        path: '/branding/colors',
        subItems: []
    },
    {
        id: 'logos',
        label: 'Brand logos',
        path: '/branding/logos',
        subItems: []
    },
    {
        id: 'text-styles',
        label: 'Typography',
        path: '/branding/text-styles',
        subItems: []
    }
];

const mainPlans = {
    monthly: [
        {
            id: "starter",
            title: "Starter Monthly",
            price: "$35",
            billedAs: "Billed Monthly",
            features: [
                "5 flipbooks",
                "Add links / detect links",
                "Share link, email, QR code, unlisted",
                "Download flipbook as PDF"
            ]
        },
        {
            id: "professional",
            title: "Professional Monthly",
            price: "$52",
            billedAs: "Billed Monthly",
            features: [
                "50 flipbooks",
                "YouTube & Vimeo videos, lead forms, charts & more",
                "Share multiple flipbooks in bookshelves",
                "Password protected sharing",
                "Embed (without watermark)",
                "Flipnova statistics & Google Analytics",
                "50 credits"
            ]
        },
        {
            id: "business",
            title: "Business Monthly",
            price: "$109",
            billedAs: "Billed Monthly",
            features: [
                "100 flipbooks",
                "Custom domain",
                "Add your logo in Flipnova dashboard & flipbooks",
                "Send fully branded emails",
                "Download as HTML5",
                "250 AI credits",
                "200 individual tracking links",
                "Export lead forms to CRM via Zapier",
                "Extract flipbook text for accessibility"
            ],
            showContactSales: true
        }
    ],
    yearly: [
        {
            id: "starter",
            title: "Starter Yearly",
            price: "$16",
            billedAs: "Billed Yearly 192",
            features: [
                "5 flipbooks",
                "Add links / detect links",
                "Share link, email, QR code, unlisted",
                "Download flipbook as PDF"
            ]
        },
        {
            id: "professional",
            title: "Professional Yearly",
            price: "$38",
            billedAs: "Billed Yearly 456",
            features: [
                "50 flipbooks",
                "YouTube & Vimeo videos, lead forms, charts & more",
                "Share multiple flipbooks in bookshelves",
                "Password protected sharing",
                "Embed (without watermark)",
                "Flipnova statistics & Google Analytics",
                "50 credits"
            ]
        },
        {
            id: "business",
            title: "Business Yearly",
            price: "$85",
            billedAs: "Billed Yearly 1020",
            features: [
                "100 flipbooks",
                "Custom domain",
                "Add your logo in Flipnova dashboard & flipbooks",
                "Send fully branded emails",
                "Download as HTML5",
                "250 AI credits",
                "200 individual tracking links",
                "Export lead forms to CRM via Zapier",
                "Extract flipbook text for accessibility"
            ],
            showContactSales: true
        }
    ]
};

const enterprisePlans = {
    monthly: {
        title: "Enterprise Monthly",
        features: [
            "1000+ flipbooks",
            "Collaboration",
            "Centralized management for multiple teams",
            "Assigning roles and permissions",
            "Teammates activity logs",
            "SSO sharing",
            "Share flipbooks with readers",
            "Import feeds (CSV, XLSX) or Sync with Google Spreadsheets",
            "Automate interactions",
            "Flipnova API access",
            "Insert custom code in flipbooks",
            "Zapier (coming soon)",
            "Custom credits"
        ]
    },
    yearly: {
        title: "Enterprise Yearly",
        features: [
            "1000+ flipbooks",
            "Collaboration",
            "Centralized management for multiple teams",
            "Assigning roles and permissions",
            "Teammates activity logs",
            "SSO sharing",
            "Share flipbooks with readers",
            "Import feeds (CSV, XLSX) or Sync with Google Spreadsheets",
            "Automate interactions",
            "Flipnova API access",
            "Insert custom code in flipbooks",
            "Zapier (coming soon)",
            "Custom credits"
        ]
    }
};

const teammates = [
    { id: 1, email: "bhavin@flipnova.com", role: "Admin", ssoOnly: false, status: "Pending" },
    { id: 2, email: "utsavp@flipnova.com", role: "Admin", ssoOnly: false, status: "Pending" },
    { id: 3, email: "john.doe@example.com", role: "Editor", ssoOnly: true, status: "Active" },
    { id: 4, email: "jane.smith@example.com", role: "Admin", ssoOnly: false, status: "Inactive" },
    { id: 5, email: "alice.johnson@example.com", role: "Editor", ssoOnly: false, status: "Active" },
    { id: 6, email: "michael.brown@example.com", role: "Agent", ssoOnly: true, status: "Pending" },
    { id: 7, email: "emma.wilson@example.com", role: "Admin", ssoOnly: false, status: "Active" },
    { id: 8, email: "oliver.martin@example.com", role: "Editor", ssoOnly: false, status: "Inactive" },
    { id: 9, email: "sophia.thomas@example.com", role: "Admin", ssoOnly: true, status: "Active" },
    { id: 10, email: "liam.moore@example.com", role: "Agent", ssoOnly: false, status: "Pending" },
    { id: 11, email: "noah.clark@example.com", role: "Editor", ssoOnly: false, status: "Inactive" },
    { id: 12, email: "ava.rodriguez@example.com", role: "Admin", ssoOnly: true, status: "Active" },
    { id: 13, email: "william.lewis@example.com", role: "Agent", ssoOnly: false, status: "Pending" },
    { id: 14, email: "mia.walker@example.com", role: "Editor", ssoOnly: false, status: "Active" },
    { id: 15, email: "james.hall@example.com", role: "Admin", ssoOnly: true, status: "Inactive" },
    { id: 16, email: "charlotte.allen@example.com", role: "Agent", ssoOnly: false, status: "Active" },
    { id: 17, email: "benjamin.young@example.com", role: "Editor", ssoOnly: false, status: "Pending" },
    { id: 18, email: "amelia.king@example.com", role: "Admin", ssoOnly: true, status: "Active" },
    { id: 19, email: "lucas.scott@example.com", role: "Agent", ssoOnly: false, status: "Inactive" },
    { id: 20, email: "harper.green@example.com", role: "Editor", ssoOnly: false, status: "Active" },
    { id: 21, email: "elijah.adams@example.com", role: "Admin", ssoOnly: true, status: "Pending" },
    { id: 22, email: "evelyn.baker@example.com", role: "Agent", ssoOnly: false, status: "Active" },
    { id: 23, email: "matthew.carter@example.com", role: "Editor", ssoOnly: false, status: "Inactive" },
    { id: 24, email: "scarlett.phillips@example.com", role: "Admin", ssoOnly: true, status: "Active" },
    { id: 25, email: "daniel.evans@example.com", role: "Agent", ssoOnly: false, status: "Pending" },
];

const readers = [
    { id: 1, email: "bhavin@flipnova.com", ssoOnly: false, status: "Pending" },
    { id: 2, email: "utsavp@flipnova.com", ssoOnly: false, status: "Pending" },
    { id: 3, email: "john.doe@example.com", ssoOnly: true, status: "Active" },
    { id: 4, email: "jane.smith@example.com", ssoOnly: false, status: "Inactive" },
    { id: 5, email: "alice.johnson@example.com", ssoOnly: false, status: "Active" },
    { id: 6, email: "michael.brown@example.com", ssoOnly: true, status: "Pending" },
    { id: 7, email: "emma.wilson@example.com", ssoOnly: false, status: "Active" },
    { id: 8, email: "oliver.martin@example.com", ssoOnly: false, status: "Inactive" },
    { id: 9, email: "sophia.thomas@example.com", ssoOnly: true, status: "Active" },
    { id: 10, email: "liam.moore@example.com", ssoOnly: false, status: "Pending" },
    { id: 11, email: "noah.clark@example.com", ssoOnly: false, status: "Inactive" },
    { id: 12, email: "ava.rodriguez@example.com", ssoOnly: true, status: "Active" },
    { id: 13, email: "william.lewis@example.com", ssoOnly: false, status: "Pending" },
    { id: 14, email: "mia.walker@example.com", ssoOnly: false, status: "Active" },
    { id: 15, email: "james.hall@example.com", ssoOnly: true, status: "Inactive" },
    { id: 16, email: "charlotte.allen@example.com", ssoOnly: false, status: "Active" },
    { id: 17, email: "benjamin.young@example.com", ssoOnly: false, status: "Pending" },
    { id: 18, email: "amelia.king@example.com", ssoOnly: true, status: "Active" },
    { id: 19, email: "lucas.scott@example.com", ssoOnly: false, status: "Inactive" },
    { id: 20, email: "harper.green@example.com", ssoOnly: false, status: "Active" },
    { id: 21, email: "elijah.adams@example.com", ssoOnly: true, status: "Pending" },
    { id: 22, email: "evelyn.baker@example.com", ssoOnly: false, status: "Active" },
    { id: 23, email: "matthew.carter@example.com", ssoOnly: false, status: "Inactive" },
    { id: 24, email: "scarlett.phillips@example.com", ssoOnly: true, status: "Active" },
    { id: 25, email: "daniel.evans@example.com", ssoOnly: false, status: "Pending" },
];

const groups = [
    { id: 1, name: "Sales", members: 5 },
    { id: 2, name: "Marketing", members: 8 },
    { id: 3, name: "Development", members: 15 },
    { id: 4, name: "HR", members: 4 },
    { id: 5, name: "Finance", members: 6 },
    { id: 6, name: "Operations", members: 7 },
    { id: 7, name: "Customer Support", members: 12 },
    { id: 8, name: "Legal", members: 3 },
    { id: 9, name: "Research", members: 9 },
    { id: 10, name: "Product Management", members: 10 },
    { id: 11, name: "Quality Assurance", members: 6 },
    { id: 12, name: "IT", members: 14 },
    { id: 13, name: "Security", members: 5 },
    { id: 14, name: "Design", members: 7 },
    { id: 15, name: "Business Intelligence", members: 8 },
]

const trackableLinks = [
    { id: 1, name: "megaDeal", created: "Mar 5, 2025", link: "https://www.flipnova.com/AABBCCDD/abcd1234-ef56-7890-ghij-klmnopqrstuv", lastViewed: "Mar 10, 2025" },
    { id: 2, name: "springSale", created: "Mar 15, 2025", link: "https://www.flipnova.com/A1B2C3D4E5F6/23a67b88-9f1d-4b6d-8c2e-abc123xyz456", lastViewed: "Mar 18, 2025" },
    { id: 3, name: "discountOffer", created: "Mar 10, 2025", link: "https://www.flipnova.com/FFEEAABBCCDD/7845a1c2-b3d4-5678-e9f0-111213141516", lastViewed: "Mar 12, 2025" },
    { id: 4, name: "limitedDeal", created: "Feb 25, 2025", link: "https://www.flipnova.com/112233445566/9876abcd-5432-1efg-hijk-987654321000", lastViewed: "Mar 1, 2025" },
    { id: 5, name: "exclusivePromo", created: "Feb 20, 2025", link: "https://www.flipnova.com/778899AABBCC/11223344-5566-7788-99AA-BBCCDDEEFF00", lastViewed: "Feb 28, 2025" },
    { id: 6, name: "flashSale", created: "Mar 5, 2025", link: "https://www.flipnova.com/ZXCVCXCVXCVX/aaaa1111-bbbb-cccc-dddd-eeeeffff0000", lastViewed: "Mar 8, 2025" },
    { id: 7, name: "weekendOffer", created: "Mar 8, 2025", link: "https://www.flipnova.com/ASDFQWERZXCV/11112222-3333-4444-5555-666677778888", lastViewed: "Mar 11, 2025" },
    { id: 8, name: "newCollection", created: "Feb 10, 2025", link: "https://www.flipnova.com/QWERTYUIOPASD/99887766-5544-3322-1100-AABBCCDDEEFF", lastViewed: "Feb 15, 2025" },
    { id: 9, name: "springTrends", created: "Mar 2, 2025", link: "https://www.flipnova.com/POIUYTREWQASD/44445555-6666-7777-8888-99990000AAAA", lastViewed: "Mar 6, 2025" },
    { id: 10, name: "shopNow", created: "Jan 30, 2025", link: "https://www.flipnova.com/MNBVCXZLKJHG/ABCDEF12-3456-7890-GHIJ-KLMNOPQRSTUV", lastViewed: "Feb 5, 2025" },
    { id: 11, name: "newArrivals", created: "Feb 28, 2025", link: "https://www.flipnova.com/YTREWQASDFGHJ/99887744-6655-3322-1100-AABBCCDDEEFF", lastViewed: "Mar 3, 2025" },
    { id: 12, name: "hotPicks", created: "Jan 15, 2025", link: "https://www.flipnova.com/ZXCVMNBQWERTY/11113333-5555-7777-9999-BBCCAAFFDD00", lastViewed: "Jan 20, 2025" },
    { id: 13, name: "topDeals", created: "Feb 5, 2025", link: "https://www.flipnova.com/QAZWSXEDCRFVTG/22224444-6666-8888-AAAA-BBBBCCCCDDDD", lastViewed: "Feb 9, 2025" },
    { id: 14, name: "cyberOffer", created: "Mar 1, 2025", link: "https://www.flipnova.com/MNBVCXZLKJHGFDS/55557777-9999-BBBB-DDDD-EEEEFFFF0000", lastViewed: "Mar 4, 2025" },
    { id: 15, name: "festiveSale", created: "Feb 22, 2025", link: "https://www.flipnova.com/ASDFGHJKLPOIUYT/33335555-7777-9999-BBBB-CCCCDDDDFFFF", lastViewed: "Feb 27, 2025" }
];


const historyData = [
    {
        approvedOn: "March 16, 2025 12:48 UTC",
        status: "Active, expires April 15, 2025 12:48 UTC",
        isActive: true
    },
    {
        approvedOn: "March 16, 2025 12:48 UTC",
        status: "Revoked March 16, 2025 12:48 UTC",
        isActive: false
    },
    {
        approvedOn: "March 12, 2025 18:59 UTC",
        status: "Revoked March 16, 2025 12:48 UTC",
        isActive: false
    }
];

const logs = [
    {
        id: 1,
        user: "hopoleh620",
        activity: "created the group marketing",
        date: "March 17, 2025 16:30 UTC",
        ipAddress: "49.36.80.54"
    },
    {
        id: 2,
        user: "hopoleh620",
        activity: "made changes in the workspace access",
        date: "March 16, 2025 12:48 UTC",
        ipAddress: "49.36.82.64"
    },
    {
        id: 3,
        user: "hopoleh620",
        activity: "made changes in the workspace access",
        date: "March 16, 2025 12:48 UTC",
        ipAddress: "49.36.82.64"
    },
    {
        id: 4,
        user: "hopoleh620",
        activity: "made changes in the workspace access",
        date: "March 16, 2025 12:48 UTC",
        ipAddress: "49.36.82.64"
    },
    {
        id: 5,
        user: "hopoleh620",
        activity: "made changes in the workspace access",
        date: "March 16, 2025 12:48 UTC",
        ipAddress: "49.36.82.64"
    },
    {
        id: 6,
        user: "hopoleh620",
        activity: "created the flipbook New flipbook",
        date: "March 16, 2025 12:43 UTC",
        ipAddress: "49.36.82.64"
    },
    {
        id: 7,
        user: "hopoleh620",
        activity: "created the flipbook New flipbook",
        date: "March 16, 2025 12:43 UTC",
        ipAddress: "49.36.82.64"
    },
];

const activityOptions = [
    { value: "all-activities", label: "All activities" },
    { value: "create-flipbook", label: "Create Flipbook" },
    { value: "edit-flipbook", label: "Edit Flipbook" },
    { value: "update-flipbook", label: "Update flipbook" },
    { value: "create-template", label: "Create template" },
    { value: "save-template", label: "Save as template" },
    { value: "edit-template", label: "Edit template" },
    { value: "update-template", label: "Update template" },
    { value: "move-flipbook-trash", label: "Moved flipbook to trash" },
    { value: "permanetly-delete-flipbook", label: "Permanently delete flipbook" },
    { value: "scheduled-flipbook-publish", label: "Scheduled flipbook for publish" }
]

const templatesData = [
    { value: "all-templates", label: "All templates" },
    { value: "featured", label: "Featured" },
    { value: "presentations", label: "Presentations" },
    { value: "reports", label: "Reports" },
    { value: "flyers", label: "Flyers" },
    { value: "magazines", label: "Magazines" },
    { value: "catalogs", label: "Catalogs" },
    { value: "brochures", label: "Brochures" },
    { value: "event-programs", label: "Event Programs" },
    { value: "guides", label: "Guides" },
    { value: "menus", label: "Menus" },
    { value: "covers", label: "Covers" },
    { value: "portfolios", label: "Portfolios" },
    { value: "newsletters", label: "Newsletters" },
    { value: "booklets", label: "Booklets" },
    { value: "lookbooks", label: "Lookbooks" },
    { value: "table-of-contents", label: "Table of Contents" },
    { value: "flipbooks", label: "Flipbooks" },
    { value: "ebooks", label: "eBooks" },
    { value: "pitch-decks", label: "Pitch Decks" }
]

const teammateOptions = [
    { value: "all-teammates", label: "All Teammates" },
    { value: "BhavinV", label: "BhavinV" },
    { value: "SatyamG", label: "SatyamG" },
    { value: "UtsavP", label: "UtsavP" },
    { value: "NayanS", label: "NayanS" },
    { value: "ParthP", label: "ParthP" }
]

const pageOptions = [
    { value: "1", label: "Page 1" },
    { value: "2", label: "Page 2" },
    { value: "3", label: "Page 3" },
    { value: "4", label: "Page 4" },
    { value: "5", label: "Page 5" },
    { value: "6", label: "Page 6" },
    { value: "7", label: "Page 7" },
    { value: "8", label: "Page 8" },
    { value: "9", label: "Page 9" },
    { value: "10", label: "Page 10" },
]

const initialPermissions = [
    {
        category: "Features",
        items: []
    },
    {
        category: "Workspace",
        items: [
            {
                name: "Disable Create from scratch",
                tooltip: "Prevent users from creating content from scratch",
                id: "create-from-scratch"
            },
            {
                name: "Disable Create from scratch button",
                tooltip: "Hide the create from scratch button",
                id: "create-from-scratch-button"
            },
            {
                name: "Disable My templates",
                tooltip: "Prevent users from accessing personal templates",
                id: "my-templates"
            }
        ]
    },
    {
        category: "Branding",
        items: [
            {
                name: "Disable non-brand colors",
                tooltip: "Prevent users from using colors outside your brand palette",
                id: "non-brand-colors"
            },
            {
                name: "Disable non-brand fonts",
                tooltip: "Prevent users from using fonts outside your brand guidelines",
                id: "non-brand-fonts"
            },
            {
                name: "Disable Branding settings",
                tooltip: "Restrict teammates from changing company branding settings such as colors, fonts or typography",
                id: "branding-settings"
            }
        ]
    },
    {
        category: "Player",
        items: [
            {
                name: "Disable embed page",
                tooltip: "Prevent users from accessing embed functionality",
                id: "embed-page"
            },
            {
                name: "Disable the download options",
                tooltip: "Prevent users from downloading content",
                id: "download-options"
            }
        ]
    }
];

const flipbooksData = [
    { id: 1, name: "Annual Report 2024", impressions: 58, percentage: 38.16 },
    { id: 2, name: "Product Catalog Summer", impressions: 42, percentage: 27.63 },
    { id: 3, name: "Company Overview", impressions: 22, percentage: 14.47 },
    { id: 4, name: "Marketing Brochure", impressions: 12, percentage: 7.89 },
    { id: 5, name: "Sales Presentation Q1", impressions: 8, percentage: 5.26 },
    { id: 6, name: "Customer Testimonials", impressions: 4, percentage: 2.63 },
    { id: 7, name: "Training Guide", impressions: 3, percentage: 1.97 },
    { id: 8, name: "Event Showcase", impressions: 2, percentage: 1.32 },
    { id: 9, name: "Portfolio Collection", impressions: 1, percentage: 0.66 },
    { id: 10, name: "Technical Manual", impressions: 1, percentage: 0.66 },
];

const orderData = [
    { id: "a1b2c3d4", email: "john.doe@example.com", date: "2025/03/22, 10:15 AM", value: "1200 USD", checkout: "Card" },
    { id: "e5f6g7h8", email: "alice.smith@example.com", date: "2025/03/22, 11:45 AM", value: "300 USD", checkout: "PayPal" },
    { id: "i9j0k1l2", email: "bob.johnson@example.com", date: "2025/03/22, 1:30 PM", value: "450 USD", checkout: "Bank Transfer" },
    { id: "m3n4o5p6", email: "emma.wilson@example.com", date: "2025/03/22, 3:10 PM", value: "800 USD", checkout: "Crypto" },
    { id: "q7r8s9t0", email: "david.brown@example.com", date: "2025/03/22, 4:45 PM", value: "2200 USD", checkout: "Email" },
    { id: "u1v2w3x4", email: "sophia.miller@example.com", date: "2025/03/22, 5:30 PM", value: "600 USD", checkout: "Card" },
    { id: "y5z6a7b8", email: "michael.davis@example.com", date: "2025/03/22, 6:00 PM", value: "1750 USD", checkout: "PayPal" },
    { id: "c9d0e1f2", email: "olivia.jones@example.com", date: "2025/03/22, 7:20 PM", value: "1250 USD", checkout: "Bank Transfer" },
    { id: "g3h4i5j6", email: "william.garcia@example.com", date: "2025/03/22, 8:15 PM", value: "310 USD", checkout: "Crypto" },
    { id: "k7l8m9n0", email: "ava.martinez@example.com", date: "2025/03/22, 9:10 PM", value: "980 USD", checkout: "Email" },
    { id: "o1p2q3r4", email: "james.rodriguez@example.com", date: "2025/03/22, 10:00 PM", value: "6000 USD", checkout: "Card" },
    { id: "s5t6u7v8", email: "mia.anderson@example.com", date: "2025/03/22, 10:30 PM", value: "4500 USD", checkout: "PayPal" },
    { id: "w9x0y1z2", email: "benjamin.hall@example.com", date: "2025/03/22, 11:15 PM", value: "900 USD", checkout: "Bank Transfer" },
    { id: "a3b4c5d6", email: "charlotte.lee@example.com", date: "2025/03/23, 12:00 AM", value: "700 USD", checkout: "Crypto" },
    { id: "e7f8g9h0", email: "lucas.white@example.com", date: "2025/03/23, 1:30 AM", value: "540 USD", checkout: "Email" },
    { id: "i1j2k3l4", email: "amelia.harris@example.com", date: "2025/03/23, 2:15 AM", value: "320 USD", checkout: "Card" },
    { id: "m5n6o7p8", email: "elijah.clark@example.com", date: "2025/03/23, 3:00 AM", value: "400 USD", checkout: "PayPal" },
    { id: "q9r0s1t2", email: "harper.wright@example.com", date: "2025/03/23, 4:45 AM", value: "980 USD", checkout: "Bank Transfer" },
    { id: "u3v4w5x6", email: "alexander.walker@example.com", date: "2025/03/23, 5:30 AM", value: "1500 USD", checkout: "Crypto" },
    { id: "y7z8a9b0", email: "ella.perez@example.com", date: "2025/03/23, 6:20 AM", value: "2500 USD", checkout: "Email" },
    { id: "c1d2e3f4", email: "mason.thomas@example.com", date: "2025/03/23, 7:10 AM", value: "850 USD", checkout: "Card" },
    { id: "g5h6i7j8", email: "scarlett.robinson@example.com", date: "2025/03/23, 8:30 AM", value: "1900 USD", checkout: "PayPal" },
    { id: "k9l0m1n2", email: "ethan.gonzalez@example.com", date: "2025/03/23, 9:15 AM", value: "1100 USD", checkout: "Bank Transfer" },
    { id: "o3p4q5r6", email: "abigail.wilson@example.com", date: "2025/03/23, 10:00 AM", value: "650 USD", checkout: "Crypto" }
];

const respondents = [
    { date: "Mar 16, 2025", email: "Respondent 1", answer: "2/3" },
    { date: "Mar 17, 2025", email: "Respondent 2", answer: "1/3" },
    { date: "Mar 18, 2025", email: "Respondent 3", answer: "3/3" },
    { date: "Mar 19, 2025", email: "Respondent 4", answer: "3/3" },
    { date: "Mar 20, 2025", email: "Respondent 5", answer: "1/3" },
    { date: "Mar 21, 2025", email: "Respondent 6", answer: "2/3" },
    { date: "Mar 22, 2025", email: "Respondent 7", answer: "3/3" },
    { date: "Mar 23, 2025", email: "Respondent 8", answer: "1/3" },
    { date: "Mar 24, 2025", email: "Respondent 9", answer: "2/3" },
    { date: "Mar 25, 2025", email: "Respondent 10", answer: "3/3" },
    { date: "Mar 26, 2025", email: "Respondent 11", answer: "2/3" },
    { date: "Mar 27, 2025", email: "Respondent 12", answer: "1/3" },
    { date: "Mar 28, 2025", email: "Respondent 13", answer: "2/3" },
    { date: "Mar 29, 2025", email: "Respondent 14", answer: "3/3" },
    { date: "Mar 30, 2025", email: "Respondent 15", answer: "1/3" },
    { date: "Mar 31, 2025", email: "Respondent 16", answer: "3/3" },
    { date: "Apr 1, 2025", email: "Respondent 17", answer: "2/3" },
    { date: "Apr 2, 2025", email: "Respondent 18", answer: "1/3" },
    { date: "Apr 3, 2025", email: "Respondent 19", answer: "3/3" },
    { date: "Apr 4, 2025", email: "Respondent 20", answer: "2/3" },
    { date: "Apr 5, 2025", email: "Respondent 21", answer: "1/3" },
    { date: "Apr 6, 2025", email: "Respondent 22", answer: "3/3" },
    { date: "Apr 7, 2025", email: "Respondent 23", answer: "1/3" },
    { date: "Apr 8, 2025", email: "Respondent 24", answer: "2/3" },
    { date: "Apr 9, 2025", email: "Respondent 25", answer: "3/3" }
];

const questions = [
    {
        date: "Mar 17, 2025, 3:15 PM",
        email: "alex.jones@flipnova.com",
        answer: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
        gdpr: "Yes"
    },
    {
        date: "Mar 17, 2025, 5:42 PM",
        email: "sarah.kim@flipnova.com",
        answer: "Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis.",
        gdpr: "No"
    },
    {
        date: "Mar 18, 2025, 9:10 AM",
        email: "",
        answer: "Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.",
        gdpr: "Yes"
    },
    {
        date: "Mar 18, 2025, 11:27 AM",
        email: "",
        answer: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.",
        gdpr: "No"
    },
    {
        date: "Mar 18, 2025, 4:33 PM",
        email: "david.nguyen@flipnova.com",
        answer: "Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur aliquet quam id dui posuere blandit.",
        gdpr: "Yes"
    },
    {
        date: "Mar 19, 2025, 10:05 AM",
        email: "emma.wilson@flipnova.com",
        answer: "Sed porttitor lectus nibh. Cras ultricies ligula sed magna dictum porta. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Curabitur non nulla sit.",
        gdpr: "Yes"
    },
    {
        date: "Mar 19, 2025, 1:48 PM",
        email: "",
        answer: "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Praesent sapien massa convallis.",
        gdpr: "No"
    },
    {
        date: "Mar 20, 2025, 8:22 AM",
        email: "lisa.garcia@flipnova.com",
        answer: "Vivamus suscipit tortor eget felis porttitor volutpat. Nulla porttitor accumsan tincidunt. Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo lacinia eget.",
        gdpr: "Yes"
    },
    {
        date: "Mar 20, 2025, 3:19 PM",
        email: "ryan.smith@flipnova.com",
        answer: "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec sollicitudin molestie malesuada. Quisque velit nisi, pretium ut lacinia in elementum id enim.",
        gdpr: "Yes"
    },
    {
        date: "Mar 21, 2025, 9:53 AM",
        email: "",
        answer: "Pellentesque in ipsum id orci porta dapibus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Proin eget tortor risus. Vestibulum ante ipsum primis.",
        gdpr: "No"
    },
    {
        date: "Mar 21, 2025, 2:36 PM",
        email: "olivia.brown@flipnova.com",
        answer: "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Donec rutrum congue leo eget malesuada. Nulla porttitor accumsan tincidunt. Vestibulum ante ipsum.",
        gdpr: "Yes"
    },
    {
        date: "Mar 22, 2025, 10:17 AM",
        email: "ethan.williams@flipnova.com",
        answer: "Cras ultricies ligula sed magna dictum porta. Curabitur aliquet quam id dui posuere blandit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
        gdpr: "Yes"
    },
    {
        date: "Mar 22, 2025, 4:45 PM",
        email: "sophia.lopez@flipnova.com",
        answer: "Donec sollicitudin molestie malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Quisque velit nisi, pretium ut lacinia in, elementum id enim consequat.",
        gdpr: "No"
    },
    {
        date: "Mar 23, 2025, 8:58 AM",
        email: "",
        answer: "Nulla quis lorem ut libero malesuada feugiat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Sed porttitor lectus nibh. Donec rutrum congue leo eget.",
        gdpr: "Yes"
    },
    {
        date: "Mar 23, 2025, 3:14 PM",
        email: "isabella.davis@flipnova.com",
        answer: "Sed porttitor lectus nibh. Proin eget tortor risus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Pellentesque in ipsum id orci porta dapibus.",
        gdpr: "No"
    },
    {
        date: "Mar 24, 2025, 9:26 AM",
        email: "lucas.rodriguez@flipnova.com",
        answer: "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Vivamus magna justo, lacinia eget consectetur sed convallis.",
        gdpr: "Yes"
    },
    {
        date: "Mar 24, 2025, 1:49 PM",
        email: "mila.wong@flipnova.com",
        answer: "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Curabitur aliquet quam id dui posuere blandit. Donec sollicitudin molestie malesuada enim.",
        gdpr: "Yes"
    },
    {
        date: "Mar 24, 2025, 5:22 PM",
        email: "aiden.clark@flipnova.com",
        answer: "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Nulla porttitor accumsan tincidunt. Vestibulum ac diam sit amet quam vehicula elementum sed.",
        gdpr: "No"
    },
    {
        date: "Mar 25, 2025, 10:38 AM",
        email: "charlotte.martinez@flipnova.com",
        answer: "Vivamus suscipit tortor eget felis porttitor volutpat. Pellentesque in ipsum id orci porta dapibus. Donec rutrum congue leo eget malesuada. Vestibulum ante ipsum.",
        gdpr: "Yes"
    },
    {
        date: "Mar 25, 2025, 2:53 PM",
        email: "jacob.anderson@flipnova.com",
        answer: "Proin eget tortor risus. Cras ultricies ligula sed magna dictum porta. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Sed porttitor lectus nibh.",
        gdpr: "Yes"
    },
    {
        date: "Mar 26, 2025, 8:47 AM",
        email: "amelia.thomas@flipnova.com",
        answer: "Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus feugiat.",
        gdpr: "No"
    },
    {
        date: "Mar 26, 2025, 1:15 PM",
        email: "william.jackson@flipnova.com",
        answer: "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh.",
        gdpr: "Yes"
    }
];

const contactFormData = [
    { date: "Mar 17, 2025, 3:15 PM", email: "alex.jones@flipnova.com", name: "Alex Jones", phone: "1212121212", country: "United States", custom: "tdadqd" },
    { date: "Mar 18, 2025, 1:45 PM", email: "sophia.miller@techwave.com", name: "Sophia Miller", phone: "2323232323", country: "Canada", custom: "weoplk" },
    { date: "Mar 19, 2025, 11:30 AM", email: "liam.smith@cybertrend.com", name: "Liam Smith", phone: "3434343434", country: "United Kingdom", custom: "zxcvbn" },
    { date: "Mar 20, 2025, 2:20 PM", email: "emma.davis@nextgen.com", name: "Emma Davis", phone: "4545454545", country: "Australia", custom: "asdfgh" },
    { date: "Mar 21, 2025, 9:10 AM", email: "noah.johnson@digitech.com", name: "Noah Johnson", phone: "5656565656", country: "Germany", custom: "qwerty" },
    { date: "Mar 22, 2025, 4:50 PM", email: "olivia.brown@softlab.com", name: "Olivia Brown", phone: "6767676767", country: "France", custom: "mnbvcx" },
    { date: "Mar 23, 2025, 8:00 AM", email: "william.wilson@webcore.com", name: "William Wilson", phone: "7878787878", country: "India", custom: "lkjhg" },
    { date: "Mar 24, 2025, 6:40 PM", email: "ava.moore@cloudsync.com", name: "Ava Moore", phone: "8989898989", country: "Japan", custom: "poiuy" },
    { date: "Mar 25, 2025, 12:25 PM", email: "james.taylor@infowave.com", name: "James Taylor", phone: "9090909090", country: "Brazil", custom: "rewqas" },
    { date: "Mar 26, 2025, 3:35 PM", email: "isabella.anderson@datahub.com", name: "Isabella Anderson", phone: "1010101010", country: "Mexico", custom: "cvbnm" },
    { date: "Mar 27, 2025, 7:55 AM", email: "benjamin.thomas@netwise.com", name: "Benjamin Thomas", phone: "1111111111", country: "Italy", custom: "dfghjk" },
    { date: "Mar 28, 2025, 5:45 PM", email: "mia.harris@aiinsights.com", name: "Mia Harris", phone: "2222222222", country: "South Korea", custom: "wertyu" },
    { date: "Mar 29, 2025, 10:10 AM", email: "lucas.martin@smartcode.com", name: "Lucas Martin", phone: "3333333333", country: "Russia", custom: "asdfghj" },
    { date: "Mar 30, 2025, 1:30 PM", email: "amelia.white@devsync.com", name: "Amelia White", phone: "4444444444", country: "Spain", custom: "lkjhgf" },
    { date: "Mar 31, 2025, 9:20 AM", email: "ethan.jackson@techvault.com", name: "Ethan Jackson", phone: "5555555555", country: "Netherlands", custom: "mnbvc" },
    { date: "Apr 01, 2025, 4:15 PM", email: "harper.lewis@clouddata.com", name: "Harper Lewis", phone: "6666666666", country: "Switzerland", custom: "ytrewq" },
    { date: "Apr 02, 2025, 2:50 PM", email: "logan.walker@codefusion.com", name: "Logan Walker", phone: "7777777777", country: "Sweden", custom: "poiuyt" },
    { date: "Apr 03, 2025, 11:05 AM", email: "ella.hall@bytesync.com", name: "Ella Hall", phone: "8888888888", country: "Belgium", custom: "zxcvbnm" },
    { date: "Apr 04, 2025, 5:25 PM", email: "jacob.young@intellisys.com", name: "Jacob Young", phone: "9999999999", country: "Norway", custom: "gfdsaz" },
    { date: "Apr 05, 2025, 8:40 AM", email: "scarlett.allen@infotech.com", name: "Scarlett Allen", phone: "1212121213", country: "Denmark", custom: "qazwsx" },
    { date: "Apr 06, 2025, 7:10 PM", email: "michael.scott@nextgen.com", name: "Michael Scott", phone: "2323232324", country: "Portugal", custom: "edcvfr" },
    { date: "Apr 07, 2025, 12:35 PM", email: "victoria.king@cybertrend.com", name: "Victoria King", phone: "3434343435", country: "Greece", custom: "tgbnhy" },
    { date: "Apr 08, 2025, 3:55 PM", email: "david.evans@webcore.com", name: "David Evans", phone: "4545454546", country: "Finland", custom: "ujmikol" },
    { date: "Apr 09, 2025, 9:50 AM", email: "chloe.carter@digitech.com", name: "Chloe Carter", phone: "5656565657", country: "Austria", custom: "qwertz" },
    { date: "Apr 10, 2025, 6:20 PM", email: "daniel.baker@smartcode.com", name: "Daniel Baker", phone: "6767676768", country: "Ireland", custom: "xcvbnm" }
];


const quizSummary = [
    {
        id: "opens",
        title: "30",
        label: "Opens"
    },
    {
        id: "submits",
        title: "25",
        label: "Submits"
    },
    {
        id: "completion",
        title: "83.33%",
        label: "Completion rate"
    },
    {
        id: "avgTime",
        title: "00:00:12",
        label: "Average time to complete"
    }
];


const quizData = [
    {
        "id": 1,
        "question": "What is the capital of France?",
        "correctResponses": 3,
        "totalResponses": 5,
        "options": [
            { "id": 1, "text": "A. Berlin", "count": 1, "percentage": 20, "isCorrect": false },
            { "id": 2, "text": "B. Paris", "count": 3, "percentage": 60, "isCorrect": true },
            { "id": 3, "text": "C. Madrid", "count": 1, "percentage": 20, "isCorrect": false }
        ]
    },
    {
        "id": 2,
        "question": "Which planet is known as the Red Planet?",
        "correctResponses": 4,
        "totalResponses": 6,
        "options": [
            { "id": 1, "text": "A. Earth", "count": 1, "percentage": 17, "isCorrect": false },
            { "id": 2, "text": "B. Mars", "count": 4, "percentage": 67, "isCorrect": true },
            { "id": 3, "text": "C. Jupiter", "count": 1, "percentage": 17, "isCorrect": false }
        ]
    },
    {
        "id": 3,
        "question": "What is the largest mammal?",
        "correctResponses": 2,
        "totalResponses": 4,
        "options": [
            { "id": 1, "text": "A. Elephant", "count": 1, "percentage": 25, "isCorrect": false },
            { "id": 2, "text": "B. Blue Whale", "count": 2, "percentage": 50, "isCorrect": true },
            { "id": 3, "text": "C. Giraffe", "count": 1, "percentage": 25, "isCorrect": false }
        ]
    },
    {
        "id": 4,
        "question": "Who wrote 'Hamlet'?",
        "correctResponses": 3,
        "totalResponses": 5,
        "options": [
            { "id": 1, "text": "A. William Shakespeare", "count": 3, "percentage": 60, "isCorrect": true },
            { "id": 2, "text": "B. Charles Dickens", "count": 1, "percentage": 20, "isCorrect": false },
            { "id": 3, "text": "C. Mark Twain", "count": 1, "percentage": 20, "isCorrect": false }
        ]
    },
    {
        "id": 5,
        "question": "What is the chemical symbol for Gold?",
        "correctResponses": 4,
        "totalResponses": 5,
        "options": [
            { "id": 1, "text": "A. Au", "count": 4, "percentage": 80, "isCorrect": true },
            { "id": 2, "text": "B. Ag", "count": 1, "percentage": 20, "isCorrect": false }
        ]
    }
];

const tableOfContents = [
    {
        id: 'item-1',
        type: 'chapter',
        title: 'Chapter title 1',
        parentId: null,
        depth: 0,
        number: 1,
    },
    {
        id: 'item-2',
        type: 'subchapter',
        title: 'Subchapter title 1.1',
        parentId: 'item-1',
        depth: 1,
        number: 1,
    },
    {
        id: 'item-3',
        type: 'subchapter',
        title: 'Subchapter title 1.2',
        parentId: 'item-1',
        depth: 1,
        number: 2,
    },
    {
        id: 'item-4',
        type: 'chapter',
        title: 'Chapter title 2',
        parentId: null,
        depth: 0,
        number: 2,
    },
    {
        id: 'item-5',
        type: 'subchapter',
        title: 'Subchapter title 2.1',
        parentId: 'item-4',
        depth: 1,
        number: 1,
    },
    {
        id: 'item-6',
        type: 'subchapter',
        title: 'Subchapter title 2.2',
        parentId: 'item-4',
        depth: 1,
        number: 2,
    },
    {
        id: 'item-7',
        type: 'subchapter',
        title: 'Subchapter title 2.3',
        parentId: 'item-4',
        depth: 1,
        number: 3,
    },
]

const pagesData = [
    { id: 1, title: "Home Page Overview", description: "The main landing page with key navigation elements and featured content." },
    { id: 2, title: "Product Listings", description: "Displays all available products with filtering options and search functionality." },
    { id: 3, title: "User Account Settings", description: "Allows users to update their profile information and preferences." },
    { id: 4, title: "Checkout Process", description: "Step-by-step payment and shipping information collection for purchases." },
    { id: 5, title: "Contact Information", description: "Provides methods to reach customer support and business locations." },
    { id: 6, title: "About Us Section", description: "Company history, mission statement, and team information." },
    { id: 7, title: "FAQ Page", description: "Common questions and answers for user assistance." },
    { id: 8, title: "Privacy Policy", description: "Details on data collection and usage practices." },
    { id: 9, title: "Terms of Service", description: "Legal agreements for using the platform." },
    { id: 10, title: "Blog Articles", description: "Educational content and company updates for users." }
];

const customizeMenuItems = [
    {
        value: "appearance",
        icon: <Eye />,
        label: "Appearance",
        component: <Appearance />
    },
    {
        value: "branding",
        icon: <Palette />,
        label: "Branding",
        component: <Branding />
    },
    {
        value: "menu-controls",
        icon: <SlidersHorizontal />,
        label: "Menu controls",
        component: <MenuControls />
    },
    {
        value: "table-of-contents",
        icon: <TableOfContents />,
        label: "Table of contents",
        component: <TableOfContentsComponent />
    },
    {
        value: "lead-form",
        icon: <AlignRight />,
        label: "Lead form",
        component: <LeadForm />
    },
    {
        value: "accessibility",
        icon: <PersonStanding />,
        label: "Accessibility",
        component: <Accessibility />
    }
];

const templates = [
    {
        id: 1,
        pages: 14,
        thumbnail: "https://cdn.flipsnack.com/template/4897/thumb/page_1",
        pageThumbnails: [
            "https://cdn.flipsnack.com/template/4897/thumb/page_1",
            "https://cdn.flipsnack.com/template/4897/thumb/page_2",
            "https://cdn.flipsnack.com/template/4897/thumb/page_3",
            "https://cdn.flipsnack.com/template/4897/thumb/page_4",
            "https://cdn.flipsnack.com/template/4897/thumb/page_5",
            "https://cdn.flipsnack.com/template/4897/thumb/page_6",
            "https://cdn.flipsnack.com/template/4897/thumb/page_7",
            "https://cdn.flipsnack.com/template/4897/thumb/page_8",
            "https://cdn.flipsnack.com/template/4897/thumb/page_9",
            "https://cdn.flipsnack.com/template/4897/thumb/page_10",
            "https://cdn.flipsnack.com/template/4897/thumb/page_11",
            "https://cdn.flipsnack.com/template/4897/thumb/page_12",
            "https://cdn.flipsnack.com/template/4897/thumb/page_13",
            "https://cdn.flipsnack.com/template/4897/thumb/page_14",
        ]
    },
    {
        id: 2,
        pages: 12,
        thumbnail: "https://cdn.flipsnack.com/template/4844/thumb/page_1",
        pageThumbnails: [
            "https://cdn.flipsnack.com/template/4844/thumb/page_1",
            "https://cdn.flipsnack.com/template/4844/thumb/page_2",
            "https://cdn.flipsnack.com/template/4844/thumb/page_3",
            "https://cdn.flipsnack.com/template/4844/thumb/page_4",
            "https://cdn.flipsnack.com/template/4844/thumb/page_5",
            "https://cdn.flipsnack.com/template/4844/thumb/page_6",
            "https://cdn.flipsnack.com/template/4844/thumb/page_7",
            "https://cdn.flipsnack.com/template/4844/thumb/page_8",
            "https://cdn.flipsnack.com/template/4844/thumb/page_9",
            "https://cdn.flipsnack.com/template/4844/thumb/page_10",
            "https://cdn.flipsnack.com/template/4844/thumb/page_11",
            "https://cdn.flipsnack.com/template/4844/thumb/page_12",
        ]
    },
    {
        id: 3,
        pages: 12,
        thumbnail: "https://cdn.flipsnack.com/template/4832/thumb/page_1",
        pageThumbnails: [
            "https://cdn.flipsnack.com/template/4832/thumb/page_1",
            "https://cdn.flipsnack.com/template/4832/thumb/page_2",
            "https://cdn.flipsnack.com/template/4832/thumb/page_3",
            "https://cdn.flipsnack.com/template/4832/thumb/page_4",
            "https://cdn.flipsnack.com/template/4832/thumb/page_5",
            "https://cdn.flipsnack.com/template/4832/thumb/page_6",
            "https://cdn.flipsnack.com/template/4832/thumb/page_7",
            "https://cdn.flipsnack.com/template/4832/thumb/page_8",
            "https://cdn.flipsnack.com/template/4832/thumb/page_9",
            "https://cdn.flipsnack.com/template/4832/thumb/page_10",
            "https://cdn.flipsnack.com/template/4832/thumb/page_11",
            "https://cdn.flipsnack.com/template/4832/thumb/page_12",
        ]
    },
    {
        id: 4,
        pages: 14,
        thumbnail: "https://cdn.flipsnack.com/template/4815/thumb/page_1",
        pageThumbnails: [
            "https://cdn.flipsnack.com/template/4815/thumb/page_1",
            "https://cdn.flipsnack.com/template/4815/thumb/page_2",
            "https://cdn.flipsnack.com/template/4815/thumb/page_3",
            "https://cdn.flipsnack.com/template/4815/thumb/page_4",
            "https://cdn.flipsnack.com/template/4815/thumb/page_5",
            "https://cdn.flipsnack.com/template/4815/thumb/page_6",
            "https://cdn.flipsnack.com/template/4815/thumb/page_7",
            "https://cdn.flipsnack.com/template/4815/thumb/page_8",
            "https://cdn.flipsnack.com/template/4815/thumb/page_9",
            "https://cdn.flipsnack.com/template/4815/thumb/page_10",
            "https://cdn.flipsnack.com/template/4815/thumb/page_11",
            "https://cdn.flipsnack.com/template/4815/thumb/page_12",
            "https://cdn.flipsnack.com/template/4815/thumb/page_13",
            "https://cdn.flipsnack.com/template/4815/thumb/page_14",
        ]
    },
    {
        id: 5,
        pages: 16,
        thumbnail: "https://cdn.flipsnack.com/template/4811/thumb/page_1",
        pageThumbnails: [
            "https://cdn.flipsnack.com/template/4811/thumb/page_1",
            "https://cdn.flipsnack.com/template/4811/thumb/page_2",
            "https://cdn.flipsnack.com/template/4811/thumb/page_3",
            "https://cdn.flipsnack.com/template/4811/thumb/page_4",
            "https://cdn.flipsnack.com/template/4811/thumb/page_5",
            "https://cdn.flipsnack.com/template/4811/thumb/page_6",
            "https://cdn.flipsnack.com/template/4811/thumb/page_7",
            "https://cdn.flipsnack.com/template/4811/thumb/page_8",
            "https://cdn.flipsnack.com/template/4811/thumb/page_9",
            "https://cdn.flipsnack.com/template/4811/thumb/page_10",
            "https://cdn.flipsnack.com/template/4811/thumb/page_11",
            "https://cdn.flipsnack.com/template/4811/thumb/page_12",
            "https://cdn.flipsnack.com/template/4811/thumb/page_13",
            "https://cdn.flipsnack.com/template/4811/thumb/page_14",
            "https://cdn.flipsnack.com/template/4811/thumb/page_15",
            "https://cdn.flipsnack.com/template/4811/thumb/page_16",
        ]
    },
    {
        id: 6,
        pages: 14,
        thumbnail: "https://cdn.flipsnack.com/template/4804/thumb/page_1",
        pageThumbnails: [
            "https://cdn.flipsnack.com/template/4804/thumb/page_1",
            "https://cdn.flipsnack.com/template/4804/thumb/page_2",
            "https://cdn.flipsnack.com/template/4804/thumb/page_3",
            "https://cdn.flipsnack.com/template/4804/thumb/page_4",
            "https://cdn.flipsnack.com/template/4804/thumb/page_5",
            "https://cdn.flipsnack.com/template/4804/thumb/page_6",
            "https://cdn.flipsnack.com/template/4804/thumb/page_7",
            "https://cdn.flipsnack.com/template/4804/thumb/page_8",
            "https://cdn.flipsnack.com/template/4804/thumb/page_9",
            "https://cdn.flipsnack.com/template/4804/thumb/page_10",
            "https://cdn.flipsnack.com/template/4804/thumb/page_11",
            "https://cdn.flipsnack.com/template/4804/thumb/page_12",
            "https://cdn.flipsnack.com/template/4804/thumb/page_13",
            "https://cdn.flipsnack.com/template/4804/thumb/page_14",
        ]
    },
    {
        id: 7,
        pages: 18,
        thumbnail: "https://cdn.flipsnack.com/template/4779/thumb/page_1",
        pageThumbnails: [
            "https://cdn.flipsnack.com/template/4779/thumb/page_1",
            "https://cdn.flipsnack.com/template/4779/thumb/page_2",
            "https://cdn.flipsnack.com/template/4779/thumb/page_3",
            "https://cdn.flipsnack.com/template/4779/thumb/page_4",
            "https://cdn.flipsnack.com/template/4779/thumb/page_5",
            "https://cdn.flipsnack.com/template/4779/thumb/page_6",
            "https://cdn.flipsnack.com/template/4779/thumb/page_7",
            "https://cdn.flipsnack.com/template/4779/thumb/page_8",
            "https://cdn.flipsnack.com/template/4779/thumb/page_9",
            "https://cdn.flipsnack.com/template/4779/thumb/page_10",
            "https://cdn.flipsnack.com/template/4779/thumb/page_11",
            "https://cdn.flipsnack.com/template/4779/thumb/page_12",
            "https://cdn.flipsnack.com/template/4779/thumb/page_13",
            "https://cdn.flipsnack.com/template/4779/thumb/page_14",
            "https://cdn.flipsnack.com/template/4779/thumb/page_15",
            "https://cdn.flipsnack.com/template/4779/thumb/page_16",
            "https://cdn.flipsnack.com/template/4779/thumb/page_17",
            "https://cdn.flipsnack.com/template/4779/thumb/page_18",
        ]
    },
    {
        id: 8,
        pages: 16,
        thumbnail: "https://cdn.flipsnack.com/template/4774/thumb/page_1",
        pageThumbnails: [
            "https://cdn.flipsnack.com/template/4774/thumb/page_1",
            "https://cdn.flipsnack.com/template/4774/thumb/page_2",
            "https://cdn.flipsnack.com/template/4774/thumb/page_3",
            "https://cdn.flipsnack.com/template/4774/thumb/page_4",
            "https://cdn.flipsnack.com/template/4774/thumb/page_5",
            "https://cdn.flipsnack.com/template/4774/thumb/page_6",
            "https://cdn.flipsnack.com/template/4774/thumb/page_7",
            "https://cdn.flipsnack.com/template/4774/thumb/page_8",
            "https://cdn.flipsnack.com/template/4774/thumb/page_9",
            "https://cdn.flipsnack.com/template/4774/thumb/page_10",
            "https://cdn.flipsnack.com/template/4774/thumb/page_11",
            "https://cdn.flipsnack.com/template/4774/thumb/page_12",
            "https://cdn.flipsnack.com/template/4774/thumb/page_13",
            "https://cdn.flipsnack.com/template/4774/thumb/page_14",
            "https://cdn.flipsnack.com/template/4774/thumb/page_15",
            "https://cdn.flipsnack.com/template/4774/thumb/page_16",
        ]
    },
    {
        id: 9,
        pages: 14,
        thumbnail: "https://cdn.flipsnack.com/template/4770/thumb/page_1",
        pageThumbnails: [
            "https://cdn.flipsnack.com/template/4770/thumb/page_1",
            "https://cdn.flipsnack.com/template/4770/thumb/page_2",
            "https://cdn.flipsnack.com/template/4770/thumb/page_3",
            "https://cdn.flipsnack.com/template/4770/thumb/page_4",
            "https://cdn.flipsnack.com/template/4770/thumb/page_5",
            "https://cdn.flipsnack.com/template/4770/thumb/page_6",
            "https://cdn.flipsnack.com/template/4770/thumb/page_7",
            "https://cdn.flipsnack.com/template/4770/thumb/page_8",
            "https://cdn.flipsnack.com/template/4770/thumb/page_9",
            "https://cdn.flipsnack.com/template/4770/thumb/page_10",
            "https://cdn.flipsnack.com/template/4770/thumb/page_11",
            "https://cdn.flipsnack.com/template/4770/thumb/page_12",
            "https://cdn.flipsnack.com/template/4770/thumb/page_13",
            "https://cdn.flipsnack.com/template/4770/thumb/page_14",
        ]
    },
    {
        id: 10,
        pages: 12,
        thumbnail: "https://cdn.flipsnack.com/template/4723/thumb/page_1",
        pageThumbnails: [
            "https://cdn.flipsnack.com/template/4723/thumb/page_1",
            "https://cdn.flipsnack.com/template/4723/thumb/page_2",
            "https://cdn.flipsnack.com/template/4723/thumb/page_3",
            "https://cdn.flipsnack.com/template/4723/thumb/page_4",
            "https://cdn.flipsnack.com/template/4723/thumb/page_5",
            "https://cdn.flipsnack.com/template/4723/thumb/page_6",
            "https://cdn.flipsnack.com/template/4723/thumb/page_7",
            "https://cdn.flipsnack.com/template/4723/thumb/page_8",
            "https://cdn.flipsnack.com/template/4723/thumb/page_9",
            "https://cdn.flipsnack.com/template/4723/thumb/page_10",
            "https://cdn.flipsnack.com/template/4723/thumb/page_11",
            "https://cdn.flipsnack.com/template/4723/thumb/page_12",
        ]
    },
];

export function getData(dataType) {
    switch (dataType) {
        case 'defaultRoutes':
            return defaultRoutes;
        case 'navItems':
            return navItems;
        case 'editorNavItems':
            return editorNavItems;
        case 'bottomNavItems':
            return bottomNavItems;
        case 'settingMenuItems':
            return settingMenuItems;
        case 'flipbooks':
            return flipbooks;
        case 'unpublishedButtons':
            return unpublishedButtons;
        case 'publishedButtons':
            return publishedButtons;
        case 'sidebarSections':
            return sidebarSections;
        case 'downloadOptions':
            return downloadOptions;
        case 'brandingMenuItems':
            return brandingMenuItems;
        case 'mainPlans':
            return mainPlans;
        case 'enterprisePlans':
            return enterprisePlans;
        case 'teammates':
            return teammates;
        case 'readers':
            return readers;
        case 'groups':
            return groups;
        case 'historyData':
            return historyData;
        case 'logs':
            return logs;
        case 'activityOptions':
            return activityOptions;
        case 'teammateOptions':
            return teammateOptions;
        case 'initialPermissions':
            return initialPermissions;
        case 'pageOptions':
            return pageOptions;
        case 'trackableLinks':
            return trackableLinks;
        case 'flipbooksData':
            return flipbooksData;
        case 'orderData':
            return orderData;
        case 'respondents':
            return respondents;
        case 'quizSummary':
            return quizSummary;
        case 'quizData':
            return quizData;
        case 'questions':
            return questions;
        case 'contactFormData':
            return contactFormData;
        case 'tableOfContents':
            return tableOfContents;
        case 'pagesData':
            return pagesData;
        case 'customizeMenuItems':
            return customizeMenuItems;
        case 'templatesData':
            return templatesData;
        case 'templates':
            return templates;
        default:
            return [];
    }
}