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

export default function Question() {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    const questions = getData('questions');

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentquestions = questions.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(questions.length / recordsPerPage);

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
                        <SelectItem value="3a22dqw2">Add your question here...</SelectItem>
                        <SelectItem value="23dwe22f">Add your doubts here...</SelectItem>
                        <SelectItem value="21dw2ww1">Add your confusion here...</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/3">Date</TableHead>
                            <TableHead className="w-1/3">Email</TableHead>
                            <TableHead className="w-1/3">Answers</TableHead>
                            <TableHead className="w-1/3">GDPR</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentquestions.map((question, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <div className="font-medium max-md:w-[100px]">
                                        {question.date}
                                    </div>
                                </TableCell>
                                <TableCell>{question.email || "-"}</TableCell>
                                <TableCell className="w-[1000px]">
                                    <div className="max-md:w-[200px]">
                                        {question.answer}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className={getStatusBadgeClasses(question.gdpr)}>
                                        {question.gdpr}
                                    </span>
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
                Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, questions.length)} of {questions.length} questions
            </div>
        </div>
    )
}