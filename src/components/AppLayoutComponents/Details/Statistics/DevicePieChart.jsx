import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#8B5CF6", "#C4B5FD", "#F472B6"];
const DEVICE_LABELS = ["desktop", "mobile", "tablet"];

export default function DevicePieChart({ deviceCounts = {}, loading }) {
    const data = DEVICE_LABELS.map((type) => ({
        name: type.charAt(0).toUpperCase() + type.slice(1),
        value: deviceCounts[type] || 0,
    })).filter(d => d.value > 0);
    const total = data.reduce((sum, d) => sum + d.value, 0);

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between w-full">
                        <Skeleton className="h-6 w-32 mb-2" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Skeleton className="w-full h-64 rounded-md" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full h-full flex flex-col justify-between p-0">
            <CardHeader className="p-4 pb-0">
                <CardTitle className="text-lg">Device Usage</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center p-0">
                {data.length === 0 ? (
                    <div className="text-center text-gray-500 w-full h-full flex items-center justify-center">No device data available.</div>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={110}
                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                                >
                                    {data.map((entry, idx) => (
                                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `${value} (${((value / total) * 100).toFixed(1)}%)`} />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 