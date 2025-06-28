import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ProductDetails({ selectedOrder, showOrderDialog, setShowOrderDialog }) {
    console.log("selectedOrder ??",selectedOrder)
    const showCustomText = selectedOrder?.products?.some(
        (product) => product.customizationText && product.customizationText.trim() !== ""
    );

    return (
    <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="sm:max-w-6xl w-[90vw]">
            <DialogHeader>
                <DialogTitle>Order number : {selectedOrder?.orderNumber || selectedOrder?._id}</DialogTitle>
            </DialogHeader>
            <div className="overflow-x-auto mt-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            {showCustomText && <TableHead>Custom text</TableHead>}
                            <TableHead>SKU</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {selectedOrder?.products?.map((product, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{product.productTitle}</TableCell>
                                {showCustomText && (
                                    <TableCell>{product.customizationText || '-'}</TableCell>
                                )}
                                <TableCell>{product.sku}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>{selectedOrder?.currencyId?.symbol || ''}{product.price}</TableCell>
                                <TableCell>{selectedOrder?.currencyId?.symbol || ''}{(product.price * product.quantity).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </DialogContent>
    </Dialog>
    )
}