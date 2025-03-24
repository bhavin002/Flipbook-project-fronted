import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TablePagination from "@/utils/TablePagination";
import { useState } from "react";
import { getData } from "@/utils/datas";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactFormDetailsDialog from "./ContactFormDetailsDialog";

export default function ContactForm() {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    const contactFormData = getData('contactFormData');

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentcontactFormData = contactFormData.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(contactFormData.length / recordsPerPage);

    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    const getStatusBadgeClasses = (status) => {
        return status === "Yes"
            ? "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
            : "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800";
    };
    return (
        <div className="grid gap-2 space-y-1">
            <Label htmlFor="workspace-select">
                Form name
            </Label>
            <Select defaultValue="3a22dqw2">
                <SelectTrigger className="w-[60%]">
                    <SelectValue placeholder="Select a quiz" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="3a22dqw2">Utsav's contact form</SelectItem>
                        <SelectItem value="23dwe22f">Bhavu's contact form</SelectItem>
                        <SelectItem value="21dw2ww1">Satyam's contact form...</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Email address</TableHead>
                            <TableHead>Full name</TableHead>
                            <TableHead>Phone number</TableHead>
                            <TableHead>Country/region</TableHead>
                            <TableHead>Custom input</TableHead>
                            <TableHead>Actions</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentcontactFormData.map((question, index) => (
                            <TableRow key={index}>
                                <TableCell>{question.date}</TableCell>
                                <TableCell>{question.email}</TableCell>
                                <TableCell>{question.name}</TableCell>
                                <TableCell>{question.phone}</TableCell>
                                <TableCell>{question.country}</TableCell>
                                <TableCell>{question.custom}</TableCell>
                                <TableCell>
                                    <ContactFormDetailsDialog />
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
            <div className="text-sm text-gray-500 mt-2 text-center">
                Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, contactFormData.length)} of {contactFormData.length} contactFormData
            </div>
        </div>
    )
}