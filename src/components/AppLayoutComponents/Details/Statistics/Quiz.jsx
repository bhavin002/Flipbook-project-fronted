import { useEffect, useState } from "react";
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
import { Separator } from "@/components/ui/separator";
import QuizChart from "./QuizChart";
import RespondentAnswers from "./RespondentAnswers";
import { getQuizByFlipbookId, getQuizSummaryApi, getQuizRespondentApi } from "@/service/quizAttempt.service";
import { toast } from "sonner";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export default function Quiz({ flipbookId }) {
    const [quizList, setQuizList] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState("");
    const [summary, setSummary] = useState(null);
    const [respondents, setRespondents] = useState([]);
    const [loadingQuizList, setLoadingQuizList] = useState(true);
    const [loadingSummary, setLoadingSummary] = useState(false);
    const [loadingRespondents, setLoadingRespondents] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    useEffect(() => {
        const fetchQuizList = async () => {
            setLoadingQuizList(true);
            try {
                const data = await getQuizByFlipbookId(flipbookId);
                setQuizList(data.data);
                if (data.data.length > 0) {
                    setSelectedQuiz(data.data[0].value);
                }
            } catch (err) {
                toast.error("Failed to load quizzes.", { description: err.message })
            } finally {
                setLoadingQuizList(false);
            }
        };
        fetchQuizList();
    }, [flipbookId]);

    useEffect(() => {
        const fetchSummaryAndRespondents = async () => {
            if (!selectedQuiz) return;
            setLoadingSummary(true);
            setLoadingRespondents(true);
            try {
                const [summaryData, respondentsData] = await Promise.all([
                    getQuizSummaryApi(selectedQuiz),
                    getQuizRespondentApi(selectedQuiz)
                ]);
                setSummary(summaryData.data);
                setRespondents(respondentsData.data);
            } catch (err) {
                toast.error("Failed to load summary or respondents", {
                    description: err.message
                })
            } finally {
                setLoadingSummary(false);
                setLoadingRespondents(false);
            }
            setCurrentPage(1);
        };
        fetchSummaryAndRespondents();
    }, [selectedQuiz]);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentScores = summary?.scores?.slice(indexOfFirstRecord, indexOfLastRecord) || [];
    const totalPages = summary?.scores ? Math.ceil(summary.scores.length / recordsPerPage) : 1;
    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (loadingQuizList) {
        return (
            <div className="w-full h-32 flex items-center justify-center">
                <Skeleton className="h-24 w-full rounded-md" />
            </div>
        );
    }

    if (!loadingQuizList && quizList.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[100px] text-center text-muted-foreground">
                <span className="text-lg font-medium">No quizzes found for this flipbook.</span>
                <span className="text-sm mt-2">Create a quiz to start collecting responses.</span>
            </div>
        );
    }

    return (
        <div className="grid gap-2 space-y-1">
            <Label htmlFor="workspace-select">Form name</Label>
            {loadingQuizList ? (
                <div className="h-10 bg-gray-100 animate-pulse rounded w-[60%]" />
            ) : (
                <Select value={selectedQuiz} onValueChange={setSelectedQuiz}>
                    <SelectTrigger className="w-[60%]">
                        <SelectValue placeholder="Select a quiz" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {quizList.map((quiz) => (
                                <SelectItem key={quiz.value} value={quiz.value}>{quiz.label}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}
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
                    {loadingSummary ? (
                        <div className="h-32 bg-gray-100 animate-pulse rounded" />
                    ) : summary ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card className="h-full">
                                    <CardContent className="p-0 h-full">
                                        <div className="flex h-full">
                                            <div className={`w-1.5 bg-primary`}></div>
                                            <div className="p-5 flex flex-1 items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <h3 className="text-xl font-bold text-gray-800">{summary.opens}</h3>
                                                        <p className="text-gray-500 text-xs">Opens</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="h-full">
                                    <CardContent className="p-0 h-full">
                                        <div className="flex h-full">
                                            <div className={`w-1.5 bg-primary`}></div>
                                            <div className="p-5 flex flex-1 items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <h3 className="text-xl font-bold text-gray-800">{summary.submits}</h3>
                                                        <p className="text-gray-500 text-xs">Submits</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="h-full">
                                    <CardContent className="p-0 h-full">
                                        <div className="flex h-full">
                                            <div className={`w-1.5 bg-primary`}></div>
                                            <div className="p-5 flex flex-1 items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        {summary.opens > 0 ? (
                                                            <h3 className="text-xl font-bold text-gray-800">
                                                                {((respondents.length / summary.opens) * 100).toFixed(1)}%
                                                            </h3>
                                                        ) : (
                                                            <h3 className="text-xl font-bold text-gray-800">0%</h3>
                                                        )}
                                                        <p className="text-gray-500 text-xs">Completion rate</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
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
                                        {currentScores.map((score, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">{format(new Date(score.submittedAt), "yyyy/MM/dd, hh:mm a")}</TableCell>
                                                <TableCell>{score.email}</TableCell>
                                                <TableCell>{score.correctAnswersCount} / {score.totalQuestions}</TableCell>
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
                                Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, summary?.scores?.length || 0)} of {summary?.scores?.length || 0} respondents
                            </div>
                            <Separator />
                            <QuizChart questionStats={summary.questionStats || []} loading={loadingSummary} />
                        </>
                    ) : null}
                </TabsContent>
                <TabsContent value="respondent" className="h-full mt-4 space-y-4">
                    <RespondentAnswers respondents={respondents} loading={loadingRespondents} />
                </TabsContent>
            </Tabs>
        </div>
    )
}