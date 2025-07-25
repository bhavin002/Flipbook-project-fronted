import Customize from "@/components/ShelfLayoutComponents/Details/Customize";
import DetailsTab from "@/components/ShelfLayoutComponents/Details/DetailsTab";
import DownloadQR from "@/components/ShelfLayoutComponents/Details/DownloadQR";
import Embed from "@/components/ShelfLayoutComponents/Details/Embed";
import SendEmail from "@/components/ShelfLayoutComponents/Details/SendEmail";
import Statistics from "@/components/ShelfLayoutComponents/Details/Statistics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpenText, Code, Mail, Image, QrCode, ChartPie } from 'lucide-react';
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function BookShelfDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const pathParts = location.pathname.split('/');
    const defaultTab = pathParts[2] || 'details';

    const handleTabChange = (value) => {
        navigate(`/shelf/${value}/${id}`);
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
                    <TabsTrigger className="py-2 flex flex-col lg:flex-row lg:items-center lg:gap-2" value="customize">
                        <BookOpenText className="w-5 h-5" />
                        <span className="text-xs mt-1 lg:mt-0">Customize</span>
                    </TabsTrigger>
                    <TabsTrigger className="py-2 flex flex-col lg:flex-row lg:items-center lg:gap-2" value="embed">
                        <Code className="w-5 h-5" />
                        <span className="text-xs mt-1 lg:mt-0">Embed</span>
                    </TabsTrigger>
                    <TabsTrigger className="py-2 flex flex-col lg:flex-row lg:items-center lg:gap-2" value="stats">
                        <ChartPie className="w-5 h-5" />
                        <span className="text-xs mt-1 lg:mt-0">Statistics</span>
                    </TabsTrigger>
                    <TabsTrigger className="py-2 flex flex-col lg:flex-row lg:items-center lg:gap-2" value="send-email">
                        <Mail className="w-5 h-5" />
                        <span className="text-xs mt-1 lg:mt-0">Send email</span>
                    </TabsTrigger>
                    <TabsTrigger className="py-2 flex flex-col lg:flex-row lg:items-center lg:gap-2" value="download-qr">
                        <QrCode className="w-5 h-5" />
                        <span className="text-xs mt-1 lg:mt-0">Download QR</span>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="h-full overflow-y-auto">
                    <DetailsTab flipbookId={id} />
                </TabsContent>
                <TabsContent value="customize" className="h-full overflow-y-auto">
                    <Customize flipbookId={id}/>
                </TabsContent>
                <TabsContent value="embed" className="h-full overflow-y-auto">
                    <Embed flipbookId={id}/>
                </TabsContent>
                <TabsContent value="send-email" className="h-full overflow-y-auto">
                    <SendEmail />
                </TabsContent>
                <TabsContent value="download-qr" className="h-full overflow-y-auto">
                    <DownloadQR flipbookId={id} />
                </TabsContent>
                <TabsContent value="stats" className="h-full overflow-y-auto">
                    <Statistics flipbookId={id} />
                </TabsContent>
            </Tabs>
        </div>
    );
}