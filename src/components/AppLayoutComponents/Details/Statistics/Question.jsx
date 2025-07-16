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
import { useEffect, useState } from "react";
import { getQuestionFormResponsesApi, getQuestionFormResponsesByFormIdApi } from "@/service/questionFormResponse.service";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { format } from "date-fns";

export default function Question({ flipbookId }) {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestionId, setSelectedQuestionId] = useState("");
    const [questionsLoading, setQuestionsLoading] = useState(true);

    const [responses, setResponses] = useState([]);
    const [responsesLoading, setResponsesLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    useEffect(() => {
        const fetchQuestions = async () => {
            if (!flipbookId) return;
            setQuestionsLoading(true);
            try {
                const response = await getQuestionFormResponsesApi(flipbookId);
                console.log("response ??", response.data)
                const questions = response.data
                setQuestions(questions || []);
                if (questions && questions.length > 0) {
                    setSelectedQuestionId(questions[0]._id);
                }
            } catch (error) {
                toast.error("Error fetching questions", { description: error.message || "Oops! Something went wrong." });
            } finally {
                setQuestionsLoading(false);
            }
        };
        fetchQuestions();
    }, [flipbookId]);

    useEffect(() => {
        const fetchResponses = async () => {
            if (!selectedQuestionId) {
                setResponses([]);
                return;
            }
            setResponsesLoading(true);
            try {
                const response = await getQuestionFormResponsesByFormIdApi(selectedQuestionId);
                const questionResponses = response.data;
                setResponses(questionResponses || []);
                setCurrentPage(1);
            } catch (error) {
                toast.error("Error fetching question responses", { description: error.message || "Oops! Something went wrong." });
            } finally {
                setResponsesLoading(false);
            }
        };
        fetchResponses();
    }, [selectedQuestionId]);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentResponses = responses.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(responses.length / recordsPerPage);

    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    const getStatusBadgeClasses = (status) => {
        return status
            ? "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
            : "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800";
    };

    if (questionsLoading) {
        return (
            <div className="w-full h-32 flex items-center justify-center">
                <Skeleton className="h-24 w-full rounded-md" />
            </div>
        );
    }

    // Zero state: no questions
    if (!questionsLoading && questions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[100px] text-center text-muted-foreground">
                <span className="text-lg font-medium">No questions found for this flipbook.</span>
                <span className="text-sm mt-2">Add a question to start collecting responses.</span>
            </div>
        );
    }

    return (
        <div className="grid gap-2 space-y-1">
            <Label htmlFor="workspace-select">
                Form name
            </Label>
            <Select
                value={selectedQuestionId}
                onValueChange={setSelectedQuestionId}
                disabled={questionsLoading}
            >
                <SelectTrigger className="w-[60%]">
                    <SelectValue placeholder={questionsLoading ? "Loading..." : "Select a question"} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {questionsLoading
                            ? Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="px-2 py-1.5"><Skeleton className="h-4 w-32" /></div>
                            ))
                            : questions.map((q) => (
                                <SelectItem key={q._id} value={q._id}>{q.question}</SelectItem>
                            ))}
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
                        {responsesLoading
                            ? Array.from({ length: 2 }).map((_, i) => (
                                <TableRow key={i}>
                                    {Array.from({ length: 4 }).map((_, j) => (
                                        <TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>
                                    ))}
                                </TableRow>
                            ))
                            : currentResponses.length > 0
                                ? currentResponses.map((resp, index) => (
                                    <TableRow key={resp._id || index}>
                                        <TableCell>
                                            <div className="font-medium max-md:w-[100px]">
                                                {resp.createdAt ? format(new Date(resp.createdAt), "yyyy/MM/dd, hh:mm a") : "-"}
                                            </div>
                                        </TableCell>
                                        <TableCell>{resp.email || "-"}</TableCell>
                                        <TableCell className="w-[1000px]">
                                            <div className="max-md:w-[200px]">
                                                {resp.answer}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={getStatusBadgeClasses(resp.addGdprCompliance)}>
                                                {resp.addGdprCompliance ? "Yes" : "No"}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))
                                : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-muted-foreground">No responses found.</TableCell>
                                    </TableRow>
                                )
                        }
                    </TableBody>
                </Table>
            </div>
            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onChangePage={changePage}
            />
            <div className="text-sm text-gray-500 mt-2 text-center">
                {responsesLoading
                    ? <Skeleton className="h-4 w-40 mx-auto" />
                    : responses.length > 0
                        && `Showing ${indexOfFirstRecord + 1}-${Math.min(indexOfLastRecord, responses.length)} of ${responses.length} responses`
                }
            </div>
        </div>
    )
}