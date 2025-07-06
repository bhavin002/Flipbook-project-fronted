import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from "recharts"
import { format, parseISO, addDays, isBefore, isEqual } from "date-fns";
import { Download, Eye, BarChart2 } from "lucide-react"
import { GetLastMonthFlipbookStatsApi } from "@/service/flipbook.publish.service";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function FlipbookStatistics({ flipbookId }) {
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState({
        impressions: [],
        views: [],
        downloads: []
    });

    // Helper to generate all dates between start and end (inclusive)
    const generateDateRange = (start, end) => {
        const range = [];
        let current = parseISO(start);
        const endDate = parseISO(end);
        while (isBefore(current, endDate) || isEqual(current, endDate)) {
            range.push(format(current, "yyyy-MM-dd"));
            current = addDays(current, 1);
        }
        return range;
    };

    useEffect(() => {
        const getFlipbookStats = async () => {
            try {
                setLoading(true);
                const response = await GetLastMonthFlipbookStatsApi(flipbookId)
                const { stats, startDate, endDate } = response.data;
                const allDates = generateDateRange(startDate, endDate);
                // Map stats by date for quick lookup
                const statsByDate = {};
                stats.forEach(s => {
                    statsByDate[s.date] = s;
                });
                // Build chart data arrays
                const impressions = [];
                const views = [];
                const downloads = [];
                allDates.forEach(date => {
                    const stat = statsByDate[date] || { impressions: 0, views: 0, downloads: 0 };
                    impressions.push({ date: format(parseISO(date), "dd MMM"), value: stat.impressions, displayValue: stat.impressions });
                    views.push({ date: format(parseISO(date), "dd MMM"), value: stat.views, displayValue: stat.views });
                    downloads.push({ date: format(parseISO(date), "dd MMM"), value: stat.downloads, displayValue: stat.downloads });
                });
                setChartData({ impressions, views, downloads });
            } catch (error) {
                toast.error("Failed to fetch stats", {
                    description: error.message
                })
            } finally {
                setLoading(false);
            }
        }
        if (!flipbookId) return;
        getFlipbookStats();
    }, [flipbookId]);

    const statsData = [
        {
            id: "impressions",
            title: chartData.impressions.reduce((sum, d) => sum + d.value, 0).toString(),
            label: "Impressions",
            description: "Counted each times your flipbooks and bookshelves are loaded.",
            icon: <BarChart2 className="h-5 w-5 text-blue-600" />,
            color: "bg-blue-600",
            data: chartData.impressions,
            chartColor: "#3b82f6",
            valueFormatter: (value) => Math.round(value)
        },
        {
            id: "views",
            title: chartData.views.reduce((sum, d) => sum + d.value, 0).toString(),
            label: "Views",
            description: "Counted each times a user opens and interacts with your flipbooks.",
            icon: <Eye className="h-5 w-5 text-purple-600" />,
            color: "bg-purple-600",
            data: chartData.views,
            chartColor: "#8b5cf6",
            valueFormatter: (value) => Math.round(value)
        },
        {
            id: "downloads",
            title: chartData.downloads.reduce((sum, d) => sum + d.value, 0).toString(),
            label: "Downloads",
            description: "Total number of times your flipbooks have been downloaded by users.",
            icon: <Download className="h-5 w-5 text-green-600" />,
            color: "bg-green-600",
            data: chartData.downloads,
            chartColor: "#10b981",
            valueFormatter: (value) => Math.round(value)
        }
    ];

    const CustomTooltip = ({ active, payload, label, valueFormatter }) => {
        if (active && payload && payload.length) {
            const value = payload[0].value;
            const formattedValue = valueFormatter ? valueFormatter(value) : value;

            return (
                <div className="bg-white p-3 shadow-md rounded-md border border-gray-100">
                    <p className="font-medium">{label}</p>
                    <p className="text-sm text-gray-600">
                        {`${payload[0].name}: ${formattedValue}`}
                    </p>
                </div>
            );
        }
        return null;
    };
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Flipbook statistics</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="py-2">
                            <Skeleton className="w-full h-10 mb-6 rounded-md" />
                            <Skeleton className="w-full h-64 rounded-md" />
                        </div>
                    ) : (
                        <Tabs defaultValue="impressions" className="w-full">
                            <TabsList className="max-md:w-full overflow-auto mb-6">
                                {statsData.map((stat) => (
                                    <TabsTrigger
                                        key={stat.id}
                                        value={stat.id}
                                        className={`text-[${stat.chartColor}]`}
                                    >
                                        {stat.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {statsData.map((stat) => (
                                <TabsContent key={stat.id} value={stat.id}>
                                    <div className="h-64 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart
                                                data={stat.data.map(item => ({
                                                    name: item.date,
                                                    [stat.id]: item.value
                                                }))}
                                                margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                                            >
                                                <defs>
                                                    <linearGradient id={`color${stat.id}`} x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor={stat.chartColor} stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor={stat.chartColor} stopOpacity={0.1} />
                                                    </linearGradient>
                                                </defs>
                                                <XAxis
                                                    dataKey="name"
                                                    tick={{ fontSize: 12 }}
                                                    tickLine={false}
                                                    axisLine={{ stroke: '#E5E7EB' }}
                                                    interval={0}
                                                    tickFormatter={(value, index) => (index % 2 === 0 ? value : '')}
                                                />
                                                <YAxis
                                                    tick={{ fontSize: 12 }}
                                                    tickLine={false}
                                                    axisLine={{ stroke: '#E5E7EB' }}
                                                    tickFormatter={stat.valueFormatter}
                                                />
                                                <RechartsTooltip
                                                    content={(props) => (
                                                        <CustomTooltip {...props} valueFormatter={stat.valueFormatter} />
                                                    )}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey={stat.id}
                                                    stroke={stat.chartColor}
                                                    fillOpacity={1}
                                                    fill={`url(#color${stat.id})`}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    )}
                </CardContent>
            </Card>
        </>
    )
}