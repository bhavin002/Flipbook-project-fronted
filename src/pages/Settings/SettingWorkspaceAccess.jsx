import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getData } from '@/utils/datas';

export default function SettingWorkspaceAccess() {
    const historyData = getData('historyData');

    return (
        <div className="p-6 max-w-[100vw] overflow-auto space-y-4 pt-0">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Workspace access</h1>
                <p className="text-gray-500">Temporarily allow FlipDrag access to your workspace.</p>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Give FlipDrag access to your account</CardTitle>
                    <CardDescription>
                        We may need to temporarily access your account to diagnose and resolve a customer support issue you've raised. Expires after 30 days.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" className="text-red-500 hover:text-red-500">
                        Revoke FlipDrag access
                    </Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>FlipDrag access approval history</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/2">Approved on</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {historyData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium text-gray-700">
                                        {item.approvedOn}
                                    </TableCell>
                                    <TableCell className={item.isActive ? "text-green-500" : "text-gray-500"}>
                                        {item.status}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}