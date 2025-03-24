import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpenText, Code, Mail, Image, QrCode, ChartPie, Link } from 'lucide-react';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DetailsTab from "../components/Details/DetailsTab"
import Embed from "../components/Details/Embed"
import SendEmail from "../components/Details/SendEmail"
import DownloadQR from "../components/Details/DownloadQR"
import TrackableLinks from "../components/Details/TrackableLinks"
import Statistics from "../components/Details/Statistics"

export default function Details() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    const pathParts = location.pathname.split('/');
    const defaultTab = pathParts[1] || 'details';
    
    const handleTabChange = (value) => {
        navigate(`/${value}/${id}`);
    };
    
    return (
        <div className="p-6 max-md:w-[100vw] h-full overflow-y-hidden">
            <Tabs 
                defaultValue={defaultTab} 
                value={defaultTab}
                onValueChange={handleTabChange}
                className="flex flex-col h-full"
            >
                <TabsList className="overflow-x-auto max-md:w-full w-fit justify-start overflow-y-hidden">
                    <TabsTrigger className="py-2 flex flex-col lg:flex-row lg:items-center lg:gap-2" value="details">
                        <BookOpenText className="w-5 h-5" />
                        <span className="text-xs mt-1 lg:mt-0">Details</span>
                    </TabsTrigger>
                    <TabsTrigger className="py-2 flex flex-col lg:flex-row lg:items-center lg:gap-2" value="embed">
                        <Code className="w-5 h-5" />
                        <span className="text-xs mt-1 lg:mt-0">Embed</span>
                    </TabsTrigger>
                    <TabsTrigger className="py-2 flex flex-col lg:flex-row lg:items-center lg:gap-2" value="trackable-links">
                        <Link className="w-5 h-5" />
                        <span className="text-xs mt-1 lg:mt-0">Trackable links</span>
                    </TabsTrigger>
                    <TabsTrigger className="py-2 flex flex-col lg:flex-row lg:items-center lg:gap-2" value="stats">
                        <ChartPie className="w-5 h-5" />
                        <span className="text-xs mt-1 lg:mt-0">Statistics</span>
                    </TabsTrigger>
                    <TabsTrigger className="py-2 flex flex-col lg:flex-row lg:items-center lg:gap-2" value="send-email">
                        <Mail className="w-5 h-5" />
                        <span className="text-xs mt-1 lg:mt-0">Send email</span>
                    </TabsTrigger>
                    <TabsTrigger className="py-2 flex flex-col lg:flex-row lg:items-center lg:gap-2" value="download-gif" disabled>
                        <Image className="w-5 h-5" />
                        <span className="text-xs mt-1 lg:mt-0">Download GIF</span>
                    </TabsTrigger>
                    <TabsTrigger className="py-2 flex flex-col lg:flex-row lg:items-center lg:gap-2" value="download-qr">
                        <QrCode className="w-5 h-5" />
                        <span className="text-xs mt-1 lg:mt-0">Download QR</span>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="h-full overflow-y-auto">
                    <DetailsTab/>
                </TabsContent>
                <TabsContent value="embed" className="h-full overflow-y-auto">
                    <Embed/>
                </TabsContent>
                <TabsContent value="send-email" className="h-full overflow-y-auto">
                    <SendEmail/>
                </TabsContent>
                <TabsContent value="download-qr" className="h-full overflow-y-auto">
                    <DownloadQR/>
                </TabsContent>
                <TabsContent value="trackable-links" className="h-full overflow-y-auto">
                    <TrackableLinks/>
                </TabsContent>
                <TabsContent value="stats" className="h-full overflow-y-auto">
                    <Statistics/>
                </TabsContent>
            </Tabs>
        </div>
    );
}