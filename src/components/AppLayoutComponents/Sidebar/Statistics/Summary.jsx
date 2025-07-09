import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Eye, BarChart2 } from "lucide-react"
import FlipbookStatistics from "@/utils/FlipbookStatistics"

export default function Summary() {
    const statsData = [
        {
            id: "impressions",
            title: "10",
            label: "Impressions",
            description: "Counted each times your flipbooks and bookshelves are loaded.",
            icon: <BarChart2 className="h-5 w-5 text-blue-600" />,
            color: "bg-blue-600",
        },
        {
            id: "views",
            title: "6",
            label: "Views",
            description: "Counted each times a user opens and interacts with your flipbooks.",
            icon: <Eye className="h-5 w-5 text-purple-600" />,
            color: "bg-purple-600",
        },
        {
            id: "downloads",
            title: "0",
            label: "Downloads",
            description: "Total number of times your flipbooks have been downloaded by users.",
            icon: <Download className="h-5 w-5 text-green-600" />,
            color: "bg-green-600",
        }
    ]

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between w-full">
                        <CardTitle>Summary</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {statsData.map((stat, index) => (
                        <TooltipProvider key={index}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Card className="h-full transition-all duration-200 hover:shadow-md cursor-pointer">
                                        <CardContent className="p-0 h-full">
                                            <div className="flex h-full">
                                                <div className={`w-1.5 ${stat.color}`}></div>
                                                <div className="p-5 flex flex-1 items-center">
                                                    <div className="flex items-center gap-3">
                                                        {stat.icon}
                                                        <div className="flex flex-col">
                                                            <h3 className="text-xl font-bold text-gray-800">{stat.title}</h3>
                                                            <p className="text-gray-500 text-xs">{stat.label}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-xs p-2 bg-white text-gray-800 border border-gray-200 shadow-md rounded-md">
                                    <p className="text-sm">{stat.description}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))}
                </CardContent>
            </Card>
            <FlipbookStatistics />
        </>
    )
}