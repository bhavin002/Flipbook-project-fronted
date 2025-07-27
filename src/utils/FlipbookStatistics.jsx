import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from "recharts"
import { Skeleton } from "@/components/ui/skeleton";
import { parseISO, format, addDays, isAfter, differenceInDays } from "date-fns";

export default function FlipbookStatistics({ statsData = [], dates, loading }) {
    // Helper: Generate all dates between from and to (inclusive)
    function getDateRange(from, to) {
        const result = [];
        let current = parseISO(from);
        const end = parseISO(to);
        while (!isAfter(current, end)) {
            result.push(format(current, "yyyy-MM-dd"));
            current = addDays(current, 1);
        }
        return result;
    }

    // Helper to robustly convert input to yyyy-MM-dd string
    function toDateString(val) {
        if (!val) return format(new Date(), "yyyy-MM-dd");
        if (typeof val === "string") return val.slice(0, 10);
        if (val instanceof Date) return format(val, "yyyy-MM-dd");
        try {
            return format(new Date(val), "yyyy-MM-dd");
        } catch {
            return format(new Date(), "yyyy-MM-dd");
        }
    }

    const from = toDateString(dates?.from);
    const to = toDateString(dates?.to);
    const allDates = getDateRange(from, to);
    const statsMap = Object.fromEntries(statsData.map(d => [d.date, d]));
    const chartData = allDates.map(date => ({
        date,
        impressions: statsMap[date]?.impressions ?? 0,
        views: statsMap[date]?.views ?? 0,
        downloads: statsMap[date]?.downloads ?? 0,
    }));

    // Calculate interval for X-axis ticks
    const totalDays = differenceInDays(parseISO(to), parseISO(from)) + 1;
    let tickInterval = 1;
    if (totalDays > 365) tickInterval = 30; // yearly: show monthly
    else if (totalDays > 180) tickInterval = 14; // half-year: biweekly
    else if (totalDays > 60) tickInterval = 7; // 2+ months: weekly
    else if (totalDays > 14) tickInterval = 2; // 2+ weeks: every 2 days
    // else: daily

    const statsTabs = [
        {
            id: "impressions",
            label: "Impressions",
            color: "#3b82f6",
            valueFormatter: (value) => Math.round(value),
        },
        {
            id: "views",
            label: "Views",
            color: "#8b5cf6",
            valueFormatter: (value) => Math.round(value),
        },
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
                            {statsTabs.map((stat) => (
                                <TabsTrigger
                                    key={stat.id}
                                    value={stat.id}
                                    className={`text-[${stat.color}]`}
                                >
                                    {stat.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {statsTabs.map((stat) => (
                            <TabsContent key={stat.id} value={stat.id}>
                                <div className="h-64 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={chartData.map(item => ({
                                                name: item.date,
                                                [stat.id]: item[stat.id]
                                            }))}
                                            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                                        >
                                            <defs>
                                                <linearGradient id={`color${stat.id}`} x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor={stat.color} stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor={stat.color} stopOpacity={0.1} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis
                                                dataKey="name"
                                                tick={{ fontSize: 12 }}
                                                tickLine={false}
                                                axisLine={{ stroke: '#E5E7EB' }}
                                                tickFormatter={(value) => {
                                                    if (totalDays > 365) {
                                                        return format(parseISO(value), "MMM yyyy");
                                                    } else if (totalDays > 60) {
                                                        return format(parseISO(value), "dd MMM");
                                                    } else {
                                                        return format(parseISO(value), "dd MMM");
                                                    }
                                                }}
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
                                                stroke={stat.color}
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
    )
}