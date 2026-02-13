import Accessibility from '@/components/CustomizeLayoutComponents/Accessibility';
import Appearance from '@/components/CustomizeLayoutComponents/Appearance';
import Branding from '@/components/CustomizeLayoutComponents/Branding';
import LeadForm from '@/components/CustomizeLayoutComponents/LeadForm';
import MenuControls from '@/components/CustomizeLayoutComponents/MenuControls';
import TableOfContentsComponent from '@/components/CustomizeLayoutComponents/TableOfContentsComponent';
import { FileCode, FileText, Image, CirclePlay, Pencil, SlidersHorizontal, ChartPie, Send, BookOpen, Share2, Home, Bot, Diamond, Settings, Users, Eye, PieChart, TableOfContents, Palette, AlignRight, PersonStanding, LayoutPanelLeft, SquareMousePointer, Type, Upload, Component } from 'lucide-react';

const defaultRoutes = {
    home: '/myflipbooks',
    // automation: '/automation',
    statistics: '/statistics',
    branding: '/branding/colors',
    settings: '/settings/workspace'
};

const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/myflipbooks' },
    // { id: 'automation', icon: Bot, label: 'Automation', path: '/automation', permission: 'automation' },
    { id: 'statistics', icon: PieChart, label: 'Statistics', path: '/statistics', permission: 'statistics' },
    { id: 'branding', icon: Diamond, label: 'Branding', path: '/branding/profile/settings', permission: 'branding' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings/workspace', permission: 'settings' },
];

const editorNavItems = [
    { id: 'templates', icon: LayoutPanelLeft, label: 'Templates' },
    { id: 'interactions', icon: SquareMousePointer, label: 'Interactions' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'uploads', icon: Upload, label: 'Uploads' },
    { id: 'elements', icon: Component, label: 'Elements' },
    // { id: 'automation', icon: Bot, label: 'Automation' }
];

const bottomNavItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/myflipbooks', hasDrawer: true },
    // { id: 'automation', icon: Bot, label: 'Automation', path: '/automation', hasDrawer: false, permission: 'automation' },
    { id: 'statistics', icon: PieChart, label: 'Statistics', path: '/statistics', hasDrawer: false, permission: 'statistics' },
    { id: 'branding', icon: Diamond, label: 'Branding', path: '/branding/profile/settings', hasDrawer: true, permission: 'branding' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings/workspace', hasDrawer: true, permission: 'settings' }
];

