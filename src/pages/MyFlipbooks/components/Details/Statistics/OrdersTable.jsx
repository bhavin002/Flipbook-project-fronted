import { Button } from "@/components/ui/button";
import { Eye, Download, Trash2 } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import TablePagination from "@/utils/TablePagination";
import { useState } from "react";
import { getData } from "@/utils/datas";

export default function OrdersTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    
    const orderData = getData('orderData');

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentOrders = orderData.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(orderData.length / recordsPerPage);

    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Shopping cart orders</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50">
                                <TableHead className="font-medium">Order ID</TableHead>
                                <TableHead className="font-medium">Email</TableHead>
                                <TableHead className="font-medium">Order date</TableHead>
                                <TableHead className="font-medium">Order value</TableHead>
                                <TableHead className="font-medium">Checkout</TableHead>
                                <TableHead className="font-medium text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="text-sm">{order.id}</TableCell>
                                    <TableCell className="text-sm">{order.email}</TableCell>
                                    <TableCell className="text-sm">{order.date}</TableCell>
                                    <TableCell className="text-sm">{order.value}</TableCell>
                                    <TableCell className="text-sm">{order.checkout}</TableCell>
                                    <TableCell className="flex items-center justify-center gap-1">
                                        <Button variant="ghost" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-600 hover:bg-red-50">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onChangePage={changePage}
                />
                <div className="text-sm text-gray-500 mt-4 text-center">
                    Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, orderData.length)} of {orderData.length} orders
                </div>
            </CardContent>
        </Card>
    )
}