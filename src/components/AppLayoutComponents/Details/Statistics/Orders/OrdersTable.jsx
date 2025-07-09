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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { deleteOrderApi } from "@/service/order.service";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckoutType } from "@/utils/enum";
import ProductDetails from "./ProductDetails";
import CustomerDetails from "./CustomerDetails";
import ConfirmationDialog from "@/utils/ConfirmationDialog";

export default function OrdersTable({ orders = [], loading }) {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const [orderData, setOrderData] = useState(orders);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderDialog, setShowOrderDialog] = useState(false);
    const [showCustomerDialog, setShowCustomerDialog] = useState(false);
    const [selectedCustomerFields, setSelectedCustomerFields] = useState([]);
    const [selectedCustomerTitle, setSelectedCustomerTitle] = useState("");
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        setOrderData(orders);
    }, [orders]);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentOrders = orderData.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(orderData.length / recordsPerPage);

    // Check if any order has conditionalInbox option
    const showInboxColumn = orderData.some(
        (order) => order.conditionalInbox?.option && order.conditionalInbox.option.trim() !== ""
    );

    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setShowOrderDialog(true);
    };

    const handleViewCustomer = (order) => {
        setSelectedCustomerFields(order.customerFields || []);
        setSelectedCustomerTitle(order.email || "Customer information");
        setShowCustomerDialog(true);
    };

    const handleDeleteClick = (order) => {
        setOrderToDelete(order);
        setShowDeleteDialog(true);
    };

    const handleDeleteConfirm = async () => {
        if (!orderToDelete) return;
        
        try {
            setIsDeleting(true);
            const response = await deleteOrderApi(orderToDelete._id);
            toast.success("Order successfully deleted",{
                description: response.message,
            });
            
            setOrderData(orderData.filter(order => order._id !== orderToDelete._id));
            
            setShowDeleteDialog(false);
            setOrderToDelete(null);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteDialog(false);
        setOrderToDelete(null);
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
                                {showInboxColumn && <TableHead className="font-medium">Inbox</TableHead>}
                                <TableHead className="font-medium">Email</TableHead>
                                <TableHead className="font-medium">Order date</TableHead>
                                <TableHead className="font-medium">Order value</TableHead>
                                <TableHead className="font-medium">Checkout</TableHead>
                                <TableHead className="font-medium text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                        {showInboxColumn && <TableCell><Skeleton className="h-4 w-24" /></TableCell>}
                                        <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                        <TableCell className="flex items-center justify-center gap-1">
                                            <Skeleton className="h-8 w-8 rounded-full" />
                                            <Skeleton className="h-8 w-8 rounded-full" />
                                            <Skeleton className="h-8 w-8 rounded-full" />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                currentOrders.map((order) => (
                                    <TableRow key={order._id}>
                                        <TableCell className="text-sm">{order.orderNumber || order._id}</TableCell>
                                        {showInboxColumn && (
                                            <TableCell className="text-sm">{order.conditionalInbox?.option || '-'}</TableCell>
                                        )}
                                        <TableCell className="text-sm">
                                            <Button variant="link" className="p-0 h-auto text-blue-600" onClick={() => handleViewCustomer(order)}>
                                                {order.email}
                                            </Button>
                                        </TableCell>
                                        <TableCell className="text-sm">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-"}</TableCell>
                                        <TableCell className="text-sm">{order.currencyId?.symbol || ''}{order.orderTotal}</TableCell>
                                        <TableCell className="text-sm">{CheckoutType[order.checkout] || '-'}</TableCell>
                                        <TableCell className="flex items-center justify-center gap-1">
                                            <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="text-red-600 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => handleDeleteClick(order)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {orderData.length > 0 && (
                    <TablePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onChangePage={changePage}
                    />
                )}
                <div className="text-sm text-gray-500 mt-4 text-center">
                    Showing {orderData.length === 0 ? 0 : indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, orderData.length)} of {orderData.length} orders
                </div>
            </CardContent>

            <ProductDetails selectedOrder={selectedOrder} showOrderDialog={showOrderDialog} setShowOrderDialog={setShowOrderDialog} />

            <CustomerDetails selectedCustomerFields={selectedCustomerFields} selectedCustomerTitle={selectedCustomerTitle} showCustomerDialog={showCustomerDialog} setShowCustomerDialog={setShowCustomerDialog} />

            <ConfirmationDialog
                isConfirmModalOpen={showDeleteDialog}
                setIsConfirmModalOpen={setShowDeleteDialog}
                title="Delete Order"
                description={`Are you sure you want to delete order ${orderToDelete?.orderNumber || orderToDelete?._id}? This action cannot be undone.`}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                isLoading={isDeleting}
            />
        </Card>
    );
}