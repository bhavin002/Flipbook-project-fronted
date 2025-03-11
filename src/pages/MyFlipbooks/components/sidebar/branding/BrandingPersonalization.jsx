import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Favicon from "./personalization/Favicon";
import Header from "./personalization/Header";
import Profile from "./personalization/Profile";
import Social from "./personalization/Social";
import SocialThumnail from "./personalization/SocialThumnail";
import Footer from "./personalization/Footer";
export default function BrandingPersonalization() {
    return (
        <>
            <div className="mx-auto p-6 max-w-[100vw] overflow-auto">
                <div className="p-6 mb-8 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                    <h1 className="text-2xl font-bold mb-2">Personalize your profile</h1>
                    <p className="text-gray-500">Add your logo, header image and color, and configure your social and footer links.</p>
                </div>
                <div className="flex gap-4">
                    <div className="w-full space-y-4">
                        <Favicon />
                        <Header />
                        <Profile />
                        <Social />
                        <SocialThumnail />
                        <Footer />
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Curabitur blandit tempus porttitor.</p>
                                <br />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>

    )
}