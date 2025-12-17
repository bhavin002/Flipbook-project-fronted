import Favicon from "../../components/AppLayoutComponents/Sidebar/Branding/Personalization/Favicon";
import Header from "../../components/AppLayoutComponents/Sidebar/Branding/Personalization/Header";
import Profile from "../../components/AppLayoutComponents/Sidebar/Branding/Personalization/Profile";
import Social from "../../components/AppLayoutComponents/Sidebar/Branding/Personalization/Social";
// import SocialThumnail from "../../components/AppLayoutComponents/Sidebar/Branding/Personalization/SocialThumnail";
import Footer from "../../components/AppLayoutComponents/Sidebar/Branding/Personalization/Footer";
import Preview from "../../components/AppLayoutComponents/Sidebar/Branding/Personalization/Preview";
import TabPersonalization from "../../components/AppLayoutComponents/Sidebar/Branding/Personalization/TabPersonalization";
import { BrandingProvider, useBranding } from "@/context/BrandingContext";

const BrandingContent = () => {
    const { isLoading } = useBranding();

    return (
        <div className="p-6 max-w-[100vw] overflow-auto space-y-4 pt-0 flex-1 flex flex-col max-md:max-h-[calc(100vh-156px-80px)]">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Personalize your profile</h1>
                <p className="text-gray-500">
                    Add your logo, header image and color, and configure your social and footer links.
                </p>
            </div>
            {isLoading ? (
                <div className="flex max-lg:flex-wrap gap-4">
                    <div className="lg:w-[40%] hidden lg:block space-y-4 lg:h-full">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="animate-pulse bg-gray-200 h-48 rounded-lg"
                            ></div>
                        ))}
                    </div>
                    <div className="lg:w-[60%] sticky top-0 h-fit">
                        <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>
                    </div>
                </div>
            ) : (
                <div className="flex max-lg:flex-wrap gap-4">
                    <div className="lg:w-[40%] hidden lg:block space-y-4 lg:h-full">
                        <Favicon />
                        <Header />
                        <Profile />
                        <Social />
                        {/* <SocialThumnail /> */}
                        <Footer />
                    </div>
                    <TabPersonalization />
                    <div className="lg:w-[60%] sticky top-0 h-fit">
                        <Preview />
                    </div>
                </div>
            )}
        </div>
    );
};

export default function BrandingPersonalization() {
    return (
        <BrandingProvider>
            <BrandingContent />
        </BrandingProvider>
    );
}