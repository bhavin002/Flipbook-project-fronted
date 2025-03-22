import Favicon from "./Personalization/Favicon";
import Header from "./Personalization/Header";
import Profile from "./Personalization/Profile";
import Social from "./Personalization/Social";
import SocialThumnail from "./Personalization/SocialThumnail";
import Footer from "./Personalization/Footer";
import Preview from "./Personalization/Preview";
import TabPersonalization from "./Personalization/TabPersonalization";
export default function BrandingPersonalization() {
    return (
        <>
            <div className="flex flex-col max-w-[100vw] overflow-auto max-md:p-6 md:m-6 h-full space-y-4">
                <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                    <h1 className="text-2xl font-bold mb-2">Personalize your profile</h1>
                    <p className="text-gray-500">Add your logo, header image and color, and configure your social and footer links.</p>
                </div>
                <div className="flex max-lg:flex-wrap gap-4">
                    <div className="lg:w-[40%] hidden lg:block space-y-4 lg:h-full">
                        <Favicon />
                        <Header />
                        <Profile />
                        <Social />
                        <SocialThumnail />
                        <Footer />
                    </div>
                    <TabPersonalization />
                    <div className="lg:w-[60%] sticky top-0 h-fit">
                        <Preview />
                    </div>
                </div>
            </div>
        </>

    )
}