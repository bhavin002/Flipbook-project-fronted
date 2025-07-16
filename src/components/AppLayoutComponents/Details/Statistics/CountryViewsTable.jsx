import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Chart } from "react-google-charts";

function getFlagEmoji(countryCode) {
    if (!countryCode) return countryCode;
    return countryCode
        .toUpperCase()
        .replace(/./g, char =>
            String.fromCodePoint(127397 + char.charCodeAt())
        );
}

export default function CountryViewsTable({ countryViews = [], loading }) {
    const geoChartData = [
        ["Country", "Views"],
        ...countryViews.map(row => [row.country, row.views])
    ];

    const geoChartOptions = {
        colorAxis: { colors: ['#e0f3f8', '#007bff'] },
        backgroundColor: 'transparent',
        datalessRegionColor: '#f5f5f5',
        defaultColor: '#f5f5f5',
        legend: {textStyle: {color: '#333', fontSize: 12}},
        tooltip: {textStyle: {color: '#333'}, showColorCode: true},
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Country Views</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-6 items-stretch">
                    <div className="md:w-1/2 w-full overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Country</TableHead>
                                    <TableHead>Views</TableHead>
                                    <TableHead>Percentage</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    Array.from({ length: 3 }).map((_, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                        </TableRow>
                                    ))
                                ) : countryViews.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center text-gray-500">No country data available.</TableCell>
                                    </TableRow>
                                ) : (
                                    countryViews.map((row, idx) => (
                                        <TableRow key={row.country || idx}>
                                            <TableCell>
                                                {getFlagEmoji(row.country)} {row.country}
                                            </TableCell>
                                            <TableCell>{row.views}</TableCell>
                                            <TableCell>{row.percentage?.toFixed(2)}%</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="md:w-1/2 w-full min-w-[300px] h-[400px] flex items-center justify-center">
                        <Chart
                            chartEvents={[
                                {
                                    eventName: "select",
                                    callback: ({ chartWrapper }) => {
                                        const chart = chartWrapper.getChart();
                                        const selection = chart.getSelection();
                                        if (selection.length === 0) return;
                                    },
                                },
                            ]}
                            chartType="GeoChart"
                            width="100%"
                            height="100%"
                            data={geoChartData}
                            options={geoChartOptions}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 