const settingMenuItems = [
    {
        id: 'workspace',
        label: 'Workspace',
        path: '/settings/workspace',
        subItems: []
    },
    // {
    //     id: 'general',
    //     label: 'General',
    //     path: '/settings/general',
    //     subItems: []
    // },
    // {
    //     id: 'billing',
    //     label: 'Billing',
    //     path: '/settings/billing',
    //     subItems: [
    //         { id: 'subscription', label: 'Subscription', path: '/settings/billing/subscription' },
    //         { id: 'invoice', label: 'Invoices', path: '/settings/billing/invoice' }
    //     ]
    // },
    {
        id: 'billing',
        label: 'Billing',
        path: '/settings/billing',
        subItems: [
            { id: 'subscription', label: 'Subscription', path: '/settings/billing/subscription' },
            // { id: 'invoice', label: 'Invoices', path: '/settings/billing/invoice' }
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
    // {
    //     id: 'sso',
    //     label: 'Single Sign-On',
    //     path: '/settings/sso',
    //     subItems: []
    // },
    // {
    //     id: 'integrations',
    //     label: 'Integrations',
    //     path: '/settings/integrations',
    //     subItems: []
    // },
    // {
    //     id: 'access',
    //     label: 'Workspace Access',
    //     path: '/settings/access',
    //     subItems: []
    // },
    {
        id: 'logs',
        label: 'Teammate Activity',
        path: '/settings/logs',
        subItems: []
    },
    // {
    //     id: 'permission-settings',
    //     label: 'Permission Settings',
    //     path: '/settings/permission-settings',
    //     subItems: []
    // },
    // {
    //     id: 'email-provider',
    //     label: 'Email Providers',
    //     path: '/settings/email-provider',
    //     subItems: []
    // }
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
    { icon: Eye, title: "Open", value: "view", color: "text-blue-600", bg: "bg-blue-50", hover: "hover:bg-blue-100" },
    { icon: BookOpen, title: "Overview", value: "details", color: "text-pink-600", bg: "bg-pink-50", hover: "hover:bg-pink-100" },
    { icon: Pencil, title: "Edit", value: "edit", color: "text-amber-600", bg: "bg-amber-50", hover: "hover:bg-amber-100" },
    { icon: SlidersHorizontal, title: "Customize", value: "customize", color: "text-blue-600", bg: "bg-blue-50", hover: "hover:bg-blue-100" },
    { icon: ChartPie, title: "Analytics", value: "stats", color: "text-amber-600", bg: "bg-amber-50", hover: "hover:bg-amber-100" },
    { icon: Share2, title: "Share", value: "share", color: "text-green-600", bg: "bg-green-50", hover: "hover:bg-green-100" },
];

const templateButtons = [
    { icon: LayoutPanelLeft, title: "Use template", value: "use-template", color: "text-blue-600", bg: "bg-blue-50", hover: "hover:bg-blue-100" },
    { icon: Pencil, title: "Edit", value: "edit", color: "text-amber-600", bg: "bg-amber-50", hover: "hover:bg-amber-100" },
];

const adminTemplateButtons = [
    { icon: Pencil, title: "Edit", value: "edit", color: "text-amber-600", bg: "bg-amber-50", hover: "hover:bg-amber-100" },
];

const sidebarSections = [
    {
        id: 'flipbooks-team',
        icon: Users,
        label: 'Personal',
        type: 'flipbooks',
    },
    {
        id: 'template-team',
        icon: Users,
        label: 'Personal',
        type: 'template',
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
    // {
    //     id: 'fonts',
    //     label: 'Fonts',
    //     path: '/branding/fonts',
    //     subItems: []
    // },
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
                "FlipDrag statistics & Google Analytics",
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
                "Add your logo in FlipDrag dashboard & flipbooks",
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
            billedAs: "Billed Yearly",
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
            billedAs: "Billed Yearly",
            features: [
                "50 flipbooks",
                "YouTube & Vimeo videos, lead forms, charts & more",
                "Share multiple flipbooks in bookshelves",
                "Password protected sharing",
                "Embed (without watermark)",
                "FlipDrag statistics & Google Analytics",
                "50 credits"
            ]
        },
        {
            id: "business",
            title: "Business Yearly",
            price: "$85",
            billedAs: "Billed Yearly",
            features: [
                "100 flipbooks",
                "Custom domain",
                "Add your logo in FlipDrag dashboard & flipbooks",
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

const planFeatures = {
    trial: [
        "1 flipbook",
        "Basic sharing (link only)",
        "Email support",
        "Standard templates",
        "14-day full access",
        "No credit card required"
    ],
    starter: [
        "5 flipbooks",
        "Add links / detect links",
        "Share link, email, QR code",
        "Download as PDF"
    ],
    professional: [
        "50 flipbooks",
        "Videos, lead forms, charts",
        "Password protection",
        "Embed without watermark",
        "Analytics & Google Analytics"
    ]
};

const enterprisePlans = {
    monthly: {
        title: "Enterprise Monthly",
        features: [
            "1000+ flipbooks",
            "Team collaboration",
            "Role-based permissions",
            "Activity logs",
            "Custom domain",
            "Brand customization",
            "API access",
            "Custom code insertion",
            "Unlimited AI credits"
        ]
    },
    yearly: {
        title: "Enterprise Yearly",
        features: [
            "1000+ flipbooks",
            "Team collaboration",
            "Role-based permissions",
            "Activity logs",
            "Custom domain",
            "Brand customization",
            "API access",
            "Custom code insertion",
            "Unlimited AI credits"
        ]
    }
};

const teammates = [
    { id: 1, email: "bhavin@flipdrag.com", role: "Admin", ssoOnly: false, status: "Pending" },
    { id: 2, email: "utsavp@flipdrag.com", role: "Admin", ssoOnly: false, status: "Pending" },
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
    { id: 1, email: "bhavin@flipdrag.com", ssoOnly: false, status: "Pending" },
    { id: 2, email: "utsavp@flipdrag.com", ssoOnly: false, status: "Pending" },
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
    { id: 1, name: "megaDeal", created: "Mar 5, 2025", link: "https://flipdrag.com", lastViewed: "Mar 10, 2025" },
    { id: 2, name: "springSale", created: "Mar 15, 2025", link: "https://flipdrag.com", lastViewed: "Mar 18, 2025" },
    { id: 3, name: "discountOffer", created: "Mar 10, 2025", link: "https://flipdrag.com", lastViewed: "Mar 12, 2025" },
    { id: 4, name: "limitedDeal", created: "Feb 25, 2025", link: "https://flipdrag.com", lastViewed: "Mar 1, 2025" },
    { id: 5, name: "exclusivePromo", created: "Feb 20, 2025", link: "https://flipdrag.com", lastViewed: "Feb 28, 2025" },
    { id: 6, name: "flashSale", created: "Mar 5, 2025", link: "https://flipdrag.com", lastViewed: "Mar 8, 2025" },
    { id: 7, name: "weekendOffer", created: "Mar 8, 2025", link: "https://flipdrag.com", lastViewed: "Mar 11, 2025" },
    { id: 8, name: "newCollection", created: "Feb 10, 2025", link: "https://flipdrag.com", lastViewed: "Feb 15, 2025" },
    { id: 9, name: "springTrends", created: "Mar 2, 2025", link: "https://flipdrag.com", lastViewed: "Mar 6, 2025" },
    { id: 10, name: "shopNow", created: "Jan 30, 2025", link: "https://flipdrag.com", lastViewed: "Feb 5, 2025" },
    { id: 11, name: "newArrivals", created: "Feb 28, 2025", link: "https://flipdrag.com", lastViewed: "Mar 3, 2025" },
    { id: 12, name: "hotPicks", created: "Jan 15, 2025", link: "https://flipdrag.com", lastViewed: "Jan 20, 2025" },
    { id: 13, name: "topDeals", created: "Feb 5, 2025", link: "https://flipdrag.com", lastViewed: "Feb 9, 2025" },
    { id: 14, name: "cyberOffer", created: "Mar 1, 2025", link: "https://flipdrag.com", lastViewed: "Mar 4, 2025" },
    { id: 15, name: "festiveSale", created: "Feb 22, 2025", link: "https://flipdrag.com", lastViewed: "Feb 27, 2025" }
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

const templatesData = []

const hyperlinks = [
    { value: "send-email", label: "Send email" },
    // { value: "download-pdf", label: "Download PDF" },
    { value: "go-to-profile", label: "Go to profile" },
    { value: "go-to-url", label: "Go to URL" },
    { value: "go-to-previous-page", label: "Go to previous page" },
    { value: "go-to-next-page", label: "Go to next page" },
    { value: "go-to-first-page", label: "Go to first page" },
    { value: "go-to-last-page", label: "Go to last page" },
    { value: "go-to-page", label: "Go to page" },
    { value: "popup-frame", label: "Popup frame" },
    { value: "spotlight", label: "Spotlight" },
    { value: "phone-number", label: "Phone number" },
    { value: "photo-slideshow", label: "Photo slideshow" },
    // { value: "line-chart", label: "Line chart" },
    // { value: "bar-chart", label: "Bar chart" },
    // { value: "pie-chart", label: "Pie chart" },
]

const imageActions = [
    { value: "open-link", label: "Open a link" },
    { value: "go-to-page", label: "Go to a page" },
    { value: "open-overlay", label: "Open an overlay" },
    { value: "spotlight", label: "Spotlight" },
    { value: "popup-frame", label: "Popup frame" }
]

const pageOption = [
    { value: "go-to-page", label: "Go to a page" },
    { value: "go-to-next-page", label: "Go to next page" },
    { value: "go-to-previous-page", label: "Go to previous page" },
    { value: "go-to-first-page", label: "Go to first page" },
    { value: "go-to-last-page", label: "Go to last page" },
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
        email: "alex.jones@flipdrag.com",
        answer: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
        gdpr: "Yes"
    },
    {
        date: "Mar 17, 2025, 5:42 PM",
        email: "sarah.kim@flipdrag.com",
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
        email: "david.nguyen@flipdrag.com",
        answer: "Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur aliquet quam id dui posuere blandit.",
        gdpr: "Yes"
    },
    {
        date: "Mar 19, 2025, 10:05 AM",
        email: "emma.wilson@flipdrag.com",
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
        email: "lisa.garcia@flipdrag.com",
        answer: "Vivamus suscipit tortor eget felis porttitor volutpat. Nulla porttitor accumsan tincidunt. Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo lacinia eget.",
        gdpr: "Yes"
    },
    {
        date: "Mar 20, 2025, 3:19 PM",
        email: "ryan.smith@flipdrag.com",
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
        email: "olivia.brown@flipdrag.com",
        answer: "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Donec rutrum congue leo eget malesuada. Nulla porttitor accumsan tincidunt. Vestibulum ante ipsum.",
        gdpr: "Yes"
    },
    {
        date: "Mar 22, 2025, 10:17 AM",
        email: "ethan.williams@flipdrag.com",
        answer: "Cras ultricies ligula sed magna dictum porta. Curabitur aliquet quam id dui posuere blandit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
        gdpr: "Yes"
    },
    {
        date: "Mar 22, 2025, 4:45 PM",
        email: "sophia.lopez@flipdrag.com",
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
        email: "isabella.davis@flipdrag.com",
        answer: "Sed porttitor lectus nibh. Proin eget tortor risus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Pellentesque in ipsum id orci porta dapibus.",
        gdpr: "No"
    },
    {
        date: "Mar 24, 2025, 9:26 AM",
        email: "lucas.rodriguez@flipdrag.com",
        answer: "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Vivamus magna justo, lacinia eget consectetur sed convallis.",
        gdpr: "Yes"
    },
    {
        date: "Mar 24, 2025, 1:49 PM",
        email: "mila.wong@flipdrag.com",
        answer: "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Curabitur aliquet quam id dui posuere blandit. Donec sollicitudin molestie malesuada enim.",
        gdpr: "Yes"
    },
    {
        date: "Mar 24, 2025, 5:22 PM",
        email: "aiden.clark@flipdrag.com",
        answer: "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Nulla porttitor accumsan tincidunt. Vestibulum ac diam sit amet quam vehicula elementum sed.",
        gdpr: "No"
    },
    {
        date: "Mar 25, 2025, 10:38 AM",
        email: "charlotte.martinez@flipdrag.com",
        answer: "Vivamus suscipit tortor eget felis porttitor volutpat. Pellentesque in ipsum id orci porta dapibus. Donec rutrum congue leo eget malesuada. Vestibulum ante ipsum.",
        gdpr: "Yes"
    },
    {
        date: "Mar 25, 2025, 2:53 PM",
        email: "jacob.anderson@flipdrag.com",
        answer: "Proin eget tortor risus. Cras ultricies ligula sed magna dictum porta. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Sed porttitor lectus nibh.",
        gdpr: "Yes"
    },
    {
        date: "Mar 26, 2025, 8:47 AM",
        email: "amelia.thomas@flipdrag.com",
        answer: "Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus feugiat.",
        gdpr: "No"
    },
    {
        date: "Mar 26, 2025, 1:15 PM",
        email: "william.jackson@flipdrag.com",
        answer: "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh.",
        gdpr: "Yes"
    }
];

const contactFormData = [
    { date: "Mar 17, 2025, 3:15 PM", email: "alex.jones@flipdrag.com", name: "Alex Jones", phone: "1212121212", country: "United States", custom: "tdadqd", gdprAccepted: "Yes" },
    { date: "Mar 18, 2025, 1:45 PM", email: "sophia.miller@techwave.com", name: "Sophia Miller", phone: "2323232323", country: "Canada", custom: "weoplk" },
    { date: "Mar 19, 2025, 11:30 AM", email: "liam.smith@cybertrend.com", name: "Liam Smith", phone: "3434343434", country: "United Kingdom", custom: "zxcvbn" },
    { date: "Mar 20, 2025, 2:20 PM", email: "emma.davis@nextgen.com", name: "Emma Davis", phone: "4545454545", country: "Australia", custom: "asdfgh" },
    { date: "Mar 21, 2025, 9:10 AM", email: "noah.johnson@digitech.com", name: "Noah Johnson", phone: "5656565656", country: "Germany", custom: "qwerty" },
    { date: "Mar 22, 2025, 4:50 PM", email: "olivia.brown@softlab.com", name: "Olivia Brown", phone: "6767676767", country: "France", custom: "mnbvcx", gdprAccepted: "Yes" },
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
    // {
    //     value: "accessibility",
    //     icon: <PersonStanding />,
    //     label: "Accessibility",
    //     component: <Accessibility />
    // }
];

const templates = [];

const textTemplates = [];
const interactions = [
    {
        title: "Links and tags",
        isTextShow: true,
        widget: [
            {
                text: 'Link area',
                icon: `<div class="w-2 h-2 border-t-2 border-l-2 absolute top-0 left-0 rounded-tl-md"> </div><div class="w-2 h-2 border-t-2 border-r-2 absolute top-0 right-0 rounded-tr-md"> </div><div class="w-2 h-2 border-b-2 border-l-2 absolute bottom-0 left-0 rounded-bl-md"> </div><div class="w-2 h-2 border-b-2 border-r-2 absolute bottom-0 right-0 rounded-br-md"> </div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link2-icon lucide-link-2"><path d="M9 17H7A5 5 0 0 1 7 7h2" /><path d="M15 7h2a5 5 0 1 1 0 10h-2" /><line x1="8" x2="16" y1="12" y2="12" /></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 320,
                    height: 52,
                    fill: "#7bc2ff",
                    opacity: 0.3,
                    type: "rect",
                    title: "hyperlink",
                    visible: true,
                    layer: "Link",
                    htmlType: "link-area",
                }
            },
            {
                text: 'Link button',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link-icon lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    src: "/assets/icons/Link.svg",
                    title: "link-button",
                    visible: true,
                    layer: "Link",
                    htmlType: "go-to-button-link",
                    htmlData: {
                        tooltip: "Click to link button",
                    }
                }
            },
            {
                text: 'Tag',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-dot-icon lucide-circle-dot"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="1" /></svg>`,
                isUpgrade: false,
                attrs: {
                    fill: "#41485d",
                    type: "arc",
                    title: "tag",
                    innerRadius: 40,
                    outerRadius: 72,
                    angle: 360,
                    width: 140,
                    height: 140,
                    strokeWidth: 0,
                    visible: true,
                    layer: "Tag",
                    htmlType: "link-tag",
                },
            },
            {
                text: 'Caption',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    src: "/assets/icons/Plus.svg",
                    title: "caption",
                    visible: true,
                    layer: "Interactions",
                    htmlType: "square-caption"
                }
            },
            {
                text: 'Embed code',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code-icon lucide-code"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 300,
                    height: 300,
                    fill: "#ffffffa6",
                    type: "img",
                    src: "/assets/icons/Code.svg",
                    title: "embed-code",
                    visible: true,
                    layer: "Embed",
                    htmlType: "embed-code",
                }
            },
            {
                text: 'Pop-up frame',
                icon: `<div class="w-2 h-2 border-t-2 border-l-2 absolute top-0 left-0 rounded-tl-md"> </div><div class="w-2 h-2 border-t-2 border-r-2 absolute top-0 right-0 rounded-tr-md"> </div><div class="w-2 h-2 border-b-2 border-l-2 absolute bottom-0 left-0 rounded-bl-md"> </div><div class="w-2 h-2 border-b-2 border-r-2 absolute bottom-0 right-0 rounded-br-md"> </div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-icon lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 320,
                    height: 52,
                    fill: "#7bc2ff",
                    opacity: 0.3,
                    effect: { opacity: 0.3 * 100 },
                    type: "rect",
                    title: "hyperlink",
                    visible: true,
                    layer: "Link",
                    htmlType: "link-area",
                    htmlData: {
                        action: "popup-frame",
                        tooltip: "Click to view"
                    }
                }
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
                attrs: {
                    width: 320,
                    height: 52,
                    fill: "#7bc2ff",
                    opacity: 0.3,
                    effect: { opacity: 0.3 * 100 },
                    type: "rect",
                    title: "hyperlink",
                    visible: true,
                    layer: "Link",
                    htmlType: "link-area",
                    htmlData: {
                        action: "spotlight",
                        tooltip: "Click to view"
                    }
                }
            },
            {
                text: 'Slideshow',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-images-icon lucide-images"><path d="M18 22H4a2 2 0 0 1-2-2V6" /><path d="m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18" /><circle cx="12" cy="8" r="2" /><rect width="16" height="16" x="6" y="2" rx="2" /></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 300,
                    height: 200,
                    fill: "#ffffffa6",
                    type: "img",
                    src: "/assets/icons/SlideShow.svg",
                    isImage: false,
                    title: "slideshow",
                    visible: true,
                    layer: "Slideshow",
                    htmlType: "slideshow"
                }

            },
            {
                text: 'Pop-up slideshow',
                icon: `<div class="w-2 h-2 border-t-2 border-l-2 absolute top-0 left-0 rounded-tl-md"> </div><div class="w-2 h-2 border-t-2 border-r-2 absolute top-0 right-0 rounded-tr-md"> </div><div class="w-2 h-2 border-b-2 border-l-2 absolute bottom-0 left-0 rounded-bl-md"> </div><div class="w-2 h-2 border-b-2 border-r-2 absolute bottom-0 right-0 rounded-br-md"> </div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-images-icon lucide-images"><path d="M18 22H4a2 2 0 0 1-2-2V6" /><path d="m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18" /><circle cx="12" cy="8" r="2" /><rect width="16" height="16" x="6" y="2" rx="2" /></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 160,
                    height: 160,
                    fill: "#7bc2ff",
                    opacity: 0.3,
                    effect: { opacity: 0.3 * 100 },
                    type: "rect",
                    title: "hyperlink",
                    visible: true,
                    layer: "Link",
                    htmlType: "link-area",
                    htmlData: {
                        action: "photo-slideshow",
                        tooltip: "Click to view"
                    }
                }
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
                attrs: {
                    width: 300,
                    height: 300,
                    fill: "#000000",
                    type: "img",
                    src: "/assets/icons/Play.svg",
                    title: "video-embed",
                    visible: true,
                    layer: "Video widget",
                    htmlType: "video-embed",
                }
            },
            {
                text: 'Video button',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-video-icon lucide-video"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    src: "/assets/icons/VideoButton.svg",
                    title: "video-button",
                    visible: true,
                    layer: "Video",
                    htmlType: "video-button",
                    htmlData: {
                        tooltip: "Click to video button",
                    }
                }
            },
            {
                text: 'Audio button',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume2-icon lucide-volume-2"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    src: "/assets/icons/AudioButton.svg",
                    title: "audio-button",
                    visible: true,
                    layer: "Audio",
                    htmlType: "audio-button",
                    htmlData: {
                        tooltip: "Click to play"
                    }
                }
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
                attrs: {
                    width: 320,
                    height: 72,
                    fill: "#7bc2ff",
                    opacity: 0.3,
                    type: "rect",
                    title: "shop-area",
                    visible: true,
                    layer: "Shopping area",
                    htmlType: "shop-area"
                }
            },
            {
                text: 'Shop button',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 300,
                    height: 100,
                    fill: "#000000",
                    type: "img",
                    src: `/assets/icons/ShopButton.svg`,
                    title: "shop-button",
                    visible: true,
                    layer: "Shopping button",
                    htmlType: "shop-button",
                }
            },
            {
                text: 'Product tag',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tag-icon lucide-tag"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>`,
                isUpgrade: false,
                attrs: {
                    fill: "#41485d",
                    height: 51,
                    width: 51,
                    type: "shape",
                    strokeWidth: 5,
                    scaleX: 2,
                    scaleY: 2,
                    draggable: true,
                    visible: true,
                    data: [
                        {
                            "type": "path",
                            "data": "M25.5,3.5C37.8,3.5,47.5,13.2,47.5,25.5S37.8,47.5,25.5,47.5S3.5,37.8,3.5,25.5S13.2,3.5,25.5,3.5 M25.5,0C11.4,0,0,11.4,0,25.5S11.4,51,25.5,51S51,39.6,51,25.5S39.6,0,25.5,0L25.5,0z"
                        },
                        {
                            "type": "path",
                            "data": "M25.5,9C34.6,9,42,16.4,42,25.5S34.6,42,25.5,42S9,34.6,9,25.5S16.4,9,25.5,9z"
                        }
                    ],
                    htmlType: "product-tag",
                    title: "shape-widget",
                    layer: "Product Tag",
                },
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
                attrs: {
                    width: 320,
                    height: 52,
                    fill: "#7bc2ff",
                    opacity: 0.3,
                    type: "rect",
                    title: "quiz",
                    visible: true,
                    layer: "Quiz",
                    htmlType: "quiz",
                    htmlData: {
                        tooltip: "Click to view quiz"
                    }
                }
            },
            {
                text: 'Question',
                icon: `<div class="w-2 h-2 border-t-2 border-l-2 absolute top-0 left-0 rounded-tl-md"> </div><div class="w-2 h-2 border-t-2 border-r-2 absolute top-0 right-0 rounded-tr-md"> </div><div class="w-2 h-2 border-b-2 border-l-2 absolute bottom-0 left-0 rounded-bl-md"> </div><div class="w-2 h-2 border-b-2 border-r-2 absolute bottom-0 right-0 rounded-br-md"> </div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-help-icon lucide-circle-help"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 320,
                    height: 52,
                    fill: "#7bc2ff",
                    opacity: 0.3,
                    type: "rect",
                    title: "question",
                    visible: true,
                    layer: "Question",
                    htmlType: "question",
                    htmlData: {
                        tooltip: "Click to answer question"
                    }
                }
            },
            {
                text: 'Contact form',
                icon: `<div class="w-2 h-2 border-t-2 border-l-2 absolute top-0 left-0 rounded-tl-md"> </div><div class="w-2 h-2 border-t-2 border-r-2 absolute top-0 right-0 rounded-tr-md"> </div><div class="w-2 h-2 border-b-2 border-l-2 absolute bottom-0 left-0 rounded-bl-md"> </div><div class="w-2 h-2 border-b-2 border-r-2 absolute bottom-0 right-0 rounded-br-md"> </div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 320,
                    height: 52,
                    fill: "#7bc2ff",
                    opacity: 0.3,
                    type: "rect",
                    title: "contact-form",
                    visible: true,
                    layer: "Contact form",
                    htmlType: "contact-form",
                    htmlData: {
                        tooltip: "Click to view contact form"
                    }
                }
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
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    src: "/assets/icons/PrevPage.svg",
                    title: "page-options",
                    visible: true,
                    layer: "Link",
                    htmlType: "go-to-previous-page"
                }
            },
            {
                text: 'Next page',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    rotation: 180,
                    src: "/assets/icons/NextPage.svg",
                    title: "page-options",
                    visible: true,
                    layer: "Link",
                    htmlType: "go-to-next-page"
                }
            },
            {
                text: 'Go to page',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    src: "/assets/icons/GoToPage.svg",
                    title: "go-to-page",
                    visible: true,
                    layer: "Link",
                    htmlType: "go-to-page"
                }
            },
            {
                text: 'First page',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-first-icon lucide-chevron-first"><path d="m17 18-6-6 6-6"/><path d="M7 6v12"/></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    src: "/assets/icons/GoToFirstPage.svg",
                    title: "page-options",
                    visible: true,
                    layer: "Link",
                    htmlType: "go-to-first-page"
                }
            },
            {
                text: 'Last page',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-last-icon lucide-chevron-last"><path d="m7 18 6-6-6-6"/><path d="M17 6v12"/></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    rotation: 180,
                    src: "/assets/icons/GoToFirstPage.svg",
                    title: "page-options",
                    visible: true,
                    layer: "Link",
                    htmlType: "go-to-last-page"
                }
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
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    src: "/assets/icons/social/TikTok.svg",
                    title: "link-button",
                    visible: true,
                    layer: "TikTok",
                    htmlType: "go-to-button-link",
                    htmlData: {
                        tooltip: "TikTok"
                    }
                }
            },
            {
                icon: `<svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="margin: auto"><path d="M10.3964063 0C4.91515625 0 2.00015625 3.5125 2.00015625 7.3425c0 1.77625.9925 3.99125 2.58125 4.69375.24125.10875.3725.0625.42625-.16125.0475-.17.25625-.98875.3575-1.375.03125-.12375.015-.23125-.085-.3475-.5275-.61-.94625-1.72125-.94625-2.76375 0-2.67125 2.12375-5.265 5.73750005-5.265 3.125 0 5.31125 2.03 5.31125 4.93375 0 3.28125-1.73625 5.55125-3.9925 5.55125-1.24875 0-2.17875005-.98-1.88375005-2.1925.35625-1.44375 1.05500005-2.99625 1.05500005-4.0375 0-.93375-.5275-1.70625-1.60500005-1.70625-1.27125 0-2.3025 1.25875-2.3025 2.94875 0 1.07375.38 1.79875.38 1.79875s-1.2575 5.08-1.49125 6.02875c-.395 1.60625.05375 4.2075.0925 4.43125.02375.12375.1625.1625.24.06125.12375-.1625 1.64375-2.33125 2.07-3.89875.155-.57125.79125-2.8875.79125-2.8875.41875.75625 1.62750005 1.39 2.91500005 1.39 3.83 0 6.5975-3.36625 6.5975-7.54375-.01375-4.005-3.44125-7.00125-7.8525-7.00125z" fill="#ffffff" fill-rule="nonzero"></path></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    src: "/assets/icons/social/Pinterest.svg",
                    title: "link-button",
                    visible: true,
                    layer: "Pinterest",
                    htmlType: "go-to-button-link",
                    htmlData: {
                        tooltip: "Pinterest"
                    }
                }
            },
            {
                icon: `<svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="margin: auto"><path d="M20 10.1594488c0-1.22244093-.9841828-2.21456691-2.1968366-2.21456691-.5975395 0-1.1247803.23031496-1.5114235.62007874-1.4938489-1.08070866-3.5676626-1.78937008-5.8523726-1.87795276l1.0017575-4.73031496 3.2513181.69094489c.0351494.83267716.7205624 1.50590551 1.5641476 1.50590551.8611599 0 1.5641476-.70866142 1.5641476-1.57677166C17.8207381 1.70866142 17.1177504 1 16.2565905 1c-.6151142 0-1.142355.35433071-1.3884007.88582677l-3.6379613-.77952756c-.1054482-.01771653-.2108963 0-.2987698.05314961-.0878735.05314961-.1405975.14173228-.1757469.24803149L9.64850615 6.68700787c-2.33743409.07086615-4.42882249.76181103-5.94024604 1.87795276-.38664324-.37204724-.9314587-.62007874-1.51142355-.62007874C.98418278 7.94488189 0 8.93700787 0 10.1594488c0 .9035433.52724077 1.6653543 1.30052724 2.0196851-.03514938.2125984-.05272408.4429133-.05272408.6732283C1.24780316 16.253937 5.16695958 19 10.0175747 19c4.8506151 0 8.7697715-2.746063 8.7697715-6.1476378 0-.230315-.0175747-.4429134-.0527241-.6555118C19.4551845 11.8425197 20 11.0629921 20 10.1594488zM4.97363796 11.7362205c0-.8681103.7029877-1.5767717 1.56414763-1.5767717.86115993 0 1.56414763.7086614 1.56414763 1.5767717 0 .8681102-.7029877 1.5767716-1.56414763 1.5767716-.86115993 0-1.56414763-.7086614-1.56414763-1.5767716zm8.73462214 4.1633858C12.6362039 16.980315 10.5975395 17.0511811 10 17.0511811c-.59753954 0-2.65377856-.0885827-3.70826011-1.1515748-.15817223-.1594488-.15817223-.4251969 0-.5846457.15817224-.1594488.42179262-.1594488.57996486 0 .66783831.6732284 2.10896309.9212599 3.14586995.9212599 1.0369068 0 2.4604569-.2480315 3.1458699-.9212599.1581723-.1594488.4217927-.1594488.5799649 0 .1230228.1771654.1230228.4251969-.0351494.5846457zm-.2811951-2.5866142c-.8611599 0-1.5641476-.7086614-1.5641476-1.5767716 0-.8681103.7029877-1.5767717 1.5641476-1.5767717.86116 0 1.5641477.7086614 1.5641477 1.5767717 0 .8681102-.7029877 1.5767716-1.5641477 1.5767716z" fill="#ffffff" fill-rule="nonzero"></path></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    src: "/assets/icons/social/Reddit.svg",
                    title: "link-button",
                    visible: true,
                    layer: "Reddit",
                    htmlType: "go-to-button-link",
                    htmlData: {
                        tooltip: "Reddit"
                    }

                }
            },
            {
                icon: `<svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="margin: auto"><path d="M10 0C4.48625 0 0 4.48625 0 10s4.48625 10 10 10 10-4.48625 10-10S15.51375 0 10 0zm4.5875 14.435c-.1225.17375-.315.26625-.51125.26625-.125 0-.25-.03625-.35875-.11375-2.34375-1.6475-6.2425-1.73875-8.875-1.125-.33375.07875-.6725-.13125-.75-.4675-.0775-.33625.13-.6725.4675-.75125 2.89375-.67 7.21875-.5475 9.875 1.32125.2825.19875.35.5875.1525.87zm1.22-2.43875c-.1225.17-.31375.26-.5075.26-.1275 0-.25375-.0375-.365-.1075-3.44625-2.33875-8.685-2.35-12.07625-1.15-.325.1125-.6825-.05625-.7975-.3825-.115-.325.055-.6825.38125-.7975 3.68875-1.30375 9.405-1.27625 13.19625 1.295.285.19375.3575.5825.165.86875z" fill="#ffffff" fill-rule="nonzero"></path></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    src: "/assets/icons/social/Spotify.svg",
                    title: "link-button",
                    visible: true,
                    layer: "Spotify",
                    htmlType: "go-to-button-link",
                    htmlData: {
                        tooltip: "Spotify"
                    }
                }
            },
            {
                icon: `<svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="margin: auto"><path d="M19.15 5.25272727c-.5425-.91236363-1.13125-1.08018182-2.33-1.144C15.6225 4.03190909 12.61125 4 10.0025 4c-2.61375 0-5.62625.03190909-6.8225.10754545-1.19625.065-1.78625.23163637-2.33375 1.14518182C.2875 6.16390909 0 7.73336364 0 10.4964545v.0094546c0 2.7512727.2875 4.3325454.84625 5.2342727.5475.9123637 1.13625 1.0778182 2.3325 1.1546364C4.37625 16.961 7.38875 17 10.0025 17c2.60875 0 5.62-.039 6.81875-.104 1.19875-.0768182 1.7875-.2422727 2.33-1.1546364.56375-.9017272.84875-2.483.84875-5.2342727v-.0059091-.0035454c0-2.76427276-.285-4.33372731-.85-5.24490913zM7.5 14.0454545V6.95454545L13.75 10.5 7.5 14.0454545z" fill="#ffffff" fill-rule="nonzero"></path></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    src: "/assets/icons/social/Youtube.svg",
                    title: "link-button",
                    visible: true,
                    layer: "Youtube",
                    htmlType: "go-to-button-link",
                    htmlData: {
                        tooltip: "Youtube"
                    }
                }
            },
            {
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14.0173188 0C17.2968478 0 19.965 2.66811594 19.965 5.94768116v8.06963764c0 3.2795653-2.6681159 5.9476812-5.9476812 5.9476812H5.94768116C2.66811594 19.965 0 17.2968841 0 14.0173188V5.94768116C0 2.66811594 2.66811594 0 5.94768116 0zm0 2.00847826H5.94768116c-2.17554348 0-3.9392029 1.76362319-3.9392029 3.9392029v8.06963764c0 2.1755435 1.76365942 3.9392029 3.9392029 3.9392029h8.06963764c2.1755435 0 3.9392029-1.7636594 3.9392029-3.9392029V5.94768116c0-2.17557971-1.7636594-3.9392029-3.9392029-3.9392029zM9.9825 4.81884058c2.8472464 0 5.1636594 2.31637681 5.1636594 5.16362319 0 2.84724633-2.316413 5.16365943-5.1636594 5.16365943-2.84724638 0-5.16365942-2.3164493-5.16365942-5.16365943 0-2.84721015 2.31641304-5.16362319 5.16365942-5.16362319zm0 2.00847826c-1.74253623 0-3.15518116 1.4126087-3.15518116 3.15518116 0 1.7425725 1.4126087 3.1551812 3.15518116 3.1551812 1.7425362 0 3.1551812-1.412645 3.1551812-3.1551812 0-1.74257246-1.4126087-3.15518116-3.1551812-3.15518116zm5.1736594-3.20702898c.6833523 0 1.2373189.55396651 1.2373189 1.23731884 0 .68335232-.5539666 1.23731884-1.2373189 1.23731884s-1.2373188-.55396652-1.2373188-1.23731884c0-.68335233.5539665-1.23731884 1.2373188-1.23731884z" fill="#ffffff" fill-rule="nonzero"></path></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    src: "/assets/icons/social/Instagram.svg",
                    title: "link-button",
                    visible: true,
                    layer: "Instagram",
                    htmlType: "go-to-button-link",
                    htmlData: {
                        tooltip: "Instagram"
                    }
                }
            },
            {
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 0c5.6338028 0 10 4.12681288 10 9.70032417 0 5.57351133-4.3661972 9.70032413-10 9.70032413-1.01207243 0-1.98390342-.1327984-2.89537223-.3843107-.17706238-.0482903-.36418511-.0342056-.5331992.040242l-1.98390342.8752626c-.51911469.2273671-1.10462777-.1408469-1.12273642-.7082585l-.05432595-1.7786946c-.00804829-.2193186-.10663984-.4225405-.26961771-.5694237C1.19517103 15.1350007 0 12.6158541 0 9.70032417 0 4.12681288 4.36619718 0 10 0zm5.9224704 7.46814307c.2823356-.44591213-.2663166-.95007404-.684814-.63070454l-3.1397318 2.3902497c-.2122523.16068905-.5045998.16269767-.7188545.00200861L9.05430694 7.48019475c-.69682825-.52424804-1.6940135-.33945563-2.15856566.39971403L3.97226646 12.5318569c-.28233558.4459122.26631654.9500741.68481397.6307046l3.14173424-2.3922583c.21225228-.1606891.50459976-.1626977.71885442-.0020087l2.32476321 1.7495021c.6968282.5242481 1.6940135.3394557 2.1585656-.399714z" fill="#ffffff" fill-rule="evenodd"></path></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    src: "/assets/icons/social/Massenger.svg",
                    title: "link-button",
                    visible: true,
                    layer: "Massenger",
                    htmlType: "go-to-button-link",
                    htmlData: {
                        tooltip: "Massenger"
                    }
                }
            },
            {
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.25 6.875v-2.5c0-.69.56-1.25 1.25-1.25h1.25V0h-2.5C9.17875 0 7.5 1.67875 7.5 3.75v3.125H5V10h2.5v10h3.75V10h2.5L15 6.875h-3.75z" fill="#ffffff" fill-rule="nonzero"></path></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    src: "/assets/icons/social/Facebook.svg",
                    title: "link-button",
                    visible: true,
                    layer: "Facebook",
                    htmlType: "go-to-button-link",
                    htmlData: {
                        tooltip: "Facebook"
                    }
                }
            },
            {
                icon: `<svg width="24" height="24" viewBox="0 0 24 23" xmlns="http://www.w3.org/2000/svg"><path d="M4.4725 6.25V20H0V6.25h4.4725zm6.25 0v2.62875c.545-.7325 2.19875-2.62875 4.80625-2.62875.305 0 .565.03375.8025.08125.06125.01.12125.02125.18125.035.05.01375.095.03.1425.045 1.92125.50125 3.345 2.2325 3.345 4.31V20h-4.47125v-8.75C14.1025 7.7925 10.7225 12.5 10.7225 12.5V20H6.25V6.25h4.4725zM2.1875 0C3.39562289 0 4.375.97937711 4.375 2.1875c0 1.20812289-.97937711 2.1875-2.1875 2.1875C.97937711 4.375 0 3.39562289 0 2.1875 0 .97937711.97937711 0 2.1875 0z" fill="#ffffff" fill-rule="nonzero"></path></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    src: "/assets/icons/social/LinkedIn.svg",
                    title: "link-button",
                    visible: true,
                    layer: "LinkedIn",
                    htmlType: "go-to-button-link",
                    htmlData: {
                        tooltip: "LinkedIn"
                    }
                }
            },
            {
                icon: `<svg width="24" height="24" viewBox="0 0 24 22" xmlns="http://www.w3.org/2000/svg"><path d="M1.016.667 7.89 9.859.972 17.333H2.53l6.057-6.543 4.894 6.543h5.3l-7.263-9.71 6.44-6.956H16.4l-5.578 6.026L6.314.667H1.016Zm2.29 1.147H5.74l10.749 14.372h-2.434L3.305 1.814Z" fill="#ffffff" fill-rule="nonzero"></path></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    src: "/assets/icons/social/Twitter.svg",
                    title: "link-button",
                    visible: true,
                    layer: "Twitter",
                    htmlType: "go-to-button-link",
                    htmlData: {
                        tooltip: "Twitter"
                    }
                }
            },
            {
                icon: `<svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="margin: auto"><path d="M19.9082668 14.3927015c-.1385415-.3785499-.4039167-.5795326-.704415-.7473434-.0565874-.0331719-.1092722-.0604899-.1522005-.0800028-.0897593-.0468309-.1814698-.0917106-.2731803-.1385415-.9385697-.4975785-1.672254-1.1258932-2.1795889-1.869334-.1717134-.2517162-.290742-.4780656-.3746473-.663438-.0429284-.1248824-.0409771-.1951288-.0097565-.2595213.0234155-.0487822.0858567-.0995157.1209799-.1248825.1619569-.1073208.3278164-.2146417.4409911-.2868393.2009827-.1307363.3609883-.23415461.4624553-.30440099.3863551-.26927776.6556328-.55611712.8234436-.87612838.2380572-.45074756.2673265-.96588764.0839054-1.4498071-.2536675-.67124313-.8897874-1.08881879-1.6585949-1.08881879-.1600057 0-.3219626.01756159-.4819682.05268478-.0429284.00975644-.0839054.01951288-.1248825.02926932.0078052-.45660143-.0039025-.94442347-.0448796-1.42053778-.1443953-1.67810782-.731733-2.55813878-1.3444375-3.25865123-.2556188-.29269322-.7005125-.72002533-1.367853-1.1024778C12.1928734.26927776 11.1391778 0 9.98986908 0c-1.14540615 0-2.19910175.26927777-3.1298662.80197943-.67124313.38245248-1.11613683.81173588-1.36980429 1.10247781-.61270448.70051245-1.20004222 1.58054341-1.34443754 3.25865123-.04097705.47611431-.0507335.96393635-.04487963 1.42053778-.04097705-.00975644-.08390539-.01951288-.12488244-.02926932-.16000563-.03512319-.32391384-.05268478-.48196818-.05268478-.76880753 0-1.40492747.41757566-1.65859493 1.08881879-.18342109.48391946-.15415177.99905954.08390539 1.4498071.16781078.32001126.43903983.60685062.8234436.87612839.10341827.07219766.26147261.17561597.46245529.30440097.10927214.0702464.26732648.1736646.42342953.2770829.02341546.0156103.10732085.0780515.13659018.1365902.03317189.0663438.03317189.1385414-.01561031.271229-.0819541.1814698-.20098268.4039167-.36879346.649779-.49757848.7278305-1.20979866 1.3444375-2.11714765 1.8361621-.48196818.2556188-.98149795.4253809-1.19223707.9990596-.16000563.4331859-.05463607.9268619.34928058 1.3424862.1326876.1424441.30049838.2692778.5112375.3863551.49562719.2731803.91710543.4078192 1.24882442.4995298.05853864.0175615.19317753.0604899.25171617.1131747.1482979.128785.12683373.3239138.32391384.6088019.11902857.1775672.25561875.2985471.36879346.3765986.4117218.2848881.87612838.3024497 1.367853.3219625.44294241.0175616.94637476.0370745 1.52005348.2263495.23805715.0780515.48587075.230252.77075882.4058679.68685343.4234295 1.62932561 1.0010108 3.20401516 1.0010108 1.5766408 0 2.5230156-.5814838 3.2157229-1.0049134.2848881-.1736646.5307504-.3258651.7610024-.4019653.5736787-.189275 1.077111-.2087879 1.5200534-.2263495.4917247-.0195128.95418-.0370744 1.367853-.3219625.1287851-.0897593.2926933-.2361059.4214783-.4585527.1404927-.2400085.1385414-.4097705.271229-.5248965.0546361-.046831.1736647-.087808.2380572-.1073209.3336703-.0917105.7610024-.2263494 1.266386-.5053836.2243981-.1229312.3980628-.2575701.5366043-.4117218l.0058538-.0058539c.3765986-.4097705.4722118-.8878361.3161087-1.3112656z" fill="#ffffff" fill-rule="nonzero"></path></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    src: "/assets/icons/social/Snapchat.svg",
                    title: "link-button",
                    visible: true,
                    layer: "Snapchat",
                    htmlType: "go-to-button-link",
                    htmlData: {
                        tooltip: "Snapchat"
                    }
                }
            },
            {
                icon: `<svg width="100%" height="100%" viewBox="0 0 24 26" xmlns="http://www.w3.org/2000/svg" style="margin: auto"><path d="M17.0859 3.87197C15.2061 1.98972 12.7059 0.952615 10.042 0.95166C4.55283 0.95166 0.08547 5.41855 0.08356 10.9092C0.082605 12.6644 0.54147 14.3776 1.41288 15.8874L0 21.0481L5.27909 19.6634C6.7335 20.457 8.37128 20.8748 10.0377 20.8753H10.042C15.5302 20.8753 19.9981 16.4079 20 10.9173C20.0009 8.25627 18.9662 5.7547 17.0859 3.87244V3.87197ZM10.042 19.1935H10.0387C8.55367 19.1931 7.09689 18.7939 5.82583 18.0399L5.52357 17.8604L2.39078 18.6822L3.22686 15.6277L3.03013 15.3144C2.20169 13.9966 1.76383 12.4734 1.76479 10.9097C1.7667 6.3463 5.47963 2.63337 10.0454 2.63337C12.2561 2.63432 14.3342 3.49619 15.8969 5.06091C17.4598 6.62516 18.3197 8.7051 18.3188 10.9163C18.3168 15.4802 14.6039 19.1931 10.042 19.1931V19.1935ZM14.5819 12.9948C14.3332 12.8702 13.1099 12.2685 12.8816 12.1855C12.6534 12.1024 12.4877 12.0609 12.322 12.3101C12.1563 12.5594 11.6793 13.1199 11.5342 13.2856C11.389 13.4518 11.2438 13.4723 10.9951 13.3477C10.7463 13.223 9.94461 12.9604 8.99394 12.1129C8.25433 11.453 7.75483 10.6384 7.60972 10.3892C7.46456 10.1399 7.59444 10.0053 7.71856 9.8816C7.83028 9.76988 7.96733 9.59083 8.09194 9.44566C8.21661 9.30049 8.25767 9.19644 8.34072 9.03072C8.42383 8.86455 8.38228 8.71944 8.32022 8.59477C8.25811 8.47016 7.76061 7.24538 7.55289 6.74738C7.35089 6.26227 7.14561 6.32816 6.99328 6.32004C6.84811 6.31288 6.68244 6.31145 6.51628 6.31145C6.35011 6.31145 6.08078 6.37352 5.85256 6.62277C5.62433 6.87199 4.98162 7.4741 4.98162 8.69838C4.98162 9.92266 5.87311 11.1064 5.99772 11.2725C6.12233 11.4387 7.75244 13.9517 10.2483 15.0299C10.8418 15.2863 11.3054 15.4395 11.6669 15.5542C12.2628 15.7437 12.8052 15.717 13.234 15.653C13.712 15.5814 14.7061 15.0509 14.9133 14.4698C15.1206 13.8887 15.1206 13.3902 15.0585 13.2865C14.9964 13.1829 14.8303 13.1204 14.5815 12.9958L14.5819 12.9948Z" fill="#ffffff"></path></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    src: "/assets/icons/social/Whatsapp.svg",
                    title: "link-button",
                    visible: true,
                    layer: "Whatsapp",
                    htmlType: "go-to-button-link",
                    htmlData: {
                        tooltip: "Whatsapp"
                    }
                }
            }
        ]
    },
    {
        title: "Other",
        isTextShow: false,
        widget: [
            {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    src: "/assets/icons/Cart.svg",
                    title: "link-button",
                    visible: true,
                    layer: "Cart",
                    htmlType: "go-to-button-link",
                    htmlData: {
                        tooltip: "Click to cart button",
                    }
                }
            },
            {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-basket-icon lucide-shopping-basket"><path d="m15 11-1 9"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/><path d="M4.5 15.5h15"/><path d="m5 11 4-7"/><path d="m9 11 1 9"/></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    src: "/assets/icons/Basket.svg",
                    title: "link-button",
                    visible: true,
                    layer: "Basket",
                    htmlType: "go-to-button-link",
                    htmlData: {
                        tooltip: "Click to basket button",
                    }
                }
            },
            {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card-icon lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`,
                isUpgrade: false,
                attrs: {
                    width: 150,
                    height: 150,
                    fill: "#41485d",
                    type: "img",
                    src: "/assets/icons/CreditCard.svg",
                    title: "link-button",
                    visible: true,
                    layer: "Credit card",
                    htmlType: "go-to-button-link",
                    htmlData: {
                        tooltip: "Click to credit card button",
                    }
                }
            }
        ]
    },
]

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
        id: 1,
        img: "/assets/imported/740871234c6945cd6f74fd5dbb2d7390.png",
        mediaType: "JPG",
    },
    {
        id: 2,
        img: "/assets/imported/3a721af589fececa4fc8c69ff459655c.png",
        mediaType: "PNG",
    },
    {
        id: 3,
        img: "/assets/imported/49603f6747459dc715ef49a80d9fdf9c.png",
        mediaType: "JPEG",
    },
    {
        id: 4,
        img: "/assets/imported/a57511a9cd27fbb0351b06e97ef671ad.png",
        mediaType: "SVG",
    },
    {
        id: 5,
        img: "/assets/imported/ee625a0f0ad427b42c0491abd8a271b2.png",
        mediaType: "WEBP",
    },
    {
        id: 6,
        img: "/assets/imported/b87e4237af0fcf72d55d200cf844e8f9.png",
        mediaType: "JPG",
    },
    {
        id: 7,
        img: "/assets/imported/a5585bc5bc6a49fb4687a8bf7630aa74.png",
        mediaType: "PNG",
    },
    {
        id: 8,
        img: "/assets/imported/914fb85e4d7ea6bb258148c4c53d9bbc.png",
        mediaType: "JPEG",
    }
]

const currency = [
    { value: "inr", label: "INR (Indian Rupees)" },
    { value: "usd", label: "USD (United States dollar)" },
    { value: "eur", label: "EUR (Euro)" },
    { value: "aud", label: "AUD (Australian dollar)" },
    { value: "cad", label: "CAD (Canadian dollar)" },
    { value: "jod", label: "JOD (Jordanian dinar)" },
    { value: "kyd", label: "KYD (Kuwaiti dinar)" },
    { value: "chf", label: "CHF (Swiss franc)" },
    { value: "bgn", label: "BGN (Bulgarian Lev)" },
    { value: "hrk", label: "HRK (Croatian Kuna)" },
    { value: "czk", label: "CZK (Czech Koruna)" },
    { value: "dkk", label: "DKK (Danish Krone)" },
    { value: "huf", label: "HUF (Hungarian Forint)" },
    { value: "nok", label: "NOK (Norwegian krone)" },
    { value: "pln", label: "PLN (Polish Zloty)" },
    { value: "ron", label: "RON (Romanian Leu)" },
    { value: "rub", label: "RUB (Russian Ruble)" },
    { value: "rsd", label: "RSD (Serbian Dinar)" },
    { value: "sek", label: "SEK (Swedish Krona)" },
    { value: "try", label: "TRY (Turkish Lira)" },
    { value: "uah", label: "UAH (Ukranian Hryvnia)" },
    { value: "mxn", label: "MXN (Mexican Peso)" },
    { value: "ars", label: "ARS (Argentine Peso)" },
    { value: "clp", label: "CLP (Chilean Peso)" },
    { value: "php", label: "PHP (Philippine Peso)" },
    { value: "brl", label: "BRL (Brazilian Real)" },
    { value: "kes", label: "KES (Kenyan Shilling)" },
    { value: "thb", label: "THB (Thai Baht)" },
    { value: "cop", label: "COP (Colombian Peso)" },
    { value: "gtq", label: "GTQ (Guatemalan Quetzal)" },
    { value: "nis", label: "NIS (Israeli Shekel)" },
    { value: "nzd", label: "NZD (New Zealand Dollar)" },
    { value: "hkd", label: "HKD (Hong Kong Dollar)" }
];

const textElements = [
    {
        text: 'Text',
        title: "Add heading",
        isUpgrade: false,
        type: 0,
        size: 42,
        attrs: {
            fill: "#000",
            fontSize: 84,
            text: 'Add heading',
            type: "text",
            title: "text",
            visible: true,
            layer: "Text",
            width: 300,
            fontFamily: 'Arial',
            htmlType: "text"
        }
    },
    {
        text: 'Text',
        title: "Add sub heading",
        isUpgrade: false,
        type: 1,
        size: 24,
        attrs: {
            fill: "#000",
            fontSize: 48,
            text: 'Add sub heading',
            type: "text",
            title: "text",
            visible: true,
            layer: "Text",
            width: 300,
            fontFamily: 'Arial',
            htmlType: "text"
        }
    },
    {
        text: 'Text',
        title: "Add body text",
        isUpgrade: false,
        type: 2,
        size: 16,
        attrs: {
            fill: "#000",
            fontSize: 32,
            text: 'Add body text',
            type: "text",
            title: "text",
            visible: true,
            layer: "Text",
            width: 200,
            fontFamily: 'Arial',
            htmlType: "text"
        }
    },
    {
        text: 'Text',
        title: "# Pagination",
        isUpgrade: false,
        type: 3,
        size: 16,
        attrs: {
            fill: "#000",
            fontSize: 32,
            text: '1',
            type: "text",
            title: "text",
            visible: true,
            layer: "Text",
            width: 40,
            fontFamily: 'Arial',
            htmlType: "text"
        }
    }
]


const pageLayoutData = {
    "A4": {
        svg: (
            <svg xmlns="https://www.w3.org/2000/svg" width="100%" height="100%"><g fill="none" fill-rule="evenodd"><path fill="#7b39ed" d="M34.861 42.358c-.86.267-1.943.423-3.126.467.913-1.481 3.537-7.134 4.66-10.762l-.18 8.003c.002.979-.279 1.96-1.354 2.292m-7.82.08c.085-1.904-.07-6.556-.164-9.022-.186-4.853 6.073-2.507 9.354-2.815-1.78 3.277-5.28 7.456-7.467 9.223 2.568 1.847 2.632 3.01 1.575 3 .132.005-.047 0-.047 0h.013a20.394 20.394 0 0 1-3.265-.386m-.247-11.985c-2.566-1.273-6.724-1.824-9.41-1.187-.713 3.676-.305 8.548.207 12.255.256 1.862.415 2.104 1.785 1.71 5.186-1.497 9.837 1.452 15.058.165 1.743-.43 2.43-1.335 2.471-2.92l.27-10.675c-2.673-.03-8.637-1.036-10.38.652"></path><rect width="52" height="68.475" x="1" y="1" stroke="#7b39ed" stroke-width="2" opacity=".721" rx="1"></rect></g></svg>
        ),
        styleWidth: "54px",
        styleHeight: "71px"
    },
    "Letter": {
        svg: (
            <svg xmlns="https://www.w3.org/2000/svg" width="100%" height="100%"><g fill="none" fill-rule="evenodd"><path fill="#7b39ed" d="M35.861 39.358c-.86.267-1.943.423-3.126.467.913-1.481 3.537-7.134 4.66-10.762l-.18 8.003c.002.979-.279 1.96-1.354 2.292m-7.82.08c.085-1.904-.07-6.556-.164-9.022-.186-4.853 6.073-2.507 9.354-2.815-1.78 3.277-5.28 7.456-7.467 9.223 2.568 1.847 2.632 3.01 1.575 3 .132.005-.047 0-.047 0h.013a20.394 20.394 0 0 1-3.265-.386m-.247-11.985c-2.566-1.273-6.724-1.824-9.41-1.187-.713 3.676-.305 8.548.207 12.255.256 1.862.415 2.104 1.785 1.71 5.186-1.497 9.837 1.452 15.058.165 1.743-.43 2.43-1.335 2.471-2.92l.27-10.675c-2.673-.03-8.637-1.036-10.38.652"></path><rect width="54" height="65" x="1" y="1" stroke="#7b39ed" stroke-width="2" opacity=".721" rx="1"></rect></g></svg>
        ),
        styleWidth: "56px",
        styleHeight: "67px"
    },
    "Tabloid": {
        svg: (
            <svg xmlns="https://www.w3.org/2000/svg" width="100%" height="100%"><g fill="none" fill-rule="evenodd"><path fill="#7b39ed" d="M45.861 31.358c-.86.267-1.943.423-3.126.467.913-1.481 3.537-7.134 4.66-10.762l-.18 8.003c.002.979-.279 1.96-1.354 2.292m-7.82.08c.085-1.904-.07-6.556-.164-9.022-.186-4.853 6.073-2.507 9.354-2.815-1.78 3.277-5.28 7.456-7.467 9.223 2.568 1.847 2.632 3.01 1.575 3 .132.005-.047 0-.047 0h.013a20.394 20.394 0 0 1-3.265-.386m-.247-11.985c-2.566-1.273-6.724-1.824-9.41-1.187-.713 3.676-.305 8.548.207 12.255.256 1.862.415 2.104 1.785 1.71 5.186-1.497 9.837 1.452 15.058.165 1.743-.43 2.43-1.335 2.471-2.92l.27-10.675c-2.673-.03-8.637-1.036-10.38.652"></path><path stroke="#7b39ed" stroke-width="2" d="M1 1h75v47.5H1z" opacity=".721"></path></g></svg>
        ),
        styleWidth: "77px",
        styleHeight: "50px"
    },
    "Flyer": {
        svg: (
            <svg xmlns="https://www.w3.org/2000/svg" width="100%" height="100%"><g fill="none" fill-rule="evenodd"><rect width="30" height="62" x="1" y="1" stroke="#7b39ed" stroke-width="2" opacity=".721" rx="1"></rect><path fill="#7b39ed" d="M23.861 38.358c-.86.267-1.943.423-3.126.467.913-1.481 3.537-7.134 4.66-10.762l-.18 8.003c.002.979-.279 1.96-1.354 2.292m-7.82.08c.085-1.904-.07-6.556-.164-9.022-.186-4.853 6.073-2.507 9.354-2.815-1.78 3.277-5.28 7.456-7.467 9.223 2.568 1.847 2.632 3.01 1.575 3 .132.005-.047 0-.047 0h.013a20.394 20.394 0 0 1-3.265-.386m-.247-11.985c-2.566-1.273-6.724-1.824-9.41-1.187-.713 3.676-.305 8.548.207 12.255.256 1.862.415 2.104 1.785 1.71 5.186-1.497 9.837 1.452 15.058.165 1.743-.43 2.43-1.335 2.471-2.92l.27-10.675c-2.673-.03-8.637-1.036-10.38.652"></path></g></svg>
        ),
        styleWidth: "32px",
        styleHeight: "64px"
    },
    "Booklet": {
        svg: (
            <svg xmlns="https://www.w3.org/2000/svg" width="100%" height="100%"><g fill="none" fill-rule="evenodd"><rect width="50" height="49" x="1" y="1" stroke="#7b39ed" stroke-width="2" opacity=".721" rx="1"></rect><path fill="#7b39ed" d="M33.861 31.358c-.86.267-1.943.423-3.126.467.913-1.481 3.537-7.134 4.66-10.762l-.18 8.003c.002.979-.279 1.96-1.354 2.292m-7.82.08c.085-1.904-.07-6.556-.164-9.022-.186-4.853 6.073-2.507 9.354-2.815-1.78 3.277-5.28 7.456-7.467 9.223 2.568 1.847 2.632 3.01 1.575 3 .132.005-.047 0-.047 0h.013a20.394 20.394 0 0 1-3.265-.386m-.247-11.985c-2.566-1.273-6.724-1.824-9.41-1.187-.713 3.676-.305 8.548.207 12.255.256 1.862.415 2.104 1.785 1.71 5.186-1.497 9.837 1.452 15.058.165 1.743-.43 2.43-1.335 2.471-2.92l.27-10.675c-2.673-.03-8.637-1.036-10.38.652"></path></g></svg>
        ),
        styleWidth: "52px",
        styleHeight: "51px"
    },
    "Presentation": {
        svg: (
            <svg xmlns="https://www.w3.org/2000/svg" width="100%" height="100%"><g fill="none" fill-rule="evenodd"><rect width="52" height="68.475" x="10" y="-7" stroke="#7b39ed" stroke-width="2" opacity=".721" rx="1" transform="rotate(90 36 27.237)"></rect><path fill="#7b39ed" d="M43.861 34.358c-.86.267-1.943.423-3.126.467.913-1.481 3.537-7.134 4.66-10.762l-.18 8.003c.002.979-.279 1.96-1.354 2.292m-7.82.08c.085-1.904-.07-6.556-.164-9.022-.186-4.853 6.073-2.507 9.354-2.815-1.78 3.277-5.28 7.456-7.467 9.223 2.568 1.847 2.632 3.01 1.575 3 .132.005-.047 0-.047 0h.013a20.394 20.394 0 0 1-3.265-.386m-.247-11.985c-2.566-1.273-6.724-1.824-9.41-1.187-.713 3.676-.305 8.548.207 12.255.256 1.862.415 2.104 1.785 1.71 5.186-1.497 9.837 1.452 15.058.165 1.743-.43 2.43-1.335 2.471-2.92l.27-10.675c-2.673-.03-8.637-1.036-10.38.652"></path></g></svg>
        ),
        styleWidth: "72px",
        styleHeight: "55px"
    }
};

const permission = {
    "settings": true,
    "branding_profile": true,
    "templates": true,
    "invite_teammate": true,
    "trash": true,
    "branding": true,
    "statistics": true,
    "flipbookDetails": true,
    "flipbookEdit": true,
    "flipbookCustomize": true,
    "upgradePlan": true,
    "flipbooksFilter": true,
    "createDropdown": true,
    "createFolder": true,
    "moveToTrashFolder": true,
    "uploadFiles": true,
    "billing": true,
}

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
        case 'templateButtons':
            return templateButtons;
        case 'adminTemplateButtons':
            return adminTemplateButtons;
        case 'bookshelfButtons':
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
        case 'folders':
            return folders;
        case 'library':
            return library;
        case 'hyperlinks':
            return hyperlinks;
        case 'currency':
            return currency;
        case 'textElements':
            return textElements;
        case 'imageActions':
            return imageActions;
        case 'pageOption':
            return pageOption;
        case 'pageLayoutData':
            return pageLayoutData;
        case 'permission':
            return permission
        case 'planFeatures':
            return planFeatures;
        default:
            return [];
    }
}