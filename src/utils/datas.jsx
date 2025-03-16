import { FileCode, FileText, Image, CirclePlay, Pencil, SlidersHorizontal, ChartPie, Send, BookOpen, Share2, Info, Home, Bot, BarChart2, Diamond, Settings, Users } from 'lucide-react';

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
    { id: 'statistics', icon: BarChart2, label: 'Statistics', path: '/statistics' },
    { id: 'branding', icon: Diamond, label: 'Branding', path: '/branding/profile/settings' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings/workspace' },
];

const bottomNavItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/my-flipbooks', hasDrawer: true },
    { id: 'automation', icon: Bot, label: 'Automation', path: '/automation', hasDrawer: false },
    { id: 'statistics', icon: BarChart2, label: 'Statistics', path: '/statistics', hasDrawer: false },
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
    { icon: BookOpen, title: "View", value: "view", color: "text-blue-600", bg: "bg-blue-50", hover: "hover:bg-blue-100" },
    { icon: Info, title: "Details", value: "details", color: "text-pink-600", bg: "bg-pink-50", hover: "hover:bg-pink-100" },
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
                "Flipsnack statistics & Google Analytics",
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
                "Add your logo in Flipsnack dashboard & flipbooks",
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
                "Flipsnack statistics & Google Analytics",
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
                "Add your logo in Flipsnack dashboard & flipbooks",
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
            "Flipsnack API access",
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
            "Flipsnack API access",
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

export function getData(dataType) {
    switch (dataType) {
        case 'defaultRoutes':
            return defaultRoutes;
        case 'navItems':
            return navItems;
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
        default:
            return [];
    }
}