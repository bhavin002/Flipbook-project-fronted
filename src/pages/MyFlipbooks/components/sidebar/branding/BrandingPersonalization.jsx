import Favicon from "./personalization/Favicon";
import Header from "./personalization/Header";
import Profile from "./personalization/Profile";
import Social from "./personalization/Social";
import SocialThumnail from "./personalization/SocialThumnail";
import Footer from "./personalization/Footer";
import Preview from "./personalization/Preview";
import TabPersonalization from "./personalization/TabPersonalization";
export default function BrandingPersonalization() {
    return (
        <>
            <div className="flex flex-col max-w-[100vw] overflow-auto p-6 h-full">
                <div className="p-6 mb-8 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                    <h1 className="text-2xl font-bold mb-2">Personalize your profile</h1>
                    <p className="text-gray-500">Add your logo, header image and color, and configure your social and footer links.</p>
                </div>
                <div className="flex max-lg:flex-wrap gap-4 lg:h-0 flex-grow overflow-auto">
                    <div className="lg:w-[40%] hidden lg:block space-y-4 lg:h-full overflow-auto">
                        <Favicon />
                        <Header />
                        <Profile />
                        <Social />
                        <SocialThumnail />
                        <Footer />
                    </div>
                    <TabPersonalization />
                    <div className="lg:w-[60%] lg:h-full overflow-auto">
                        <Preview />
                    </div>
                </div>
            </div>
        </>

    )
}