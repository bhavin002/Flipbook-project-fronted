import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Earth, PanelTop, CircleUser, Link2, GalleryThumbnails, PanelBottom } from 'lucide-react';
import Favicon from "./Favicon";
import Header from "./Header";
import Profile from "./Profile";
import Social from "./Social";
import SocialThumnail from "./SocialThumnail";
import Footer from "./Footer";

export default function TabPersonalization() {
    return (
        <Tabs className="w-full lg:hidden" defaultValue="favicon">
            <TabsList className="w-full flex justify-between overflow-auto">
                <TabsTrigger className="py-2 flex flex-col items-center" value="favicon">
                    <Earth className="w-5 h-5" />
                    <span className="text-xs mt-1">Favicon</span>
                </TabsTrigger>
                <TabsTrigger className="py-2 flex flex-col items-center" value="header">
                    <PanelTop className="w-5 h-5" />
                    <span className="text-xs mt-1">Header</span>
                </TabsTrigger>
                <TabsTrigger className="py-2 flex flex-col items-center" value="profile">
                    <CircleUser className="w-5 h-5" />
                    <span className="text-xs mt-1">Profile</span>
                </TabsTrigger>
                <TabsTrigger className="py-2 flex flex-col items-center" value="social-media">
                    <Link2 className="w-5 h-5" />
                    <span className="text-xs mt-1">Social</span>
                </TabsTrigger>
                <TabsTrigger className="py-2 flex flex-col items-center" value="social-media-thumbnail">
                    <GalleryThumbnails className="w-5 h-5" />
                    <span className="text-xs mt-1">Thumbnail</span>
                </TabsTrigger>
                <TabsTrigger className="py-2 flex flex-col items-center" value="footer">
                    <PanelBottom className="w-5 h-5" />
                    <span className="text-xs mt-1">Footer</span>
                </TabsTrigger>
            </TabsList>
            <TabsContent value="favicon">
                <Favicon />
            </TabsContent>
            <TabsContent value="header">
                <Header />
            </TabsContent>
            <TabsContent value="profile">
                <Profile />
            </TabsContent>
            <TabsContent value="social-media">
                <Social />
            </TabsContent>
            <TabsContent value="social-media-thumbnail">
                <SocialThumnail />
            </TabsContent>
            <TabsContent value="footer">
                <Footer />
            </TabsContent>
        </Tabs>
    )
}