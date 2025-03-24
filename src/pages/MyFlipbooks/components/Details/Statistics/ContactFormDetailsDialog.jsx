import React from 'react';
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

export default function ContactFormDetailsDialog() {
    const formData = {
        date: "2025/03/22, 9:29 PM",
        email: "W@ses.serer",
        fullName: "eterte",
        phoneNumber: "232234234",
        countryRegion: "tert",
        customInput: "eert"
    };

    return (
        <Dialog>
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
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                <div className="text-sm font-medium text-gray-500">Date</div>
                                <div className="text-sm">{formData.date}</div>
                                
                                <div className="text-sm font-medium text-gray-500">Email address</div>
                                <div className="text-sm">{formData.email}</div>
                                
                                <div className="text-sm font-medium text-gray-500">Full name</div>
                                <div className="text-sm">{formData.fullName}</div>
                                
                                <div className="text-sm font-medium text-gray-500">Phone number</div>
                                <div className="text-sm">{formData.phoneNumber}</div>
                                
                                <div className="text-sm font-medium text-gray-500">Country/region</div>
                                <div className="text-sm">{formData.countryRegion}</div>
                                
                                <div className="text-sm font-medium text-gray-500">Custom input</div>
                                <div className="text-sm">{formData.customInput}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
}