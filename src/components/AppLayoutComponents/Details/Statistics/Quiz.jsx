import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TablePagination from "@/utils/TablePagination";
import { useState } from "react";
import { getData } from "@/utils/datas";
import { Separator } from "@/components/ui/separator";
import QuizChart from "./QuizChart";
import RespondentAnswers from "./RespondentAnswers";


export default function Quiz() {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    const quizSummary = getData('quizSummary');
    const respondents = getData('respondents');

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRespondents = respondents.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(respondents.length / recordsPerPage);

    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
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
                        <SelectItem value="3a22dqw2">Bhavu's quiz</SelectItem>
                        <SelectItem value="23dwe22f">Utsav's quiz</SelectItem>
                        <SelectItem value="21dw2ww1">Satyam's quiz</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Tabs defaultValue="summary" className="flex flex-col h-full">
                <TabsList className="w-full">
                    <TabsTrigger className="items-center gap-2 w-full" value="summary">
                        Summary
                    </TabsTrigger>
                    <TabsTrigger className="items-center gap-2 w-full" value="respondent">
                        Respondent ({respondents.length})
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="summary" className="h-full mt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {quizSummary.map((quiz) => (
                            <Card key={quiz.id} className="h-full">
                                <CardContent className="p-0 h-full">
                                    <div className="flex h-full">
                                        <div className={`w-1.5 bg-primary`}></div>
                                        <div className="p-5 flex flex-1 items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <h3 className="text-xl font-bold text-gray-800">{quiz.title}</h3>
                                                    <p className="text-gray-500 text-xs">{quiz.label}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <Separator />
                    <div className="overflow-x-auto">
                        <p className="text-lg font-semibold">Scores</p>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-1/3">Date</TableHead>
                                    <TableHead className="w-1/3">Email</TableHead>
                                    <TableHead className="w-1/3">Correct answers</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentRespondents.map((quiz, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{quiz.date}</TableCell>
                                        <TableCell>{quiz.email}</TableCell>
                                        <TableCell>{quiz.answer}</TableCell>
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
                        Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, respondents.length)} of {respondents.length} respondents
                    </div>
                    <Separator />
                    <QuizChart />
                </TabsContent>
                <TabsContent value="respondent" className="h-full mt-4 space-y-4">
                    <RespondentAnswers />
                </TabsContent>
            </Tabs>
        </div>
    )
}