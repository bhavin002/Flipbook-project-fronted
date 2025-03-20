import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {BookOpenText, Code, Mail, Image, QrCode, ChartPie } from 'lucide-react';
import DetailsTab from "./Details/DetailsTab";
import Embed from "./Details/Embed";

export default function Details() {
    return (
        <div className="px-6 max-md:w-[100vw] h-full overflow-y-hidden">
            <Tabs defaultValue="details" className="flex flex-col h-full">
                <TabsList className="overflow-x-auto max-md:w-full w-fit justify-start">
                    <TabsTrigger className="py-2  flex flex-col md:flex-row md:items-center md:gap-2" value="details">
                        <BookOpenText className="w-5 h-5" />
                        <span className="text-xs mt-1 md:mt-0">Details</span>
                    </TabsTrigger>
                    <TabsTrigger className="py-2 flex flex-col md:flex-row md:items-center md:gap-2" value="embed">
                        <Code className="w-5 h-5" />
                        <span className="text-xs mt-1 md:mt-0">Embed</span>
                    </TabsTrigger>
                    <TabsTrigger className="py-2 flex flex-col md:flex-row md:items-center md:gap-2" value="statistics">
                        <ChartPie className="w-5 h-5" />
                        <span className="text-xs mt-1 md:mt-0">Statistics</span>
                    </TabsTrigger>
                    <TabsTrigger className="py-2 flex flex-col md:flex-row md:items-center md:gap-2" value="send-email">
                        <Mail className="w-5 h-5" />
                        <span className="text-xs mt-1 md:mt-0">Send email</span>
                    </TabsTrigger>
                    <TabsTrigger className="py-2 flex flex-col md:flex-row md:items-center md:gap-2" value="download-gif">
                        <Image className="w-5 h-5" />
                        <span className="text-xs mt-1 md:mt-0">Download GIF</span>
                    </TabsTrigger>
                    <TabsTrigger className="py-2 flex flex-col md:flex-row md:items-center md:gap-2" value="download-qr">
                        <QrCode className="w-5 h-5" />
                        <span className="text-xs mt-1 md:mt-0">Download QR</span>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="h-full overflow-y-auto">
                    <DetailsTab/>
                </TabsContent>
                <TabsContent value="embed" className="flex-grow">
                    <Embed/>
                </TabsContent>
            </Tabs>
        </div>
    );
}