export const flipbookType = {
    FLIPBOOK: 0,
    TEMPLATE: 1
}

export const flipbookVisibility = {
    PUBLIC: 0,
    PRIVATE: 1,
    PASSWORD: 2,
    READERS_ONLY: 3
}

export const flipbookStatus = {
    NOT_PUBLISHED: 0,
    PUBLISHED: 1,
    DRAFT: 2
}

export const flipbookPreviewFieldKey = {
    workspaceId: 0,
    flipbookId: 1,
    brandLogoId: 2,
    logoLink: 3,
    backgroundColor: 4,
    backgroundColorHash: 5,
    backgroundImage: 6,
    backgroundImageBucketName: 7,
    backgroundImageAwsKey: 8,
    backgroundImageURL: 9,
    playerAccentColorHash: 10,
    playerSkin: 11,
    pageTransition: 12,
    layoutStyle: 13,
    tooltipLanguage: 14,
    automaticTransition: 15,
    flipSound: 16,
    rightToLeftOrientation: 17,
    shadowOnPages: 18,
    animateInteraction: 19,
    highlightsOnLink: 20,
    controlInNormalMode: 21,
    navigationBar: 22,
    navigationArrow: 23,
    shareOptions: 24,
    pageOverview: 25,
    allowFullScreen: 26,
    downloadPDF: 27,
    printPDF: 28,
    search: 29,
    backgroundAudio: 30,
    backgroundAudioFile: 31,
    backgroundAudioLink: 32,
    backgroundAudioAwsKey: 33,
    backgroundAudioBucketName: 34,
    isTableOfContent: 35,
    tableOfContents: 36,
    isLeadForm: 37,
    leadForm: 38,
    automaticTransitionDelay: 39,
    isAudioLoop: 40,
    isAutoPlay: 41,
    backgroundImageType: 42,
    backgroundImageName: 43,
    backgroundAudioFileName: 44,
    showShoppingList: 45,
}

export const BackgroundColorType = {
    TRANSPARENT: 0,
    SOLID: 1,
    IMAGE: 2,
}

export const PlayerSkin = {
    CLASSIC: 0,
    MODERN: 1,
}

export const PageTransition = {
    FLIP: 0,
    SLIDE: 1,
    SCROLL: 2,
}

export const LayoutStyle = {
    SMART_VIEW: 0,
    ONE_PAGE: 1,
    TWO_PAGE: 2,
}

export const BackgroundImageType = {
    SCALE_CROP: 0,
    CENTER: 1,
    TILE: 2,
}

export const ShopAppearance = {
    SHOP_BAG: 0,
    SHOP_CART: 1,
    SHOP_HEART: 2,
    SHOP_STAR: 3,
}

export const CheckoutType = {
    0: "Email",
    1: "Whatsapp",
    2: "Slack",
}

export const VisibilityType = {
    0: "Public",
    1: "Private",
    2: "Password",
    3: "Readers only"
}

export const DeviceType = {
    "MOBILE": 1,
    "TABLET": 2,
    "DESKTOP": 3
}

export const tokenStatus = {
    READY_TO_ACCEPT: 0,
    NEED_TO_REGISTER: 1,
    ALREADY_REGISTERED: 2,
    ERROR: 3
}