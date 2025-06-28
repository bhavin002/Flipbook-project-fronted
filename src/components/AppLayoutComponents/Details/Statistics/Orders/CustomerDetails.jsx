import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function CustomerDetails({ selectedCustomerFields, selectedCustomerTitle, showCustomerDialog, setShowCustomerDialog }) {
    return (
        <Dialog open={showCustomerDialog} onOpenChange={setShowCustomerDialog}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Customer information</DialogTitle>
                    <DialogDescription>{selectedCustomerTitle}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-2 mt-4">
                    {selectedCustomerFields.length === 0 ? (
                        <div className="text-gray-500">No customer information available.</div>
                    ) : (
                        selectedCustomerFields.map((field, idx) => (
                            <div key={idx} className="flex justify-between border-b pb-1">
                                <span className="font-medium text-gray-700">{field.label}</span>
                                <span className="text-gray-900">{field.value || '-'}</span>
                            </div>
                        ))
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}