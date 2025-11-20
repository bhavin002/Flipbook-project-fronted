import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Eye, BarChart2, ShoppingCart } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function FlipbookSummary({ viewsCount = 0, impressionCount = 0, orderCount = 0, orderValues = [], loadingStats }) {
    // Ensure orderValues is always an array for backward compatibility
    const normalizedOrderValues = Array.isArray(orderValues)
        ? orderValues
        : orderValues && typeof orderValues === 'object'
            ? [orderValues]
            : [];

    const statsData = [
        {
            id: "impressions",
            title: impressionCount,
            label: "Impressions",
            description: "Counted each times your flipbooks and bookshelves are loaded.",
            icon: <BarChart2 className="h-5 w-5 text-blue-600" />,
            color: "bg-blue-600",
        },
        {
            id: "views",
            title: viewsCount,
            label: "Views",
            description: "Counted each times a user opens and interacts with your flipbooks.",
            icon: <Eye className="h-5 w-5 text-purple-600" />,
            color: "bg-purple-600",
        },
    ]

    if (loadingStats) {
        // Simple box skeleton layout (like FlipbookStatistics)
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-32 mb-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="w-full h-64 rounded-md" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between w-full">
                    <CardTitle>Summary</CardTitle>
                    <button className="text-blue-600 text-sm hover:underline">Download CSV</button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-2/3 lg:w-3/4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}