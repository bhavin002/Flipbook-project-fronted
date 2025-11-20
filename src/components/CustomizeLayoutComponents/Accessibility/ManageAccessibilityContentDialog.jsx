import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { getData } from '@/utils/datas';

export default function ManageAccessibilityContentDialog() {
    const pagesData = getData("pagesData");

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full text-primary" variant="outline" >
                    Manage Accessibility content
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[640px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Manage Accessibility content</DialogTitle>
                    <DialogDescription className="sr-only">
                        Description
                    </DialogDescription>
                </DialogHeader>
                <div className='max-h-[calc(100vh-300px)] overflow-y-auto'>
                    {
                        pagesData.map((page) => (
                            <div key={page.id} className="flex gap-4 my-4 px-1">
                                <div className="flex flex-col gap-2 min-w-[100px]">
                                    <p className="text-md font-semibold">Page {page.id}</p>
                                    <div className="bg-gray-500 h-full">
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor={`title-${page.id}`}>Title</Label>
                                        <Input type="text" id={`title-${page.id}`} placeholder="Add a title to this page..." />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor={`description-${page.id}`}>Description</Label>
                                        <Textarea id={`description-${page.id}`} rows={4} placeholder="Add a description to this page" className="resize-none" />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <DialogFooter>
                    <Button variant="outline">
                        Cancel
                    </Button>
                    <Button>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}