import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getContactSubmissionByIdApi } from "@/service/contactSubmission.service";
import { toast } from "sonner";
import { format } from "date-fns";

export default function ContactFormDetailsDialog({ submissionId }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState(null);

    const fetchDetails = async () => {
        if (!submissionId) return;
        setLoading(true);
        try {
            const response = await getContactSubmissionByIdApi(submissionId);
            const submission = response.data.submission;
            setDetails(submission || null);
        } catch (err) {
            toast.error("Error fetching contact submission details", { description: err?.message || 'Failed to load details' });
        } finally {
            setLoading(false);
        }
    };

    const handleOpenChange = (isOpen) => {
        setOpen(isOpen);
        if (isOpen && !details) {
            fetchDetails();
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Details</DialogTitle>
                    <DialogDescription className="sr-only">
                        Contact form submission details
                    </DialogDescription>
                </DialogHeader>
                <Card className="border-0 shadow-none">
                    <CardContent className="p-0">
                        <div className="space-y-4">
                            {loading ? (
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <React.Fragment key={i}>
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-4 w-32" />
                                        </React.Fragment>
                                    ))}
                                </div>
                            ) : details ? (
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                    <div className="text-sm font-medium text-gray-500">Date</div>
                                    <div className="text-sm">{details.submittedAt ? format(new Date(details.submittedAt), "yyyy/MM/dd, hh:mm a") : "-"}</div>
                                    <div className="text-sm font-medium text-gray-500">GDPR</div>
                                    <div className="text-sm">
                                        <span className={details.gdprAccepted
                                            ? "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                            : "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"}>
                                            {details.gdprAccepted ? "Yes" : "No"}
                                        </span>
                                    </div>
                                    {details.submittedFields && details.submittedFields.map(field => (
                                        <React.Fragment key={field._id || field.label}>
                                            <div className="text-sm font-medium text-gray-500">{field.label}</div>
                                            <div className="text-sm">{field.value}</div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-muted-foreground text-sm">No details found.</div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
}