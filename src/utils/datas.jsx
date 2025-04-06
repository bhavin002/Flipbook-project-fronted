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

const textTemplates = [
    {
        id: 1,
        thumbnail: "https://cdn.flipsnack.com/template/4753/thumb/page_1",
    },
    {
        id: 2,
        thumbnail: "https://cdn.flipsnack.com/template/4752/thumb/page_1",
    },
    {
        id: 3,
        thumbnail: "https://cdn.flipsnack.com/template/4751/thumb/page_1",
    },
    {
        id: 4,
        thumbnail: "https://cdn.flipsnack.com/template/4750/thumb/page_1",
    },  
    {
        id: 5,
        thumbnail: "https://cdn.flipsnack.com/template/4749/thumb/page_1",
    },
    {
        id: 6,
        thumbnail: "https://cdn.flipsnack.com/template/3763/thumb/page_1",
    },
    {
        id: 7,  
        thumbnail: "https://cdn.flipsnack.com/template/3762/thumb/page_1",
    },
    {
        id: 8,
        thumbnail: "https://cdn.flipsnack.com/template/3761/thumb/page_1",
    },
    {
        id: 9,
        thumbnail: "https://cdn.flipsnack.com/template/3760/thumb/page_1",
    },
    {
        id: 10,
        thumbnail: "https://cdn.flipsnack.com/template/3757/thumb/page_1",
    }
]
const interactions = [
    {
        title: "Links and tags",
        isTextShow: true,
        widget: [
            {
                text: 'Link area',
                icon: `<div class="w-2 h-2 border-t-2 border-l-2 absolute top-0 left-0 rounded-tl-md"> </div><div class="w-2 h-2 border-t-2 border-r-2 absolute top-0 right-0 rounded-tr-md"> </div><div class="w-2 h-2 border-b-2 border-l-2 absolute bottom-0 left-0 rounded-bl-md"> </div><div class="w-2 h-2 border-b-2 border-r-2 absolute bottom-0 right-0 rounded-br-md"> </div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link2-icon lucide-link-2"><path d="M9 17H7A5 5 0 0 1 7 7h2" /><path d="M15 7h2a5 5 0 1 1 0 10h-2" /><line x1="8" x2="16" y1="12" y2="12" /></svg>`,
                isUpgrade: false
            },
            {
                text: 'Link button',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link2-icon lucide-link-2"><path d="M9 17H7A5 5 0 0 1 7 7h2" /><path d="M15 7h2a5 5 0 1 1 0 10h-2" /><line x1="8" x2="16" y1="12" y2="12" /></svg>`,
                isUpgrade: false,
            },
            {
                text: 'Tag',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-dot-icon lucide-circle-dot"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="1" /></svg>`,
                isUpgrade: false,
            },
            {
                text: 'Caption',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>`,
                isUpgrade: false,
            },
            {
                text: 'Caption',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>`,
                isUpgrade: false
            },
            {
                text: 'Embed code',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code-icon lucide-code"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>`,
                isUpgrade: true,
            },
            {
                text: 'Pop-up frame',
                icon: `<div class="w-2 h-2 border-t-2 border-l-2 absolute top-0 left-0 rounded-tl-md"> </div><div class="w-2 h-2 border-t-2 border-r-2 absolute top-0 right-0 rounded-tr-md"> </div><div class="w-2 h-2 border-b-2 border-l-2 absolute bottom-0 left-0 rounded-bl-md"> </div><div class="w-2 h-2 border-b-2 border-r-2 absolute bottom-0 right-0 rounded-br-md"> </div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-icon lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>`,
                isUpgrade: true,
            },
        ]
    },
    {
        title: "Image",
        isTextShow: true,
        widget: [
            {
                text: 'Spotlight',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-square-icon lucide-square-square"><rect x="3" y="3" width="18" height="18" rx="2" /><rect x="8" y="8" width="8" height="8" rx="1" /></svg>`,
                isUpgrade: false,
            },
            {
                text: 'Slideshow',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-images-icon lucide-images"><path d="M18 22H4a2 2 0 0 1-2-2V6" /><path d="m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18" /><circle cx="12" cy="8" r="2" /><rect width="16" height="16" x="6" y="2" rx="2" /></svg>`,
                isUpgrade: false,
            },
            {
                text: 'Pop-up slideshow',
                icon: `<div class="w-2 h-2 border-t-2 border-l-2 absolute top-0 left-0 rounded-tl-md"> </div><div class="w-2 h-2 border-t-2 border-r-2 absolute top-0 right-0 rounded-tr-md"> </div><div class="w-2 h-2 border-b-2 border-l-2 absolute bottom-0 left-0 rounded-bl-md"> </div><div class="w-2 h-2 border-b-2 border-r-2 absolute bottom-0 right-0 rounded-br-md"> </div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-images-icon lucide-images"><path d="M18 22H4a2 2 0 0 1-2-2V6" /><path d="m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18" /><circle cx="12" cy="8" r="2" /><rect width="16" height="16" x="6" y="2" rx="2" /></svg>`,
                isUpgrade: false
            }
        ]
    },
    {
        title: "Audio & Video",
        isTextShow: true,
        widget: [
            {
                text: 'Video embed',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square-code-icon lucide-message-square-code"><path d="M10 7.5 8 10l2 2.5"/><path d="m14 7.5 2 2.5-2 2.5"/><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
                isUpgrade: false,
            },
            {
                text: 'Video button',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-video-icon lucide-video"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>`,
                isUpgrade: false,
            },
            {
                text: 'Audio button',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume2-icon lucide-volume-2"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/></svg>`,
                isUpgrade: false
            }
        ]
    },
    {
        title: "Shop",
        isTextShow: true,
        widget: [
            {
                text: 'Shop area',
                icon: `<div class="w-2 h-2 border-t-2 border-l-2 absolute top-0 left-0 rounded-tl-md"> </div><div class="w-2 h-2 border-t-2 border-r-2 absolute top-0 right-0 rounded-tr-md"> </div><div class="w-2 h-2 border-b-2 border-l-2 absolute bottom-0 left-0 rounded-bl-md"> </div><div class="w-2 h-2 border-b-2 border-r-2 absolute bottom-0 right-0 rounded-br-md"> </div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`,
                isUpgrade: false,
            },
            {
                text: 'Shop button',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`,
                isUpgrade: false,
            },
            {
                text: 'Product tag',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tag-icon lucide-tag"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>`,
                isUpgrade: false
            }
        ]
    },
    {
        title: "Engagement",
        isTextShow: true,
        widget: [
            {
                text: 'Quiz',
                icon: `<div class="w-2 h-2 border-t-2 border-l-2 absolute top-0 left-0 rounded-tl-md"> </div><div class="w-2 h-2 border-t-2 border-r-2 absolute top-0 right-0 rounded-tr-md"> </div><div class="w-2 h-2 border-b-2 border-l-2 absolute bottom-0 left-0 rounded-bl-md"> </div><div class="w-2 h-2 border-b-2 border-r-2 absolute bottom-0 right-0 rounded-br-md"> </div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-todo-icon lucide-list-todo"><rect x="3" y="5" width="6" height="6" rx="1"/><path d="m3 17 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg>`,
                isUpgrade: false,
            },
            {
                text: 'Question',
                icon: `<div class="w-2 h-2 border-t-2 border-l-2 absolute top-0 left-0 rounded-tl-md"> </div><div class="w-2 h-2 border-t-2 border-r-2 absolute top-0 right-0 rounded-tr-md"> </div><div class="w-2 h-2 border-b-2 border-l-2 absolute bottom-0 left-0 rounded-bl-md"> </div><div class="w-2 h-2 border-b-2 border-r-2 absolute bottom-0 right-0 rounded-br-md"> </div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-help-icon lucide-circle-help"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>`,
                isUpgrade: false,
            },
            {
                text: 'Contact form',
                icon: `<div class="w-2 h-2 border-t-2 border-l-2 absolute top-0 left-0 rounded-tl-md"> </div><div class="w-2 h-2 border-t-2 border-r-2 absolute top-0 right-0 rounded-tr-md"> </div><div class="w-2 h-2 border-b-2 border-l-2 absolute bottom-0 left-0 rounded-bl-md"> </div><div class="w-2 h-2 border-b-2 border-r-2 absolute bottom-0 right-0 rounded-br-md"> </div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
                isUpgrade: false
            }
        ]
    },
    {
        title: "Navigation",
        isTextShow: true,
        widget: [
            {
                text: 'Prev page',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>`,
                isUpgrade: false,
            },
            {
                text: 'Next page',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>`,
                isUpgrade: false,
            },
            {
                text: 'Go to page',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>`,
                isUpgrade: false
            },
            {
                text: 'First page',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-first-icon lucide-chevron-first"><path d="m17 18-6-6 6-6"/><path d="M7 6v12"/></svg>`,
                isUpgrade: false
            },
            {
                text: 'Last page',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-last-icon lucide-chevron-last"><path d="m7 18 6-6-6-6"/><path d="M17 6v12"/></svg>`,
                isUpgrade: false
            }
        ]
    },
    {
        title: "Social",
        isTextShow: false,
        widget: [
            {
                icon: `<svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="margin: auto"><path d="M17.9971687 8.09164113c-.162333.01588057-.3253081.02420317-.4884041.02494121-1.7889453.00025143-3.4574423-.90754798-4.4373985-2.41430913v8.22133539C13.0713661 17.2795069 10.3690988 20 7.03568306 20 3.70226735 20 1 17.2795069 1 13.9236086c0-3.3558982 2.70226735-6.07639133 6.03568306-6.07639133.12599409 0 .24915685.0114017.37302744.01924037V10.860828c-.12387059-.0149647-.24561769-.0377681-.37302744-.0377681-1.7013047 0-3.08048466 1.388482-3.08048466 3.1012613 0 1.7127794 1.37917996 3.1012614 3.08048466 3.1012614 1.70162801 0 3.20435524-1.3496758 3.20435524-3.0627806L10.2697672 0h2.8454845C13.3835704 2.56889818 15.4410719 4.57544293 18 4.76377111v3.32787002" fill="#ffffff" fill-rule="nonzero"></path></svg>`,
                isUpgrade: false,
            },
            {
                icon: `<svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="margin: auto"><path d="M10.3964063 0C4.91515625 0 2.00015625 3.5125 2.00015625 7.3425c0 1.77625.9925 3.99125 2.58125 4.69375.24125.10875.3725.0625.42625-.16125.0475-.17.25625-.98875.3575-1.375.03125-.12375.015-.23125-.085-.3475-.5275-.61-.94625-1.72125-.94625-2.76375 0-2.67125 2.12375-5.265 5.73750005-5.265 3.125 0 5.31125 2.03 5.31125 4.93375 0 3.28125-1.73625 5.55125-3.9925 5.55125-1.24875 0-2.17875005-.98-1.88375005-2.1925.35625-1.44375 1.05500005-2.99625 1.05500005-4.0375 0-.93375-.5275-1.70625-1.60500005-1.70625-1.27125 0-2.3025 1.25875-2.3025 2.94875 0 1.07375.38 1.79875.38 1.79875s-1.2575 5.08-1.49125 6.02875c-.395 1.60625.05375 4.2075.0925 4.43125.02375.12375.1625.1625.24.06125.12375-.1625 1.64375-2.33125 2.07-3.89875.155-.57125.79125-2.8875.79125-2.8875.41875.75625 1.62750005 1.39 2.91500005 1.39 3.83 0 6.5975-3.36625 6.5975-7.54375-.01375-4.005-3.44125-7.00125-7.8525-7.00125z" fill="#ffffff" fill-rule="nonzero"></path></svg>`,
                isUpgrade: false,
            },
            {
                icon: `<svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="margin: auto"><path d="M20 10.1594488c0-1.22244093-.9841828-2.21456691-2.1968366-2.21456691-.5975395 0-1.1247803.23031496-1.5114235.62007874-1.4938489-1.08070866-3.5676626-1.78937008-5.8523726-1.87795276l1.0017575-4.73031496 3.2513181.69094489c.0351494.83267716.7205624 1.50590551 1.5641476 1.50590551.8611599 0 1.5641476-.70866142 1.5641476-1.57677166C17.8207381 1.70866142 17.1177504 1 16.2565905 1c-.6151142 0-1.142355.35433071-1.3884007.88582677l-3.6379613-.77952756c-.1054482-.01771653-.2108963 0-.2987698.05314961-.0878735.05314961-.1405975.14173228-.1757469.24803149L9.64850615 6.68700787c-2.33743409.07086615-4.42882249.76181103-5.94024604 1.87795276-.38664324-.37204724-.9314587-.62007874-1.51142355-.62007874C.98418278 7.94488189 0 8.93700787 0 10.1594488c0 .9035433.52724077 1.6653543 1.30052724 2.0196851-.03514938.2125984-.05272408.4429133-.05272408.6732283C1.24780316 16.253937 5.16695958 19 10.0175747 19c4.8506151 0 8.7697715-2.746063 8.7697715-6.1476378 0-.230315-.0175747-.4429134-.0527241-.6555118C19.4551845 11.8425197 20 11.0629921 20 10.1594488zM4.97363796 11.7362205c0-.8681103.7029877-1.5767717 1.56414763-1.5767717.86115993 0 1.56414763.7086614 1.56414763 1.5767717 0 .8681102-.7029877 1.5767716-1.56414763 1.5767716-.86115993 0-1.56414763-.7086614-1.56414763-1.5767716zm8.73462214 4.1633858C12.6362039 16.980315 10.5975395 17.0511811 10 17.0511811c-.59753954 0-2.65377856-.0885827-3.70826011-1.1515748-.15817223-.1594488-.15817223-.4251969 0-.5846457.15817224-.1594488.42179262-.1594488.57996486 0 .66783831.6732284 2.10896309.9212599 3.14586995.9212599 1.0369068 0 2.4604569-.2480315 3.1458699-.9212599.1581723-.1594488.4217927-.1594488.5799649 0 .1230228.1771654.1230228.4251969-.0351494.5846457zm-.2811951-2.5866142c-.8611599 0-1.5641476-.7086614-1.5641476-1.5767716 0-.8681103.7029877-1.5767717 1.5641476-1.5767717.86116 0 1.5641477.7086614 1.5641477 1.5767717 0 .8681102-.7029877 1.5767716-1.5641477 1.5767716z" fill="#ffffff" fill-rule="nonzero"></path></svg>`,
                isUpgrade: false
            },
            {
                icon: `<svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="margin: auto"><path d="M10 0C4.48625 0 0 4.48625 0 10s4.48625 10 10 10 10-4.48625 10-10S15.51375 0 10 0zm4.5875 14.435c-.1225.17375-.315.26625-.51125.26625-.125 0-.25-.03625-.35875-.11375-2.34375-1.6475-6.2425-1.73875-8.875-1.125-.33375.07875-.6725-.13125-.75-.4675-.0775-.33625.13-.6725.4675-.75125 2.89375-.67 7.21875-.5475 9.875 1.32125.2825.19875.35.5875.1525.87zm1.22-2.43875c-.1225.17-.31375.26-.5075.26-.1275 0-.25375-.0375-.365-.1175C12.21625 10.1875 8.87625 9.7025 4.41875 10.6125c-.33625.06625-.66875-.14875-.7375-.4875-.07-.3375.14875-.66875.48625-.7375 4.82125-.98375 8.47375-.43375 11.49625 1.735.28.2025.345.5925.14375.87375zm1.2325-3.275c-.12125.17875-.31875.27375-.5175.27375-.12125 0-.24375-.035-.35125-.1075-3.44625-2.33875-8.685-2.35-12.07625-1.15-.325.1125-.6825-.05625-.7975-.3825-.115-.325.055-.6825.38125-.7975 3.68875-1.30375 9.405-1.27625 13.19625 1.295.285.19375.3575.5825.165.86875z" fill="#ffffff" fill-rule="nonzero"></path></svg>`,
                isUpgrade: false
            },
            {
                icon: `<svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="margin: auto"><path d="M19.15 5.25272727c-.5425-.91236363-1.13125-1.08018182-2.33-1.144C15.6225 4.03190909 12.61125 4 10.0025 4c-2.61375 0-5.62625.03190909-6.8225.10754545-1.19625.065-1.78625.23163637-2.33375 1.14518182C.2875 6.16390909 0 7.73336364 0 10.4964545v.0094546c0 2.7512727.2875 4.3325454.84625 5.2342727.5475.9123637 1.13625 1.0778182 2.3325 1.1546364C4.37625 16.961 7.38875 17 10.0025 17c2.60875 0 5.62-.039 6.81875-.104 1.19875-.0768182 1.7875-.2422727 2.33-1.1546364.56375-.9017272.84875-2.483.84875-5.2342727v-.0059091-.0035454c0-2.76427276-.285-4.33372731-.85-5.24490913zM7.5 14.0454545V6.95454545L13.75 10.5 7.5 14.0454545z" fill="#ffffff" fill-rule="nonzero"></path></svg>`,
                isUpgrade: false
            },
            {
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14.0173188 0C17.2968478 0 19.965 2.66811594 19.965 5.94768116v8.06963764c0 3.2795653-2.6681159 5.9476812-5.9476812 5.9476812H5.94768116C2.66811594 19.965 0 17.2968841 0 14.0173188V5.94768116C0 2.66811594 2.66811594 0 5.94768116 0zm0 2.00847826H5.94768116c-2.17554348 0-3.9392029 1.76362319-3.9392029 3.9392029v8.06963764c0 2.1755435 1.76365942 3.9392029 3.9392029 3.9392029h8.06963764c2.1755435 0 3.9392029-1.7636594 3.9392029-3.9392029V5.94768116c0-2.17557971-1.7636594-3.9392029-3.9392029-3.9392029zM9.9825 4.81884058c2.8472464 0 5.1636594 2.31637681 5.1636594 5.16362319 0 2.84724633-2.316413 5.16365943-5.1636594 5.16365943-2.84724638 0-5.16365942-2.3164493-5.16365942-5.16365943 0-2.84721015 2.31641304-5.16362319 5.16365942-5.16362319zm0 2.00847826c-1.74253623 0-3.15518116 1.4126087-3.15518116 3.15518116 0 1.7425725 1.4126087 3.1551812 3.15518116 3.1551812 1.7425362 0 3.1551812-1.412645 3.1551812-3.1551812 0-1.74257246-1.4126087-3.15518116-3.1551812-3.15518116zm5.1736594-3.20702898c.6833523 0 1.2373189.55396651 1.2373189 1.23731884 0 .68335232-.5539666 1.23731884-1.2373189 1.23731884s-1.2373188-.55396652-1.2373188-1.23731884c0-.68335233.5539665-1.23731884 1.2373188-1.23731884z" fill="#ffffff" fill-rule="nonzero"></path></svg>`,
                isUpgrade: false,
            },
            {
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 0c5.6338028 0 10 4.12681288 10 9.70032417 0 5.57351133-4.3661972 9.70032413-10 9.70032413-1.01207243 0-1.98390342-.1327984-2.89537223-.3843107-.17706238-.0482903-.36418511-.0342056-.5331992.040242l-1.98390342.8752626c-.51911469.2273671-1.10462777-.1408469-1.12273642-.7082585l-.05432595-1.7786946c-.00804829-.2193186-.10663984-.4225405-.26961771-.5694237C1.19517103 15.1350007 0 12.6158541 0 9.70032417 0 4.12681288 4.36619718 0 10 0zm5.9224704 7.46814307c.2823356-.44591213-.2663166-.95007404-.684814-.63070454l-3.1397318 2.3902497c-.2122523.16068905-.5045998.16269767-.7188545.00200861L9.05430694 7.48019475c-.69682825-.52424804-1.6940135-.33945563-2.15856566.39971403L3.97226646 12.5318569c-.28233558.4459122.26631654.9500741.68481397.6307046l3.14173424-2.3922583c.21225228-.1606891.50459976-.1626977.71885442-.0020087l2.32476321 1.7495021c.6968282.5242481 1.6940135.3394557 2.1585656-.399714z" fill="#ffffff" fill-rule="evenodd"></path></svg>`,
                isUpgrade: false,
            },
            {
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.25 6.875v-2.5c0-.69.56-1.25 1.25-1.25h1.25V0h-2.5C9.17875 0 7.5 1.67875 7.5 3.75v3.125H5V10h2.5v10h3.75V10h2.5L15 6.875h-3.75z" fill="#ffffff" fill-rule="nonzero"></path></svg>`,
                isUpgrade: false
            },
            {
                icon: `<svg width="24" height="24" viewBox="0 0 24 23" xmlns="http://www.w3.org/2000/svg"><path d="M4.4725 6.25V20H0V6.25h4.4725zm6.25 0v2.62875c.545-.7325 2.19875-2.62875 4.80625-2.62875.305 0 .565.03375.8025.08125.06125.01.12125.02125.18125.035.05.01375.095.03.1425.045 1.92125.50125 3.345 2.2325 3.345 4.31V20h-4.47125v-8.75C14.1025 7.7925 10.7225 12.5 10.7225 12.5V20H6.25V6.25h4.4725zM2.1875 0C3.39562289 0 4.375.97937711 4.375 2.1875c0 1.20812289-.97937711 2.1875-2.1875 2.1875C.97937711 4.375 0 3.39562289 0 2.1875 0 .97937711.97937711 0 2.1875 0z" fill="#ffffff" fill-rule="nonzero"></path></svg>`,
                isUpgrade: false
            },
            {
                icon: `<svg width="24" height="24" viewBox="0 0 24 22" xmlns="http://www.w3.org/2000/svg"><path d="M1.016.667 7.89 9.859.972 17.333H2.53l6.057-6.543 4.894 6.543h5.3l-7.263-9.71 6.44-6.956H16.4l-5.578 6.026L6.314.667H1.016Zm2.29 1.147H5.74l10.749 14.372h-2.434L3.305 1.814Z" fill="#ffffff" fill-rule="nonzero"></path></svg>`,
                isUpgrade: false
            },
            {
                icon: `<svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="margin: auto"><path d="M19.9082668 14.3927015c-.1385415-.3785499-.4039167-.5795326-.704415-.7473434-.0565874-.0331719-.1092722-.0604899-.1522005-.0800028-.0897593-.0468309-.1814698-.0917106-.2731803-.1385415-.9385697-.4975785-1.672254-1.1258932-2.1795889-1.869334-.1717134-.2517162-.290742-.4780656-.3746473-.663438-.0429284-.1248824-.0409771-.1951288-.0097565-.2595213.0234155-.0487822.0858567-.0995157.1209799-.1248825.1619569-.1073208.3278164-.2146417.4409911-.2868393.2009827-.1307363.3609883-.23415461.4624553-.30440099.3863551-.26927776.6556328-.55611712.8234436-.87612838.2380572-.45074756.2673265-.96588764.0839054-1.4498071-.2536675-.67124313-.8897874-1.08881879-1.6585949-1.08881879-.1600057 0-.3219626.01756159-.4819682.05268478-.0429284.00975644-.0839054.01951288-.1248825.02926932.0078052-.45660143-.0039025-.94442347-.0448796-1.42053778-.1443953-1.67810782-.731733-2.55813878-1.3444375-3.25865123-.2556188-.29269322-.7005125-.72002533-1.367853-1.1024778C12.1928734.26927776 11.1391778 0 9.98986908 0c-1.14540615 0-2.19910175.26927777-3.1298662.80197943-.67124313.38245248-1.11613683.81173588-1.36980429 1.10247781-.61270448.70051245-1.20004222 1.58054341-1.34443754 3.25865123-.04097705.47611431-.0507335.96393635-.04487963 1.42053778-.04097705-.00975644-.08390539-.01951288-.12488244-.02926932-.16000563-.03512319-.32391384-.05268478-.48196818-.05268478-.76880753 0-1.40492747.41757566-1.65859493 1.08881879-.18342109.48391946-.15415177.99905954.08390539 1.4498071.16781078.32001126.43903983.60685062.8234436.87612839.10341827.07219766.26147261.17561597.46245529.30440097.10927214.0702464.26732648.1736646.42342953.2770829.02341546.0156103.10732085.0780515.13659018.1365902.03317189.0663438.03317189.1385414-.01561031.271229-.0819541.1814698-.20098268.4039167-.36879346.649779-.49757848.7278305-1.20979866 1.3444375-2.11714765 1.8361621-.48196818.2556188-.98149795.4253809-1.19223707.9990596-.16000563.4331859-.05463607.9268619.34928058 1.3424862.1326876.1424441.30049838.2692778.5112375.3863551.49562719.2731803.91710543.4078192 1.24882442.4995298.05853864.0175615.19317753.0604899.25171617.1131747.1482979.128785.12683373.3239138.32391384.6088019.11902857.1775672.25561875.2985471.36879346.3765986.4117218.2848881.87612838.3024497 1.367853.3219625.44294241.0175616.94637476.0370745 1.52005348.2263495.23805715.0780515.48587075.230252.77075882.4058679.68685343.4234295 1.62932561 1.0010108 3.20401516 1.0010108 1.5766408 0 2.5230156-.5814838 3.2157229-1.0049134.2848881-.1736646.5307504-.3258651.7610024-.4019653.5736787-.189275 1.077111-.2087879 1.5200534-.2263495.4917247-.0195128.95418-.0370744 1.367853-.3219625.1287851-.0897593.2926933-.2361059.4214783-.4585527.1404927-.2400085.1385414-.4097705.271229-.5248965.0546361-.046831.1736647-.087808.2380572-.1073209.3336703-.0917105.7610024-.2263494 1.266386-.5053836.2243981-.1229312.3980628-.2575701.5366043-.4117218l.0058538-.0058539c.3765986-.4097705.4722118-.8878361.3161087-1.3112656z" fill="#ffffff" fill-rule="nonzero"></path></svg>`,
                isUpgrade: false
            },
            {
                icon: `<svg width="100%" height="100%" viewBox="0 0 24 26" xmlns="http://www.w3.org/2000/svg" style="margin: auto"><path d="M17.0859 3.87197C15.2061 1.98972 12.7059 0.952615 10.042 0.95166C4.55283 0.95166 0.08547 5.41855 0.08356 10.9092C0.082605 12.6644 0.54147 14.3776 1.41288 15.8874L0 21.0481L5.27909 19.6634C6.7335 20.457 8.37128 20.8748 10.0377 20.8753H10.042C15.5302 20.8753 19.9981 16.4079 20 10.9173C20.0009 8.25627 18.9662 5.7547 17.0859 3.87244V3.87197ZM10.042 19.1935H10.0387C8.55367 19.1931 7.09689 18.7939 5.82583 18.0399L5.52357 17.8604L2.39078 18.6822L3.22686 15.6277L3.03013 15.3144C2.20169 13.9966 1.76383 12.4734 1.76479 10.9097C1.7667 6.3463 5.47963 2.63337 10.0454 2.63337C12.2561 2.63432 14.3342 3.49619 15.8969 5.06091C17.4598 6.62516 18.3197 8.7051 18.3188 10.9163C18.3168 15.4802 14.6039 19.1931 10.042 19.1931V19.1935ZM14.5819 12.9948C14.3332 12.8702 13.1099 12.2685 12.8816 12.1855C12.6534 12.1024 12.4877 12.0609 12.322 12.3101C12.1563 12.5594 11.6793 13.1199 11.5342 13.2856C11.389 13.4518 11.2438 13.4723 10.9951 13.3477C10.7463 13.223 9.94461 12.9604 8.99394 12.1129C8.25433 11.453 7.75483 10.6384 7.60972 10.3892C7.46456 10.1399 7.59444 10.0053 7.71856 9.8816C7.83028 9.76988 7.96733 9.59083 8.09194 9.44566C8.21661 9.30049 8.25767 9.19644 8.34072 9.03072C8.42383 8.86455 8.38228 8.71944 8.32022 8.59477C8.25811 8.47016 7.76061 7.24538 7.55289 6.74738C7.35089 6.26227 7.14561 6.32816 6.99328 6.32004C6.84811 6.31288 6.68244 6.31145 6.51628 6.31145C6.35011 6.31145 6.08078 6.37352 5.85256 6.62277C5.62433 6.87199 4.98162 7.4741 4.98162 8.69838C4.98162 9.92266 5.87311 11.1064 5.99772 11.2725C6.12233 11.4387 7.75244 13.9517 10.2483 15.0299C10.8418 15.2863 11.3054 15.4395 11.6669 15.5542C12.2628 15.7437 12.8052 15.717 13.234 15.653C13.712 15.5814 14.7061 15.0509 14.9133 14.4698C15.1206 13.8887 15.1206 13.3902 15.0585 13.2865C14.9964 13.1829 14.8303 13.1204 14.5815 12.9958L14.5819 12.9948Z" fill="#ffffff"></path></svg>`,
                isUpgrade: false
            }
        ]
    },
    {
        title: "Other",
        isTextShow: false,
        widget: [
            {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag-icon lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
                isUpgrade: false,
            },
            {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-basket-icon lucide-shopping-basket"><path d="m15 11-1 9"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/><path d="M4.5 15.5h15"/><path d="m5 11 4-7"/><path d="m9 11 1 9"/></svg>`,
                isUpgrade: false,
            },
            {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card-icon lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`,
                isUpgrade: false
            }
        ]
    },
]

const svgItems = {
    "icon-1": `<svg id="icon-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55" class="fill-svg" stroke="none" preserveAspectRatio="none">
                        <path fill-rule="evenodd" d="M0 0h55v55H0z"/>
                    </svg>`,
    "icon-2": `<svg id="icon-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55" class="stroke-svg" fill="none" preserveAspectRatio="none">
                    <path fill-rule="evenodd" stroke-width="2" d="M1 1h53v53H1z"/>
                    </svg>`,
    "icon-5": `<svg id="icon-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55" class="fill-svg" stroke="none" preserveAspectRatio="none">
                    <path d="M5,0 H50 A5,5 0 0 1 55,5 V50 A5,5 0 0 1 50,55 H5 A5,5 0 0 1 0,50 V5 A5,5 0 0 1 5,0 Z"/>
                </svg>`,
    "icon-6": `<svg id="icon-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55" class="stroke-svg" fill="none" preserveAspectRatio="none">
  <path d="M6,1 H49 A5,5 0 0 1 54,6 V49 A5,5 0 0 1 49,54 H6 A5,5 0 0 1 1,49 V6 A5,5 0 0 1 6,1 Z" stroke-width="2"/>
</svg>
`,
    "icon-9": `<svg id="icon-9" xmlns="http://www.w3.org/2000/svg" class="fill-svg" stroke="none" viewBox="0 0 55 55" preserveAspectRatio="none">
                <path fill-rule="evenodd" d="M27.5 0L55 55H0z"/>
            </svg>`,
    "icon-10": `<svg id="icon-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55" class="stroke-svg" fill="none" preserveAspectRatio="none">
                <path fill-rule="evenodd" stroke-width="2" d="M27.5 2.236L1.618 54h51.764L27.5 2.236z"/>
            </svg>`,
    "icon-13": `<svg id="icon-13" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55" class="fill-svg" stroke="none" preserveAspectRatio="none">
    <path d="M27.5,0 A27.5,27.5 0 1,0 27.5,55 A27.5,27.5 0 1,0 27.5,0" fill-rule="evenodd"/>
</svg>`,
    "icon-14": `<svg id="icon-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55" class="stroke-svg" fill="none" preserveAspectRatio="none">
    <path d="M27.5,27.5 m-24.5,0 a24.5,24.5 0 1,0 49,0 a24.5,24.5 0 1,0 -49,0" stroke-width="2" fill-rule="evenodd"/>
</svg>`,
    "icon-33": `<svg id="icon-33" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 55 55" class="fill-svg" stroke="none">
    <path style="fill-rule:evenodd;clip-rule:evenodd;" d="M54.813,26.804c-0.301-1.171-1.322-2.143-1.456-3.225
        c-0.016-0.133-0.046-0.260-0.089-0.385c-0.001-0.120-0.014-0.238-0.040-0.356c-0.225-1.069,0.426-2.310,0.331-3.525
        c-0.044-0.570-0.169-1.121-0.381-1.655c-0.198-0.532-0.474-1.027-0.823-1.481c-0.736-0.960-2.056-1.456-2.602-2.400
        c-0.066-0.114-0.145-0.222-0.234-0.319c-0.046-0.109-0.105-0.214-0.175-0.312c-0.627-0.896-0.511-2.292-1.073-3.373
        c-0.265-0.508-0.596-0.967-0.996-1.376c-0.391-0.412-0.838-0.759-1.336-1.039c-1.060-0.601-2.459-0.536-3.332-1.192
        c-0.107-0.080-0.220-0.149-0.341-0.203c-0.088-0.083-0.183-0.156-0.285-0.220c-0.924-0.579-1.372-1.914-2.306-2.684
        c-0.442-0.364-0.926-0.658-1.456-0.877c-0.521-0.228-1.069-0.372-1.637-0.436c-1.211-0.138-2.474,0.468-3.536,0.204
        c-0.127-0.031-0.259-0.050-0.391-0.053c-0.111-0.042-0.229-0.072-0.347-0.092c-1.078-0.171-2.012-1.225-3.173-1.569
        C28.586,0.077,28.027-0.004,27.454,0c-0.567-0.004-1.127,0.077-1.677,0.238c-1.116,0.331-1.925,1.240-2.922,1.515
        c-1.029,0.064-2.060-0.495-3.217-0.422c-0.571,0.037-1.124,0.153-1.663,0.356c-0.535,0.191-1.033,0.459-1.493,0.801
        c-0.926,0.689-1.353,1.776-2.175,2.392c-0.944,0.390-2.070,0.223-3.125,0.683c-0.497,0.218-0.975,0.516-1.410,0.884
        c-0.438,0.361-0.815,0.784-1.131,1.261c-0.672,1.015-0.703,2.411-1.416,3.239c-0.051,0.057-0.095,0.118-0.137,0.180
        c-0.030,0.035-0.059,0.070-0.086,0.107c-0.656,0.873-2.018,1.200-2.869,2.074c-0.399,0.410-0.732,0.867-0.995,1.376
        c-0.270,0.500-0.459,1.033-0.570,1.595c-0.238,1.193,0.261,2.501-0.093,3.536c-0.042,0.128-0.070,0.257-0.085,0.389
        c-0.051,0.111-0.092,0.225-0.122,0.344c-0.261,1.061-1.386,1.894-1.828,3.029c-0.208,0.534-0.335,1.085-0.378,1.656
        c-0.053,0.566-0.018,1.131,0.099,1.690c0.247,1.192,1.219,2.199,1.300,3.289c0.015,0.209,0.065,0.409,0.150,0.597
        c-0.031,0.195-0.027,0.395,0.008,0.593c0.192,1.074-0.496,2.295-0.437,3.511c0.026,0.573,0.135,1.128,0.328,1.667
        c0.182,0.537,0.442,1.039,0.776,1.504c0.713,0.989,2.012,1.515,2.530,2.477c0.043,0.082,0.094,0.161,0.150,0.235
        c0.031,0.065,0.066,0.128,0.106,0.190c0.587,0.920,0.422,2.317,0.937,3.413c0.243,0.519,0.556,0.990,0.941,1.414
        c0.374,0.428,0.807,0.793,1.294,1.094c1.036,0.642,2.435,0.633,3.282,1.327c0.037,0.030,0.074,0.058,0.114,0.085
        c0.785,0.689,1.099,1.905,1.951,2.717c0.416,0.396,0.878,0.721,1.390,0.978c0.502,0.263,1.038,0.445,1.604,0.551
        c1.196,0.223,2.498-0.291,3.538,0.046c0.126,0.041,0.256,0.068,0.385,0.082c0.111,0.050,0.224,0.088,0.343,0.116
        c1.064,0.248,1.912,1.363,3.055,1.790c0.535,0.201,1.088,0.322,1.661,0.358c0.564,0.045,1.132,0.003,1.691-0.120
        c1.190-0.262,2.186-1.244,3.275-1.339c0.134-0.011,0.263-0.037,0.388-0.077c0.120,0.003,0.240-0.006,0.358-0.026
        c1.077-0.188,2.294,0.507,3.511,0.455c0.574-0.024,1.128-0.128,1.669-0.318c0.539-0.179,1.043-0.439,1.509-0.769
        c0.992-0.706,1.527-2.001,2.493-2.513c0.116-0.063,0.224-0.137,0.326-0.222c0.111-0.043,0.219-0.099,0.319-0.164
        c0.920-0.593,2.309-0.430,3.411-0.953c0.519-0.246,0.987-0.560,1.411-0.947c0.426-0.376,0.789-0.810,1.088-1.298
        c0.638-1.037,0.622-2.437,1.311-3.285c0.083-0.104,0.156-0.214,0.214-0.331c0.085-0.084,0.163-0.177,0.231-0.276
        c0.612-0.906,1.957-1.297,2.767-2.209c0.380-0.428,0.690-0.901,0.928-1.422c0.244-0.512,0.410-1.054,0.494-1.620
        c0.180-1.204-0.381-2.488-0.079-3.536c0.037-0.127,0.058-0.257,0.068-0.388c0.045-0.110,0.081-0.225,0.104-0.344
        c0.210-1.073,1.295-1.960,1.682-3.114c0.181-0.544,0.284-1.099,0.298-1.673C55.020,27.926,54.958,27.359,54.813,26.804z"/>
</svg>`,
    "icon-41": `<svg id="icon-41" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38" preserveAspectRatio="none" class="stroke-svg" fill="none">
  <path fill-rule="evenodd" stroke-width="2" d="M22.988 36.054c-.962-.313-2.267-.102-3.04.344-1.519.876-2.964.808-4.348-.284-.734-.579-1.571-.799-2.496-.719-.751.066-1.492.077-2.195-.278-.673-.338-1.253-.777-1.588-1.464-.42-.86-1.077-1.343-2.009-1.586-1.539-.402-2.438-1.447-2.655-3.033-.138-1.003-.614-1.763-1.417-2.376-1.264-.965-1.725-2.257-1.34-3.811.274-1.11.176-2.161-.372-3.166-.813-1.492-.686-2.904.372-4.227.664-.83.866-1.764.754-2.807-.15-1.376.393-2.462 1.49-3.28.187-.139.395-.251.602-.36.749-.394 1.202-1.011 1.43-1.82.49-1.731 1.646-2.67 3.434-2.806.642-.048 1.061-.384 1.397-.889.639-.958 1.554-1.454 2.681-1.6.397-.05.783.005 1.153.113.773.227 1.45.12 2.11-.37.833-.621 1.793-.747 2.805-.547.407.08.782.237 1.109.475.987.719 2.062.847 3.243.642 1.363-.237 2.533.237 3.312 1.362.736 1.063 1.648 1.702 2.91 2.004 1.371.328 2.237 1.292 2.5 2.682.218 1.159.769 2.027 1.721 2.72 1.24.903 1.7 2.174 1.365 3.67-.248 1.104-.049 2.075.524 3.036.771 1.296.76 2.634-.124 3.87-.699.978-.905 2.009-.738 3.181.2 1.397-.338 2.557-1.5 3.3-1.08.69-1.74 1.574-2.08 2.802-.372 1.349-1.333 2.18-2.71 2.404-1.188.193-2.136.686-2.854 1.669-.673.92-2.263 1.534-3.446 1.149z"/>
</svg>`,
    "icon-21": `<svg id="icon-21" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54" class="fill-svg" stroke="none" preserveAspectRatio="none">
    <path fill-rule="evenodd" d="M53.968 33.946c0 .16-4.752 8.524-7.075 12.542-.076.132-8.434 4.968-12.488 7.277-.142.08-9.74.134-14.365.127-.156 0-8.586-4.753-12.642-7.078-.126-.072-4.964-8.436-7.28-12.501-.075-.132-.124-9.71-.117-14.34 0-.16 4.743-8.572 7.062-12.614.085-.147 8.454-4.999 12.5-7.303.141-.08 14.82-.072 14.969.013 4.003 2.3 12.289 7.143 12.373 7.29 2.319 4.041 4.632 8.087 6.939 12.136.08.14.13 5.135.13 7.464 0 2.33.002 4.658-.006 6.987z"/>
</svg>
`, "icon-22": `<svg id="icon-22" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55" class="stroke-svg" fill="none" preserveAspectRatio="none">
    <path fill-rule="evenodd" stroke-width="2" d="M53.634 34.72c.005-1.562.006-2.812.005-5.624v-1.359c0-1.233-.014-3.065-.035-4.539-.012-.819-.026-1.504-.04-1.997a23.549 23.549 0 0 0-.025-.611c-2.325-4.08-4.6-8.058-6.836-11.956.116.203.018.13.205.254a11.197 11.197 0 0 0-.258-.164 76.248 76.248 0 0 0-1-.608c-.813-.487-1.95-1.16-3.303-1.955-2.533-1.487-5.61-3.276-7.648-4.447.219.126-.068.104.266.117a24.132 24.132 0 0 0-.468-.012c-.4-.008-.973-.015-1.69-.021a720.673 720.673 0 0 0-5.098-.02c-1.9-.001-3.735.003-5.096.012-.716.005-1.289.01-1.69.018-.204.003-.361.007-.467.011.358-.013.047.01.268-.116a1041.033 1041.033 0 0 0-7.727 4.456A445.48 445.48 0 0 0 9.66 8.117c-.436.26-.777.465-1.01.61-.116.071-.204.127-.26.164.19-.126.089-.051.206-.256-1.172 2.043-2.94 5.16-4.396 7.754a475.294 475.294 0 0 0-1.88 3.374 82.36 82.36 0 0 0-.562 1.034c-.064.12-.112.213-.142.274.105-.212.05-.085.05-.318-.003 2.364.008 5.922.028 8.848.011 1.567.025 2.885.039 3.83.008.502.016.894.024 1.166.004.135.008.238.012.305-.015-.251.001-.1-.116-.306 1.178 2.067 2.97 5.18 4.457 7.74a513.265 513.265 0 0 0 1.95 3.335c.257.436.46.775.603 1.008.071.117.126.205.163.262-.152-.234-.052-.094-.265-.217 2.061 1.182 5.188 2.954 7.776 4.407 1.38.775 2.543 1.424 3.38 1.884.445.245.794.435 1.036.563.12.065.213.113.274.143-.221-.11-.086-.05-.32-.05 2.367.003 5.93-.01 8.854-.032 1.572-.011 2.892-.025 3.839-.04a80.29 80.29 0 0 0 1.17-.026l.306-.013c-.23.014-.1 0-.3.114 2.057-1.172 5.165-2.961 7.728-4.45a493.409 493.409 0 0 0 3.331-1.95 84.97 84.97 0 0 0 1.009-.605c.116-.07.204-.126.26-.163-.218.143-.091.051-.212.26 1.173-2.028 2.943-5.126 4.405-7.71a469.353 469.353 0 0 0 1.883-3.354c.245-.442.434-.788.563-1.029.064-.12.112-.212.142-.272-.105.21-.05.086-.051.318z"/>
</svg>
`,
    "icon-25": `<svg xmlns="http://www.w3.org/2000/svg" id="icon-25" viewBox="0 0 55 55" preserveAspectRatio="none" class="fill-svg" stroke="none">
  <path d="M27.5,0 L55,15 L55,40 L27.5,55 L0,40 L0,15 Z" >
</svg>
`,
    "icon-26": `<svg id="icon-26" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55" preserveAspectRatio="none" class="stroke-svg" fill="none">
  <path d="M27.5,2 L53,15 L53,40 L27.5,53 L2,40 L2,15 Z" stroke-width="2"/>
</svg>
`,
    "icon-29": `<svg id="icon-29" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55" preserveAspectRatio="none" class="fill-svg" stroke="none">
    <path fill-rule="evenodd" d="M27.5 55L0 27.5 27.5 0l27.5 27.5z"/>
</svg>
`,
    "icon-30": `<svg id="icon-30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55" preserveAspectRatio="none" class="stroke-svg" fill="none">
  <path fill-rule="evenodd" d="M27.5 55L0 27.5 27.5 0l27.5 27.5z"/>
</svg>
`,
    "icon-4": `<svg version="1.1" id="icon-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" viewBox="0 0 51 51" enable-background="new 0 0 51 51" xml:space="preserve" class="fill-svg" stroke="none">
    <path d="M49,2v47H2V2H49 M51,0H0v51h51V0L51,0z"/>
    <path d="M47,47H4V4h43V47z"/>
</svg>
`,
    "icon-8": `<svg version="1.1" id="icon-8" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" viewBox="0 0 51 51" enable-background="new 0 0 51 51" xml:space="preserve" class="fill-svg" stroke="none">
    <path d="M46,2c1.7,0,3,1.3,3,3v41c0,1.7-1.3,3-3,3H5c-1.7,0-3-1.3-3-3V5c0-1.7,1.3-3,3-3H46 M46,0H5C2.2,0,0,2.2,0,5v41c0,2.8,2.2,5,5,5h41c2.8,0,5-2.2,5-5V5C51,2.2,48.8,0,46,0L46,0z"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9,4h33c2.8,0,5,2.2,5,5v33c0,2.8-2.2,5-5,5H9c-2.8,0-5-2.2-5-5V9C4,6.2,6.2,4,9,4z"/>
</svg>
`,
    "icon-12": `<svg version="1.1" id="icon-12" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" viewBox="0 0 45 45" enable-background="new 0 0 45 45" xml:space="preserve" class="fill-svg" stroke="none">
    <path d="M22.5,4.5L41.8,43H3.2L22.5,4.5 M22.5,0L0,45h45L22.5,0L22.5,0z"/>
    <path d="M7,41L22.5,9L38,41H7z"/>
</svg>
`,
    "icon-16": `<svg version="1.1" id="icon-16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" viewBox="0 0 51 51" enable-background="new 0 0 51 51" xml:space="preserve" class="fill-svg" stroke="none">
    <path d="M25.5,2C38.5,2,49,12.5,49,25.5S38.5,49,25.5,49S2,38.5,2,25.5S12.5,2,25.5,2 M25.5,0C11.4,0,0,11.4,0,25.5S11.4,51,25.5,51S51,39.6,51,25.5S39.6,0,25.5,0L25.5,0z"/>
    <path  d="M25.5,4C37.4,4,47,13.6,47,25.5S37.4,47,25.5,47S4,37.4,4,25.5S13.6,4,25.5,4z"/>
</svg>
`,
    "icon-24": `<svg version="1.1" id="icon-24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" viewBox="0 0 51 51" enable-background="new 0 0 51 51" xml:space="preserve" class="fill-svg" stroke="none">
    <path d="M31.8,2l10.9,6.3L49,19.2v12.6l-6.3,10.9L31.8,49H19.2L8.3,42.7L2,31.8V19.2L8.3,8.3L19.2,2H31.8 M32.3,0
        H18.7L6.8,6.8L0,18.7v13.7l6.8,11.8L18.7,51h13.7l11.8-6.8L51,32.3V18.7L44.2,6.8L32.3,0L32.3,0z"/>
    <path d="M19.7,47l-10-5.8L4,31.3V19.7l5.8-10l10-5.8h11.5l10,5.8l5.8,10v11.5l-5.8,10l-10,5.8H19.7z"/>
</svg>
`,
    "icon-28": `<svg version="1.1" id="icon-28" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 40 58" enable-background="new 0 0 40 58" xml:space="preserve" class="fill-svg" stroke="none">
    <path d="M36,45.7L20,53L4,45.7V12.3L20,5l16,7.3V45.7z"/>
    <path d="M20,2.2l18,8.2v37.1l-18,8.2L2,47.6V10.4L20,2.2 M20,0L0,9.2v39.7L20,58l20-9.2V9.2L20,0L20,0z"/>
</svg>
`,
    "icon-32": `<svg version="1.1" id="icon-32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 63 34" enable-background="new 0 0 63 34" xml:space="preserve" class="fill-svg" stroke="none">
    <path d="M31.5,2.3L58.8,17L31.5,31.7L4.2,17L31.5,2.3 M31.5,0L0,17l31.5,17L63,17L31.5,0L31.5,0z"/>
    <path d="M55,17L31,29L8,17L31,5L55,17z"/>
</svg>
`,
    "icon-42": `<svg version="1.1" id="icon-42" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 51 51" style="enable-background:new 0 0 51 51;" xml:space="preserve" class="fill-svg" stroke="none">
    <g>
        <path style="fill-rule:evenodd;clip-rule:evenodd;" d="M46.855,24.957c-0.236-0.915-1.035-1.675-1.138-2.521
            c-0.012-0.104-0.037-0.203-0.07-0.301c-0.001-0.094-0.011-0.186-0.031-0.278c-0.176-0.836,0.333-1.806,0.259-2.756
            c-0.035-0.446-0.133-0.877-0.297-1.294c-0.155-0.416-0.371-0.802-0.644-1.157c-0.575-0.751-1.607-1.138-2.034-1.876
            c-0.051-0.09-0.113-0.173-0.183-0.249c-0.036-0.086-0.082-0.167-0.137-0.244c-0.49-0.701-0.4-1.792-0.839-2.637
            c-0.207-0.398-0.466-0.756-0.779-1.076c-0.306-0.322-0.655-0.594-1.045-0.813c-0.829-0.469-1.922-0.419-2.606-0.933
            c-0.083-0.062-0.172-0.116-0.266-0.158c-0.069-0.065-0.143-0.122-0.223-0.172C36.1,8.039,35.75,6.995,35.02,6.393
            c-0.345-0.285-0.725-0.514-1.138-0.685c-0.408-0.178-0.836-0.291-1.28-0.341c-0.947-0.108-1.934,0.366-2.764,0.16
            c-0.1-0.025-0.202-0.039-0.306-0.041c-0.087-0.033-0.178-0.056-0.271-0.071c-0.843-0.134-1.573-0.958-2.482-1.227
            C26.35,4.06,25.912,3.997,25.464,4c-0.443-0.004-0.881,0.06-1.311,0.187c-0.873,0.259-1.505,0.97-2.285,1.185
            c-0.804,0.05-1.61-0.387-2.515-0.33c-0.447,0.029-0.88,0.12-1.3,0.278c-0.418,0.149-0.808,0.359-1.167,0.627
            c-0.724,0.539-1.059,1.389-1.701,1.87c-0.738,0.305-1.619,0.174-2.443,0.534c-0.411,0.179-0.787,0.412-1.128,0.703
            c-0.342,0.283-0.637,0.613-0.885,0.987c-0.525,0.795-0.549,1.888-1.109,2.534c-0.039,0.045-0.074,0.092-0.107,0.14
            c-0.024,0.027-0.046,0.055-0.067,0.083c-0.513,0.683-1.577,0.939-2.244,1.621c-0.312,0.32-0.573,0.678-0.778,1.076
            c-0.211,0.392-0.36,0.808-0.446,1.247c-0.187,0.933,0.204,1.956-0.072,2.765c-0.033,0.1-0.055,0.201-0.067,0.304
            c-0.04,0.087-0.072,0.176-0.095,0.269c-0.204,0.83-1.084,1.481-1.429,2.37c-0.163,0.417-0.262,0.848-0.296,1.295
            c-0.041,0.442-0.015,0.884,0.078,1.322c0.193,0.933,0.953,1.72,1.017,2.572c0.012,0.164,0.05,0.32,0.117,0.467
            c-0.024,0.153-0.021,0.309,0.006,0.464c0.15,0.84-0.387,1.794-0.341,2.745C4.915,31.764,5,32.198,5.151,32.619
            c0.143,0.42,0.346,0.813,0.607,1.176c0.558,0.773,1.573,1.184,1.978,1.937c0.034,0.064,0.073,0.125,0.117,0.184
            c0.024,0.05,0.051,0.101,0.083,0.148c0.46,0.719,0.329,1.812,0.732,2.669c0.19,0.406,0.435,0.774,0.735,1.105
            c0.293,0.334,0.631,0.619,1.012,0.855c0.81,0.502,1.904,0.495,2.567,1.037c0.029,0.023,0.058,0.045,0.089,0.066
            c0.614,0.539,0.859,1.489,1.525,2.124c0.325,0.309,0.686,0.564,1.086,0.765c0.393,0.206,0.812,0.349,1.253,0.431
            c0.935,0.174,1.953-0.228,2.767,0.036c0.099,0.032,0.2,0.053,0.301,0.064c0.087,0.039,0.175,0.069,0.268,0.091
            c0.833,0.194,1.495,1.066,2.388,1.4c0.419,0.157,0.851,0.252,1.298,0.28c0.441,0.035,0.885,0.003,1.322-0.093
            c0.931-0.205,1.709-0.973,2.561-1.047c0.104-0.009,0.205-0.029,0.303-0.06c0.094,0.003,0.188-0.005,0.28-0.021
            c0.843-0.146,1.793,0.397,2.745,0.355c0.448-0.018,0.882-0.1,1.305-0.249c0.422-0.14,0.816-0.343,1.18-0.602
            c0.776-0.553,1.194-1.565,1.949-1.965c0.091-0.048,0.175-0.107,0.255-0.173c0.087-0.034,0.171-0.078,0.249-0.128
            c0.719-0.464,1.805-0.336,2.667-0.745c0.405-0.192,0.772-0.438,1.103-0.74c0.333-0.294,0.617-0.633,0.851-1.015
            c0.499-0.811,0.487-1.906,1.026-2.569c0.065-0.081,0.122-0.167,0.167-0.259c0.067-0.066,0.127-0.138,0.18-0.216
            c0.479-0.708,1.53-1.015,2.163-1.728c0.296-0.335,0.539-0.704,0.726-1.112c0.191-0.401,0.32-0.825,0.386-1.266
            c0.141-0.941-0.298-1.945-0.062-2.766c0.029-0.099,0.046-0.201,0.053-0.304c0.035-0.086,0.063-0.176,0.081-0.269
            c0.164-0.839,1.013-1.533,1.316-2.435c0.142-0.425,0.222-0.859,0.233-1.307C47.016,25.832,46.967,25.389,46.855,24.957z"/>
        <g>
            <path d="M25.5,0v2c0.323,0,0.633,0.045,0.949,0.139c0.232,0.069,0.57,0.285,0.897,0.495
                c0.597,0.382,1.338,0.857,2.266,1.012l0.278,0.105l0.306,0.008c0.318,0.076,0.647,0.113,1.005,0.113
                c0.534,0,1.033-0.085,1.474-0.16c0.336-0.057,0.653-0.111,0.895-0.111c0.042,0,0.085,0.002,0.129,0.007
                c0.331,0.037,0.648,0.122,0.977,0.264C34.983,4,35.259,4.166,35.519,4.381c0.186,0.153,0.412,0.485,0.631,0.805
                c0.4,0.585,0.896,1.312,1.694,1.821l0.226,0.211l0.265,0.119c0.758,0.559,1.611,0.762,2.298,0.925
                c0.378,0.09,0.768,0.182,0.986,0.305c0.287,0.162,0.547,0.363,0.792,0.621c0.234,0.239,0.423,0.501,0.579,0.8
                c0.113,0.217,0.191,0.61,0.267,0.99c0.137,0.688,0.307,1.541,0.842,2.329l0.117,0.275l0.209,0.227
                c0.479,0.811,1.187,1.332,1.757,1.752c0.313,0.23,0.636,0.468,0.782,0.659c0.203,0.265,0.364,0.553,0.49,0.89
                c0.121,0.306,0.192,0.618,0.219,0.955c0.019,0.244-0.063,0.637-0.142,1.017c-0.144,0.693-0.322,1.553-0.134,2.482l0.009,0.298
                l0.091,0.275c0.122,0.936,0.571,1.695,0.933,2.305c0.198,0.334,0.402,0.679,0.462,0.913c0.084,0.325,0.119,0.651,0.103,1.012
                c-0.008,0.323-0.065,0.639-0.173,0.962c-0.078,0.231-0.306,0.561-0.527,0.879c-0.403,0.581-0.903,1.302-1.094,2.231l-0.112,0.275
                l-0.02,0.298c-0.253,0.91-0.136,1.781-0.043,2.482c0.051,0.384,0.105,0.782,0.069,1.023c-0.049,0.327-0.145,0.642-0.298,0.965
                c-0.138,0.301-0.315,0.571-0.538,0.824c-0.163,0.184-0.502,0.398-0.831,0.605c-0.598,0.377-1.341,0.846-1.877,1.623l-0.225,0.222
                L43.2,39.018c-0.586,0.737-0.819,1.582-1.006,2.262c-0.103,0.374-0.209,0.76-0.339,0.971c-0.173,0.282-0.384,0.534-0.653,0.772
                c-0.244,0.224-0.511,0.403-0.816,0.547c-0.222,0.106-0.619,0.17-1.003,0.233c-0.699,0.114-1.569,0.256-2.369,0.766l-0.276,0.122
                l-0.223,0.178c-0.83,0.449-1.375,1.137-1.815,1.691c-0.241,0.304-0.49,0.618-0.687,0.758c-0.275,0.195-0.568,0.345-0.904,0.457
                c-0.313,0.11-0.629,0.17-1.009,0.185c-0.247,0-0.6-0.086-0.974-0.178c-0.53-0.129-1.13-0.276-1.795-0.276
                c-0.231,0-0.459,0.018-0.674,0.054l-0.301-0.008l-0.286,0.09c-0.939,0.09-1.709,0.51-2.329,0.848
                c-0.341,0.186-0.693,0.378-0.932,0.43C24.566,48.973,24.322,49,24.083,49c-0.085,0-0.169-0.003-0.287-0.012
                c-0.328-0.021-0.644-0.089-0.965-0.209c-0.229-0.086-0.551-0.326-0.862-0.558c-0.572-0.427-1.285-0.959-2.175-1.164l-0.287-0.128
                l-0.293-0.031c-0.423-0.134-0.88-0.199-1.395-0.199c-0.386,0-0.758,0.036-1.086,0.069c-0.274,0.027-0.533,0.052-0.75,0.052
                c-0.111,0-0.203-0.007-0.272-0.02c-0.332-0.062-0.644-0.169-0.958-0.333c-0.299-0.15-0.563-0.336-0.806-0.568
                c-0.185-0.176-0.373-0.502-0.572-0.848c-0.304-0.529-0.683-1.186-1.297-1.725l-0.052-0.052L11.918,43.2
                c-0.742-0.606-1.599-0.846-2.287-1.039c-0.374-0.105-0.76-0.213-0.97-0.343c-0.283-0.175-0.534-0.387-0.768-0.654
                c-0.226-0.25-0.404-0.517-0.546-0.822c-0.103-0.218-0.166-0.615-0.226-0.998c-0.11-0.694-0.247-1.553-0.754-2.372L6.288,36.81
                l-0.106-0.14c-0.454-0.834-1.15-1.378-1.71-1.816c-0.306-0.239-0.622-0.487-0.763-0.683c-0.195-0.271-0.346-0.563-0.461-0.902
                c-0.111-0.311-0.173-0.626-0.189-0.967c-0.012-0.244,0.082-0.635,0.172-1.013c0.163-0.683,0.365-1.53,0.214-2.444l0.085-0.532
                L3.31,27.831c-0.084-0.929-0.49-1.695-0.818-2.313c-0.182-0.342-0.369-0.696-0.42-0.943c-0.068-0.323-0.088-0.65-0.055-1.005
                c0.025-0.331,0.097-0.644,0.221-0.962c0.089-0.228,0.333-0.546,0.569-0.855c0.435-0.567,0.975-1.273,1.192-2.162l0.119-0.236
                l0.037-0.317c0.31-0.908,0.234-1.796,0.173-2.509c-0.033-0.386-0.067-0.785-0.018-1.03c0.064-0.324,0.174-0.632,0.344-0.949
                c0.15-0.292,0.339-0.552,0.576-0.795c0.172-0.176,0.521-0.374,0.86-0.565c0.622-0.352,1.396-0.79,1.947-1.527l0.07-0.076
                l0.073-0.107c0.627-0.724,0.891-1.573,1.103-2.256c0.115-0.37,0.234-0.753,0.369-0.957c0.184-0.278,0.404-0.525,0.681-0.754
                c0.249-0.213,0.523-0.383,0.838-0.52c0.242-0.106,0.591-0.148,0.995-0.197c0.561-0.068,1.196-0.144,1.866-0.421l0.233-0.096
                l0.202-0.151c0.599-0.449,0.996-0.979,1.346-1.448c0.245-0.328,0.456-0.61,0.667-0.767c0.267-0.199,0.557-0.355,0.895-0.476
                c0.31-0.117,0.626-0.184,0.963-0.206l0.071-0.002c0.252,0,0.583,0.076,0.934,0.157c0.496,0.115,1.058,0.244,1.697,0.244
                c0.092,0,0.185-0.003,0.277-0.008l0.208-0.013l0.201-0.055c0.755-0.208,1.339-0.588,1.854-0.923
                c0.332-0.216,0.646-0.42,0.892-0.493C24.782,2.047,25.1,2,25.414,2l0.051,0l0.008,0L25.5,0 M25.5,0c-0.014,0-0.029,0-0.043,0
                c-0.014,0-0.029,0-0.043,0c-0.511,0-1.016,0.075-1.512,0.222c-1.035,0.307-1.785,1.15-2.71,1.405
                c-0.051,0.003-0.103,0.005-0.154,0.005c-0.844,0-1.694-0.402-2.631-0.402c-0.066,0-0.132,0.002-0.198,0.006
                c-0.53,0.034-1.043,0.142-1.542,0.33c-0.496,0.177-0.958,0.426-1.384,0.743c-0.859,0.639-1.255,1.647-2.017,2.218
                c-0.876,0.362-1.92,0.207-2.898,0.633C9.881,5.373,9.435,5.649,9.031,5.994C8.625,6.329,8.275,6.721,7.982,7.165
                C7.359,8.107,7.33,9.404,6.667,10.17c-0.047,0.053-0.088,0.109-0.127,0.167c-0.028,0.032-0.055,0.065-0.08,0.099
                c-0.608,0.81-1.871,1.113-2.661,1.923c-0.37,0.38-0.679,0.804-0.923,1.276c-0.25,0.464-0.426,0.958-0.529,1.479
                c-0.221,1.107,0.242,2.32-0.086,3.279c-0.039,0.119-0.065,0.238-0.079,0.361c-0.047,0.103-0.085,0.209-0.113,0.319
                c-0.242,0.984-1.286,1.757-1.695,2.81c-0.193,0.495-0.311,1.006-0.351,1.536c-0.049,0.525-0.017,1.049,0.092,1.568
                c0.229,1.106,1.13,2.04,1.206,3.051c0.014,0.194,0.059,0.379,0.139,0.554c-0.029,0.181-0.025,0.366,0.007,0.55
                c0.178,0.996-0.46,2.128-0.405,3.256c0.024,0.531,0.125,1.046,0.304,1.546c0.169,0.498,0.41,0.964,0.72,1.395
                c0.661,0.917,1.866,1.405,2.346,2.297c0.04,0.076,0.087,0.149,0.139,0.218c0.029,0.06,0.061,0.119,0.098,0.176
                c0.545,0.853,0.391,2.149,0.869,3.165c0.225,0.481,0.516,0.918,0.872,1.311c0.347,0.397,0.748,0.735,1.2,1.014
                c0.961,0.595,2.258,0.587,3.044,1.23c0.034,0.028,0.069,0.054,0.106,0.079c0.728,0.639,1.019,1.766,1.809,2.519
                c0.386,0.367,0.814,0.669,1.289,0.907c0.466,0.244,0.963,0.413,1.487,0.511c0.211,0.039,0.425,0.054,0.641,0.054
                c0.621,0,1.252-0.121,1.836-0.121c0.281,0,0.551,0.028,0.804,0.11c0.117,0.038,0.237,0.063,0.357,0.076
                c0.103,0.046,0.208,0.082,0.318,0.108c0.987,0.23,1.773,1.264,2.832,1.66c0.496,0.186,1.009,0.299,1.54,0.332
                C23.808,50.995,23.946,51,24.083,51c0.386,0,0.773-0.043,1.155-0.127c1.104-0.243,2.027-1.154,3.038-1.242
                c0.124-0.01,0.244-0.034,0.36-0.071c0.015,0,0.029,0.001,0.044,0.001c0.096,0,0.193-0.009,0.288-0.025
                c0.119-0.021,0.24-0.03,0.363-0.03c0.868,0,1.816,0.454,2.769,0.454c0.041,0,0.083-0.001,0.124-0.003
                c0.532-0.021,1.046-0.119,1.548-0.295c0.5-0.166,0.967-0.407,1.399-0.713c0.92-0.655,1.416-1.856,2.312-2.33
                c0.108-0.057,0.208-0.127,0.302-0.206c0.103-0.04,0.203-0.092,0.296-0.152c0.853-0.55,2.141-0.399,3.163-0.884
                c0.481-0.228,0.916-0.519,1.308-0.878c0.395-0.349,0.732-0.751,1.009-1.204c0.592-0.962,0.577-2.26,1.216-3.047
                c0.077-0.096,0.145-0.198,0.198-0.307c0.079-0.078,0.151-0.164,0.214-0.256c0.568-0.84,1.815-1.203,2.566-2.049
                c0.352-0.397,0.64-0.836,0.861-1.319c0.226-0.475,0.38-0.978,0.458-1.502c0.167-1.117-0.353-2.307-0.073-3.28
                c0.034-0.118,0.054-0.238,0.063-0.36c0.042-0.102,0.075-0.209,0.096-0.319c0.195-0.995,1.201-1.818,1.56-2.888
                c0.168-0.504,0.263-1.019,0.276-1.551c0.024-0.524-0.033-1.048-0.166-1.561c-0.279-1.086-1.227-1.987-1.35-2.99
                c-0.015-0.123-0.043-0.241-0.083-0.357c-0.001-0.111-0.013-0.221-0.037-0.33c-0.209-0.991,0.395-2.142,0.307-3.269
                c-0.041-0.529-0.157-1.04-0.353-1.535c-0.184-0.493-0.44-0.952-0.763-1.373c-0.683-0.89-1.906-1.349-2.413-2.226
                c-0.061-0.106-0.134-0.206-0.217-0.296c-0.043-0.101-0.097-0.198-0.162-0.289c-0.581-0.831-0.474-2.125-0.995-3.128
                c-0.246-0.471-0.553-0.897-0.924-1.276c-0.363-0.382-0.777-0.704-1.239-0.964c-0.983-0.557-2.28-0.497-3.09-1.106
                c-0.099-0.074-0.204-0.138-0.316-0.188c-0.082-0.077-0.17-0.145-0.264-0.204c-0.857-0.537-1.272-1.775-2.138-2.489
                c-0.41-0.338-0.859-0.61-1.35-0.813c-0.483-0.211-0.991-0.345-1.518-0.404c-0.117-0.013-0.235-0.019-0.353-0.019
                c-0.806,0-1.624,0.271-2.369,0.271c-0.191,0-0.377-0.018-0.557-0.062c-0.118-0.029-0.24-0.046-0.363-0.049
                c-0.103-0.039-0.212-0.067-0.322-0.085c-1-0.159-1.866-1.136-2.944-1.455C26.522,0.075,26.017,0,25.5,0L25.5,0z"/>
        </g>
    </g>
</svg>
`,
    "icon-43": `<svg version="1.1" id="icon-43" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" class="fill-svg" viewBox="0 0 51 26" enable-background="new 0 0 51 26" xml:space="preserve">
        <path d="M51,26H0V0h51V26z"/>
</svg>
`,
    "icon-44": `<svg version="1.1" id="icon-44" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" class="stroke-svg" fill="none" viewBox="0 0 51 26" enable-background="new 0 0 51 26" xml:space="preserve">
        <path fill-rule="evenodd" stroke-width="2" d="M47,22H4V4h43V22z"/>
</svg>
`,
    "icon-45": `<svg version="1.1" id="icon-45" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 51 26" enable-background="new 0 0 51 26" xml:space="preserve" class="fill-svg" stroke="none">
    <path d="M47,22H4V4h43V22z"/>
    <path d="M0,0v26h51V0H0z M49,24H2V2h47V24z"/>
</svg>
`,
    "icon-46": `<svg version="1.1" id="icon-46" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 86 94" enable-background="new 0 0 86 94" xml:space="preserve" class="fill-svg" stroke="none">
    <g>
        <path d="M12.04,45.46 L42.84,52.2 L85.85,43.94 L55.06,37.2 Z"/>
        <path d="M24.06,23.51 L67.32,15.2 L0.15,0.66 L9.43,11.43 L0.15,18.34 Z"/>
        <path d="M43.2,71.78 L0.15,80.05 L0.15,80.06 L62.5,93.66 L53.22,82.85 L62.5,75.99 Z"/>
        <path d="M56.79,23.1c-0.12,0.02-0.12,0.02-0.12,0.02c-0.44,0.08-0.7,0.13-0.85,0.42
            c-0.39,0.33-0.55,0.75-0.55,1.14c0.15,0.25,0,0.54,0.15,0.77c0,0.11,0,0.11,0,0.26c-0.15,0.03-0.15,0.27-0.15,0.44
            c0,0.11,0,0.37,0,0.63c0.15,0.62,0,1.32,0.15,1.94c0,0.11,0,0.26-0.15,0.4c0,0.15,0,0.26,0,0.41c0.15,0.1,0.15,0.23,0,0.52
            c0,0.15,0,0.26,0,0.39c0.15,0.1,0.15,0.23,0.15,0.35c0,0.18,0.1,0.39,0.26,0.56l1.04,0.22c0.03-0.03,0.06-0.05,0.06-0.1
            c0.27-0.31,0.41-0.58,0.69-0.9c0-0.15,0-0.15,0-0.15c-0.15-0.22,0-0.62-0.15-0.85c0-0.15,0-0.28,0-0.28
            c0.15-0.3,0.15-0.42,0.16-0.68c-0.15-0.12-0.15-0.23,0-0.54c0-0.26-0.15-0.49,0-0.78c0-0.11-0.15-0.23-0.15-0.38
            c0.15-0.53,0-1.14,0-1.69c0-0.11,0-0.26,0-0.26c0.15-0.27,0-0.5,0.15-0.79c0-0.07,0-0.1,0-0.16c-0.15-0.09-0.15-0.22-0.15-0.33
            C57.2,23.29,57.07,23.05,56.79,23.1z"/>
        <path d="M24.06,24.5L12.04,26.8v17.68l43.02-8.26l12.26-2.36l0.01,0V16.19l-0.01,0L24.06,24.5z
             M26.35,29.94c0,0.93-0.01,1.73-0.02,2.92c0,0.37,0,0.8-0.12,1.21c0,0.26,0.12,0.37,0.11,0.63c0,0.63,0,0.95-0.01,1.58
            c0,0.54-0.01,1.06-0.13,1.6c0,0.26,0.12,0.38,0.12,0.66c0,0.26-0.12,0.56-0.38,0.61c-0.29,0.17-0.56,0.23-0.83,0.16
            c-0.26-0.06-0.27-0.37-0.26-0.65c0-0.15,0-0.22,0-0.37c0-0.15,0-0.26,0-0.26c0-0.63,0.01-0.95,0.01-1.58c0-0.29,0-0.54,0.12-0.85
            c-0.12,0.02-0.12-0.09-0.12-0.21c0-0.16,0-0.24,0-0.41c0-0.65-0.72-0.8-1.26-0.54c-0.42,0.2-0.76,0.75-0.68,1.17
            c0.04,0.21,0.1,0.5,0,0.67c0,0.11,0,0.11,0,0.11c0.1,0.52,0.1,0.93-0.01,1.48c0.1,0.26,0,0.52,0,0.78c0.1,0.24,0.1,0.52-0.14,0.82
            c-0.1,0.3-0.27,0.44-0.65,0.51c-0.3,0.06-0.58-0.13-0.58-0.43c-0.13-0.37-0.13-0.63-0.13-0.89c0-0.11,0.13-0.27,0.25-0.29
            c-0.25-0.12-0.25-0.38-0.25-0.47c0-0.44,0-0.81,0.13-1.26c0-0.83,0-1.25,0-2.08c-0.14-0.51,0-0.96,0-1.48c0-0.11,0-0.11,0-0.28
            l0-1.43c-0.14-0.38,0-0.94,0-1.34c0-0.25,0-0.38,0-0.63c-0.11-0.2-0.11-0.35-0.04-0.53c0.02-0.05,0.01-0.08,0.04-0.13
            c0.29-0.58,0.61-0.63,1.17-0.62c0.1,0.09,0.24,0.22,0.24,0.36c0,0.24,0.1,0.37,0,0.67c0,0.02,0,0.03,0,0.04c0,0.03,0,0.05,0,0.09
            c0.1,0.37-0.06,0.96-0.01,1.43c0.04,0.35,0,0.78,0.1,1.19c0,0,0,0.13-0.1,0.15c0,0.26,0,0.39,0.1,0.49
            c0.15,0.53,0.45,0.47,1.01,0.36c0,0,0,0,0.12-0.02c0.15-0.03,0.42-0.08,0.56-0.38c0-0.11,0.15-0.42,0.16-0.55
            c0.01-0.93,0.01-1.45,0.01-2.32c0-0.07,0-0.13,0-0.2c0-0.29-0.01-0.67,0.02-0.98c0.02-0.22,0.02-0.45,0.02-0.68
            c0.12-0.25,0.43-0.42,0.69-0.44c0.35-0.02,0.56,0.29,0.7,0.6c0.01,0.19,0.02,0.37,0.02,0.43C26.35,28.96,26.35,29.46,26.35,29.94z
             M33.41,30.8c0.29-0.06,0.58-0.12,0.84-0.31c0.29-0.06,0.56,0.17,0.75,0.13c0.12-0.02,0.12,0.11,0.12,0.11
            c0.14,0.25,0.18,0.63,0,0.91c-0.04,0.06-0.08,0.13-0.13,0.19c-0.11,0.16-0.22,0.29-0.31,0.3c-0.44,0.09-0.84,0.17-1.27,0.25
            c-0.27,0.05-0.7,0.27-0.7,0.55c-0.12,0.43-0.12,0.68-0.12,1.07c0,0.29,0,0.55,0,0.81c0,0.26,0.01,0.54,0.12,0.79
            c0.14,0.33,0.7,0.4,1.13,0.15c0.41-0.08,0.85-0.17,1.28-0.09c0.28-0.05,0.44,0.03,0.44,0.27c0.12,0.14,0.12,0.38,0.12,0.55
            c0,0.24-0.28,0.57-0.56,0.63c-1.14,0.35-2.28,0.58-3.25,0.77c-0.56,0.11-0.82-0.12-0.82-0.65c0-0.52,0-1.04,0.01-1.58
            c0-0.13,0-0.28,0-0.41c0.14-0.27,0-0.52,0-0.94c0-0.39,0-0.8,0-1.17c0.14-0.3,0-0.55,0.14-0.84c-0.13-0.35-0.13-0.59-0.13-1.02
            c0-0.11,0-0.21,0-0.3c0-0.03,0-0.06,0-0.09c0-0.05,0-0.08,0-0.13c0.14-0.69,0-1.22,0.01-1.74c0-0.54-0.15-1.31,0.01-1.73
            c0.05-0.13,0.14-0.45,0.14-0.58c0-0.31,0.18-0.48,0.37-0.57c0.05-0.02,0.11-0.05,0.17-0.06c0.55-0.11,1.09-0.22,1.52-0.3
            c0.56-0.11,1.1-0.22,1.53-0.31c0.6-0.12,0.88,0.1,0.88,0.48c0,0.55-0.26,0.84-0.65,0.93c-0.01,0-0.03,0.01-0.04,0.01
            c-0.62,0.25-1.01,0.33-1.43,0.29c-0.29,0.06-0.43,0.26-0.56,0.39c-0.21,0.19-0.41,0.33-0.41,0.6c0,0.67,0,1.34,0,2
            C32.59,30.58,33,30.89,33.41,30.8z M43.38,35.02c-0.29,0.58-0.43,0.76-0.84,0.84c-0.28,0.05-0.41,0.08-0.69,0.13
            c-0.16,0.03-0.43,0.08-0.55,0.11c-0.57-0.04-0.98,0.18-1.56,0.29c-0.12,0.02-0.4-0.07-0.55-0.04c-0.28-0.08-0.33-0.23-0.28-0.47
            c0.09-0.4,0-0.93,0-1.31c0-0.54,0-1.04-0.14-1.44c0-0.15,0.04-0.3,0.08-0.45c0.03-0.12,0.06-0.23,0.06-0.34
            c-0.14-0.4,0-0.95-0.14-1.31c0-0.05,0-0.08,0-0.13c0-0.13,0.3-0.3,0.14-0.42c0-0.13-0.14-0.22-0.14-0.37c0.3-0.71,0-1.45,0-2.1
            c0-0.1,0.02-0.21,0.04-0.31c0.04-0.31,0.1-0.61,0.1-0.9c0-0.05,0-0.08,0-0.13c-0.14-0.5,0-0.91,0-1.32c0-0.39,0.44-0.74,0.71-0.79
            c0.55,0.03,0.69,0.13,0.69,0.65c0,0.41,0.14,0.77,0,1.19c0.12,0.55-0.05,1.16-0.02,1.62c0,0.07,0,0.16,0.02,0.22
            c0.05,0.19,0.14,0.51,0,0.67c0,0.11,0,0.11,0,0.11c0,0.41,0,0.67,0,1.06c0,0.28,0.14,0.5,0,0.8c-0.14,0.03,0,0.13,0,0.24
            c0,0.65,0,1.29,0.13,1.9c0,0.02,0,0.05,0.01,0.07c0,0.26-0.05,0.59,0,0.78c0.08,0.3,0.28,0.62,0.85,0.51
            c0.12-0.02,0.28-0.05,0.4-0.08c0.28-0.05,0.43-0.08,0.71-0.14c0.14-0.03,0.41-0.08,0.55,0.01c0.05-0.01,0.08-0.02,0.14-0.03
            C43.22,34.38,43.51,34.6,43.38,35.02z M50.87,33.64c-0.29,0.58-0.42,0.75-0.82,0.84c-0.27,0.06-0.41,0.09-0.68,0.15
            c-0.15,0.03-0.42,0.09-0.54,0.12c-0.12,0-0.24,0.01-0.35,0.02c-0.4,0.06-0.74,0.23-1.18,0.33c-0.12,0.03-0.39-0.06-0.55-0.02
            c-0.27-0.07-0.33-0.21-0.28-0.46c0.02-0.09,0.03-0.18,0.03-0.28c0.02-0.35-0.03-0.73-0.03-1.03c0-0.54,0-1.04-0.14-1.44
            c0-0.26,0.14-0.55,0.14-0.8c-0.14-0.39,0-0.95-0.14-1.31c0-0.05,0-0.08,0-0.13c0-0.09,0.13-0.2,0.16-0.29
            c0.02-0.05,0.02-0.09-0.03-0.13c0-0.13-0.14-0.22-0.14-0.36c0.29-0.71,0-1.45,0-2.1c0-0.41,0.14-0.83,0.14-1.22
            c0-0.05,0-0.08,0-0.13c-0.14-0.49,0-0.91,0-1.32c0-0.39,0.43-0.74,0.7-0.8c0.55,0.01,0.68,0.11,0.68,0.63c0,0.41,0.13,0.77,0,1.19
            c0.13,0.64-0.13,1.37,0,1.84c0.05,0.19,0.13,0.51,0,0.67c0,0.11,0,0.11,0,0.11c0,0.41,0,0.67,0,1.06c0,0.28,0.14,0.49,0,0.8
            c-0.04,0.01-0.05,0.03-0.06,0.05c0,0.05,0.06,0.12,0.06,0.19c0,0.67,0,1.34,0.14,1.96c0,0.26-0.05,0.59,0,0.78
            c0.08,0.29,0.27,0.6,0.83,0.48c0.12-0.03,0.27-0.06,0.39-0.09c0.27-0.06,0.42-0.09,0.69-0.15c0.14-0.03,0.41-0.09,0.54,0
            c0.05-0.01,0.08-0.02,0.13-0.03C50.72,33.01,51.01,33.23,50.87,33.64z M58.83,25.61c0,0.26,0.14,0.5,0,0.78c0,0.39,0,0.8,0,1.17
            c0.14,0.24,0,0.65,0,0.91c0,0.26,0,0.54,0,0.81c0,0,0.14-0.02,0,0.11c0,0.26,0,0.65,0,0.91c0,0.16,0,0.28-0.12,0.43
            c0,0.11,0,0.37-0.16,0.66c0,0.15,0,0.26-0.12,0.28c0,0,0,0.13-0.16,0.16c-0.01,0.02-0.01,0.03-0.02,0.05
            c-0.13,0.41-0.41,0.7-0.81,0.89c-0.15,0.16-0.27,0.18-0.27,0.29c-0.14,0.02-0.27,0.19-0.41,0.07c-0.12,0.02-0.44,0.08-0.56,0.1
            c-0.53,0.1-0.95,0.06-1.2-0.15c-0.88-0.44-1.17-1.28-1.11-2.15c0.01-0.09,0.01-0.17,0.03-0.26c0-0.24,0-0.5,0-0.78
            c-0.15-0.1,0-0.39,0-0.54c0-0.26-0.15-0.47,0-0.65c0-0.26-0.15-0.34,0-0.52c0.12-0.02,0-0.11,0-0.11c-0.15-0.52,0-1.06,0-1.58
            c0.05-0.05,0.07-0.08,0.12-0.14c-0.27-0.35,0-0.81-0.12-1.16c-0.15-0.1,0-0.28,0-0.39c0-0.16,0.12-0.43,0-0.67
            c0-0.26,0.12-0.54,0.26-0.81c0.27-0.47,0.57-0.92,0.98-1.26c0.12-0.28,0.39-0.45,0.82-0.42c0.12-0.02,0.26-0.16,0.55-0.22
            c0.27-0.05,0.55-0.1,0.8,0.11c0.56,0.16,0.97,0.47,1.24,0.81c0,0.15,0,0.15,0,0.15c0.15,0.48,0.41,0.84,0.27,1.38
            c0,0.26,0.14,0.5,0,0.91C58.97,24.92,58.71,25.36,58.83,25.61z"/>
        <path d="M69.7,54.31c0.12,0.5,0,0.91,0,1.32c0,0.13,0,0.26,0,0.39c0.12,0.24,0.28,0.26,0.4,0.33
            c0.19,0.1,0.69,0,1.09-0.35c0.27-0.16,0.5-0.51,0.55-0.75c0.07-0.31,0-0.67,0-1.06c0-0.26-0.13-0.64-0.13-0.92
            c-0.15-0.77-0.97-0.75-1.51-0.39c-0.13,0.03-0.13,0.03-0.13,0.03c-0.15,0.29-0.42,0.49-0.27,0.72c0,0.13,0,0.28,0,0.39
            C69.7,54.16,69.55,54.34,69.7,54.31z"/>
        <path d="M0.15,61.39L0.15,61.39v17.68l43.05-8.27l42.65-8.2V44.92l-43.01,8.27L0.15,61.39z
             M20.25,64c-0.12,0.3-0.12,0.54-0.12,0.82c0,0.11-0.09,0.42-0.14,0.53c-0.03,0.08-0.06,0.21-0.08,0.35
            c-0.05,0.32-0.07,0.74-0.07,1.01c0,0.24,0,0.54-0.14,0.95c0,0.13,0,0.26,0,0.39c0,0.15,0,0.26-0.14,0.42
            c0.13,0.36,0,0.78-0.14,1.22c0,0.26,0,0.65-0.14,1.07c0,0,0,0.28,0,0.42c0,0.37-0.24,0.86-0.14,1.07c0.04,0.08,0,0.26-0.14,0.42
            c-0.13,0.03-0.4,0.21-0.69,0.4c-0.4,0.08-0.83-0.23-0.82-0.62c0-0.13,0.1-0.16,0-0.28c-0.14-0.18-0.04-0.65-0.13-0.9
            c-0.16-0.43-0.12-0.89-0.12-1.43c0-0.13-0.15-0.36-0.28-0.58c0-0.15,0-0.28,0-0.41c0-0.11,0-0.26,0-0.39
            c-0.14-0.1-0.14-0.23-0.14-0.38c0-0.24-0.12-0.51-0.12-0.76c0-0.15,0-0.28-0.15-0.36c0-0.13-0.13-0.1-0.13,0.03
            c-0.12,0.14-0.12,0.27-0.12,0.41c0,0.41-0.15,0.68-0.15,0.96c0,0.39-0.14,0.68-0.14,0.94c0,0.15,0,0.26-0.14,0.42c0,0,0,0,0,0.15
            c0,0.37-0.12,0.8-0.12,1.2c-0.17,0.55-0.31,1.12-0.31,1.66c0,0.13,0,0.26-0.14,0.29c0,0.13,0,0.39-0.12,0.41
            c-0.29,0.06-0.41,0.34-0.71,0.4c-0.14-0.1-0.14-0.1-0.25-0.08c-0.15-0.1-0.15-0.23-0.29-0.2c-0.14-0.1-0.14-0.23-0.14-0.36
            c0.14-0.3,0-0.54-0.12-0.77c0-0.11,0-0.11,0-0.11c0.12-0.45,0-0.81-0.17-1.04c0-0.39-0.14-0.77-0.14-1.16c0-0.11,0-0.26,0-0.39
            c0-0.13,0-0.24,0-0.52c-0.12-0.38-0.26-0.73-0.26-1.14c0-0.8-0.29-1.67-0.29-2.43c0-0.56-0.02-1.08-0.07-1.46
            c-0.01-0.09-0.03-0.17-0.05-0.24c-0.05-0.19-0.14-0.62-0.14-0.92c0-0.24,0-0.37,0.4-0.58c0.55-0.37,1.05-0.01,1.11,0.43
            c0.07,0.45,0.08,1.11,0.15,1.57c0,0.02,0.01,0.05,0.01,0.07c0.05,0.32,0.11,0.71,0.11,1.08c0,0.28,0,0.52,0.14,0.77
            c0,0.11,0,0.24,0,0.54c0,0.39,0.17,0.88,0.17,1.29c0,0.13,0,0.24,0.14,0.22c0,0.13,0,0.13,0,0.13s0,0,0.12-0.15
            c0-0.11,0-0.24,0-0.41c0-0.13,0.14-0.27,0.14-0.42c0-0.52,0.22-1.14,0.27-1.63c0.04-0.35,0.11-0.76,0.19-1.13
            c0.03-0.12,0.05-0.26,0.08-0.37c0-0.24,0-0.39,0-0.54c0-0.5,0.17-1.06,0.43-1.65c0-0.13,0-0.26,0.14-0.29
            c0.27-0.31,0.65-0.35,0.81-0.03c0.1,0.21,0.28,0.48,0.28,0.73c0.12,0.38,0.12,0.77,0.12,1.18c0,0.13,0.13,0.36,0.13,0.64
            c0.1,0.26,0.18,0.53,0.23,0.81c0.02,0.1,0.05,0.2,0.05,0.31c0.13,0.35,0.13,0.75,0.13,1.03c0,0.13,0,0.13,0,0.24
            c0.13,0.1,0.13,0.36,0.13,0.66c0,0.05,0,0.08,0,0.13c0.13,0.09,0.13,0.22,0.13,0.22c0-0.13,0.13-0.16,0.13-0.27
            c0-0.29,0.14-0.71,0.14-0.95c0-0.42,0.02-0.78,0.1-1.18c0.02-0.1,0.02-0.19,0.05-0.3c0-0.05,0-0.08,0-0.13
            c0-0.39,0.15-0.81,0.15-1.23c0-0.39,0-0.78,0.12-1.2c0-0.28,0-0.67,0.14-0.96c0.13-0.29,0.41-0.47,0.67-0.66
            c0.29-0.06,0.69,0.12,0.69,0.38c0.13,0.09,0.13,0.23,0.13,0.38c-0.14,0.42,0,0.77-0.29,1.1c0,0,0,0.11,0,0.26
            C20.41,63.32,20.14,63.78,20.25,64z M28.54,63.85c-0.12,0.42,0,0.67,0,0.93c0,0.26-0.07,0.43-0.12,0.69
            c-0.06,0.32,0,0.65,0.12,1.03c0,0.24,0,0.51-0.12,0.81c0,0.06,0,0.16,0.01,0.26c0.01,0.11,0.04,0.24,0.11,0.37
            c0,0.28,0.08,0.66,0,0.93c-0.04,0.14-0.12,0.3,0,0.54c0,0.26,0.06,0.73,0,1.04c-0.05,0.24-0.12,0.43-0.41,0.62
            c-0.27,0.06-0.55,0.37-0.84,0.17c-0.14-0.1-0.14-0.25-0.27-0.35c-0.14-0.36,0-0.8,0-1.3c0-0.26,0-0.54,0-0.8c0-0.39,0-0.8,0-1.06
            c0-0.15,0-0.31,0-0.46c0-0.11,0-0.22,0-0.32c0-0.26,0-0.39,0-0.67c0-0.13,0-0.26,0-0.26c0.14-0.16,0.14-0.16,0-0.26
            c0-0.28,0-0.54,0-0.93c0-0.28,0.05-0.6,0-0.78c-0.11-0.38,0.06-1,0-1.47c-0.06-0.44,0-1.06,0-1.56c0-0.15,0-0.41,0-0.54
            c-0.14-0.36,0.05-0.53,0.27-0.72c0.15-0.13,0.29-0.19,0.29-0.19c0.14-0.16,0.27-0.19,0.41-0.08c0,0,0.14-0.02,0.27,0.08
            c0.14,0.1,0.27,0.22,0.27,0.48c-0.12,0.29,0,0.67,0,0.91c0,0.26,0,0.67-0.27,0.85c0,0.13,0,0.13,0.16,0.1
            c0.12,0.11,0.12,0.37,0.12,0.5c0,0.28,0.14,0.51-0.12,0.82c0,0,0,0,0,0.13C28.54,63.47,28.54,63.74,28.54,63.85z M40.26,58.72
            c0,0.15,0,0.26,0,0.41c-0.14,0.29,0,0.41,0,0.67c0,0.38,0,0.65,0,0.91c0,0.39,0,0.8,0,1.06c0,0.13,0,0.26,0,0.41
            c0,0.13,0,0.39,0,0.65c0,0.13,0,0.39,0,0.52c-0.14,0.03-0.14,0.03-0.14,0.03c0.14,0.38,0,0.67,0.13,1.05c0,0.05,0,0.07,0,0.11
            c0,0.28,0,0.54,0,0.8c0,0.54,0,0.93,0,1.32c0,0.06,0,0.09,0,0.15c-0.14,0.29,0,0.52,0,0.78c0,0.15,0,0.41,0,0.52
            c0,0.26-0.28,0.58-0.55,0.63c-0.14,0.03-0.43,0.17-0.57,0.11c-0.2-0.09-0.55-0.27-0.55-0.53c0-0.15-0.14-0.38-0.14-0.5
            c-0.14-0.12-0.14-0.12-0.14-0.12c0.14-0.29-0.16-0.49-0.15-0.75c-0.27-0.35-0.4-0.74-0.4-1.26c0,0,0,0,0-0.13
            c-0.29-0.2-0.29-0.48-0.43-0.84c0-0.05,0-0.08,0-0.13c-0.15-0.23-0.28-0.47-0.28-0.74c-0.16-0.36-0.28-0.6-0.43-0.96
            c-0.12,0.02-0.12,0.02-0.12,0.02c-0.16,0.16-0.16,0.29,0,0.39c0,0.39,0.12,0.76,0,1.19c0,0.13,0,0.39,0,0.52c0,0.26,0,0.54,0,0.8
            c-0.16,0.42,0,0.8,0,1.19c0,0.39,0,0.8,0,1.21c0,0.11,0,0.26,0,0.26c0.09,0.25-0.04,0.56-0.21,0.78c-0.07,0.08-0.14,0.15-0.22,0.2
            c0,0.15-0.16,0.18-0.16,0.18s-0.67-0.01-0.67-0.13c-0.16-0.12-0.28-0.2-0.28-0.46c0-0.03,0-0.05,0-0.08c0-0.02,0-0.04,0-0.07
            c0.12-0.95,0-1.86,0-2.9c0-0.26,0-0.67,0-1.06c0-0.26,0-0.54,0-0.93c0-0.39,0-0.65,0-1.06c0-0.13,0.12-0.28,0-0.39
            c0-0.13,0-0.26,0-0.41c0-0.39-0.16-0.9,0-1.45c0.12-0.02,0-0.11,0-0.11c0-0.28,0-0.55,0-0.81c-0.16-0.34,0-0.78,0-1.19
            c0,0,0-0.11,0.12-0.14c0,0,0-0.15,0.16-0.29c0,0,0-0.15,0.12-0.17c0.27-0.17,0.98-0.2,1.14,0.17c0,0.05,0,0.07,0,0.11
            c0.28,0.09,0.28,0.47,0.28,0.76c0,0.11,0.12,0.09,0.12,0.24c0.16,0.34,0.28,0.73,0.43,1.22c0,0.15,0,0.15,0.14,0.23
            c0.29,0.61,0.4,1.15,0.57,1.74c0.11,0.37,0.41,0.85,0.41,1.24c0.14,0.12,0.14,0.12,0.28,0.09c0-0.06,0-0.09,0-0.15
            c0-0.52,0-1.04,0-1.45c0-0.52,0-0.91,0-1.32c0-0.41,0-0.93,0-1.45c0-0.52,0-1.08,0-1.6c0-0.11,0.43-0.68,0.57-0.75
            c0.27-0.14,0.69-0.03,0.83,0.35c0.14,0.09,0.14,0.35,0.14,0.49C40.26,58.2,40.26,58.46,40.26,58.72z M68.29,51.79
            c0.31-0.21,0.42-0.34,0.58-0.37c0.56-0.11,1.1-0.22,1.51-0.29c0.69-0.13,1.25-0.12,1.8,0.19c0.38,0.21,0.63,0.49,0.8,0.92
            c0.09,0.24,0.13,0.66,0.28,1.03c0,0.11,0,0.41,0,0.52c-0.15,0.17-0.15,0.17-0.15,0.29c0.15,0.12,0.15,0.25,0,0.41
            c0,0.13,0,0.13,0,0.28c0,0,0,0,0,0.11c-0.13,0.43-0.27,0.99-0.41,1.55c0,0,0,0-0.15,0.03c-0.27,0.16-0.27,0.42-0.39,0.72
            c-0.15,0.03-0.15,0.16,0,0.26c0.12,0.65,0.27,1.31,0.53,1.91c0,0.13,0.03,0.27,0.05,0.4c0.05,0.27,0.12,0.55,0.22,0.88
            c0.12,0.38,0.26,0.82,0.41,1.14c0.1,0.22-0.15,0.63-0.41,0.72C72.63,62.58,72,62.51,71.87,62c-0.13-0.12-0.13-0.38-0.13-0.5
            c0-0.15,0-0.28-0.13-0.25c-0.15,0.03-0.15-0.1-0.15-0.23c0-0.26-0.12-0.52-0.12-0.65c-0.15-0.36-0.14-0.7-0.28-0.88
            c-0.04-0.05-0.06-0.1-0.08-0.15c-0.03-0.07-0.05-0.15-0.05-0.24c0-0.41-0.13-0.77-0.4-0.98c0-0.15-0.15-0.23-0.42-0.18
            c-0.28,0.05-0.28,0.17-0.4,0.48c0,0.26-0.14,0.42,0,0.64c0,0,0,0,0,0.01c0,0.26-0.15,0.43-0.15,0.55c0,0.54,0.15,0.91,0.15,1.45
            c0,0.11,0,0.26,0,0.39c-0.15,0.16-0.15,0.43,0,0.67c0,0,0,0.11,0,0.26c-0.15,0.56-0.41,0.87-1.07,0.74
            c-0.15,0.03-0.42-0.2-0.42-0.46c0-0.41,0-0.79-0.01-1.2c0-0.26,0-0.65,0-0.91c0-0.28,0-0.54,0-0.94c0-0.32,0-0.59,0-0.88
            c0-0.18,0-0.37,0-0.58c0-0.54-0.01-1.05-0.01-1.44c0-0.41,0-0.67-0.01-1.05c0-0.68-0.01-1.35-0.01-2c0-0.26,0-0.41,0-0.67
            c0.12-0.15,0-0.39,0-0.65C68.17,52.2,68.17,51.94,68.29,51.79z M57.08,54.78c0.05-0.13,0.14-0.45,0.14-0.58
            c0-0.39,0.29-0.57,0.56-0.62c0.58-0.11,1.13-0.21,1.56-0.3c0.57-0.11,1.12-0.22,1.54-0.3c0.59-0.12,0.86,0.1,0.86,0.48
            c0.01,0.57-0.27,0.87-0.66,0.94c-0.6,0.25-1,0.33-1.43,0.28c-0.29,0.06-0.43,0.26-0.57,0.39c-0.21,0.19-0.42,0.32-0.41,0.6
            c0,0.33,0.01,0.65,0.01,0.98c0,0.34,0.01,0.68,0.01,1.02c0,0.41,0.43,0.71,0.85,0.63c0.3-0.06,0.59-0.12,0.85-0.31
            c0.29-0.06,0.55,0.17,0.74,0.13c0.12-0.02,0.12,0.11,0.12,0.11c0.14,0.25,0.18,0.63,0.01,0.91c-0.14,0.23-0.3,0.47-0.42,0.49
            c-0.43,0.09-0.84,0.17-1.28,0.25c-0.28,0.06-0.72,0.27-0.71,0.55c-0.12,0.43-0.12,0.67-0.11,1.06c0,0.29,0.01,0.55,0.01,0.81
            c0,0.26,0.02,0.54,0.13,0.79c0.15,0.33,0.73,0.39,1.16,0.14c0.41-0.08,0.84-0.17,1.27-0.09c0.27-0.05,0.42,0.03,0.42,0.27
            c0.12,0.14,0.12,0.38,0.12,0.54c0,0.24-0.26,0.57-0.53,0.63c-1.1,0.35-2.26,0.58-3.3,0.79c-0.6,0.12-0.88-0.1-0.88-0.64
            c0-0.52,0-1.04-0.01-1.58c0-0.13,0-0.28,0-0.41c0.15-0.27,0-0.52,0-0.94c0-0.39,0-0.8,0-1.17c0.14-0.3,0-0.55,0.14-0.84
            c-0.15-0.35-0.15-0.59-0.15-1.01c0-0.15,0-0.28,0-0.39c0-0.05,0-0.08,0-0.13c0.14-0.69,0-1.22-0.01-1.74
            c0-0.06-0.01-0.14-0.01-0.21C57.04,55.78,56.94,55.14,57.08,54.78z M46.43,55.89c0.12-0.15,0.28-0.19,0.4-0.21
            c0.28-0.05,0.43-0.09,0.73-0.14c0.28,0.08,0.55-0.11,0.83-0.03c0.16-0.03,0.28-0.18,0.43-0.21c0.27-0.05,0.39,0.06,0.55,0.03
            c0.14-0.03,0.43-0.21,0.56-0.24c0.27-0.05,0.54,0.03,0.82-0.02c0.15,0.1,0.27,0.08,0.27,0.23c0.15,0.1,0.15,0.23,0.15,0.51
            c0,0.13-0.02,0.26-0.15,0.42c-0.12,0.14-0.27,0.31-0.54,0.36c-0.27,0.05-0.39,0.2-0.68,0.26c-0.15,0.16-0.29,0.32-0.43,0.62
            c0,0.26,0,0.52,0,0.78c0,0.8-0.01,1.47-0.01,2.12c0,0.39,0,0.8,0,1.18c0,0.82-0.01,1.6-0.01,2.4c0,0.67,0,1.31-0.01,1.99
            c0,0.26,0.01,0.72-0.16,0.96c-0.21,0.3-0.83,0.42-1.1,0.22c-0.27-0.21-0.12-0.5-0.12-0.91c-0.15-0.36,0-0.95-0.15-1.44
            c0-0.26,0-0.52,0.16-0.96c0-0.13,0-0.13-0.15-0.25c-0.15-0.35,0-0.64,0.16-0.93c0-0.15,0-0.15,0-0.15c-0.31-0.2,0-0.52,0-0.93
            c-0.15-0.08-0.15-0.35-0.15-0.61c0.16-0.57,0-0.93,0.01-1.45c0-0.15,0.16-0.31,0.16-0.57c-0.15-0.38-0.15-0.77-0.15-1.16
            c0-0.41-0.27-0.49-0.72-0.4c-0.28,0.05-0.4-0.05-0.67,0c-0.15-0.1-0.28-0.21-0.28-0.34C45.99,56.65,46.15,56.36,46.43,55.89z"/>
    </g>
</svg>
`,
    "icon-47": `<svg version="1.1" id="icon-47" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 93 76" enable-background="new 0 0 93 76" xml:space="preserve" class="fill-svg" stroke="none">
    <g>
        <path d="M46.5,74.69 L19.96,48.14 L18.69,48.14 L46.5,75.96 L74.31,48.14 L73.04,48.14 Z"/>
        <path d="M27.52,20.3c-0.03-0.05-0.42-0.78-0.86-0.41l-7.81,7.81h1.27L27.52,20.3z"/>
        <path d="M46.5,1.31L72.88,27.7h1.27L46.5,0.04l-17.1,17.1c0.22,0.21,0.4,0.45,0.55,0.72L46.5,1.31z"
            />
        <path d="M20.26,38.79c-0.12-0.13-0.27-0.23-0.45-0.3c-0.19-0.07-0.41-0.1-0.68-0.1h-0.47v3.89h0.47
            c0.22,0,0.42-0.03,0.6-0.09c0.18-0.06,0.33-0.15,0.46-0.27c0.13-0.12,0.23-0.27,0.3-0.46c0.07-0.19,0.1-0.41,0.1-0.66v-0.84
            c0-0.25-0.03-0.48-0.08-0.68S20.38,38.92,20.26,38.79z"/>
        <path d="M93,30.35H0L8.01,38L0,45.65h93L84.99,38L93,30.35z M22.26,40.64
            c0,0.39-0.04,0.73-0.13,1.02s-0.21,0.54-0.36,0.74c-0.16,0.2-0.34,0.37-0.56,0.5c-0.22,0.13-0.45,0.23-0.71,0.31
            c-0.26,0.07-0.53,0.12-0.82,0.15c-0.29,0.03-0.59,0.04-0.9,0.04h-1.72V32.59h1.66c0.25,0,0.5,0.01,0.76,0.03
            c0.26,0.02,0.52,0.05,0.77,0.11c0.25,0.05,0.49,0.14,0.71,0.24c0.22,0.11,0.42,0.25,0.59,0.43c0.17,0.18,0.3,0.41,0.4,0.68
            c0.1,0.27,0.15,0.59,0.15,0.97v0.53c0,0.29-0.04,0.55-0.12,0.79c-0.08,0.24-0.19,0.45-0.33,0.64c-0.14,0.18-0.29,0.34-0.46,0.46
            c-0.17,0.12-0.35,0.2-0.53,0.24v0.05c0.54,0.1,0.94,0.35,1.21,0.76c0.27,0.41,0.41,0.94,0.41,1.58V40.64z M27.76,43.42h-4.08V32.59
            h4.01v1.29h-2.37v3.24h1.83v1.29h-1.83v3.71h2.43V43.42z M33.44,42.06c-0.12,0.31-0.29,0.57-0.52,0.79
            c-0.22,0.22-0.49,0.38-0.81,0.5c-0.32,0.12-0.67,0.17-1.07,0.17c-0.49,0-0.9-0.07-1.22-0.2c-0.32-0.13-0.58-0.3-0.77-0.52
            c-0.19-0.22-0.33-0.46-0.41-0.74c-0.08-0.27-0.12-0.56-0.12-0.84c0-0.23,0.01-0.45,0.04-0.64c0.03-0.2,0.07-0.41,0.12-0.64h1.27
            v0.53c0,0.29,0.02,0.55,0.05,0.77c0.04,0.22,0.1,0.41,0.18,0.57c0.08,0.15,0.19,0.27,0.33,0.35c0.14,0.08,0.31,0.12,0.5,0.12
            c0.31,0,0.55-0.09,0.72-0.26c0.16-0.17,0.25-0.42,0.25-0.75c0-0.17-0.01-0.32-0.03-0.47c-0.02-0.14-0.06-0.28-0.12-0.42
            c-0.06-0.14-0.13-0.29-0.23-0.44c-0.1-0.15-0.22-0.33-0.37-0.52l-1.71-2.04c-0.3-0.39-0.54-0.78-0.7-1.18
            c-0.16-0.4-0.25-0.82-0.25-1.26c0-0.36,0.06-0.69,0.17-0.99c0.11-0.3,0.27-0.56,0.48-0.78c0.21-0.22,0.47-0.39,0.78-0.51
            c0.31-0.12,0.66-0.18,1.06-0.18c0.48,0,0.88,0.07,1.2,0.2c0.32,0.14,0.57,0.31,0.76,0.53c0.19,0.22,0.32,0.47,0.4,0.74
            s0.12,0.55,0.12,0.82c0,0.23-0.02,0.45-0.05,0.64c-0.04,0.2-0.08,0.41-0.12,0.65H32.1v-0.51c0-0.57-0.08-1.02-0.25-1.32
            c-0.16-0.31-0.43-0.46-0.81-0.46c-0.31,0-0.54,0.09-0.69,0.26c-0.15,0.17-0.23,0.4-0.23,0.69c0,0.15,0.01,0.29,0.03,0.41
            c0.02,0.12,0.06,0.24,0.1,0.34c0.04,0.1,0.1,0.2,0.16,0.3c0.06,0.1,0.14,0.2,0.22,0.3l1.91,2.31c0.35,0.45,0.61,0.89,0.8,1.3
            c0.19,0.42,0.28,0.86,0.28,1.32C33.62,41.4,33.56,41.75,33.44,42.06z M39.39,33.88h-1.74v9.54h-1.64v-9.54h-1.74v-1.29h5.12V33.88z
             M48.26,36.32c0,0.58-0.05,1.07-0.15,1.49c-0.1,0.41-0.23,0.76-0.4,1.04c-0.16,0.28-0.36,0.51-0.57,0.68
            c-0.22,0.17-0.44,0.3-0.68,0.38c-0.23,0.09-0.47,0.14-0.71,0.17c-0.24,0.03-0.46,0.04-0.68,0.04h-0.16v3.3h-1.64V32.59h1.64
            c0.21,0,0.43,0.01,0.68,0.03c0.25,0.02,0.49,0.06,0.74,0.13c0.25,0.07,0.49,0.18,0.72,0.32c0.23,0.14,0.43,0.34,0.61,0.59
            c0.18,0.25,0.32,0.56,0.43,0.93c0.11,0.37,0.16,0.82,0.16,1.36V36.32z M53.38,43.42H49.5V32.59h1.64v9.54h2.24V43.42z M57.84,43.42
            l-0.3-1.94h-1.98l-0.29,1.94h-1.67l2-10.83h1.89l2,10.83H57.84z M65.19,40.96c0,0.87-0.2,1.51-0.6,1.93
            c-0.4,0.41-0.97,0.62-1.71,0.63c-0.17,0-0.35-0.01-0.55-0.04c-0.2-0.03-0.39-0.09-0.59-0.17c-0.2-0.09-0.38-0.21-0.56-0.38
            c-0.18-0.16-0.34-0.38-0.48-0.64c-0.14-0.27-0.25-0.59-0.33-0.99c-0.08-0.39-0.12-0.86-0.12-1.4v-3.84c0-0.55,0.04-1.01,0.13-1.4
            c0.08-0.39,0.2-0.71,0.34-0.98c0.14-0.26,0.3-0.47,0.48-0.63c0.18-0.16,0.37-0.28,0.56-0.36c0.19-0.08,0.39-0.14,0.58-0.16
            c0.19-0.03,0.37-0.04,0.54-0.04c0.43,0,0.79,0.06,1.08,0.18c0.29,0.12,0.52,0.29,0.7,0.49c0.18,0.21,0.3,0.45,0.37,0.73
            c0.07,0.28,0.11,0.57,0.11,0.89c0,0.23-0.01,0.45-0.03,0.64c-0.02,0.2-0.06,0.41-0.1,0.65h-1.33v-0.55c0-0.6-0.07-1.04-0.2-1.34
            c-0.13-0.3-0.32-0.44-0.58-0.44c-0.15,0-0.29,0.03-0.4,0.09c-0.11,0.06-0.21,0.16-0.29,0.3c-0.08,0.14-0.13,0.33-0.17,0.56
            c-0.04,0.23-0.06,0.52-0.06,0.87v4.95c0,0.34,0.02,0.62,0.05,0.84c0.03,0.22,0.08,0.4,0.16,0.54c0.07,0.14,0.17,0.23,0.28,0.29
            c0.12,0.06,0.26,0.09,0.42,0.09c0.11,0,0.21-0.02,0.3-0.07c0.1-0.05,0.18-0.12,0.26-0.23c0.07-0.1,0.13-0.23,0.18-0.39
            c0.04-0.16,0.07-0.35,0.07-0.56v-1.06h1.5V40.96z M70.56,43.42h-4.08V32.59h4.01v1.29h-2.37v3.24h1.83v1.29h-1.83v3.71h2.43V43.42z
             M76.24,42.06c-0.12,0.31-0.29,0.57-0.52,0.79c-0.22,0.22-0.49,0.38-0.81,0.5c-0.32,0.12-0.67,0.17-1.07,0.17
            c-0.49,0-0.9-0.07-1.22-0.2c-0.32-0.13-0.58-0.3-0.77-0.52c-0.19-0.22-0.33-0.46-0.41-0.74c-0.08-0.27-0.12-0.56-0.12-0.84
            c0-0.23,0.01-0.45,0.04-0.64c0.03-0.2,0.07-0.41,0.12-0.64h1.27v0.53c0,0.29,0.02,0.55,0.05,0.77c0.04,0.22,0.1,0.41,0.18,0.57
            c0.08,0.15,0.19,0.27,0.33,0.35c0.14,0.08,0.31,0.12,0.5,0.12c0.31,0,0.55-0.09,0.72-0.26c0.16-0.17,0.25-0.42,0.25-0.75
            c0-0.17-0.01-0.32-0.03-0.47c-0.02-0.14-0.06-0.28-0.12-0.42c-0.06-0.14-0.13-0.29-0.23-0.44c-0.1-0.15-0.22-0.33-0.37-0.52
            l-1.71-2.04c-0.3-0.39-0.54-0.78-0.7-1.18c-0.16-0.4-0.25-0.82-0.25-1.26c0-0.36,0.06-0.69,0.17-0.99c0.11-0.3,0.27-0.56,0.49-0.78
            c0.21-0.22,0.47-0.39,0.78-0.51c0.31-0.12,0.66-0.18,1.06-0.18c0.48,0,0.88,0.07,1.2,0.2c0.32,0.14,0.57,0.31,0.76,0.53
            c0.19,0.22,0.32,0.47,0.4,0.74c0.08,0.27,0.12,0.55,0.12,0.82c0,0.23-0.02,0.45-0.05,0.64c-0.04,0.2-0.08,0.41-0.12,0.65H74.9
            v-0.51c0-0.57-0.08-1.02-0.25-1.32s-0.43-0.46-0.81-0.46c-0.31,0-0.54,0.09-0.69,0.26c-0.15,0.17-0.23,0.4-0.23,0.69
            c0,0.15,0.01,0.29,0.03,0.41c0.02,0.12,0.06,0.24,0.1,0.34c0.04,0.1,0.1,0.2,0.16,0.3c0.06,0.1,0.14,0.2,0.22,0.3l1.91,2.31
            c0.35,0.45,0.61,0.89,0.8,1.3c0.19,0.42,0.28,0.86,0.28,1.32C76.43,41.4,76.37,41.75,76.24,42.06z"/>
        <path d="M46.25,34.23c-0.12-0.15-0.28-0.27-0.48-0.34c-0.2-0.07-0.46-0.11-0.77-0.11h-0.08v5.13H45
            c0.3,0,0.55-0.04,0.75-0.13c0.2-0.09,0.36-0.22,0.49-0.41c0.12-0.18,0.21-0.42,0.26-0.71s0.08-0.64,0.08-1.04v-0.98
            c0-0.32-0.02-0.6-0.07-0.83C46.45,34.58,46.37,34.39,46.25,34.23z"/>
        <path d="M56.52,34.84 L55.76,40.24 L57.35,40.24 L56.59,34.84 Z"/>
        <path d="M19.57,37.14c0.18-0.05,0.34-0.14,0.47-0.25c0.13-0.11,0.23-0.26,0.3-0.44
            c0.07-0.18,0.1-0.4,0.1-0.65v-0.44c0-0.25-0.03-0.48-0.08-0.67c-0.05-0.19-0.13-0.36-0.25-0.49c-0.12-0.14-0.27-0.24-0.46-0.31
            c-0.19-0.07-0.42-0.1-0.69-0.1h-0.32v3.44h0.32C19.19,37.22,19.39,37.19,19.57,37.14z"/>
        <path d="M25.08,19.66c0.07,0.01,0.31,0.07,0.43,0.01c0.19-0.06,0.19-0.19,0.23-0.37
            c0.01-0.05,0-0.13,0.02-0.18c0-0.02,0.08-0.13,0.08-0.14c0.06-0.05,0.08-0.12,0.12-0.16c0.01,0,0.01-0.01,0.02-0.01
            c0.01-0.02,0.02-0.04,0.02-0.04c0.24-0.11,0.44-0.23,0.67-0.24c0.42-0.02,0.51,0.01,0.6,0.01c0.14,0.01,0.32,0.06,0.48,0.11
            c0.2,0.12,0.29,0.17,0.36,0.2c0.18,0.12,0.37,0.39,0.48,0.59c-0.04-0.1,0.12,0.28,0.14,0.3l0.07,0.16
            c0.01,0.01,0.01,0.02,0.01,0.02c0.14,0.29,0.22,0.38,0.28,0.67c0.02,0.1,0.05,0.18,0.08,0.26c0,0,0,0.04,0.01,0.05
            c0.01,0.01,0.02,0.04,0.02,0.05s0,0.01,0.01,0.02c0,0,0,0.01,0,0.02c0,0.01,0.01,0.02,0.01,0.04c0.01,0.05,0.17,0.59,0.18,0.66
            l0.42,1.83c0,0.02,0.01,0.05,0.02,0.07l0.01,0.01l0.17,0.59c0.01,0.02,0.02,0.06,0.02,0.08l0.32,1.39
            c0.02,0.08,0.05,0.14,0.05,0.17l0.02,0.11c0.02,0.08,0.05,0.2,0.05,0.26c0.01,0.16,0.01,0.29,0.01,0.31c-0.07,0.14,0,0.2,0.04,0.23
            c0.04,0.02,0.08,0.04,0.14,0.04c0.1,0,0.22-0.02,0.34-0.05h0.23c0.11,0.01,0.26,0.01,0.38,0.01c0.08,0.02,0.17,0,0.23,0
            c0.07,0,0.12-0.01,0.14-0.04c0.05-0.04,0.12-0.13,0.06-0.28c0-0.02,0-0.16,0.01-0.19l0.07-0.29c0-0.05,0.01-0.1,0.02-0.12
            c0-0.02,0.02-0.08,0.04-0.17c0.05-0.19,0.32-0.65,0.47-0.2c0,0,0.04,0.07,0.07,0.2c0.02,0.08,0.05,0.14,0.05,0.17
            c0.01,0.04,0.02,0.07,0.02,0.11c0.02,0.08,0.05,0.17,0.05,0.23c0.01,0.16,0.01,0.29,0.01,0.31c-0.06,0.14,0,0.2,0.04,0.23
            c0.04,0.02,0.08,0.04,0.16,0.04c0.08,0,0.2-0.02,0.32-0.05h0.23c0.11,0.01,0.12,0.01,0.24,0.01c0.08,0.02,0.17,0.04,0.24,0.04
            c0.06,0,0.11-0.01,0.13-0.04c0.05-0.04,0.12-0.13,0.06-0.28c0-0.02,0-0.16,0.01-0.19l0.07-0.29c0-0.05,0.01-0.1,0.02-0.12
            c0-0.02,0.01-0.08,0.04-0.17c0.04-0.13,0.11-0.29,0.35-1.36c0.01-0.02,0.02-0.06,0.02-0.08c0.02-0.1,0.01-0.22,0.11-0.53l0.04-0.08
            c0,0-0.01-0.04-0.01-0.05c0.01-0.01,0.02-0.04,0.02-0.06c0.07-0.26,0.37-1.7,0.38-1.81c0.02-0.14,0.16-0.53,0.18-0.56
            c0.01-0.01,0.01-0.02,0.05-0.13c0-0.01,0.01-0.01,0.01-0.01c0.02-0.07,0.05-0.12,0.11-0.18l0.04-0.05
            c0.04-0.04,0.05-0.05,0.06-0.13c0.04-0.12-0.06-0.14-0.13-0.17c-0.02,0-0.05-0.01-0.06-0.01l-0.01-0.01
            c-0.04-0.01-0.14-0.01-0.3-0.01h-0.29c-0.04,0.01-0.05,0.01-0.07,0.04l-0.01,0.01c-0.07,0.06-0.06,0.2-0.05,0.25
            c0,0.01,0,0.04-0.01,0.06c0,0.01-0.01,0.04-0.01,0.06c0,0.05-0.02,0.22-0.04,0.25c0,0.01,0,0.01-0.01,0.06
            c0,0.05-0.01,0.13-0.04,0.2c-0.02,0.05-0.31,1.41-0.31,1.45c0,0.01,0,0.02-0.01,0.05c0,0.02-0.01,0.06-0.02,0.08
            c-0.05,0.18-0.06,0.37-0.12,0.55c0,0.04-0.01,0.06-0.02,0.1c-0.02,0.06-0.05,0.12-0.05,0.19c-0.01,0.08-0.05,0.14-0.25,1.01v0.01
            l-0.01,0.01c0,0.02-0.01,0.1-0.04,0.17c-0.1,0.37-0.26,0.8-0.5,0.44c-0.01-0.1-0.04-0.14-0.11-0.44l-0.05-0.17V24.8l-0.01-0.01
            c-0.02-0.06-0.13-0.44-0.26-1.02l-0.04-0.13v-0.06c-0.01-0.1-0.37-1.47-0.42-1.59v-0.04c0-0.05-0.01-0.1-0.04-0.13
            c0-0.01-0.01-0.02-0.01-0.04c-0.02-0.05-0.04-0.1-0.05-0.16c-0.01-0.05-0.02-0.11-0.05-0.16c-0.01-0.02-0.05-0.23-0.06-0.31
            c-0.01-0.05-0.01-0.05-0.01-0.06c-0.01-0.04-0.05-0.22-0.05-0.25v-0.07c0-0.02-0.01-0.04,0-0.06c0.01-0.05,0.02-0.19-0.05-0.25
            c-0.01,0-0.01-0.01-0.02-0.01c-0.01-0.02-0.04-0.02-0.07-0.02c-0.04-0.01-0.16-0.01-0.28-0.01c-0.17,0-0.26,0.01-0.31,0.02
            c-0.02,0-0.05,0.01-0.07,0.01c-0.06,0.02-0.16,0.05-0.13,0.17c0.01,0.08,0.04,0.1,0.07,0.13l0.04,0.05
            c0.05,0.05,0.07,0.11,0.11,0.19c0,0,0,0,0,0.01c0.04,0.11,0.05,0.12,0.05,0.13c0.02,0.05,0.16,0.42,0.18,0.56
            c0.01,0.08,0.37,1.56,0.29,1.87c0,0.04-0.04,0.39-0.08,0.49v0.01c-0.05,0.32-0.23,0.66-0.25,0.72l-0.01,0.01v0.01
            c0,0.02-0.05,0.1-0.06,0.17c-0.1,0.37-0.13,0.28-0.14,0.35c-0.1,0.53-0.48,0.19-0.57-0.35l0.04,0.14c-0.01-0.05-0.06-0.2-0.04-0.14
            l-0.05-0.19c-0.29-0.91-0.25-0.98-0.73-2.8v-0.04c0-0.05-0.01-0.1-0.04-0.13c0-0.01-0.01-0.02-0.01-0.04
            c-0.02-0.05-0.04-0.1-0.05-0.16c-0.01-0.05-0.02-0.11-0.05-0.16c-0.01-0.02-0.05-0.23-0.06-0.31c-0.01-0.05-0.01-0.05-0.01-0.06
            c-0.01-0.04-0.05-0.22-0.05-0.25c0,0-0.05-0.08-0.06-0.14c-0.01-0.05-0.01-0.11-0.02-0.16c-0.01-0.02-0.02-0.05-0.02-0.07
            c-0.02-0.11-0.05-0.23-0.12-0.41c-0.08-0.2-0.19-0.42-0.3-0.61c-0.04-0.07-0.04-0.16-0.07-0.22c-0.11-0.2-0.23-0.39-0.41-0.61
            c-0.17-0.2-0.42-0.41-0.67-0.56c-0.06-0.01-0.11-0.05-0.16-0.06c-0.08-0.05-0.16-0.08-0.23-0.1c-0.3-0.12-0.69-0.18-1.03-0.17
            c-0.19,0.01-0.36,0.04-0.51,0.07c-0.67,0.17-1.24,0.73-1.34,1.34C24.94,19.39,24.93,19.59,25.08,19.66z"/>
        <path d="M36.5,25.76c0.1,0.11,0.34,0.36,0.36,0.39c0.24,0.29,0.51,0.47,0.81,0.53
            c0.01,0,0.04,0,0.05,0c0.12,0.02,0.25,0.02,0.37,0.01c0.07,0.01,0.14,0,0.22,0c0.04,0,0.07,0,0.11,0c0.02,0,0.04,0,0.07-0.01
            c0.02,0,0.05,0.01,0.08,0c0.07-0.01,0.13,0,0.2-0.02c0.06,0,0.12-0.04,0.18-0.06c0.19-0.1,0.43-0.16,0.56-0.3
            c0.04-0.04,0.13-0.11,0.17-0.14c0.07-0.06,0.11-0.08,0.13-0.1c0.08-0.17,0.23-0.31,0.37-0.43c0.16-0.16,0.2-0.35,0.28-0.54
            c0.02-0.01,0.02-0.02,0.02-0.04c0.08-0.14,0.31-0.61,0.34-1.74c0-0.14-0.04-0.29-0.07-0.43c0-0.06-0.02-0.11-0.02-0.17
            c-0.02-0.13-0.05-0.26-0.1-0.38c0-0.05-0.01-0.08-0.02-0.12c0.01-0.02,0-0.04-0.01-0.05c0-0.01-0.01-0.02-0.01-0.04
            c-0.01-0.04-0.02-0.08-0.04-0.12c-0.02-0.08-0.06-0.17-0.1-0.25c-0.02-0.08-0.05-0.14-0.11-0.18c-0.02-0.01-0.05-0.05-0.05-0.08
            c-0.02-0.05-0.06-0.07-0.08-0.11c-0.02-0.02-0.04-0.05-0.06-0.06c-0.04-0.04-0.05-0.07-0.08-0.12c-0.02-0.02-0.05-0.05-0.07-0.07
            c-0.01-0.02-0.04-0.05-0.06-0.1c-0.04-0.04-0.06-0.07-0.1-0.11c-0.08-0.11-0.18-0.2-0.29-0.28c-0.05-0.02-0.1-0.05-0.14-0.08
            c-0.06-0.05-0.12-0.1-0.19-0.12c-0.12-0.06-0.25-0.11-0.38-0.12c-0.19-0.05-0.37-0.04-0.56,0c-0.17,0.02-0.32,0.12-0.48,0.16
            c-0.07,0.01-0.12,0.06-0.18,0.08c-0.18,0.12-0.31,0.17-0.41,0.23c-0.04,0.04-0.1,0.07-0.13,0.11l-0.04,0.02
            c-0.19,0.1-0.24,0.18-0.38,0.39c-0.08,0.11-0.16,0.2-0.2,0.28c-0.02,0.02-0.04,0.06-0.05,0.1l-0.01,0.01
            c-0.04,0.07-0.06,0.14-0.08,0.22c-0.13,0.32-0.41,0.85-0.39,1.26c0,0,0.01,0.05,0.01,0.06c0.01,0.13,0.04,0.39,0.04,0.53
            c0,0.01,0,0.04,0,0.07c0,0.18,0,0.59,0.01,0.72c0.02,0.16,0.08,0.29,0.14,0.42c0.04,0.08,0.07,0.17,0.1,0.25c0,0,0,0,0,0.01
            c0,0,0,0,0.01,0c-0.01,0.04,0,0.07,0,0.1C36.27,25.51,36.39,25.64,36.5,25.76z M36.63,23.69c0-0.1,0-0.19,0-0.29
            c0-0.16-0.01-0.31,0.04-0.48c0.01-0.04,0.32-0.84,0.44-0.97c0-0.01,0-0.01,0-0.01c0-0.01,0.01-0.01,0.01-0.01
            c0.01-0.01,0.01-0.02,0.02-0.04c0.02-0.08,0.07-0.13,0.13-0.19c0.02-0.01,0.02-0.02,0.02-0.04c0.05-0.11,0.3-0.25,0.47-0.37
            c0.22-0.16,0.47-0.19,0.62-0.24c0.01-0.01,0.02-0.01,0.04-0.01c0.1-0.02,0.19-0.04,0.29-0.01c0.14,0.02,0.24,0.08,0.28,0.12
            c0.02,0,0.04,0.01,0.05,0.04c0.11,0.05,0.2,0.07,0.29,0.16c0.13,0.13,0.45,0.57,0.53,0.73c0.06,0.12,0.13,0.32,0.2,0.63
            c0,0.01,0,0.02,0,0.02c0.07,0.26,0.04,1.17,0.01,1.35c-0.01,0.2-0.5,1.2-0.75,1.41c-0.05,0.04-0.1,0.07-0.13,0.12
            c-0.04,0.04-0.08,0.07-0.11,0.11c-0.11,0.12-0.59,0.31-0.66,0.34c-0.25,0.07-0.45,0.04-0.57,0.02c-0.06-0.01-0.11-0.04-0.16-0.07
            c-0.01-0.01-0.02-0.02-0.06-0.05c-0.07-0.02-0.16-0.07-0.24-0.18c-0.02-0.02-0.29-0.48-0.43-0.71c-0.02-0.02-0.02-0.05-0.05-0.08
            c-0.02-0.06-0.05-0.07-0.06-0.1c-0.01-0.02-0.04-0.05-0.07-0.12C36.69,24.59,36.62,23.84,36.63,23.69z"/>
        <path d="M44.73,26.66c0.04,0.07,0.87,0.08,0.92-0.02c0.04-0.11-0.13-0.29-0.18-0.41
            c0-0.01-0.18-0.31-0.2-0.38c-0.11-0.2-0.11-0.17-0.22-0.37c-0.06-0.12-0.1-0.22-0.18-0.34c-0.06-0.1-0.1-0.24-0.17-0.35
            c-0.11-0.2-0.12-0.35-0.23-0.54c-0.04-0.06-0.07-0.11-0.1-0.16c-0.07-0.19-0.1-0.13-0.13-0.32c-0.04-0.31,0.04-0.36,0.22-0.54
            c0.14-0.06,0.3-0.19,0.44-0.32c0.16-0.17,0.28-0.29,0.37-0.47c0.02-0.05,0.05-0.08,0.08-0.13c0.1-0.12,0.18-0.73,0.17-0.78
            c-0.02-0.04-0.02-0.07-0.05-0.11c-0.14-0.26-0.24-0.56-0.48-0.73c-0.02-0.01-0.44-0.3-0.75-0.36c-0.02-0.01-0.26-0.01-0.29-0.01
            c-0.08-0.01-0.17-0.01-0.25-0.01c-0.07-0.06-0.74,0.01-0.87,0c-0.51-0.01-0.67-0.02-0.97-0.02c-0.07,0-0.38-0.06-0.48,0.26
            c-0.07,0.24-0.01,0.5,0.36,0.49c0.42-0.01,0.35,0.34,0.37,0.8c0,0.23,0.01,0.3,0.01,0.54c0,0.18,0,0.36-0.01,0.55s0,0.38-0.01,0.57
            c0,0.1-0.02,0.19-0.01,0.29c0.04,0.3-0.05,1.22-0.04,1.34c0,0.1-0.02,0.56,0,0.61c0,0.14-0.11,0.36-0.08,0.51
            c0,0.18-0.06,0.25-0.07,0.32c0,0.05,0,0.04,0.02,0.08c0.04,0.05,0.74,0.1,0.84,0c0.02-0.04,0.04-0.05,0.04-0.05
            c0.02-0.06-0.04-0.25-0.04-0.29c0.01-0.12,0-0.41,0-0.53c0-0.06,0.04-0.75,0.02-0.87c-0.01-0.04,0-0.36,0.01-0.55
            c-0.04-0.31,0.55-0.79,0.81-0.38c0.04,0.07,0.28,0.6,0.29,0.6c0,0,0.29,0.63,0.3,0.67c0,0,0,0,0,0.02c0.1,0.14,0.12,0.31,0.22,0.45
            c0.01,0.04,0.04,0.06,0.05,0.08c0.08,0.11,0.12,0.26,0.13,0.28C44.77,26.41,44.56,26.41,44.73,26.66z M43.84,22.84
            c-0.04,0.01-0.34,0.19-0.5,0.23c-0.05,0.02-0.42,0.26-0.49-0.14c0-0.06,0-0.43,0.01-0.53c0-0.02,0.01-0.05,0-0.07
            c0.01-0.26,0-0.57-0.01-0.71c-0.01-0.13,0.01-0.25,0.02-0.31c0.02-0.08,0.14-0.25,0.22-0.28c0.17-0.06,0.19-0.06,0.35-0.06
            C43.63,20.97,43.8,21,43.98,21c0.01,0,0.02,0,0.04,0c0.02,0.01,0.24,0.04,0.34,0.08c0.06,0.04,0.12,0.08,0.17,0.13
            C45.14,21.99,44.54,22.45,43.84,22.84z"/>
        <path d="M47.96,26.75l1.14-0.01c0.69-0.02,0.85-0.01,1.03,0l0.83,0.06h0.16
            c0.08,0,0.19-0.01,0.26-0.07c0.1-0.07,0.11-0.24,0.07-0.37c-0.05-0.14,0.05-0.41-0.04-0.49c-0.02-0.02-0.07-0.04-0.08-0.04
            c-0.31,0.06-0.35,0.26-1.35,0.24c-0.04,0.01-0.07,0.01-0.12,0.01c-0.07,0-0.16-0.01-0.24-0.01c-0.6-0.02-0.87-0.11-1.03-0.23
            c-0.07-0.1-0.08-0.2-0.08-0.29c0.01-0.06,0-0.29,0-0.54c0-0.28-0.01-0.29,0-0.36c0.01-0.49-0.06-0.9,0.04-1.99
            c0.02-0.36,0.06-0.68,0.06-0.74c-0.01-0.16-0.02-0.31-0.02-0.47c0-0.16,0-0.3,0-0.45c0-0.16,0.04-0.24,0.06-0.31
            c0.02-0.06,0.04-0.11,0.02-0.16c-0.01-0.12-0.39-0.13-0.55-0.13c-0.02,0-0.04,0-0.05,0c-0.13,0.01-0.28,0.06-0.28,0.14
            c-0.02,0.22,0.07,0.28,0.05,0.48c0,0.06,0,0.12-0.01,0.18c0,0.11,0.01,0.23,0,0.34c-0.04,0.14-0.01,0.29-0.01,0.42
            c0.01,0.1,0.01,0.19,0.01,0.28c-0.01,0.04,0,0.07,0,0.1c-0.02,0.55-0.02,0.62-0.02,0.68c-0.01,0.12-0.01,0.25-0.01,0.38
            c0,0.13,0.01,0.28,0.01,0.41c0,0.2,0.01,1.15-0.02,1.42c-0.12,0.8-0.23,0.93-0.62,1.03c-0.04,0.01-0.08,0.02-0.12,0.02h-0.01
            c-0.23,0.05-0.35,0.12-0.45,0.28c-0.02,0.02,0,0.25,0.01,0.31c0.01,0.1,0.1,0.14,0.19,0.14c0.01,0,0.02,0,0.02,0
            c0.07-0.01,0.16-0.02,0.25-0.05c0.23-0.04,0.53-0.18,0.91-0.22v0.01L47.96,26.75z"/>
        <path d="M52.29,27.16c0.04,0.01,0.08,0.02,0.11,0.02c0.06,0,0.12-0.02,0.17-0.07
            c0.1-0.07,0.19-0.13,0.3-0.19c0.08-0.04,0.16-0.07,0.23-0.12c0.01-0.01,0.04-0.01,0.05-0.02c0.14-0.02,0.28-0.06,0.42-0.06
            c0.02,0,0.04,0,0.05,0c0.02,0,0.06,0,0.08,0c0.1,0,0.18,0,0.26-0.01c0.1,0,0.19,0,0.29,0c0.19,0.01,0.34,0.04,0.48,0.05
            c0.1,0.01,0.22,0.04,0.35,0.05c0.01,0,0.04,0,0.05,0c0.13,0,0.25-0.04,0.38-0.07c0.06-0.01,0.13-0.04,0.18-0.05
            c0.13-0.02,0.24-0.08,0.32-0.14c0.04-0.02,0.07-0.05,0.1-0.07c0.02-0.01,0.04-0.02,0.06-0.05c0.04-0.02,0.08-0.06,0.12-0.08
            c0.1-0.06,0.19-0.13,0.29-0.22c0.12-0.11,0.23-0.24,0.32-0.35c0.08-0.1,0.14-0.19,0.19-0.29c0.08-0.19,0.12-0.37,0.16-0.57
            c0-0.05,0.01-0.1,0.02-0.14c0.01-0.1,0.02-0.18,0.02-0.28c0-0.05,0-0.1,0.01-0.14c0-0.07,0.01-0.14,0.01-0.22
            c0.04-0.37,0.07-0.75-0.01-1.15c0.01-0.14-0.05-0.28-0.11-0.39c-0.01-0.02-0.02-0.05-0.04-0.07c-0.07-0.16-0.16-0.32-0.23-0.45
            c-0.02-0.04-0.04-0.07-0.06-0.11c-0.06-0.13-0.13-0.26-0.23-0.38c-0.1-0.13-0.2-0.24-0.31-0.34c-0.04-0.04-0.06-0.06-0.08-0.08
            c-0.02-0.04-0.1-0.08-0.17-0.14c-0.19-0.16-0.45-0.26-0.5-0.31c-0.06-0.02-0.13-0.04-0.2-0.06c-0.07-0.01-0.14-0.04-0.22-0.07
            c-0.11-0.05-0.22-0.08-0.35-0.11c-0.04,0-0.07-0.01-0.11-0.02c-0.02-0.01-0.05-0.01-0.08-0.02c0,0-0.01,0-0.02,0
            c-0.04-0.01-0.08-0.02-0.13-0.02h-0.01c-0.06,0-0.12,0-0.18,0c-0.04,0.01-0.08,0.01-0.13,0.01c-0.04,0-0.08,0-0.12,0
            c-0.06,0.01-0.11,0.01-0.16,0.01c-0.05,0-0.1,0-0.13-0.01c-0.05-0.01-0.08-0.01-0.13-0.01c0,0-0.62,0.02-0.71,0.02
            c-0.01,0-0.24,0.01-0.32,0.1c-0.06,0.08-0.1,0.38-0.07,0.42c0.02,0.11,0.16,0.18,0.26,0.19c0.04,0,0.06,0.01,0.1,0.01
            c0.38-0.01,0.55,0.25,0.55,0.62c0,0.07,0.01,0.05,0.01,0.11c0.02,0.18,0.01,0.3,0,0.48c0.01,0.25,0,0.54,0,0.56
            c0,0.02,0,0.04,0,0.06s-0.01,0.22-0.02,0.31c0,0.1,0,0.12,0,0.13c0,0.17-0.01,0.43-0.02,0.54c-0.01,0.13-0.02,0.25-0.01,0.39
            c0.02,0.41-0.01,0.63-0.06,0.99c-0.02,0.51-0.43,0.83-0.67,0.93c-0.12,0.05-0.2,0.14-0.31,0.2c-0.02,0.02-0.06,0.04-0.08,0.06
            c-0.1,0.06-0.17,0.25-0.16,0.34C52.08,26.97,52.23,27.13,52.29,27.16z M54,25.2c0.01-0.07,0.01-0.12,0.01-0.18v-0.01
            c0-0.06,0.04-0.85,0.05-1.15c0-0.11,0.01-0.22,0-0.32c0-0.08,0-0.17,0-0.26c0-0.05,0.01-0.1,0.01-0.16c0-0.06,0.01-0.13,0.01-0.19
            c-0.01-0.24,0.01-0.48-0.01-0.69c0.04-0.5-0.12-1.12,0.45-1.12c0.2,0,0.34,0.06,0.55,0.16c0.13,0.06,0.2,0.1,0.32,0.17
            c0.07,0.04,0.13,0.06,0.2,0.11c0.41,0.3,0.43,0.41,0.55,0.56c0.04,0.05,0.06,0.1,0.08,0.14c0.53,1.33,0.32,2.31,0.24,2.76
            c-0.01,0.07-0.06,0.18-0.11,0.26c-0.05,0.08-0.11,0.19-0.19,0.28c-0.1,0.08-0.56,0.45-0.84,0.53c-0.02,0-0.06,0.01-0.07,0.02
            c-0.01,0-0.01,0-0.01,0c-0.06,0.02-0.11,0.04-0.18,0.02c-0.05-0.01-0.08-0.01-0.13-0.01c-0.04,0-0.07,0-0.1,0
            c-0.08-0.01-0.14-0.02-0.23-0.04c-0.04-0.01-0.08-0.01-0.13-0.02c-0.01,0-0.04-0.01-0.06-0.01c-0.02-0.01-0.05-0.02-0.08-0.02
            c-0.04-0.01-0.19-0.07-0.25-0.13c-0.05-0.04-0.07-0.11-0.08-0.17C54,25.55,53.98,25.37,54,25.2z"/>
        <path d="M60.63,18.28 L59.78,20.48 L60.06,20.48 L61.36,18.28 Z"/>
        <path d="M60.61,25.92c0.04,0.05,0.02,0.08,0.05,0.13c0.01,0.04,0.02,0.07,0.05,0.1
            c0,0.02,0.01,0.05,0.04,0.06c0.02,0.06,0.05,0.11,0.1,0.14c0.06,0.06,0.11,0.12,0.16,0.18c0.05,0.05,0.07,0.1,0.11,0.13
            c0.01,0.01,0.12,0.12,0.18,0.14c0.02,0,0.36,0.2,0.48,0.29c0.13,0.1,0.26,0.12,0.39,0.13c0.02,0.01,0.07,0.01,0.08,0.02
            c0.2,0.06,0.39,0.08,0.61,0.06c0.1-0.01,0.19-0.02,0.29-0.04l0.26-0.01c0.06,0.01,0.17-0.06,0.19-0.06
            c0.07-0.01,0.17-0.02,0.23-0.06c0.13-0.08,0.25-0.19,0.38-0.28c0.06-0.06,0.13-0.11,0.19-0.18c0.17-0.22,0.45-0.57,0.53-0.83
            l0.14-0.69c0.05-0.18-0.1-0.87-0.18-1.02c-0.11-0.19-0.25-0.43-0.41-0.59c-0.18-0.19-0.33-0.41-0.55-0.55
            c-0.07-0.07-0.16-0.17-0.2-0.2c-0.08-0.04-0.71-0.51-0.84-0.71c-0.02-0.04-0.25-0.23-0.28-0.43c-0.04-0.35,0.08-0.45,0.13-0.5
            c0.1-0.08,0.17-0.14,0.24-0.18c0.02-0.01,0.11-0.02,0.13-0.02c0.38-0.05,0.55,0.28,0.56,0.28c0,0.04,0.02,0.11,0.01,0.14
            c-0.02,0.1-0.07,0.22-0.06,0.38c0,0.1,0.05,0.18,0.17,0.22c0.12,0.05,0.29,0,0.36-0.05c0.05-0.02,0.11-0.06,0.13-0.12
            c0.08-0.13,0.12-0.5,0.06-0.75l-0.02-0.11c-0.01-0.02-0.02-0.05-0.02-0.07c-0.07-0.16-0.4-0.45-0.55-0.5
            c-0.17-0.06-0.26-0.06-0.44-0.08c-0.08,0-0.67-0.06-1.03,0.37c-0.06,0.07-0.36,0.36-0.36,0.93v0.07c0.01,0.1,0.07,0.2,0.1,0.26
            c0,0.06,0.24,0.39,0.31,0.48c0.01,0.04,0.3,0.32,0.43,0.43c0.12,0.08,0.4,0.38,0.42,0.39c0.06,0.04,0.2,0.17,0.32,0.29l0.05,0.04
            c0.04,0.04,0.07,0.06,0.1,0.08c0.06,0.07,0.13,0.13,0.19,0.19l0.05,0.05c0.08,0.06,0.34,0.5,0.37,0.6
            c0.16,0.54,0.01,1.14-0.07,1.36c-0.01,0.06-0.06,0.12-0.1,0.18c-0.05,0.06-0.08,0.11-0.12,0.16c-0.12,0.16-0.13,0.07-0.28,0.19
            c-0.06,0.05-0.11,0.1-0.17,0.11c-0.11,0.07-0.25,0.1-0.38,0.16c-0.11,0.05-0.22,0.07-0.35,0.05c-0.05-0.01-0.08-0.02-0.12-0.01
            c-0.17-0.01-0.28-0.06-0.45-0.1c-0.13-0.02-0.24-0.13-0.37-0.17c-0.01,0-0.02-0.01-0.05-0.02c-0.07-0.04-0.28-0.14-0.48-0.57
            c-0.16-0.33-0.07-0.92,0-1.04c0.02-0.05,0.01-0.07,0.04-0.1c0.08-0.14,0.29-0.33,0.41-0.48c0.02-0.01,0.06-0.04,0.08-0.06
            c0.06-0.1,0.01-0.3-0.02-0.38c-0.13-0.25-0.45-0.11-0.51-0.07c-0.06,0.04-0.13,0.08-0.18,0.14c-0.06,0.1-0.13,0.18-0.2,0.25
            c-0.06,0.06-0.1,0.12-0.14,0.19c-0.05,0.1-0.17,0.36-0.17,0.45c0,0.06-0.08,0.39-0.08,0.42c0,0.08,0,0.16,0,0.23
            c0.01,0.12,0.04,0.39,0.07,0.53C60.6,25.91,60.61,25.91,60.61,25.92z"/>
        <path d="M31.83,50.64c0-0.15,0.06-0.45,0.32-0.45c0.05-0.01,0.53,0.01,0.61,0
            c0.17-0.01,0.52,0.06,0.69,0.07c0.12,0,0.21-0.06,0.27-0.17c0.02-0.04,0.02-0.1-0.01-0.12c-0.07-0.06-0.12-0.47-0.2-0.51
            c-0.02-0.01-0.06-0.02-0.1-0.01c-0.17,0.02-0.55-0.02-0.72-0.04c-0.04,0-0.07,0-0.12,0c-0.09,0.01-0.45,0-0.55,0
            c-0.18,0-0.6,0-0.8,0.01c-0.29,0.02-0.85,0-1.14-0.02c-0.07-0.01-0.13-0.01-0.21,0c-0.12,0.02-0.26,0.04-0.38,0.01
            c-0.11-0.01-0.22,0.33-0.26,0.44c-0.01,0.06-0.1,0.34,0.04,0.38c0.15,0.06,0.32-0.05,0.49-0.06c0.12,0.02,0.25-0.01,0.37,0
            c0.16,0.01,0.33,0.01,0.54,0.02c0.21,0.02,0.36,0.09,0.37,0.31c0.01,0.13,0.02,0.21,0.01,0.34c-0.01,0.26,0.02,0.21,0,0.45
            c-0.01,0.15-0.04,0.29-0.02,0.44c0.01,0.11,0.01,0.22,0.01,0.34c0.01,0.07,0.01,0.15,0.02,0.22c0,0.09-0.02,0.59-0.05,0.76
            c0,0.07,0.01,0.15,0.01,0.23c-0.01,0.23-0.02,0.47-0.02,0.71c-0.01,0.13-0.02,0.27-0.02,0.4c0,0.17,0,0.34-0.02,0.52
            c0,0.02-0.02,0.38-0.02,0.44c0,0.12-0.01,0.22-0.06,0.39c-0.06,0.23,0.88,0.18,0.97,0.02c0.07-0.15-0.07-0.09-0.07-0.48
            c0.01-0.2,0.01-0.38-0.01-0.56c-0.01-0.06,0-0.12,0-0.17c0-0.06,0-0.12,0-0.18c-0.01-0.07,0.04-0.65,0.04-0.83
            c0-0.15,0.02-0.28,0.02-0.43c0-0.23,0.01-0.45,0-0.69c-0.01-0.27-0.02-1.21,0-1.41C31.82,50.91,31.83,50.79,31.83,50.64z"/>
        <path d="M39.26,51.72c-0.02-0.13-0.05-0.27-0.1-0.39c0-0.05-0.01-0.09-0.02-0.12
            c0.01-0.02,0-0.04-0.01-0.05c0-0.01-0.01-0.02-0.01-0.04c-0.01-0.04-0.02-0.09-0.04-0.12c-0.02-0.09-0.06-0.17-0.1-0.26
            c-0.02-0.09-0.05-0.15-0.11-0.18c-0.02-0.01-0.05-0.05-0.05-0.09c-0.02-0.05-0.06-0.07-0.09-0.11c-0.02-0.02-0.04-0.05-0.06-0.06
            c-0.04-0.04-0.05-0.07-0.09-0.12c-0.02-0.02-0.05-0.05-0.07-0.07c-0.01-0.02-0.04-0.05-0.06-0.1c-0.04-0.04-0.06-0.07-0.1-0.11
            c-0.09-0.11-0.18-0.21-0.29-0.28c-0.05-0.02-0.1-0.05-0.15-0.09c-0.06-0.05-0.12-0.1-0.2-0.12c-0.12-0.06-0.26-0.11-0.39-0.12
            c-0.2-0.05-0.38-0.04-0.58,0c-0.17,0.02-0.33,0.12-0.49,0.16c-0.07,0.01-0.12,0.06-0.18,0.09c-0.18,0.12-0.32,0.17-0.42,0.23
            c-0.04,0.04-0.1,0.07-0.13,0.11l-0.04,0.02c-0.2,0.1-0.24,0.18-0.39,0.4c-0.09,0.11-0.16,0.21-0.21,0.28
            c-0.02,0.02-0.04,0.06-0.05,0.1l-0.01,0.01c-0.04,0.07-0.06,0.15-0.09,0.22c-0.13,0.33-0.42,0.87-0.4,1.29c0,0,0.01,0.05,0.01,0.06
            c0.01,0.13,0.04,0.4,0.04,0.54c0,0.01,0,0.04,0,0.07c0,0.18,0,0.6,0.01,0.74c0.02,0.16,0.09,0.29,0.15,0.43
            c0.04,0.09,0.07,0.17,0.1,0.26c0,0,0,0,0,0.01c0,0,0,0,0.01,0c-0.01,0.04,0,0.07,0,0.1c0.05,0.17,0.17,0.31,0.28,0.43
            c0.1,0.11,0.34,0.37,0.37,0.4c0.25,0.29,0.53,0.48,0.83,0.54c0.01,0,0.04,0,0.05,0c0.12,0.02,0.26,0.02,0.38,0.01
            c0.07,0.01,0.15,0,0.22,0c0.04,0,0.07,0,0.11,0c0.02,0,0.04,0,0.07-0.01c0.02,0,0.05,0.01,0.09,0c0.07-0.01,0.13,0,0.21-0.02
            c0.06,0,0.12-0.04,0.18-0.06c0.2-0.1,0.44-0.16,0.58-0.31c0.04-0.04,0.13-0.11,0.17-0.15c0.07-0.06,0.11-0.09,0.13-0.1
            c0.09-0.17,0.23-0.32,0.38-0.44c0.16-0.16,0.21-0.36,0.28-0.55c0.02-0.01,0.02-0.02,0.02-0.04c0.09-0.15,0.32-0.63,0.34-1.78
            c0-0.15-0.04-0.29-0.07-0.44C39.28,51.83,39.26,51.78,39.26,51.72z M38.58,53.11c-0.01,0.21-0.52,1.23-0.77,1.45
            c-0.05,0.04-0.1,0.07-0.13,0.12c-0.04,0.04-0.09,0.07-0.11,0.11c-0.11,0.12-0.6,0.32-0.67,0.34c-0.26,0.07-0.47,0.04-0.59,0.02
            c-0.06-0.01-0.11-0.04-0.16-0.07c-0.01-0.01-0.02-0.02-0.06-0.05c-0.07-0.02-0.16-0.07-0.25-0.18c-0.02-0.02-0.29-0.49-0.44-0.72
            c-0.02-0.02-0.02-0.05-0.05-0.09c-0.02-0.06-0.05-0.07-0.06-0.1c-0.01-0.02-0.04-0.05-0.07-0.12c-0.09-0.2-0.16-0.97-0.15-1.12
            c0-0.1,0-0.2,0-0.29c0-0.16-0.01-0.32,0.04-0.49c0.01-0.04,0.33-0.86,0.45-0.99c0-0.01,0-0.01,0-0.01c0-0.01,0.01-0.01,0.01-0.01
            c0.01-0.01,0.01-0.02,0.02-0.04c0.02-0.09,0.07-0.13,0.13-0.2c0.02-0.01,0.02-0.02,0.02-0.04c0.05-0.11,0.31-0.26,0.48-0.38
            c0.22-0.16,0.48-0.2,0.64-0.25C36.88,50,36.89,50,36.9,50c0.1-0.02,0.2-0.04,0.29-0.01c0.15,0.02,0.25,0.09,0.28,0.12
            c0.02,0,0.04,0.01,0.05,0.04c0.11,0.05,0.21,0.07,0.29,0.16c0.14,0.13,0.47,0.59,0.54,0.75c0.06,0.12,0.13,0.33,0.21,0.65
            c0,0.01,0,0.02,0,0.02C38.64,52,38.61,52.93,38.58,53.11z"/>
        <path d="M44.64,49.33l-0.01-0.01c-0.02-0.02-0.04-0.02-0.07-0.04c-0.04,0-0.16,0-0.29,0
            c-0.16,0-0.27,0-0.31,0.01v0.01c-0.02,0-0.05,0.01-0.07,0.01c-0.07,0.02-0.16,0.05-0.13,0.17c0.01,0.09,0.04,0.1,0.06,0.13
            c0.01,0.01,0.02,0.02,0.05,0.05c0.05,0.06,0.09,0.11,0.11,0.18c0,0,0,0,0,0.01c0.04,0.11,0.05,0.12,0.05,0.13
            c0.02,0.04,0.16,0.43,0.18,0.58c0.01,0.11,0.36,1.61,0.43,1.88c0,0.02,0.01,0.05,0.02,0.06c0,0.01,0,0.02,0.01,0.02
            c0.12,0.4,0.15,0.5,0.17,0.6c0.01,0.02,0.01,0.06,0.02,0.09c0.24,1.1,0.29,1.29,0.33,1.42c0.02,0.09,0.04,0.15,0.05,0.17
            c0,0.02,0.01,0.07,0.02,0.12c0.01,0.1,0.04,0.22,0.06,0.29c0.01,0.04,0.02,0.17,0.01,0.2c-0.06,0.15,0.01,0.25,0.06,0.28
            c0.02,0.02,0.07,0.04,0.15,0.04c0.06,0,0.15-0.01,0.23-0.04c0.12,0,0.28,0,0.39-0.01c0.07,0,0.15,0,0.23,0
            c0.12,0.02,0.25,0.05,0.34,0.05c0.06,0,0.11-0.01,0.15-0.04c0.04-0.02,0.11-0.09,0.05-0.23c-0.01-0.02-0.01-0.16,0-0.32
            c0-0.06,0.02-0.15,0.05-0.23c0.01-0.04,0.02-0.07,0.02-0.11c0-0.02,0.02-0.09,0.05-0.17c0.13-0.56,0.29-1.29,0.33-1.42
            c0.01-0.02,0.01-0.06,0.02-0.09c0.02-0.1,0.05-0.2,0.09-0.28v-0.01h0.01c0-0.05,0-0.07,0.01-0.1v-0.01
            c0.01-0.04,0.02-0.07,0.04-0.11c0.01-0.02,0.01-0.06,0.02-0.09c0.01,0,0.01-0.01,0.01-0.01c0.01-0.02,0.02-0.05,0.02-0.07
            c0.07-0.27,0.4-1.77,0.43-1.88c0.02-0.15,0.16-0.53,0.18-0.58c0-0.01,0.01-0.02,0.05-0.13c0-0.01,0-0.01,0-0.01
            c0.04-0.09,0.07-0.15,0.11-0.2c0.02-0.02,0.04-0.04,0.05-0.05c0.02-0.04,0.05-0.05,0.06-0.14c0.02-0.12-0.06-0.15-0.14-0.17
            c-0.02,0-0.05-0.01-0.07-0.01c-0.04-0.01-0.15-0.02-0.32-0.02c-0.12,0-0.25,0-0.28,0.01c-0.04,0-0.05,0-0.07,0.02l-0.01,0.01
            c-0.09,0.06-0.06,0.21-0.05,0.26c0,0.02,0,0.04-0.01,0.06c0,0.02,0,0.05,0,0.07c0,0.04-0.04,0.22-0.05,0.26
            c0,0.01,0,0.01-0.01,0.06c-0.01,0.09-0.05,0.29-0.06,0.32c-0.01,0.05-0.04,0.11-0.05,0.16c-0.01,0.06-0.02,0.11-0.05,0.16
            c0,0.01,0,0.02-0.01,0.04c-0.02,0.04-0.04,0.09-0.04,0.13c0,0.01,0,0.02,0,0.04c-0.05,0.12-0.42,1.53-0.43,1.63
            c0,0.02,0,0.04,0,0.06c-0.01,0.05-0.02,0.09-0.02,0.13c-0.15,0.59-0.26,0.98-0.28,1.04l-0.01,0.01c-0.01,0.04-0.02,0.11-0.05,0.18
            c-0.07,0.31-0.11,0.45-0.13,0.55c-0.12,0.27-0.37,0.22-0.45-0.09c-0.01-0.07-0.05-0.09-0.15-0.47c-0.01-0.07-0.04-0.15-0.04-0.17
            v-0.01c-0.22-0.89-0.26-0.97-0.27-1.05c0-0.07-0.02-0.13-0.05-0.2c-0.01-0.04-0.02-0.06-0.02-0.1c-0.06-0.18-0.11-0.37-0.16-0.55
            c-0.01-0.02-0.01-0.06-0.02-0.09c0-0.02-0.01-0.04-0.01-0.05c0-0.04-0.36-1.43-0.38-1.48c-0.01-0.07-0.02-0.16-0.04-0.21
            c-0.01-0.05-0.01-0.05-0.01-0.06c-0.01-0.04-0.04-0.21-0.04-0.26c0-0.02,0-0.05-0.01-0.06c0-0.02-0.01-0.05,0-0.06
            C44.7,49.53,44.72,49.39,44.64,49.33z"/>
        <path d="M49.59,55.55c-0.04,0.05-0.11,0.16-0.06,0.21c0.04,0.04,0.06,0.05,0.1,0.06
            c0.1,0.02,0.6-0.02,0.7-0.04c0.14,0,0.26,0.02,0.26-0.09c0-0.1-0.01-0.09-0.06-0.18c-0.05-0.07-0.07-0.12-0.09-0.21
            c0,0-0.01-0.13-0.01-0.15c-0.04-0.06-0.05-0.33-0.04-0.48c0.01-0.12,0.07-1.68,0.06-1.92c0.01-0.02,0-0.06,0-0.09
            c-0.01-0.06,0-0.13-0.01-0.21c0,0,0-0.05,0-0.11c-0.01-0.13-0.01-0.27-0.01-0.4c0-0.15,0.02-0.91,0.04-0.94c0-0.01,0-0.02,0-0.02
            c0-0.26-0.01-0.61,0-0.66c0-0.11,0.04-0.37,0.01-0.48c0-0.04,0.04-0.2,0.06-0.22c0.1-0.1,0.05-0.15,0.02-0.18
            c-0.12-0.11-0.87-0.11-0.93-0.05c-0.02,0.05-0.02,0.04-0.02,0.09c0,0.16,0.09,0.09,0.12,0.39c-0.04,0.16,0,0.37-0.02,0.5
            c-0.01,0.05-0.02,0.75-0.02,0.85c0.02,0.01,0.05,0.48-0.01,0.83c0.04,0.18,0.04,0.39,0.04,0.58S49.69,53,49.69,53.2
            c0,0.18,0,0.37,0,0.55c-0.01,0.17,0.04,0.34-0.02,0.5c-0.01,0.05,0.01,0.11,0.01,0.17c0.01,0.11,0,0.22,0.01,0.32
            c0.01,0.05-0.02,0.38-0.02,0.39c0.01,0.04,0,0.23-0.01,0.28C49.63,55.47,49.61,55.51,49.59,55.55z"/>
        <path d="M52.62,53.72c0.09-0.15,0.29-0.34,0.42-0.49c0.02-0.01,0.06-0.04,0.09-0.06
            c0.06-0.1,0.01-0.31-0.02-0.39c-0.13-0.26-0.47-0.11-0.53-0.07c-0.06,0.04-0.13,0.09-0.18,0.15c-0.06,0.1-0.13,0.18-0.21,0.26
            c-0.06,0.06-0.1,0.12-0.15,0.2c-0.05,0.1-0.17,0.37-0.17,0.47c0,0.06-0.09,0.4-0.09,0.43c0,0.09,0,0.16,0,0.23
            c0.01,0.12,0.04,0.4,0.07,0.54c0,0.01,0.01,0.01,0.01,0.02c0.04,0.05,0.02,0.09,0.05,0.13c0.01,0.04,0.02,0.07,0.05,0.1
            c0,0.02,0.01,0.05,0.04,0.06c0.02,0.06,0.05,0.11,0.1,0.15c0.06,0.06,0.11,0.12,0.16,0.18c0.05,0.05,0.07,0.1,0.11,0.13
            c0.01,0.01,0.12,0.12,0.18,0.15c0.02,0,0.37,0.21,0.49,0.29c0.13,0.1,0.27,0.12,0.4,0.13c0.02,0.01,0.07,0.01,0.09,0.02
            c0.21,0.06,0.4,0.09,0.63,0.06c0.1-0.01,0.2-0.02,0.29-0.04l0.27-0.01c0.06,0.01,0.17-0.06,0.2-0.06c0.07-0.01,0.17-0.02,0.23-0.06
            c0.13-0.09,0.26-0.2,0.39-0.28c0.06-0.06,0.13-0.11,0.2-0.18c0.17-0.22,0.47-0.59,0.54-0.85l0.15-0.71
            c0.05-0.18-0.1-0.89-0.18-1.04c-0.11-0.2-0.26-0.44-0.42-0.6c-0.18-0.2-0.34-0.42-0.56-0.56c-0.07-0.07-0.16-0.17-0.21-0.21
            c-0.09-0.04-0.72-0.53-0.86-0.72c-0.02-0.04-0.26-0.23-0.28-0.44c-0.04-0.36,0.09-0.47,0.13-0.52c0.1-0.09,0.17-0.15,0.24-0.18
            c0.02-0.01,0.11-0.02,0.13-0.02c0.39-0.05,0.56,0.28,0.58,0.28c0,0.04,0.02,0.11,0.01,0.15c-0.02,0.1-0.07,0.22-0.06,0.39
            c0,0.1,0.05,0.18,0.17,0.22c0.12,0.05,0.29,0,0.37-0.05c0.05-0.02,0.11-0.06,0.13-0.12c0.09-0.13,0.12-0.52,0.06-0.77l-0.02-0.11
            c-0.01-0.02-0.02-0.05-0.02-0.07c-0.07-0.16-0.4-0.47-0.56-0.52c-0.17-0.06-0.27-0.06-0.45-0.09c-0.09,0-0.69-0.06-1.05,0.38
            c-0.06,0.07-0.37,0.37-0.37,0.96v0.07c0.01,0.1,0.07,0.21,0.1,0.27c0,0.06,0.24,0.4,0.32,0.49c0.01,0.04,0.31,0.33,0.44,0.44
            c0.12,0.09,0.4,0.39,0.43,0.4c0.06,0.04,0.21,0.17,0.33,0.29l0.05,0.04c0.04,0.04,0.07,0.06,0.1,0.09c0.06,0.07,0.13,0.13,0.2,0.2
            l0.05,0.05c0.09,0.06,0.34,0.51,0.38,0.61c0.16,0.55,0.01,1.16-0.07,1.4c-0.01,0.06-0.06,0.12-0.1,0.18
            c-0.05,0.06-0.09,0.11-0.12,0.16c-0.12,0.16-0.13,0.07-0.28,0.2c-0.06,0.05-0.11,0.1-0.17,0.11c-0.11,0.07-0.26,0.1-0.39,0.16
            c-0.11,0.05-0.22,0.07-0.36,0.05c-0.05-0.01-0.09-0.02-0.12-0.01c-0.17-0.01-0.28-0.06-0.47-0.1c-0.13-0.02-0.24-0.13-0.38-0.17
            c-0.01,0-0.02-0.01-0.05-0.02c-0.07-0.04-0.28-0.15-0.49-0.59c-0.16-0.34-0.07-0.94,0-1.07C52.6,53.76,52.59,53.74,52.62,53.72z"/>
        <path d="M57.34,55.55c-0.04,0.05-0.11,0.16-0.06,0.21c0.04,0.04,0.06,0.05,0.1,0.06
            c0.1,0.02,0.6-0.02,0.7-0.04c0.14,0,0.26,0.02,0.26-0.09c0-0.1-0.01-0.09-0.06-0.18c-0.05-0.07-0.07-0.12-0.09-0.21
            c0,0-0.01-0.13-0.01-0.15c-0.04-0.06-0.05-0.33-0.04-0.48c0.01-0.12,0.07-1.68,0.06-1.92c0.01-0.02,0-0.06,0-0.09
            c-0.01-0.06,0-0.13-0.01-0.21c0,0,0-0.05,0-0.11c-0.01-0.13-0.01-0.27-0.01-0.4c0-0.15,0.02-0.91,0.04-0.94c0-0.01,0-0.02,0-0.02
            c0-0.26-0.01-0.61,0-0.66c0-0.11,0.04-0.37,0.01-0.48c0-0.04,0.04-0.2,0.06-0.22c0.1-0.1,0.05-0.15,0.02-0.18
            c-0.12-0.11-0.87-0.11-0.93-0.05c-0.02,0.05-0.02,0.04-0.02,0.09c0,0.16,0.09,0.09,0.12,0.39c-0.04,0.16,0,0.37-0.02,0.5
            c-0.01,0.05-0.02,0.75-0.02,0.85c0.02,0.01,0.05,0.48-0.01,0.83c0.04,0.18,0.04,0.39,0.04,0.58S57.43,53,57.43,53.2
            c0,0.18,0,0.37,0,0.55c-0.01,0.17,0.04,0.34-0.02,0.5c-0.01,0.05,0.01,0.11,0.01,0.17c0.01,0.11,0,0.22,0.01,0.32
            c0.01,0.05-0.02,0.38-0.02,0.39c0.01,0.04,0,0.23-0.01,0.28C57.37,55.47,57.36,55.51,57.34,55.55z"/>
        <path d="M61.9,50.64c0-0.15,0.06-0.45,0.32-0.45c0.05-0.01,0.53,0.01,0.61,0
            c0.17-0.01,0.52,0.06,0.69,0.07c0.12,0,0.21-0.06,0.27-0.17c0.02-0.04,0.02-0.1-0.01-0.12c-0.07-0.06-0.12-0.47-0.2-0.51
            c-0.02-0.01-0.06-0.02-0.1-0.01c-0.17,0.02-0.55-0.02-0.72-0.04c-0.04,0-0.07,0-0.12,0c-0.09,0.01-0.45,0-0.55,0
            c-0.18,0-0.6,0-0.8,0.01c-0.29,0.02-0.85,0-1.14-0.02c-0.07-0.01-0.13-0.01-0.21,0c-0.12,0.02-0.26,0.04-0.38,0.01
            c-0.11-0.01-0.22,0.33-0.26,0.44c-0.01,0.06-0.1,0.34,0.04,0.38c0.15,0.06,0.32-0.05,0.49-0.06c0.12,0.02,0.25-0.01,0.37,0
            c0.16,0.01,0.33,0.01,0.54,0.02c0.21,0.02,0.36,0.09,0.37,0.31c0.01,0.13,0.02,0.21,0.01,0.34c-0.01,0.26,0.02,0.21,0,0.45
            c-0.01,0.15-0.04,0.29-0.02,0.44c0.01,0.11,0.01,0.22,0.01,0.34c0.01,0.07,0.01,0.15,0.02,0.22c0,0.09-0.02,0.59-0.05,0.76
            c0,0.07,0.01,0.15,0.01,0.23c-0.01,0.23-0.02,0.47-0.02,0.71c-0.01,0.13-0.02,0.27-0.02,0.4c0,0.17,0,0.34-0.02,0.52
            c0,0.02-0.02,0.38-0.02,0.44c0,0.12-0.01,0.22-0.06,0.39c-0.06,0.23,0.88,0.18,0.97,0.02c0.07-0.15-0.07-0.09-0.07-0.48
            c0.01-0.2,0.01-0.38-0.01-0.56c-0.01-0.06,0-0.12,0-0.17c0-0.06,0-0.12,0-0.18c-0.01-0.07,0.04-0.65,0.04-0.83
            c0-0.15,0.02-0.28,0.02-0.43c0-0.23,0.01-0.45,0-0.69c-0.01-0.27-0.02-1.21,0-1.41C61.88,50.91,61.9,50.79,61.9,50.64z"/>
        <path d="M37.33,16.4 H55.68 V17.18 H37.33 Z"/>
        <path d="M37.33,58.74 H55.68 V59.52 H37.33 Z"/>
    </g>
</svg>
`,
    "icon-49": `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="icon-49" x="0px" y="0px" width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 89 93" enable-background="new 0 0 89 93" xml:space="preserve" class="fill-svg" stroke="none">
    <g>
        <g>
            <g>
                <path d="M58.97,45.61c-0.52,1.01-0.97,1.93-1.35,2.75c-0.26,0.58-3.99,7.33-6.22,11.33                     c0.08-0.01,0.16-0.02,0.24-0.03c2.29-4.19,6.35-11.57,6.59-12.14c0.26-0.61,0.54-1.32,0.85-2.14                     C59.05,45.46,59.01,45.53,58.97,45.61z"/>
            </g>
            <g>
                <path d="M77.04,53.52c-0.45-1.05-0.95-2.04-1.51-2.97c-0.56-0.93-1.09-1.89-1.57-2.86                     c-0.49-0.97-0.9-1.98-1.23-3.03c-0.34-1.05-0.51-2.21-0.51-3.48v-0.56c0-0.22,0.04-0.41,0.11-0.56                     c-0.22-0.82-0.47-1.48-0.73-1.96c-0.26-0.48-0.56-0.97-0.9-1.46c-0.34-0.49-0.69-0.8-1.07-0.95c0-0.3-0.15-0.63-0.45-1.01                     c-0.3-0.37-0.62-0.79-0.95-1.23c-0.34-0.45-0.66-0.86-0.95-1.23c-0.3-0.37-0.45-0.71-0.45-1.01c0-0.07,0.07-0.34,0.22-0.79                     l-1.35-0.9c-1.5-5.83-2.24-10.62-2.24-14.36v-1.12c0-0.6,0.04-1.01,0.11-1.23c-2.92-3.66-5.35-6.56-7.29-8.7                     c-1.95-2.13-3.33-3.5-4.15-4.1c-0.15,0.15-0.32,0.45-0.51,0.9c-0.19,0.45-0.41,0.94-0.67,1.46c-0.26,0.52-0.52,1.01-0.79,1.46                     c-0.26,0.45-0.51,0.78-0.73,1.01l0.22,0.67c0,0.3-0.26,0.82-0.79,1.57c-0.52,0.75-0.79,1.38-0.79,1.91v0.34                     c-1.42,2.17-2.94,4.66-4.54,7.46c-1.61,2.81-3.35,6-5.22,9.59c-0.45,0.37-0.84,0.9-1.18,1.57c-0.34,0.67-0.62,1.37-0.84,2.08                     c-0.22,0.71-0.41,1.35-0.56,1.91c-0.15,0.56-0.26,0.92-0.34,1.07c-0.37-0.37-0.56-0.64-0.56-0.79c-3.52,3.59-6.1,5.61-7.74,6.06                     c-0.3,0.52-0.75,0.86-1.35,1.01c-0.6,0.15-1.25,0.32-1.96,0.51c-0.71,0.19-1.4,0.47-2.08,0.84c-0.67,0.37-1.23,1.05-1.68,2.02                     c-1.12,2.39-2.17,4.49-3.14,6.28c-0.97,1.8-1.85,3.4-2.64,4.82C13.48,55.17,2.09,77.86,1.57,78.98c-0.52,1.12-0.9,2.17-1.12,3.14                     c0.07,0,0.17,0.02,0.28,0.06c0.11,0.04,0.2,0.06,0.28,0.06c0.3,0,0.58-0.17,0.84-0.51c0.26-0.34,0.51-0.73,0.73-1.18                     c0.22-0.45,0.41-0.86,0.56-1.23c0.15-0.37,0.3-0.6,0.45-0.67l-0.45-0.45l13.64-26.25c0.22,0.15,0.35,0.3,0.39,0.45                     c0.04,0.15,0.09,0.26,0.17,0.34c-0.45,1.2-0.86,2.32-1.23,3.37c-0.22,0.62-5.27,10.89-9.41,19.33c0.13,0.02,0.27,0.06,0.39,0.12                     c0.2,0.09,0.4,0.19,0.6,0.29c4.17-8.26,9.48-18.79,9.66-19.07c0.3-0.45,0.56-0.88,0.79-1.29c0.22-0.41,0.34-0.73,0.34-0.95                     c0-0.3-0.11-0.56-0.34-0.79l1.57-4.38c0.37-1.49,1.05-2.58,2.02-3.25c0.52,0.52,0.95,1.05,1.29,1.57                     c0.34,0.52,0.51,1.09,0.51,1.68c0,0.38-0.15,0.94-0.45,1.68c-0.3,0.75-0.66,1.55-1.07,2.41c-0.41,0.86-10.54,21.1-10.84,21.88                     c-0.29,0.77-0.44,1.38-0.45,1.82c0.28,0.08,0.56,0.14,0.84,0.18c1.15-1.67,10.95-21.18,10.95-21.91c0-0.37-0.11-0.67-0.34-0.9                     l1.01-0.79c0.07,0,0.21,0.02,0.39,0.06c0.19,0.04,0.32,0.13,0.39,0.28c-0.08,0.22-0.17,0.41-0.28,0.56                     c-0.11,0.15-0.21,0.3-0.28,0.45c0.37,0.45,0.71,0.9,1.01,1.35c0.07,0,0.19-0.07,0.34-0.22c0.37,0.37,0.56,0.71,0.56,1.01                     c0,0.3-0.22,0.73-0.67,1.29c-0.25,0.31-0.43,0.61-0.54,0.89c0.18-0.16,0.37-0.31,0.57-0.46c1.4-2.66,2.1-4.28,2.1-4.86                     c0-0.3-0.08-0.75-0.22-1.35l-0.79,1.79c-0.67-0.45-1.01-1.16-1.01-2.13v-2.24c0.52-0.3,1.12-0.86,1.79-1.68                     c0.67-0.82,1.29-1.7,1.85-2.64c0.56-0.93,1.07-1.81,1.52-2.64c0.45-0.82,0.79-1.46,1.01-1.91c1.12-1.57,2.26-3.18,3.42-4.82                     c1.16-1.64,2.32-3.18,3.48-4.6c1.16-1.42,2.34-2.69,3.53-3.81c1.2-1.12,2.39-1.94,3.59-2.47l1.01,0.79                     c-0.15,0.22-0.56,0.73-1.23,1.52c-0.67,0.79-1.01,1.44-1.01,1.96c-2.62,3.22-5.2,6.36-7.74,9.43c-1.42,1.87-2.62,3.7-3.59,5.5                     c-0.51,0.94-3.79,7.4-6.89,13.6c0.34-0.21,0.69-0.4,1.06-0.58c0.27-0.13,0.58-0.27,0.91-0.41c2.54-4.73,4.73-9.05,4.8-9.48                     l-0.45-0.45c0.07-1.94,0.52-2.95,1.35-3.03c2.92-4.04,5.52-7.46,7.8-10.27c2.28-2.81,4.21-5.11,5.78-6.9l1.91,1.8                     c-0.45,0.9-1.27,2.21-2.47,3.93c-1.2,1.72-2.47,3.52-3.81,5.38c-1.08,1.5-2.1,2.97-3.06,4.4c1.42-1.91,2.89-3.56,4.41-4.96                     c0.37,0.38,0.56,0.79,0.56,1.23c0,0.37-0.26,0.84-0.79,1.4c-0.52,0.56-0.79,1.03-0.79,1.4c0,0.38,0.34,0.79,1.01,1.23                     c-0.3,0.22-0.84,0.95-1.63,2.19c-0.79,1.23-1.59,2.64-2.41,4.21c-0.35,0.66-3.18,6.44-6.4,13.03c0.35-0.19,0.72-0.36,1.1-0.5                     c2.93-6.09,5.43-11.27,5.69-11.8c0.64-1.31,1.31-2.49,2.02-3.53c0.71-1.05,1.4-1.57,2.08-1.57c0.22,0,0.47,0.15,0.73,0.45                     c0.26,0.3,0.52,0.64,0.79,1.01c0.26,0.37,0.54,0.75,0.84,1.12c0.3,0.37,0.56,0.64,0.79,0.79c-0.67,1.2-1.38,2.41-2.13,3.65                     c-0.33,0.54-0.64,1.06-0.93,1.57c0.08-0.01,0.16-0.01,0.25-0.01c0.32,0,0.6,0.06,0.85,0.17c0.28-0.37,0.56-0.87,0.84-1.5                     c0.52-1.16,1.01-1.89,1.46-2.19c0.3,0.9,0.45,1.87,0.45,2.92v0c0.5-0.01,0.99,0.07,1.45,0.31c0.08,0.04,0.16,0.09,0.23,0.14                     c-0.05-3.22-0.75-5.95-2.13-8.19c-1.27-0.67-1.91-1.64-1.91-2.92c0.15-1.94,0.65-3.68,1.52-5.22c0.86-1.53,2.15-2.75,3.87-3.65                     c0.45-0.07,1.16-0.34,2.13-0.79c0.97-0.45,1.96-0.92,2.97-1.4c1.01-0.48,1.96-0.91,2.86-1.29c0.9-0.37,1.49-0.56,1.79-0.56                     c1.35,0,2.65,0.62,3.93,1.85c1.27,1.23,2.43,2.77,3.48,4.6c1.05,1.83,1.92,3.81,2.64,5.95c0.71,2.13,1.18,4.13,1.4,6                     c2.47,3.89,11.93,31.42,14.1,40.47c0.07,0,0.15,0.02,0.22,0.06c0.07,0.04,0.15,0.06,0.22,0.06c0.3,0,0.56-0.13,0.79-0.39                     c0.22-0.26,0.52-0.62,0.9-1.07L77.04,53.52z M33.62,35.23c-1.8,3.14-3.37,5.76-4.71,7.85c-1.35,2.1-2.39,3.7-3.14,4.82                     c-0.52-0.07-0.95-0.34-1.29-0.79c-0.34-0.45-0.58-0.97-0.73-1.57c-0.15-0.6-0.28-1.23-0.39-1.91c-0.11-0.67-0.21-1.27-0.28-1.8                     c0.3-0.45,0.67-0.75,1.12-0.9h1.57l6.06-3.59c0.67-0.9,1.25-1.72,1.74-2.47c0.49-0.75,0.92-1.38,1.29-1.91L33.62,35.23z                      M50.78,32.2l-6.17,5.16l4.38-6.51H50c0.37,0,0.64,0.11,0.79,0.34V32.2z M62.79,27.26c0,0.15-0.08,0.3-0.22,0.45l-2.69-1.35                     c-1.5,2.62-3.52,3.97-6.06,4.04c-3.59-3.14-6.21-5.54-7.85-7.18c-2.62,0.6-4.26,1.23-4.94,1.91c0-0.37,0.13-0.82,0.39-1.35                     c0.26-0.52,0.58-1.03,0.95-1.51c0.37-0.49,0.75-0.95,1.12-1.4c0.37-0.45,0.63-0.79,0.79-1.01c0.37-0.52,0.71-1.4,1.01-2.64                     c0.3-1.23,0.63-2.15,1.01-2.75c0.45-0.3,0.92-0.91,1.4-1.85c0.48-0.93,0.97-1.92,1.46-2.97c0.49-1.05,0.93-2.04,1.35-2.97                     c0.41-0.93,0.77-1.55,1.07-1.85c-0.08-0.07-0.11-0.22-0.11-0.45c0-0.97,0.3-1.46,0.9-1.46c0.37,0,0.97,0.47,1.8,1.4                     c0.82,0.94,1.7,1.98,2.64,3.14c0.93,1.16,1.87,2.3,2.81,3.42c0.93,1.12,1.66,1.87,2.19,2.24h-0.56c-0.3,1.2-0.45,2.32-0.45,3.37                     c0,1.42,0.34,2.39,1.01,2.92l-0.9,0.9h0.22c0.37,0,0.6,0.19,0.67,0.56v1.23c0,0.45,0.26,0.71,0.79,0.79                     c-0.22,0.38-0.34,0.79-0.34,1.23c0,0.37,0.09,0.86,0.28,1.46c0.19,0.6,0.28,1.05,0.28,1.35V27.26z"/>
            </g>
            <g>
                <path d="M64.36,50.6c0,0.67-0.17,1.35-0.5,2.02c-0.34,0.67-0.71,1.29-1.12,1.85                     c-0.04,0.06-0.16,0.26-0.35,0.57c0.25-0.15,0.52-0.28,0.79-0.39c0.04-0.06,0.08-0.12,0.11-0.18c0.41-0.63,0.77-1.23,1.07-1.8                     c0.3-0.56,0.45-0.99,0.45-1.29c0-0.22-0.06-0.43-0.17-0.62c-0.11-0.19-0.21-0.39-0.28-0.62c0.07-1.12,0.17-2.13,0.28-3.03                     c0.11-0.9,0.21-1.61,0.28-2.13v-0.67c0-1.2-0.17-2.08-0.5-2.64c-0.34-0.56-0.73-0.99-1.18-1.29c-0.45-0.3-0.94-0.6-1.46-0.9                     c-0.52-0.3-0.97-0.82-1.35-1.57c-0.15-0.6-0.36-1.2-0.62-1.8c-0.26-0.6-0.51-1.2-0.73-1.8v-1.01c0-0.45,0.15-0.71,0.45-0.79                     h-0.11c-0.37,0-0.66,0.28-0.84,0.84c-0.19,0.56-0.32,0.88-0.39,0.95c0.15,0.75,0.22,1.31,0.22,1.68c0,0.45-0.15,1.14-0.45,2.08                     c-0.3,0.94-0.62,1.89-0.95,2.86c-0.34,0.97-0.66,1.83-0.95,2.58c-0.3,0.75-0.45,1.16-0.45,1.23c0.3-0.22,0.6-0.65,0.9-1.29                     c0.3-0.63,0.6-1.33,0.9-2.08c0.3-0.75,0.6-1.46,0.9-2.13c0.3-0.67,0.56-1.16,0.79-1.46c0.52,1.42,1.12,2.32,1.79,2.69                     c-0.6,1.65-1.1,3.03-1.51,4.15c-0.09,0.25-0.18,0.49-0.27,0.73c0.49-0.92,1.03-1.8,1.62-2.63c0.63-0.9,1.25-1.5,1.85-1.8                     c1.27,0.22,1.91,1.01,1.91,2.36c0-0.07-0.02,0.06-0.06,0.39c-0.04,0.34-0.11,0.73-0.22,1.18c-0.11,0.45-0.26,0.86-0.45,1.23                     c-0.19,0.38-0.43,0.56-0.73,0.56v1.23c-0.84,0.92-3.91,6.21-6.68,11.32c0.14-0.02,0.29-0.04,0.43-0.06                     c2.92-5.16,6.05-10.46,6.8-11.26C64.1,48.73,64.36,49.63,64.36,50.6z"/>
            </g>
            <g>
                <path d="M35.61,48.9c0.32-0.52,0.52-0.85,0.59-0.99c0.45-0.97,1.25-2.34,2.41-4.1                     c0.23-0.34,0.46-0.69,0.69-1.04c-0.25,0.34-0.5,0.69-0.75,1.04C37.51,45.31,36.53,47,35.61,48.9z"/>
            </g>
            <g>
                <path d="M34.29,51.11c-0.12,0.21-1.26,2.51-2.86,5.77c0.34,0.15,0.65,0.4,0.9,0.76                     c1.48-3.03,2.49-5.12,2.53-5.24l-0.34,0.34l-0.45-0.34c0.49-1.23,1.01-2.4,1.54-3.5c-0.03,0.04-0.05,0.09-0.08,0.13                     C35.15,49.63,34.74,50.32,34.29,51.11z"/>
            </g>
        </g>
        <g>
            <g>
                <g>
                    <g>
                        <path d="M25.07,76.44c-1.05,0.07-2.06-0.25-2.91-0.94c-1.16-0.95-1.54-2.55-1.49-4                             c0.07-1.89,0.66-3.64,1.43-5.29c0.78-1.66,1.99-3.32,3.46-4.5c1.05-0.84,2.02-1.44,2.83-1.68c0.43-0.13,0.85-0.19,1.19-0.15                             c0.38,0.05,0.71,0.18,0.96,0.42c0.55,0.5,0.69,1.42,0.4,2.55c-0.33,1.29-1.07,2.38-1.8,3.47c-0.25,0.31-0.67,0.4-0.96,0.2                             c-0.31-0.22-0.34-0.63-0.1-0.95c0.76-1.01,1.31-2.07,1.53-2.9c0.16-0.61,0.12-1.12-0.08-1.31c-0.19-0.18-0.64-0.09-0.86-0.02                             c-0.42,0.13-1.2,0.49-2.31,1.4c-2.5,2.08-4.25,5.56-4.34,8.79c-0.03,0.93,0.14,2.22,0.99,2.9c0.76,0.6,1.67,0.82,2.58,0.59                             c2.06-0.54,3.63-2.51,4.66-4.34c0.19-0.35,0.61-0.5,0.94-0.35c0.32,0.15,0.42,0.56,0.21,0.91c-0.76,1.2-1.57,2.38-2.58,3.35                             c-0.77,0.73-1.95,1.51-3.02,1.75C25.57,76.39,25.32,76.42,25.07,76.44z"/>
                    </g>
                    <g>
                        <path d="M31.67,74.62c-0.52,0.07-0.96-0.07-1.26-0.37c-0.52-0.51-0.62-1.44-0.34-2.54                             c0.26-1.05,0.95-2.23,1.7-3.01c0.13-0.15,0.31-0.25,0.5-0.26c0.15-0.42,0.4-0.82,0.76-1.18c1.03-1.09,1.86-1.13,2.28-1.06                             c0.64,0.11,1.13,0.66,1.28,1.47c0.13,0.72,0,1.63-0.36,2.53c-0.04,0.1-0.08,0.2-0.13,0.31c0.46-0.21,0.88-0.59,1.24-1.13                             c0.23-0.33,0.66-0.44,0.96-0.26c0.28,0.17,0.34,0.59,0.1,0.94c-0.48,0.69-1.07,1.24-1.7,1.59c-0.49,0.28-1.03,0.42-1.57,0.45                             c-0.27,0.33-0.55,0.64-0.86,0.96c-0.78,0.75-1.51,1.24-2.12,1.46C31.95,74.56,31.8,74.6,31.67,74.62z M32.18,70.17                             c-0.38,0.55-0.68,1.17-0.82,1.72c-0.18,0.68-0.1,1.16,0.06,1.33c0.04,0.01,0.12,0.1,0.44,0c0.26-0.09,0.76-0.35,1.53-1.08                             c0.1-0.11,0.21-0.2,0.31-0.31C32.97,71.5,32.41,70.9,32.18,70.17z M34.74,67.56c-0.21,0.03-0.5,0.23-0.82,0.57                             c-0.44,0.46-0.57,0.96-0.44,1.42c0.14,0.5,0.57,0.91,1.11,1.09c0.57-0.97,0.76-1.88,0.65-2.51c-0.06-0.32-0.21-0.54-0.38-0.57                             C34.82,67.54,34.78,67.55,34.74,67.56z"/>
                    </g>
                    <g>
                        <path d="M39.79,73.09c-0.38,0.07-1.36,0.2-1.87-0.47c-0.84-1.1-0.28-2.82,0.06-4.02                             c0.47-1.64,1.18-3.32,1.87-4.92c0.67-1.52,1.39-3.05,2.27-4.48c0.32-0.54,0.67-0.94,0.99-1.21c0.59-0.45,1.08-0.39,1.28-0.33                             c0.32,0.1,0.75,0.42,0.78,1.35c0.02,0.61-0.11,1.4-0.38,2.25c-0.43,1.35-1.06,2.71-1.8,3.86c-0.92,1.43-2.09,2.79-3.63,3.73                             c-0.04,0.03-0.1,0.06-0.13,0.06c-0.59,1.96-0.34,2.55-0.21,2.71c0.15,0.2,0.46,0.17,0.76,0.11c0.01,0,0.01,0,0.02,0                             c0.31-0.05,0.86-0.27,1.38-0.74c0.75-0.67,0.99-1.42,1.36-2.22c0.15-0.37,0.58-0.58,0.9-0.47c0.34,0.11,0.48,0.49,0.31,0.86                             c-0.76,1.65-2.04,3.54-3.94,3.93C39.8,73.08,39.8,73.08,39.79,73.09z M43.79,59.06c-0.11,0.1-0.31,0.3-0.55,0.69                             c-1.38,2.24-2.38,4.71-3.33,7.16c1.72-1.49,2.93-3.71,3.61-5.86c0.25-0.77,0.31-1.28,0.31-1.57                             C43.82,59.28,43.8,59.13,43.79,59.06z"/>
                    </g>
                    <g>
                        <path d="M44.28,72.27c-0.38,0.07-1.36,0.21-1.87-0.46c-0.84-1.09-0.28-2.82,0.06-4.02                             c0.47-1.65,1.17-3.33,1.87-4.93c0.67-1.53,1.39-3.05,2.27-4.48c0.32-0.54,0.67-0.94,0.99-1.21c0.59-0.45,1.08-0.38,1.28-0.32                             c0.32,0.1,0.75,0.43,0.78,1.36c0.02,0.61-0.11,1.4-0.38,2.24c-0.43,1.35-1.06,2.7-1.8,3.85c-0.92,1.43-2.09,2.79-3.63,3.73                             c-0.04,0.03-0.1,0.06-0.13,0.06c-0.59,1.96-0.34,2.55-0.21,2.71c0.15,0.2,0.46,0.16,0.76,0.11c0.01,0,0.01,0,0.02,0                             c0.31-0.06,0.86-0.27,1.38-0.75c0.75-0.67,0.99-1.42,1.36-2.21c0.15-0.37,0.58-0.57,0.9-0.46c0.34,0.11,0.48,0.49,0.31,0.86                             c-0.76,1.65-2.04,3.52-3.94,3.92C44.29,72.27,44.29,72.27,44.28,72.27z M48.28,58.25c-0.11,0.1-0.31,0.3-0.55,0.69                             c-1.38,2.24-2.39,4.7-3.33,7.15c1.72-1.49,2.93-3.71,3.61-5.85c0.25-0.77,0.31-1.28,0.31-1.56                             C48.32,58.47,48.3,58.32,48.28,58.25z"/>
                    </g>
                    <g>
                        <path d="M49.23,71.71c-0.88,0.15-2.1-0.02-2.64-0.97c-0.29-0.5-0.34-1.14-0.17-1.92                             c0.17-0.78,0.58-1.76,1.26-2.75c0.68-0.99,1.48-2.09,2.64-2.63c1.02-0.48,1.72-0.2,1.89-0.11c0.29,0.15,0.49,0.42,0.61,0.73                             c0.12,0.3,0.15,0.68,0.08,1.08c-0.54,2.28-3.25,3.45-5.22,4.16c-0.02,0.23,0.02,0.44,0.11,0.59c0.25,0.43,0.94,0.56,1.43,0.46                             c1.67-0.34,3.14-1.76,3.79-3.38c0.15-0.37,0.56-0.59,0.9-0.49c0.33,0.09,0.5,0.47,0.36,0.83c-0.43,1.15-1.39,2.39-2.35,3.12                             C51.09,71.07,50.09,71.57,49.23,71.71z M51.11,64.56c-0.11,0.02-0.25,0.06-0.4,0.12c-0.42,0.2-1.09,0.7-1.91,1.98                             c-0.25,0.39-0.44,0.73-0.61,1.06c1.25-0.52,2.92-1.27,3.38-2.67c0.06-0.28-0.04-0.45-0.1-0.48                             C51.41,64.55,51.28,64.53,51.11,64.56z"/>
                    </g>
                    <g>
                        <path d="M55.29,71.17c-0.42,0.06-0.88-0.02-1.26-0.21c-0.42-0.21-0.75-0.54-0.97-0.97                             c-0.96-1.84,0.3-3.92,1.24-5.45c0.5-0.72,1.01-1.27,1.55-1.6c0.54-0.34,1.1-0.46,1.59-0.38c0.35,0.06,0.72,0.23,0.96,0.51                             c0.23,0.27,0.38,0.62,0.42,0.97c0.05,0.38-0.04,0.79-0.23,1.15c-0.19,0.38-0.52,0.72-0.92,0.97c-0.32,0.21-0.74,0.12-0.92-0.18                             c-0.18-0.29-0.04-0.74,0.29-0.95c0.4-0.26,0.44-0.55,0.42-0.7c-0.02-0.19-0.16-0.4-0.38-0.43c-0.34-0.05-0.98,0.27-1.7,1.32                             c-0.68,1.14-1.7,2.59-1.11,3.99c0.25,0.48,0.72,0.65,1.03,0.61c1.77-0.27,3.18-1.91,3.79-3.58c0.15-0.36,0.56-0.54,0.9-0.42                             c0.33,0.11,0.5,0.5,0.36,0.85c-0.42,1.1-1.23,2.32-2.1,3.1C57.36,70.54,56.34,71.03,55.29,71.17z"/>
                    </g>
                    <g>
                        <path d="M65.79,66.41c-0.38,0.9-1.07,1.8-1.91,2.52c-0.88,0.75-1.82,1.24-2.64,1.35                             c-0.08,0.01-0.13,0.01-0.21,0.01c-0.78,0.05-1.45-0.25-1.85-0.86c-0.36-0.56-0.44-1.41-0.23-2.62                             c0.13-0.78,0.38-1.68,0.75-2.71c-0.06,0-0.13,0.01-0.19,0c-0.38,0-0.54-0.21-0.5-0.59c0.09-0.76,0.71-0.7,1.2-0.77                             c0.64-1.5,1.27-3.08,2.2-4.39c0.38-0.53,1.24-1.22,1.87-0.8c0.11,0.07,0.46,0.35,0.31,0.93c-0.06,0.19-0.15,0.42-0.32,0.7                             c-0.7,1.14-1.38,2.29-2.05,3.45c0.83-0.07,1.24-0.1,2.06-0.14c0.38-0.05,0.72,0.24,0.75,0.6c0.03,0.37-0.25,0.71-0.61,0.76                             c-0.11,0-1.15,0.09-2.96,0.21c-0.14,0.01-0.21,0.01-0.34,0.02c-0.4,1.1-0.68,2.08-0.82,2.87c-0.2,1.14-0.04,1.55,0.04,1.66                             c0.11,0.18,0.35,0.41,0.82,0.32c1.46-0.28,2.76-1.66,3.4-3.04c0.15-0.35,0.57-0.51,0.9-0.38                             C65.78,65.66,65.94,66.07,65.79,66.41z"/>
                    </g>
                </g>
            </g>
            <g>
                <g>
                    <g>
                        <path d="M14.34,90.95c0.51,0.74-1.37,0.32-1.6,0.32c-0.41-0.01-0.85-0.02-1.25-0.04                             c-0.22-0.01-0.55-0.28-0.28-0.48c0.56-0.38,0.77-1.46,0.8-2.09c0.04-0.78,0.2-1.57,0.26-2.36c0.07-0.93,0.42-1.98,0.3-2.91                             c-0.06-0.48-0.83,0.43-0.91,0.53c-0.28,0.31-0.61,0.63-0.77,1.01c-0.1,0.22-0.05,0.71-0.26,0.86c-0.3,0.21-0.71,0.19-1.05-0.02                             c-0.24-0.15-0.24-0.54-0.38-0.78C9.02,84.7,8.86,84.32,8.74,84c-0.15-0.41-0.31-0.82-0.5-1.23c-0.07-0.17-0.15-0.33-0.25-0.49                             c-0.17-0.23-0.38,0.02-0.35,0.2c0.06,0.72-0.05,1.42-0.08,2.12c-0.05,0.96-0.04,1.94-0.1,2.9c-0.05,0.8-0.14,1.61-0.11,2.43                             c0.01,0.24,0.19,1-0.27,0.73c-0.37-0.22-0.68-0.22-1.06-0.31c-0.24-0.05,0.08-0.6,0.11-0.67c0.16-0.35,0.25-0.75,0.3-1.15                             c0.11-0.83,0.17-1.76,0.18-2.64c0.01-0.8,0.19-1.76-0.03-2.58c-0.09-0.31-0.41-0.67-0.41-1c0-0.35,0.35-0.57,0.43-0.9                             c0.14-0.65,0-1.62-0.11-2.32c-0.05-0.23-0.39-0.74-0.26-0.92c0.22-0.29,0.78,0.07,1.07,0.18c0.45,0.18,0.76,0.17,1.2,0.18                             c0.27,0,0.55,0.25,0.42,0.51c-0.12,0.24-0.56,0.24-0.7,0.51c-0.17,0.33,0.04,0.73,0.16,1.09c0.28,0.78,0.57,1.55,0.81,2.33                             c0.18,0.57,0.28,1.72,0.95,1.03c0.59-0.61,1.19-1.25,1.75-1.89c0.58-0.66,1.01-1.22,0.65-2.14c-0.1-0.22-0.42-0.58,0.04-0.65                             c0.39-0.06,0.78,0.04,1.19,0.03c0.24-0.01,2.06-0.44,1.44,0.41c-0.44,0.61-0.61,1.44-0.43,2.16c0.09,0.4,0.41,0.75,0.45,1.15                             c0.04,0.42-0.29,0.8-0.49,1.14c-0.2,0.33-0.16,0.83-0.18,1.2c-0.03,0.45-0.07,0.9-0.1,1.34c-0.05,0.76-0.13,1.56-0.22,2.27                             c-0.01,0.12,0.01-0.16,0,0C14.2,89.55,14.03,90.49,14.34,90.95z"/>
                    </g>
                    <g>
                        <path d="M25.46,80.86c0.07,0.47,0.7,1.17,0.42,1.69c-0.38,0.73-0.29,1.53-0.32,2.3                             c-0.05,1.49-0.21,3.14-1.02,4.37c-0.56,0.85-1.38,1.58-2.49,1.77c-1.8,0.31-3.89-0.18-4.48-2.06                             c-0.43-1.37-0.54-2.95-0.17-4.38c0.1-0.36,0.24-0.64,0.1-0.99c-0.1-0.25-0.31-0.64-0.02-0.88c0.6-0.51,0.88-1.26,1.34-1.86                             c0.4-0.53,1.01-1.02,1.56-1.36c0.7-0.44,1.24-0.66,2.02-0.71c0.57-0.04,1.43-0.02,1.91,0.49                             C24.76,79.72,25.35,80.11,25.46,80.86z M20.75,83.3c-0.47,0.57-0.53,1-0.67,1.65c-0.13,0.58-0.12,1.25-0.12,1.84                             c-0.01,0.59-0.09,1.19-0.07,1.76c0.02,0.58,0.05,1.15,0.44,1.61c0.42,0.49,0.89,0.56,1.56,0.42c1.2-0.25,1.91-1.36,2.22-2.46                             c0.33-1.13,0.5-2.46,0.54-3.63c0.02-0.59,0.08-1.15-0.16-1.67c-0.08-0.16-0.22-0.36-0.1-0.57c0.14-0.26,0.29-0.5,0.24-0.8                             c-0.17-1.08-0.63-2.26-1.85-2.18c-1.27,0.08-2.07,1.51-2.17,2.69C20.56,82.39,21.13,82.83,20.75,83.3z"/>
                    </g>
                    <g>
                        <path d="M36.62,89.1c0.55,0.66-1.34,0.57-1.58,0.61c-0.42,0.07-0.87,0.14-1.28,0.22                             c-0.23,0.04-0.58-0.17-0.32-0.43c0.55-0.5,0.7-1.63,0.69-2.27c-0.01-0.79,0.11-1.62,0.13-2.43c0.02-0.95,0.3-2.08,0.13-3                             c-0.09-0.47-0.8,0.6-0.88,0.72c-0.27,0.37-0.58,0.77-0.72,1.19c-0.09,0.25-0.02,0.73-0.22,0.93c-0.3,0.28-0.71,0.35-1.07,0.23                             c-0.25-0.09-0.27-0.48-0.43-0.68c-0.19-0.25-0.38-0.59-0.5-0.88c-0.16-0.37-0.35-0.74-0.55-1.09                             c-0.08-0.15-0.16-0.29-0.27-0.42c-0.17-0.18-0.38,0.13-0.35,0.3c0.08,0.7-0.01,1.44-0.03,2.15c-0.03,0.98,0.01,1.96-0.03,2.93                             c-0.04,0.82-0.12,1.66-0.07,2.46c0.01,0.23,0.25,0.95-0.29,0.81c-0.43-0.11-0.79-0.03-1.26,0c-0.29,0.02,0.1-0.62,0.13-0.71                             c0.2-0.4,0.29-0.83,0.34-1.23c0.12-0.87,0.18-1.81,0.18-2.7c0-0.8,0.18-1.82-0.06-2.57c-0.09-0.29-0.43-0.55-0.42-0.88                             c0-0.35,0.36-0.68,0.43-1.03c0.14-0.69-0.01-1.62-0.12-2.28c-0.05-0.21-0.37-0.61-0.25-0.83c0.2-0.36,0.74-0.18,1.02-0.15                             c0.43,0.05,0.74-0.05,1.16-0.17c0.26-0.07,0.55,0.1,0.42,0.4c-0.11,0.28-0.53,0.39-0.66,0.7c-0.15,0.38,0.06,0.72,0.19,1.05                             c0.3,0.7,0.62,1.4,0.9,2.12c0.21,0.52,0.36,1.65,1.01,0.79c0.57-0.76,1.13-1.53,1.65-2.3c0.54-0.79,0.93-1.44,0.52-2.3                             c-0.11-0.2-0.45-0.5,0-0.66c0.38-0.14,0.77-0.11,1.18-0.2c0.23-0.05,2.03-0.8,1.46,0.16c-0.41,0.69-0.52,1.56-0.3,2.25                             c0.11,0.39,0.46,0.69,0.52,1.09c0.06,0.41-0.25,0.86-0.43,1.23c-0.18,0.36-0.11,0.87-0.11,1.24c0,0.46-0.02,0.92-0.02,1.37                             c0,0.77-0.03,1.6-0.08,2.33c-0.01,0.12,0-0.17,0,0C36.4,87.72,36.29,88.7,36.62,89.1z"/>
                    </g>
                    <g>
                        <path d="M41.63,86.95c0.47,0.66,1.73,0.35,2.5,0.15c0.82-0.21,1.5-0.34,2.06-1.12                             c0.17-0.26,0.47-0.81,0.82-0.69c0.39,0.14-0.04,1.02-0.08,1.32c-0.04,0.28,0.1,0.8-0.11,1.07c-0.21,0.26-0.69,0.2-0.94,0.14                             c-0.85-0.19-1.84-0.1-2.74,0.09c-0.85,0.18-1.7,0.37-2.54,0.57c-0.33,0.08-0.93,0.46-1.2,0.21c-0.32-0.3-0.06-0.86,0.05-1.28                             c0.11-0.43,0.15-0.85,0.14-1.27c-0.01-0.34-0.24-0.81-0.16-1.16c0.17-0.85,0.33-1.89,0.09-2.69c-0.11-0.38-0.37-0.71-0.5-1.07                             c-0.08-0.23,0.36-0.77,0.43-1.01c0.11-0.41,0.04-0.79,0.03-1.17c-0.01-0.45,0.03-1-0.17-1.39c-0.13-0.26-0.49-0.5-0.43-0.85                             c0.06-0.34,0.68-0.42,0.9-0.39c1.01,0.08,2,0,3.04-0.16c0.85-0.13,1.71-0.32,2.55-0.45c0.45-0.07,0.92-0.16,1.35-0.32                             c0.42-0.15,1.11-0.39,0.9,0.31c-0.19,0.61-0.25,1.11-0.17,1.71c0.09,0.73-0.62,0.47-0.96,0.35c-0.33-0.11-0.38-0.67-0.58-0.92                             c-0.3-0.4-0.65-0.37-1.17-0.36c-0.96,0.02-2.47,0.19-3.02,1.22c-0.27,0.48-0.12,1.22-0.14,1.71c-0.03,0.73,0.63,0.6,1.13,0.71                             c0.49,0.11,1.06-0.06,1.56-0.21c0.26-0.08,0.49-0.12,0.72-0.3c0.18-0.14,0.43-0.34,0.66-0.4c0.7-0.18,0.33,0.6,0.17,0.95                             c-0.15,0.34-0.25,1.33-0.58,1.54c-0.33,0.21-0.79-0.4-1.07-0.5c-0.52-0.17-1.23-0.03-1.75,0.06c-1.3,0.24-1.08,1.91-1.01,2.97                             c0.03,0.51-0.01-0.21,0,0C41.45,85.08,41.19,86.34,41.63,86.95z"/>
                    </g>
                    <g>
                        <path d="M55.71,74.99c-0.08-0.24-0.35-0.69,0.13-0.77c0.5-0.08,1-0.17,1.5-0.23                             c0.4-0.05,0.81-0.18,1.23-0.2c0.46-0.02,0.73-0.03,0.33,0.45c-0.28,0.33-0.57,0.55-0.65,0.99c-0.07,0.4-0.04,0.85-0.05,1.23                             c-0.01,0.39,0.05,0.66,0.25,0.99c0.24,0.4,0.27,0.56,0.03,1.05c-0.47,1.02-0.53,2.02-0.65,3.07c-0.1,0.87-0.05,1.75-0.03,2.6                             c0.01,0.42,0,0.82,0.14,1.19c0.17,0.43,0.22,0.57-0.33,0.64c-0.83,0.1-1.66,0.16-2.49,0.19c-0.06,0.01,0.19-0.72,0.22-0.8                             c0.06-0.54,0.17-1.13,0.06-1.65c-0.15-0.72-0.67-1.49-1.02-2.1c-0.43-0.74-1.01-1.42-1.39-2.18c-0.16-0.34-0.41-0.65-0.61-0.97                             c-0.16-0.24-0.36-0.74-0.66-0.76c-0.18-0.01-0.39,2.2-0.39,2.45c-0.02,0.9-0.2,1.85-0.22,2.76c-0.02,0.97-0.14,1.99,0.2,2.85                             c0.13,0.33,0.73,1.09-0.02,1.25c-0.31,0.07-0.64-0.15-0.95-0.11c-0.17,0.02-0.85,0.31-0.94,0.14                             c-0.06-0.09,0.09-0.34,0.11-0.39c0.14-0.32,0.24-0.71,0.27-1.05c0.06-0.69,0.08-1.37,0.14-2.02c0.11-1.11,0.3-2.64-0.2-3.72                             c-0.28-0.54,0.29-1.22,0.32-1.83c0.02-0.62,0.07-1.54-0.13-2.12c-0.15-0.46-0.84-0.97,0.03-1.09c0.67-0.09,1.33-0.12,2-0.2                             c0.94-0.11,0.04,0.52,0.06,0.98c0.03,0.64,0.66,1.28,0.96,1.77c0.65,1.02,1.33,2.02,1.98,3.03c0.14,0.2,0.26,0.66,0.58,0.6                             c0.17-0.03,0.14-0.73,0.14-0.84c0.01-0.75,0.08-1.52,0.08-2.28C55.76,77.01,55.98,75.82,55.71,74.99z"/>
                    </g>
                    <g>
                        <path d="M70.33,73.24c-0.14,0.46-0.22,0.89-0.28,1.36c-0.03,0.22-0.22,0.79-0.51,0.37                             c-0.47-0.71-0.96-1.15-1.91-0.96c-0.64,0.13-0.62,0.59-0.66,1.16c-0.01,0.58-0.01,0.87-0.02,1.46                             c0.16,0.25,0.54,0.23,0.52,0.54c-0.02,0.39-0.4,0.78-0.57,0.95c-0.04,1.83-0.07,3.66-0.11,5.49c-0.05,0.32,0.22,1.03,0.02,1.27                             c-0.24,0.27-0.81,0.1-1.11,0.1c-0.38,0-0.7,0.35-1.04,0.48c-1,0.4-0.3-0.86-0.17-1.2c0.33-1.62,0.2-3.36,0.21-5.01                             c0-0.63,0.12-0.69,0.02-1.15c-0.05-0.22-0.56-0.23-0.54-0.56c0.03-0.55,0.56-0.64,0.65-0.91c0.16-0.5,0-2.22-0.51-2.4                             c-0.64-0.23-1.66-0.07-2.25,0.34c-0.22,0.17-0.82,2.04-1.17,1.28c-0.16-0.34,0.03-0.84-0.03-1.21                             c-0.05-0.26-0.33-1.17,0.28-1.12c1.73,0.15,3.49-0.03,5.19-0.19c0.75-0.07,1.52-0.13,2.26-0.26                             C69.02,73,70.58,72.39,70.33,73.24z"/>
                    </g>
                    <g>
                        <path d="M78.33,75.22c-0.79,0.43-1.34-0.89-1.12-1.48c0.3-0.83-1.44-0.71-1.82-0.42                             c-0.53,0.44-0.6,1.53-0.44,2.16c0.25,0.97,1.15,1.3,1.88,1.85c0.58,0.44,1.36,0.75,1.84,1.33c0.39,0.46,0.72,1.03,0.92,1.6                             c0.08,0.26,0.3,0.4,0.42,0.63c0.17,0.32,0.01,0.6-0.19,0.85c-0.23,0.3-0.3,0.5-0.36,0.85c-0.21,1.8-2.2,2.64-3.73,2.7                             c-0.84,0.04-1.66-0.2-2.34-0.63c-0.53-0.34-0.87-0.84-1.02-1.48c-0.19-0.76-0.13-1.65,0.54-2.23c0.39-0.34,1.55-0.63,1.79,0.03                             c0.35,0.93-0.35,1.13-0.9,1.72c-0.71,0.78,0.18,1.68,1.02,1.84c0.78,0.15,1.65-0.05,2.19-0.61c0.45-0.47,0.95-1.66,0.39-2.19                             c-0.41-0.38-0.09-0.74,0.14-1.12c0.26-0.43,0.03-1.18-0.19-1.61c-0.42-0.89-1.25-1.26-2.11-1.58c-0.69-0.25-1.79-0.6-1.99-1.42                             c-0.63-1.96,1.16-3.71,3.06-3.61c0.86,0.05,1.4,0.13,2.16,0.83C79.16,73.86,79.11,74.8,78.33,75.22z"/>
                    </g>
                </g>
            </g>
            <g>
                <g>
                    <path d="M51.74,92.32c-0.03,0-0.06,0-0.09-0.01c-0.1-0.03-0.16-0.13-0.14-0.24                         c0-0.01,0.23-1.02,0.21-1.49c0-0.11,0.09-0.21,0.21-0.22c0.12,0,0.22,0.09,0.22,0.2c0,0.11-0.01,0.25-0.02,0.39                         c0.1-0.15,0.2-0.28,0.3-0.39c0.23-0.25,0.45-0.38,0.68-0.41c0.25-0.03,0.44,0.02,0.56,0.16c0.1,0.11,0.13,0.27,0.12,0.48                         c-0.01,0.15-0.05,0.31-0.09,0.46c-0.02,0.1-0.05,0.21-0.06,0.29c-0.01,0.05-0.01,0.08-0.01,0.1c0.03,0,0.09-0.02,0.19-0.05                         c0.14-0.05,0.29-0.21,0.42-0.45c0.11-0.2,0.16-0.39,0.16-0.39c0.03-0.12,0.15-0.18,0.26-0.15s0.18,0.15,0.15,0.26                         c0,0.01-0.06,0.22-0.19,0.46c-0.18,0.35-0.4,0.57-0.65,0.66c-0.18,0.07-0.45,0.14-0.63-0.02c-0.15-0.13-0.13-0.35-0.13-0.41                         c0.01-0.12,0.04-0.26,0.07-0.4c0.03-0.13,0.07-0.28,0.08-0.39c0.01-0.13-0.02-0.16-0.02-0.17c-0.01-0.02-0.06-0.03-0.19-0.02                         c-0.3,0.03-0.73,0.58-1.25,1.63C51.87,92.27,51.81,92.32,51.74,92.32z"/>
                    <path d="M54.83,92.13c-0.16,0.02-0.3-0.03-0.41-0.12c-0.18-0.16-0.24-0.44-0.19-0.78                         c0.05-0.32,0.21-0.64,0.44-0.91c0.04-0.05,0.09-0.07,0.15-0.07c0.04-0.13,0.1-0.25,0.21-0.35c0.3-0.32,0.56-0.31,0.7-0.28                         c0.21,0.05,0.38,0.23,0.45,0.48c0.06,0.22,0.04,0.5-0.05,0.76c-0.01,0.03-0.02,0.06-0.03,0.09c0.14-0.05,0.26-0.16,0.36-0.31                         c0.06-0.09,0.2-0.12,0.3-0.05c0.1,0.06,0.12,0.19,0.05,0.29c-0.13,0.2-0.31,0.35-0.5,0.44c-0.15,0.07-0.31,0.1-0.48,0.1                         c-0.08,0.1-0.16,0.19-0.24,0.28c-0.23,0.22-0.44,0.35-0.62,0.41C54.92,92.11,54.87,92.12,54.83,92.13z M54.85,90.78                         c-0.1,0.16-0.18,0.35-0.21,0.52c-0.04,0.21,0.01,0.35,0.06,0.41c0.01,0,0.04,0.03,0.14,0c0.08-0.02,0.23-0.1,0.45-0.31                         c0.03-0.03,0.06-0.06,0.09-0.09C55.14,91.19,54.95,91,54.85,90.78z M55.59,90.02c-0.07,0.01-0.15,0.06-0.25,0.16                         c-0.13,0.13-0.16,0.28-0.1,0.43c0.06,0.15,0.21,0.29,0.38,0.35c0.15-0.29,0.19-0.56,0.14-0.75c-0.03-0.1-0.08-0.17-0.14-0.18                         C55.62,90.01,55.61,90.01,55.59,90.02z"/>
                    <path d="M58.72,90.72c-0.1,0.28-0.3,0.57-0.54,0.8c-0.26,0.24-0.54,0.4-0.79,0.44                         c-0.03,0-0.04,0-0.07,0.01c-0.24,0.02-0.46-0.07-0.6-0.26c-0.13-0.17-0.17-0.43-0.14-0.8c0.02-0.24,0.08-0.51,0.17-0.83                         c-0.02,0-0.04,0-0.06,0c-0.12,0-0.18-0.06-0.17-0.18c0.01-0.23,0.21-0.21,0.36-0.24c0.2-0.59,0.45-1.14,0.6-1.35                         c0.12-0.17,0.37-0.39,0.58-0.27c0.04,0.02,0.15,0.1,0.12,0.28c-0.01,0.06-0.04,0.13-0.09,0.22c-0.21,0.37-0.43,0.8-0.58,1.08                         c0.26-0.03,0.39-0.04,0.65-0.07c0.12-0.02,0.23,0.06,0.25,0.17c0.02,0.11-0.06,0.22-0.18,0.24c-0.04,0-0.36,0.05-0.93,0.09                         c-0.04,0-0.07,0.01-0.11,0.01c-0.1,0.34-0.17,0.64-0.19,0.88c-0.03,0.35,0.03,0.47,0.05,0.51c0.04,0.06,0.11,0.12,0.27,0.1                         c0.36-0.06,0.84-0.52,1-0.96c0.04-0.11,0.17-0.17,0.27-0.13C58.7,90.49,58.76,90.61,58.72,90.72z"/>
                    <path d="M62.03,90.55c-0.11,0.28-0.32,0.56-0.57,0.79c-0.26,0.23-0.55,0.38-0.8,0.41                         c-0.03,0-0.04,0-0.07,0c-0.24,0.01-0.46-0.09-0.59-0.28c-0.12-0.17-0.16-0.44-0.12-0.8c0.03-0.24,0.09-0.51,0.19-0.82                         c-0.02,0-0.04,0-0.06,0c-0.12-0.01-0.18-0.07-0.17-0.18c0.02-0.23,0.21-0.21,0.37-0.23c0.22-0.59,0.49-1.13,0.64-1.33                         c0.12-0.16,0.38-0.38,0.59-0.25c0.04,0.02,0.15,0.11,0.11,0.28c-0.02,0.06-0.04,0.13-0.1,0.22c-0.22,0.37-0.46,0.79-0.61,1.06                         c0.26-0.02,0.39-0.03,0.65-0.05c0.12-0.02,0.23,0.07,0.24,0.18c0.01,0.11-0.07,0.22-0.18,0.24c-0.04,0-0.36,0.04-0.93,0.06                         c-0.04,0-0.07,0-0.11,0.01c-0.11,0.33-0.18,0.63-0.22,0.87c-0.04,0.35,0.01,0.47,0.04,0.51c0.04,0.06,0.11,0.12,0.26,0.1                         c0.36-0.05,0.85-0.49,1.03-0.93c0.04-0.11,0.17-0.16,0.28-0.12C62.02,90.32,62.07,90.44,62.03,90.55z"/>
                    <path d="M61.99,91.62c-0.09,0-0.17-0.03-0.22-0.1c-0.05-0.06-0.13-0.19-0.13-0.56                         c0-0.24,0.03-0.54,0.09-0.87c0.09-0.52,0.29-1.06,0.45-1.41c0.2-0.45,0.44-0.9,0.67-1.22c0.1-0.14,0.21-0.25,0.31-0.32                         c0.19-0.12,0.34-0.07,0.41-0.05c0.11,0.05,0.24,0.18,0.26,0.46c0.01,0.18-0.03,0.42-0.11,0.67c-0.12,0.38-0.3,0.72-0.51,0.99                         c-0.27,0.35-0.61,0.59-1.02,0.72c-0.02,0.08-0.04,0.15-0.05,0.23c-0.04,0.25-0.07,0.48-0.08,0.67c0.11-0.24,0.26-0.53,0.43-0.78                         c0.26-0.37,0.52-0.56,0.79-0.56c0.21-0.01,0.37,0.06,0.47,0.18c0.17,0.23,0.06,0.57-0.05,0.9c-0.04,0.12-0.08,0.25-0.1,0.35                         c-0.02,0.09-0.01,0.14-0.01,0.15c0.01,0,0.04,0.01,0.09,0.01c0.05,0,0.23-0.03,0.57-0.43c0.2-0.23,0.34-0.46,0.35-0.46                         c0.06-0.09,0.2-0.13,0.29-0.07c0.1,0.06,0.13,0.19,0.07,0.29c-0.01,0.01-0.17,0.26-0.39,0.51c-0.33,0.38-0.62,0.57-0.88,0.57                         c-0.2,0-0.35-0.06-0.44-0.18c-0.08-0.11-0.11-0.26-0.07-0.45c0.02-0.13,0.07-0.29,0.12-0.43c0.04-0.13,0.09-0.26,0.11-0.37                         c0.02-0.11,0-0.15,0-0.15c-0.01-0.01-0.04-0.02-0.12-0.01c-0.07,0-0.22,0.06-0.45,0.38c-0.18,0.25-0.33,0.57-0.45,0.82                         c-0.06,0.11-0.1,0.21-0.15,0.29C62.21,91.48,62.13,91.62,61.99,91.62z M63.37,87.5c-0.04,0.03-0.1,0.08-0.17,0.19                         c-0.29,0.41-0.63,1.07-0.86,1.73c0.43-0.24,0.76-0.68,0.96-1.31c0.07-0.22,0.09-0.38,0.09-0.47                         C63.39,87.57,63.38,87.53,63.37,87.5z"/>
                    <path d="M65.12,91.48c-0.08,0-0.2-0.01-0.31-0.06c-0.12-0.05-0.23-0.14-0.3-0.27                         c-0.21-0.38-0.01-1.01,0.65-1.92c0.07-0.09,0.21-0.12,0.3-0.05c0.09,0.06,0.12,0.19,0.05,0.29c-0.76,1.05-0.67,1.41-0.63,1.49                         c0.05,0.09,0.17,0.1,0.23,0.1c0.38,0,0.65-0.44,0.8-0.81c0.05-0.11,0.18-0.15,0.28-0.11c0.1,0.04,0.16,0.16,0.11,0.27                         c-0.16,0.36-0.34,0.63-0.55,0.81C65.58,91.39,65.36,91.48,65.12,91.48z M65.72,88.71c-0.04,0-0.09-0.01-0.12-0.03                         c-0.06-0.04-0.09-0.11-0.09-0.17c0-0.04,0.01-0.08,0.04-0.12c0,0,0.01-0.01,0.01-0.01c0.01-0.01,0.01-0.02,0.02-0.03                         c0.07-0.09,0.21-0.12,0.31-0.05s0.12,0.19,0.06,0.29c-0.01,0.01-0.01,0.02-0.02,0.04c0,0,0,0.01-0.01,0.01                         C65.86,88.68,65.79,88.71,65.72,88.71z"/>
                    <path d="M65.81,91.4c-0.03,0-0.06-0.01-0.09-0.02c-0.1-0.05-0.14-0.15-0.11-0.25                         c0.01-0.01,0.35-0.98,0.39-1.46c0.01-0.11,0.12-0.2,0.24-0.19c0.11,0.01,0.21,0.11,0.19,0.23c-0.01,0.11-0.04,0.25-0.07,0.39                         c0.12-0.14,0.24-0.26,0.35-0.35c0.26-0.22,0.49-0.33,0.72-0.32c0.25,0,0.44,0.08,0.54,0.22c0.08,0.12,0.1,0.29,0.06,0.49                         c-0.03,0.14-0.09,0.3-0.15,0.45c-0.04,0.1-0.07,0.2-0.1,0.28c-0.01,0.05-0.02,0.08-0.02,0.1c0.03,0,0.09,0,0.19-0.03                         c0.15-0.03,0.31-0.17,0.47-0.39c0.13-0.18,0.21-0.37,0.21-0.37c0.04-0.11,0.17-0.16,0.28-0.12c0.11,0.04,0.16,0.17,0.11,0.27                         c0,0.01-0.09,0.21-0.24,0.43c-0.22,0.32-0.47,0.51-0.73,0.57c-0.19,0.04-0.46,0.08-0.62-0.1c-0.13-0.15-0.09-0.36-0.07-0.42                         c0.03-0.12,0.07-0.26,0.12-0.39c0.05-0.13,0.11-0.27,0.13-0.38c0.03-0.13,0-0.16,0-0.17c-0.01-0.02-0.06-0.04-0.19-0.04                         c-0.3,0-0.79,0.48-1.44,1.46C65.94,91.36,65.88,91.4,65.81,91.4z"/>
                    <path d="M68.74,93c-0.12,0-0.23-0.05-0.31-0.13c-0.11-0.1-0.15-0.25-0.13-0.41                         c0.03-0.17,0.15-0.36,0.35-0.54c0.18-0.17,0.43-0.32,0.7-0.45c0.12-0.05,0.17-0.07,0.29-0.12c0.01-0.02,0.02-0.05,0.03-0.08                         c-0.23,0.16-0.49,0.28-0.72,0.29c-0.19,0.01-0.36-0.07-0.48-0.2c-0.12-0.13-0.17-0.3-0.15-0.5c0.04-0.31,0.25-0.62,0.42-0.84                         c0.2-0.24,0.45-0.48,0.67-0.62c0.38-0.25,0.84-0.3,1.1-0.12c0.18,0.12,0.25,0.32,0.2,0.54c-0.03,0.1-0.13,0.17-0.24,0.16                         c0.04,0.02,0.08,0.06,0.1,0.1c0.07,0.13,0.01,0.31-0.18,0.53c-0.02,0.03-0.03,0.04-0.05,0.06c-0.05,0.14-0.09,0.29-0.15,0.43                         c0.26-0.14,0.49-0.33,0.72-0.71c0.06-0.1,0.19-0.13,0.3-0.07c0.1,0.06,0.13,0.19,0.07,0.28c-0.2,0.33-0.42,0.56-0.67,0.73                         c-0.21,0.14-0.43,0.24-0.66,0.33c-0.07,0.16-0.15,0.3-0.23,0.44c-0.13,0.23-0.26,0.42-0.4,0.56c-0.15,0.17-0.3,0.27-0.44,0.31                         C68.84,93,68.78,93,68.74,93z M70.12,89.6c-0.12,0-0.3,0.04-0.48,0.15c-0.35,0.23-0.86,0.79-0.91,1.15                         c-0.01,0.1,0.02,0.15,0.04,0.18c0.04,0.05,0.09,0.07,0.15,0.06c0.26-0.01,0.68-0.33,1.01-0.68c0.01-0.03,0.01-0.05,0.02-0.09                         c0.07-0.24,0.2-0.4,0.36-0.42c0.02-0.01,0.04,0,0.06,0c-0.08-0.04-0.13-0.14-0.11-0.23c0.02-0.07,0-0.09-0.02-0.1                         C70.23,89.61,70.18,89.6,70.12,89.6z M69.34,91.94c-0.4,0.22-0.61,0.47-0.63,0.59c-0.01,0.02,0,0.03,0.01,0.04                         c0.02,0.02,0.03,0.02,0.06,0.01C68.88,92.55,69.09,92.36,69.34,91.94z"/>
                    <path d="M71.83,91.79c-0.49-0.02-0.66-0.24-0.75-0.43c-0.05-0.11,0-0.23,0.1-0.28                         c0.1-0.05,0.23,0,0.28,0.1c0.04,0.08,0.09,0.18,0.39,0.2c0.24,0.01,0.32-0.08,0.34-0.11c0.1-0.12,0.12-0.34,0.08-0.65                         c-0.02-0.17-0.06-0.37-0.13-0.58c-0.07,0.1-0.14,0.19-0.22,0.28c-0.18,0.2-0.4,0.4-0.68,0.63c-0.09,0.07-0.22,0.06-0.3-0.02                         c-0.07-0.09-0.06-0.22,0.02-0.29c0.59-0.49,0.81-0.79,0.96-1.05c0.03-0.04,0.05-0.08,0.06-0.11c0-0.02,0-0.05,0-0.07                         c0-0.14,0.05-0.25,0.13-0.3c0.09-0.05,0.2-0.04,0.28,0.03c0.1,0.09,0.09,0.25,0.04,0.4c0,0.04,0.02,0.08,0.04,0.13                         c0.31,0.89,0.32,1.52,0.06,1.86C72.42,91.65,72.21,91.81,71.83,91.79z"/>
                </g>
            </g>
            <circle cx="74.55" cy="91.82" r="0.33"/>
        </g>
    </g>
</svg>
`,
    "icon-51": `<svg version="1.1" id="icon-51" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 94 68" enable-background="new 0 0 94 68" xml:space="preserve" stroke="none">
    <g>
        <g>
            <g>
                <g>
                    <path d="M27.08,30.59c-1.74-0.89-2.51-2.89-2.51-4.97c0-3.3,1.96-6.82,5.13-7.16
                        c1.78-0.19,2.73,0.81,2.73,2.34c0,1.09-0.47,2.45-1.44,3.83c0.72,0.47,1.09,0.7,1.81,1.15c1.12-1.55,1.64-3.19,1.64-4.6
                        c0-2.5-1.61-4.3-4.59-3.97c-4.73,0.51-7.39,4.51-7.39,8.43c0,3.15,1.57,6.29,5.34,6.67C27.78,31.43,27.09,30.61,27.08,30.59z"/>
                </g>
                <g>
                    <path d="M51.74,0.38c-3.92,0.76-5.7,6.11-7.44,15.09c-0.3,0.09-0.59,0.17-0.92,0.24
                        c-0.87,0.18-1.81,0.26-2.75,0.4c0.62-3.54,1.07-6.85,2.03-10.69c0.72-0.76,1.24-1.69,1.44-2.89c-0.97,0.04-1.46,0.06-2.43,0.09
                        c-0.37,0.97-0.69,1.95-0.99,2.97c-1.88,1.01-4.31,1.9-5.92,3.04c-1.58,1.12-2.33,2.55-2.33,3.79c0,1.76,1.49,3.14,4.24,2.66
                        c0.09-0.85,0.13-1.27,0.22-2.12c-1.31,0.23-2.38,0-2.38-1.22c0-2.3,3.07-3.03,5.7-4.5c-0.79,3.05-1.39,6.24-1.96,9.24
                        c-1.09,0.22-2.08,0.57-2.95,1.16c0.29,0.66,0.43,0.99,0.72,1.64c0.59-0.52,1.24-0.88,1.91-1.18c-0.03,0.15-0.04,0.23-0.07,0.38
                        c-0.86,4.27-2.24,8.66-4.7,10.96c0.31,0.45,0.46,0.98,0.6,1.48c3.99-2.45,5.55-7.69,6.48-12.61c0.07-0.37,0.1-0.56,0.17-0.93
                        c0.82-0.16,1.64-0.27,2.45-0.44c0.42-0.09,0.82-0.19,1.21-0.3c-0.72,3.86-1.44,8.35-2.33,13.43c1.14-0.23,1.71-0.34,2.85-0.58
                        c0.97-9.17,3.02-26.74,6.94-27.51c0.62-0.12,1.14,0,1.14,1.44c0,0.3-0.03,0.67-0.07,1.13c0.96-0.18,1.44-0.27,2.4-0.44
                        c0.02-0.23,0.02-0.43,0.02-0.65C55.03,1.26,54.02-0.06,51.74,0.38z"/>
                </g>
                <g>
                    <path d="M51.05,11.28c-0.87,4.04-1.59,7.06-1.59,9.09c0,0.72,0.27,0.79,0.5,0.74
                        c0.64-0.13,1.46-1.68,2.55-4.74c0.12-0.02,0.69,0.04,0.69,0.19c0,0.01,0,0.02,0,0.03c-1.09,3.03-1.96,6.07-3.99,6.48
                        c-1.34,0.27-1.78-0.88-1.78-2.59c0-2.75,1.09-6.92,1.51-8.78C49.78,11.53,50.2,11.44,51.05,11.28z M49.24,8.94
                        c0-0.89,0.64-2.09,1.74-2.3c0.82-0.16,1.16,0.37,1.16,1.06c0,0.89-0.64,2.06-1.74,2.27C49.61,10.12,49.24,9.61,49.24,8.94z"/>
                </g>
                <g>
                    <path d="M61.51,15.25c0,0.03,0,0.03,0,0.03c-0.94,2.54-2.31,4.48-3.64,6.08
                        c-0.22,1.31-0.33,1.97-0.55,3.28c-0.42,2.57-1.36,4.56-2.95,4.84c-1.12,0.2-1.91-0.29-1.91-1.6c0-1.71,1.59-3.43,3.42-5.51
                        c0.15-0.77,0.25-1.58,0.4-2.37c-0.62,1.22-1.44,2.1-2.45,2.29c-1.21,0.22-1.71-1.02-1.71-2.83c0-3.49,1.91-9.03,4.26-9.42
                        c0.77-0.13,1.19,0.25,1.36,1.09c0.09-0.44,0.13-0.66,0.22-1.1c0.81-0.13,1.22-0.19,2.03-0.3c-0.3,1.13-1.12,5.86-1.83,9.91
                        c1.04-1.35,2.01-2.87,2.65-4.64C61.03,14.98,61.51,15.1,61.51,15.25z M54.34,28.17c0.42-0.08,0.62-0.61,0.77-1.4
                        c0.2-1.1,0.3-1.64,0.5-2.74c-1.04,1.27-1.76,2.37-1.76,3.56C53.85,28.07,54.09,28.22,54.34,28.17z M54.19,18.83
                        c0,0.77,0.15,1.26,0.52,1.2c1.14-0.2,2.55-4.48,2.55-6.78c0-0.92-0.22-1.53-0.77-1.44C55.46,11.98,54.19,16.58,54.19,18.83z"/>
                </g>
                <g>
                    <path d="M59.85,21.06c-0.03-0.22-0.03-0.44-0.03-0.67c0-1.96,0.77-4.09,0.77-4.09
                        c0.87-5.37,1.96-11.52,2.97-13.92c0.47-1.11,1.34-1.66,2.08-1.71c1.24-0.08,1.71,0.53,1.71,1.47c0,2.01-2.13,5.51-3.67,7.54
                        c-0.07,0.45-0.17,0.91-0.27,1.39c0.82-1.32,1.83-2.17,2.9-2.23c0.87-0.05,1.44,0.5,1.44,1.69c0,2.3-1.61,5.33-1.61,7.36
                        c0,0.72,0.27,0.83,0.5,0.82c0.64-0.03,1.46-1.46,2.55-4.32c0.15,0,0.69,0.19,0.69,0.34c-1.09,2.82-2.21,5.71-4.24,5.85
                        c-0.87,0.06-1.69-0.56-1.69-2.07c0-2.68,1.61-5.56,1.61-7.34c0-0.27-0.12-0.49-0.4-0.47c-1.07,0.08-2.4,2.61-3.32,10.11
                        C61.05,20.9,60.65,20.95,59.85,21.06z M65.77,2.28c-0.4,0.03-0.72,1.09-1.61,5.28c0.69-1.4,1.83-3.68,1.83-4.95
                        C65.99,2.39,65.89,2.27,65.77,2.28z"/>
                </g>
            </g>
        </g>
        <g>
            <g>
                <path d="M16.61,54.67c5-0.3,8.03-5.45,8.03-10.35c0-2.8-1-5.51-3.2-7.31
                    c-1.04,1.12-1.56,1.68-2.6,2.78c1.87,1.56,2.73,3.94,2.73,6.3c0,3.4-1.83,6.72-5,6.91c-3.2,0.19-4.73-3.56-4.73-8.16
                    c0-6.63,3.23-14.97,9.45-16.74c-0.2-0.51-0.3-1.1-0.31-1.67C12.7,28.31,8.38,36.74,8.38,44.1C8.38,49.9,11.08,55.01,16.61,54.67z
                    "/>
            </g>
            <g>
                <path d="M39.07,59.16c-0.27,2.48-1.6,4.1-4.33,4.51c-3.95,0.59-7.09-0.43-11.05-1.27l0,0
                    c-1.23-0.34-2.38-0.65-3.48-0.93C28.08,55.35,33.21,44.05,33.21,36c0-5.33-2.23-9.19-7.31-9.83c-0.12,0.84,0.16,1.6,0.57,2.25
                    c2.2,1.19,3.18,3.92,3.18,7.44c0,6.33-3.15,15.16-7.89,21.27c-0.43,0.43-2.03,1.96-4.18,3.69c-9.7-2.26-14.15-1.85-16.21,0.83
                    c-0.79,1.02-1.08,2.34-0.67,3.47c0.53,1.47,2.15,2.58,5.29,2.58c4.53,0,9.63-2.99,12.31-4.82c0.97,0.22,1.99,0.46,3.08,0.74
                    c4.93,1.34,9.9,3.17,14.07,2.54c5.07-0.77,7.43-3.63,7.5-7.14C41.39,59.09,40.62,59.11,39.07,59.16z M4.75,66.78
                    c-2.11-0.21-3.26-2.87-1.67-4.43c0.8-0.79,4.07-1.66,12.53-0.04C12.22,64.79,8.06,67.12,4.75,66.78z"/>
            </g>
            <g>
                <path d="M67.52,31.55c1.47-0.22,2.33-1.74,2.33-2.94c0-0.93-0.47-1.67-1.57-1.51
                    c-1.47,0.22-2.33,1.79-2.33,2.99C65.95,30.98,66.45,31.71,67.52,31.55z"/>
            </g>
            <g>
                <path d="M90.96,34.06c-1.31,4.73-4.62,8.27-7.85,11.36c0.97-5.51,2.2-12.35,2.6-13.94
                    c-1.09,0.07-1.64,0.1-2.73,0.19c-0.67,3.15-2.03,13.1-3.7,13.26c-0.3,0.03-0.67-0.1-0.67-1.07c0-1.33,0.3-2.93,0.67-4.83
                    c0.83-4.35,1.5-7.18,1.5-7.18c-1.13,0.1-1.7,0.16-2.83,0.28c0,0-0.67,2.7-1.5,7.13c-0.02,0.11-0.04,0.23-0.06,0.34
                    c-1,2.67-2.28,5.9-3.17,6.02c-0.43,0.06-0.67-0.65-0.67-2.05c0-1.23,0.04-3.17,0.5-5.33c0.28-1.34,0.73-2.76,1.03-4.06
                    c0.6-0.07,1.23-0.15,1.37-0.2c0.12-0.64,0.18-0.96,0.3-1.6c-0.3,0.07-0.77,0.16-1.3,0.22c0.36-1.75,1.14-7.03,1.07-8.06
                    c-0.95,0.11-1.42,0.17-2.37,0.29c-0.77,3.47-1.2,5.76-1.63,8.11c-0.7,0.09-1.27,0.14-1.5,0.17c-0.09,0.64-0.14,0.96-0.23,1.6
                    c0.13,0.01,0.7-0.07,1.47-0.17c-0.45,2.06-0.76,4.07-0.94,5.87c-1.44,3.96-2.53,5.95-3.39,6.08c-0.3,0.05-0.67-0.07-0.67-1.03
                    c0-2.73,0.97-6.75,2.13-12.12c-1.13,0.17-1.7,0.25-2.83,0.43c-0.38,1.67-1.16,4.73-1.64,7.67c-1.4,3.8-2.65,6.01-3.69,6.19
                    c-0.77,0.13-1.27-0.49-1.27-2.72c0-1.07,0.1-2.38,0.27-3.84c1.33-1.86,3.57-5.49,4.93-10.08c0.33-1.09,1-3.56,1-5.52
                    c0-1.7-0.5-3.02-2.23-2.74c-1.93,0.31-4.05,4.45-5.53,13.06c-0.43,2.53-0.75,4.78-0.92,6.73c0,0-0.01,0-0.01,0
                    c-1.6,4.41-3,6.25-3.37,6.32c-0.17,0.03-0.27-0.19-0.27-0.69c0-0.23,0-0.5,0.07-0.88c0.47-3.38,1.1-7.09,2.1-11.7
                    c-0.95,0.16-1.42,0.25-2.37,0.41c-0.15,0.77-0.22,1.16-0.37,1.93c-0.23-1.46-0.93-2.07-2.17-1.85c-2.35,0.41-4.36,4.57-5.25,8.61
                    c-1.44,3.99-2.52,6-3.38,6.14c-0.3,0.05-0.67-0.06-0.67-1.02c0-2.73,0.97-6.76,2.13-12.15c-1.13,0.19-1.7,0.29-2.83,0.47
                    c-0.4,1.73-1.03,4.3-1.53,7.21c-0.08,0.45-0.12,0.68-0.2,1.13c-0.7,3.01-1.7,5.13-2.23,5.22c-0.3,0.05-0.67-0.06-0.67-1.03
                    c0-1.33,0.3-2.94,0.67-4.87c0.83-4.39,1.5-7.27,1.5-7.27c-1.13,0.18-1.7,0.27-2.83,0.44c0,0-0.67,2.73-1.5,7.19
                    c-0.3,1.64-0.53,3.28-0.53,4.64c0,2.23,0.6,3.75,2.37,3.49c1.3-0.2,2.27-1.45,3-3.2c0.2,1.6,0.87,2.6,2.33,2.36
                    c1.8-0.3,2.93-2.18,3.9-4.58c0.03,2.36,0.69,3.98,2.29,3.7c1.93-0.33,3.1-2.31,3.87-4.47v0.37c0,2.3,0.6,3.16,1.67,2.97
                    c1.26-0.22,2.58-2.05,4.14-5.81c0.03,3.35,0.83,5.11,2.79,4.78c1.69-0.29,3-2.05,4.43-5.48c-0.01,0.21-0.03,0.43-0.03,0.63
                    c0,2.3,0.6,3.87,2.4,3.59c1.99-0.31,3.15-2.53,4.2-5.25v0c0,2.83,0.6,4.55,2.07,4.35c1.58-0.21,2.56-1.59,3.74-4.47
                    c0,0.06-0.01,0.12-0.01,0.17c0,2.23,0.6,3.76,2.37,3.57c0.9-0.09,1.67-0.74,2.3-1.69c-0.13,0.85-0.3,1.66-0.43,2.44
                    c-2.57,2.48-4.57,4.69-4.57,6.89c0,1.77,1.07,2.5,2.57,2.35c2.13-0.22,3.4-2.79,3.97-6.21c0.24-1.43,0.36-2.15,0.6-3.58
                    c4.09-3.74,9.26-8,10.76-14.29C93.78,31.08,91.45,31.65,90.96,34.06z M63.36,24.89c0.17-0.03,0.34,0.22,0.33,0.68
                    c-0.02,4.06-2.5,10.04-4.17,13.35C60.49,32.56,62.46,25.04,63.36,24.89z M47.86,49.48c-0.5,0.09-0.7-0.58-0.7-1.61
                    c0-3.03,1.7-9.19,3.1-9.44c0.73-0.13,1.03,0.69,1.03,1.92C51.29,43.45,49.39,49.21,47.86,49.48z M79.15,53.87
                    c-0.2,1.05-0.47,1.75-1.03,1.81c-0.33,0.04-0.67-0.2-0.67-0.83c0-1.37,0.9-2.8,2.3-4.3C79.51,51.87,79.39,52.54,79.15,53.87z"/>
            </g>
        </g>
    </g>
</svg>
`,
    "icon-52": `<svg version="1.1" id="icon-52" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 93 68" enable-background="new 0 0 93 68" xml:space="preserve" stroke="none">
    <g>
        <g>
            <path d="M22.72,46.48c-1.09-1.17-2-2.4-2.43-3.55h-6.89c0.29,3.11,2.5,5.51,4.6,7.91
                c1.94,2.18,3.61,4.12,3.61,6.5c0,3.21-2.81,5.15-5.39,5.15c-2.85-0.04-5.11-1.7-5.07-4.52c0.55-5.11-6.22-4.99-6.22-0.48
                c-0.2,6.3,5.35,10.39,11.34,10.39c6.34,0,12.09-4.99,12.09-11.1c0-4.12-2.74-7.1-5.15-9.79L22.72,46.48z"/>
        </g>
        <g>
            <path d="M22.96,33.72c-3.73,0-7.5,2.01-8.98,5.65h7.87c0.42-0.16,0.82-0.22,1.11-0.18
                c1.23,0.08,2.1,0.95,2.77,2.3c1.39,3.21,6.5,1.78,5.31-2.3C30.13,36.1,27,33.72,22.96,33.72z"/>
        </g>
        <g>
            <path d="M82.06,56.63c-1.74,4.6-5.91,6.54-9.28,6.54c-2.89,0-4.72-1.47-4.72-3.29
                c0-0.36,0.04-0.71,0.2-1.11l0.32-0.75c1.15,0.71,2.58,1.19,4.16,1.19c3.61,0,6.78-2.26,7.85-5.83c0.2-0.75,0.32-1.51,0.32-2.18
                c0-3.77-2.97-6.66-7.45-6.66c-3.53,0-6.98,2.06-8.36,6.03l-2.34,6.78c-0.13,0.39-0.23,0.77-0.32,1.15c-1.6,3.2-3.45,4.59-5,4.59
                c-0.79,0-1.23-0.48-1.23-1.07c0-0.16,0.08-0.44,0.16-0.67l8.01-23.11c1.55-4.24-4.28-5.47-5.67-1.23l-7.54,21.88
                c-1.54,2.94-3.2,4.21-4.71,4.21c-0.67,0-1.07-0.36-1.07-0.99c0-0.32,0.08-0.71,0.2-1.15l4.44-12.69c1.35-4-3.49-5.07-5.39-2.7
                c-0.79-0.52-2.38-1.23-4.56-1.23c-2.62,0-5.39,1.47-6.54,4.48l-3.73,10.5c-0.24,0.71-0.4,1.43-0.4,2.14
                c0,3.29,2.66,5.99,6.14,5.99c1.78,0,3.65-0.75,5.07-2.02c1.19,2.02,4.2,2.38,5.43,2.38c1.85,0,3.84-0.56,5.72-2.07
                c1.2,1.35,3.1,2.07,5.18,2.07c2.2,0,4.73-0.8,7-3.11c1.81,2.02,4.89,3.19,8.5,3.19c5.51,0,11.77-2.77,14.39-10.35
                C87.93,54.37,82.89,53.86,82.06,56.63z M71,51.16c0.48-1.19,1.43-1.9,2.34-1.9c1.11,0,1.82,0.91,1.82,2.02
                c0,0.32-0.04,0.63-0.16,0.95c-0.63,2.1-3.33,2.1-4.84,1.31L71,51.16z M41.82,54.49l-1.43,4.08c-1.19,2.93-2.77,3.29-3.53,3.13
                c-1.31-0.32-0.99-1.98-0.71-2.77l2.06-6.14c1.23-3.37,2.85-2.7,2.97-2.62C41.27,50.21,43.13,50.65,41.82,54.49z"/>
        </g>
        <g>
            <path d="M25.45,42.26c-0.18-0.3-0.33-0.62-0.49-0.96c-0.19-0.4-0.38-0.76-0.78-1
                c-0.11-0.07-0.23-0.13-0.35-0.18c-6.55,0.05-12.99-0.01-19.79-0.44c-0.82-0.15-1.75-1.27-1.83-1.98l0-0.03
                c-0.25-1.61,0.31-2.89,1.5-3.45c0.36-0.14,0.74-0.26,1.16-0.38l36.16-9.08c0,0,1.14-0.27,1.11-1.11c0-0.06-0.01-0.12-0.02-0.18
                l-0.04-0.15c-0.37-0.87-1.52-0.65-1.52-0.65l-35.09,8.8c-1,0.23-1.82,0.47-2.58,0.76l-0.04,0.02c-2.1,0.95-3.16,3.15-2.77,5.71
                c0.18,1.55,1.65,3.45,3.55,3.82l0.09,0.03l0.11,0.01c5.15,0.33,9.81,0.46,16.1,0.46C21.78,42.29,23.62,42.28,25.45,42.26z"/>
        </g>
        <g>
            <path d="M31.24,42.2c4.74-0.06,9.65-0.12,14.48-0.08l1.22,0.01l0.39,0v0c1.57,0,4.87,0,8.95,0
                c0.33-0.68,0.47-1.43,0.72-2.15c-6.03,0-10.53-0.01-10.65-0.01c-4.83-0.05-9.76,0.01-14.55,0.06
                C31.76,40.81,31.58,41.54,31.24,42.2z"/>
        </g>
        <g>
            <path d="M88.48,31.9c-2.21-0.59-32.54-8.16-40.05-10.04c-0.83-0.17-0.99-0.9-1.02-1.19v-5.49
                c0,0,0.06-0.62,0.65-0.77c3.17-0.8,5.53-3.71,5.53-7.05c0-4-3.26-7.26-7.26-7.26c-3.79,0-6.93,2.95-7.23,6.67
                C39.09,6.85,39.08,6.93,39.08,7c0,0.03,0,0.07,0.01,0.1c0,0.07-0.02,0.99,1.08,0.99c1.05,0,1.09-1.17,1.08-1.21
                c0.24-2.59,2.44-4.63,5.09-4.63c2.82,0,5.11,2.29,5.11,5.11c0,2.68-2.11,4.88-4.77,5.09c-0.05,0-0.11,0.01-0.16,0.01
                c-0.64,0.08-1.15,0.57-1.25,1.21l0,0.47l0,8.22c0,0,0,0.01,0,0.01c0,0,0,0.01,0,0.01c0,0.48,0.29,0.89,0.71,1.07
                c0,0,39.68,9.9,41.96,10.51c2.39,0.64,3.07,2.24,2.9,3.53c-0.16,1.22-1.11,2.46-2.63,2.47c-2.2,0.01-13.49,0.01-23.8,0.01
                c-0.15,0.41-0.33,0.81-0.48,1.23c-0.11,0.31-0.21,0.61-0.32,0.92c3.98,0,8.15,0,11.92,0c7.19,0,11.46,0,12.69-0.01
                c2.75-0.01,4.47-2.2,4.75-4.34C93.23,35.69,92.22,32.9,88.48,31.9z"/>
        </g>
    </g>
</svg>
`,
}

const folders = [
    {
        id: 1,
        name: "folder 1",
    },
    {
        id: 2,
        name: "folder 2",
    },
    {
        id: 3,
        name: "folder 3",
    },
    {
        id: 4,
        name: "folder 4",
    },
    {
        id: 5,
        name: "folder 5",
    },
    {
        id: 6,
        name: "folder 6",
    },
    {
        id: 7,
        name: "folder 7",
    },
    {
        id: 8,
        name: "folder 8",
    },
    {
        id: 9,
        name: "folder 9",
    },
    {
        id: 10,
        name: "folder 10",
    },
    {
        id: 11,
        name: "folder 11",
    },
    {
        id: 12,
        name: "folder 12",
    },
    {
        id: 13,
        name: "folder 13",
    },
    {
        id: 14,
        name: "folder 14",
    },
    {
        id: 15,
        name: "folder 15",
    },
    {
        id: 16,
        name: "folder 16",
    },
    {
        id: 17,
        name: "folder 17",
    },
    {
        id: 18,
        name: "folder 18",
    },
    {
        id: 19,
        name: "folder 19",
    },
    {
        id: 20,
        name: "folder 20",
    }
]

const library = [
    {
        id:1,
        img:"https://cdn.flipsnack.com/collections/uploads/c73d3737ee40146f20a8e5ef49804638_t",
        mediaType:"JPG",
    },
    {
        id:2,
        img:"https://cdn.flipsnack.com/collections/uploads/0417f8e82f828042a3e27b3f49804639_t",
        mediaType:"PNG",
    },
    {
        id:3,
        img:"https://cdn.flipsnack.com/collections/uploads/5a0c38e5a4d3a0fbedda523f49804640_t",
        mediaType:"JPEG",
    },
    {
        id:4,
        img:"https://cdn.flipsnack.com/collections/uploads/7a3c7fe645f87ff4902cb63f49804636_t",
        mediaType:"SVG",
    },
    {
        id:5,
        img:"https://cdn.flipsnack.com/collections/uploads/110368fc5d5b38d17466948f49804637_t",
        mediaType:"WEBP",
    },
    {
        id:6,
        img:"https://cdn.flipsnack.com/collections/uploads/cdf9c22b5aea6b22cb520c2f49804608_t",
        mediaType:"JPG",
    },
    {
        id:7,
        img:"https://cdn.flipsnack.com/collections/uploads/a8a5a3294ca03b647c14719f49804606_t",
        mediaType:"PNG",
    },
    {
        id:8,
        img:"https://cdn.flipsnack.com/collections/uploads/846ee260539bfa4c2260adaf49804607_t",
        mediaType:"JPEG",
    }
]

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
        case 'interactions':
            return interactions;
        case 'textTemplates':
            return textTemplates;
        case 'svgItems':
            return svgItems;
        case 'folders':
            return folders;
        case 'library':
            return library;
        default:
            return [];
    }
}