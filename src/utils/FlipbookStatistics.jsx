import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from "recharts"
import { format } from "date-fns";
import { Download, Eye, Clock, BarChart2 } from "lucide-react"

export default function FlipbookStatistics() {
    const generateDates = () => {
        const dates = [];
        const startDate = new Date(2025, 1, 20);
        for (let i = 0; i < 31; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            dates.push(format(currentDate, "dd MMM"));
        }
        return dates;
    };

    const allDates = generateDates();

    const generateRandomData = (max, isTime = false) => {
        return allDates.map((date) => {
            const randomValue = Math.random() * max * (Math.random() > 0.8 ? 3 : 1);

            if (isTime) {
                const totalSeconds = Math.floor(randomValue * 60);
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = Math.floor(totalSeconds % 60);
                const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

                return {
                    date,
                    value: totalSeconds,
                    displayValue: formattedTime
                };
            }

            return {
                date,
                value: Math.floor(randomValue * 10) / 10,
                displayValue: Math.floor(randomValue * 10) / 10
            };
        });
    };

    const chartData = {
        impressions: generateRandomData(4),
        views: generateRandomData(3),
        timeSpent: generateRandomData(5, true),
        downloads: generateRandomData(2)
    };

    const statsData = [
        {
            id: "impressions",
            title: "10",
            label: "Impressions",
            description: "Counted each times your flipbooks and bookshelves are loaded.",
            icon: <BarChart2 className="h-5 w-5 text-blue-600" />,
            color: "bg-blue-600",
            data: chartData.impressions,
            chartColor: "#3b82f6",
            valueFormatter: (value) => value.toFixed(1)
        },
        {
            id: "views",
            title: "6",
            label: "Views",
            description: "Counted each times a user opens and interacts with your flipbooks.",
            icon: <Eye className="h-5 w-5 text-purple-600" />,
            color: "bg-purple-600",
            data: chartData.views,
            chartColor: "#8b5cf6",
            valueFormatter: (value) => value.toFixed(1)
        },
        {
            id: "timeSpent",
            title: "00:00:28",
            label: "Average time spent",
            description: "Average duration users spend viewing your content per session.",
            icon: <Clock className="h-5 w-5 text-orange-600" />,
            color: "bg-orange-600",
            data: chartData.timeSpent,
            chartColor: "#f97316",
            valueFormatter: (value) => {
                const minutes = Math.floor(value / 60);
                const seconds = Math.floor(value % 60);
                return `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
        },
        {
            id: "downloads",
            title: "0",
            label: "Downloads",
            description: "Total number of times your flipbooks have been downloaded by users.",
            icon: <Download className="h-5 w-5 text-green-600" />,
            color: "bg-green-600",
            data: chartData.downloads,
            chartColor: "#10b981",
            valueFormatter: (value) => value.toFixed(1)
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
                    <Tabs defaultValue="impressions" className="w-full">
                        <TabsList className="max-md:w-full overflow-auto mb-6">
                            {statsData.map((stat) => (
                                <TabsTrigger
                                    key={stat.id}
                                    value={stat.id}
                                    className={`text-${stat.chartColor.replace('#', '')}`}
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
                                                interval="preserveStartEnd"
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
                </CardContent>
            </Card>
        </>
    )
}