import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import EditBillingDetailsDialog from "./Invoices/EditBillingDetailsDialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function SettingBillingInvoices() {
    const invoices = [
        { date: "Mar 16, 2025", amount: "$250.00", status: "Unpaid" },
        { date: "Feb 16, 2025", amount: "$250.00", status: "Paid" },
        { date: "Jan 16, 2025", amount: "$250.00", status: "Paid" },
        { date: "Dec 16, 2024", amount: "$350.00", status: "Unpaid" },
        { date: "Nov 16, 2024", amount: "$250.00", status: "Paid" },
    ];

    const getStatusBadgeClasses = (status) => {
        return status === "Paid"
            ? "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
            : "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800";
    };

    return (
        <div className="p-6 max-w-[100vw] overflow-auto space-y-4">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Invoices</h1>
                <p className="text-gray-500">Update your billing info, view transactions and download invoices.</p>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Billing info</CardTitle>
                    <CardDescription>
                        Billing details
                    </CardDescription>
                    <CardContent className="p-0">
                        <p className="text-sm  mt-2">
                            D-504,<br />
                            Gopinathji residency,<br />
                            kosad,<br />
                            surat - 394107.
                        </p>
                    </CardContent>
                    <CardFooter className="p-0">
                        <EditBillingDetailsDialog />
                    </CardFooter>
                </CardHeader>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>All Invoices</CardTitle>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-1/3">Date</TableHead>
                                    <TableHead className="w-1/3">Amount</TableHead>
                                    <TableHead className="w-1/3">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoices.map((invoice, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{invoice.date}</TableCell>
                                        <TableCell>{invoice.amount}</TableCell>
                                        <TableCell>
                                            <span className={getStatusBadgeClasses(invoice.status)}>
                                                {invoice.status}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    )
}