import Favicon from "../Sidebar/Branding/Personalization/Favicon";
import Header from "../Sidebar/Branding/Personalization/Header";
import Profile from "../Sidebar/Branding/Personalization/Profile";
import Social from "../Sidebar/Branding/Personalization/Social";
import SocialThumnail from "../Sidebar/Branding/Personalization/SocialThumnail";
import Footer from "../Sidebar/Branding/Personalization/Footer";
import TabPersonalization from "../Sidebar/Branding/Personalization/TabPersonalization";
import Preview from "../Sidebar/Branding/Personalization/Preview";

export default function Embed() {
    return (
        <div className="py-6 max-w-[100vw] overflow-auto space-y-8 h-full flex flex-col">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Embed New Flipbook</h1>
                <p className="text-gray-500">Choose your width and height size, responsiveness and the page where your flipbook should start. Copy the embed code and paste it in your website.</p>
            </div>
            <div className="flex max-lg:flex-wrap gap-4 lg:h-0 flex-grow overflow-auto">
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
    )
}