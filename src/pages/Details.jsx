import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpenText, Code, Mail, Image, QrCode, ChartPie, Link } from 'lucide-react';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DetailsTab from "../components/AppLayoutComponents/Details/DetailsTab"
import Embed from "../components/AppLayoutComponents/Details/Embed"
import SendEmail from "../components/AppLayoutComponents/Details/SendEmail"
import DownloadQR from "../components/AppLayoutComponents/Details/DownloadQR"
import Statistics from "../components/AppLayoutComponents/Details/Statistics"
import { useEffect, useState } from "react";
import { GetFlipbookDetailsApi } from "@/service/flipbook.publish.service";
import { toast } from "sonner";

export default function Details() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [flipbookDetails, setFlipbookDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getFlipbookData = async () => {
            try {
                setIsLoading(true);
                const response = await GetFlipbookDetailsApi(id);
                if (!response.data.isPublished) {
                    navigate("/myflipbooks")
                }
                setFlipbookDetails(response.data);
            } catch (error) {
                toast.error("Error fetching flipbook details", {
                    description: error.message || "Oops! Something went wrong."
                })
            } finally {
                setIsLoading(false)
            }
        }
        getFlipbookData();
    }, [id]);

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
                    <DetailsTab
                        flipbookId={id}
                        isLoading={isLoading}
                        setFlipbookDetails={setFlipbookDetails}
                        flipbookDetails={flipbookDetails}
                    />
                </TabsContent>
                <TabsContent value="embed" className="h-full overflow-y-auto">
                    <Embed flipbookId={id} flipbookDetails={flipbookDetails} />
                </TabsContent>
                <TabsContent value="send-email" className="h-full overflow-y-auto">
                    <SendEmail flipbookId={id} flipbookDetails={flipbookDetails} />
                </TabsContent>
                <TabsContent value="download-qr" className="h-full overflow-y-auto">
                    <DownloadQR flipbookId={id} />
                </TabsContent>
                <TabsContent value="stats" className="h-full overflow-y-auto">
                    <Statistics flipbookId={id} flipbookDetails={flipbookDetails} />
                </TabsContent>
            </Tabs>
        </div>
    );
}