import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import QuizQuestions from "./QuizQuestions";
import QuizSettings from "./QuizSettings";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quizSchema } from "./quiz.schema";
import { useState } from "react";
import { createQuizApi, getQuizApi, updateQuizApi } from "@/service/quiz.service";
import { toast } from "sonner";
import LoadingButton from "@/utils/LoadingButton";
import { addIntercationDataToMainStage } from "@/utils/Helper";

export default function QuizDialog({ selectedShape, mainStage, setMainStage, selectedIndex, flipbookId }) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const variantId = selectedShape[0].attrs?.htmlData?.variantId || null;

    const form = useForm({
        resolver: zodResolver(quizSchema),
        defaultValues: {
            questions: [{
                text: "Untitled question",
                options: [
                    { text: "Option", isCorrect: true },
                    { text: "Option", isCorrect: false },
                    { text: "Option", isCorrect: false },
                    { text: "Option", isCorrect: false }
                ],
                isMultipleAnswer: false
            }],
            settings: {
                isShowCorrectAnswer: false,
                tooltip: "Click to answer question",
                quizName: "Untitled quiz",
                quizButtonLabel: "Submit",
                useDifferentMessages: false,
                passedQuizMessage: "Your response has been submitted.",
                failedQuizMessage: "Your response has been submitted.",
                messageText: "Your response has been submitted.",
                allowRetake: false,
                collectEmail: false,
                addPrivacyPolicy: false,
                companyName: "FlipDrag",
                privacyPolicyLink: "https://legal.flipdrag.com/privacy-policy",
                addGDPRCompliance: false,
                gdprMessage: "By clicking on the button below, you agree to our Privacy Policy and Terms of Service."
            }
        }
    });

    const { formState: { errors }, clearErrors } = form;

    const fetchQuiz = async () => {
        if (!variantId) {
            setOpen(true); // Open modal directly if no variantId (new quiz)
            return;
        }

        try {
            setIsFetching(true);
            const response = await getQuizApi(variantId);

            const transformedData = {
                questions: response.data.questions.map(q => ({
                    text: q.text,
                    options: q.options.map(o => ({
                        text: o.text,
                        isCorrect: o.isCorrect,
                        _id: o._id
                    })),
                    isMultipleAnswer: q.isMultipleAnswer,
                    _id: q._id
                })),
                settings: {
                    ...response.data.settings,
                    messageText: response.data.settings.messageText || ""
                }
            };

            form.reset(transformedData);
            setOpen(true);
        } catch (error) {
            toast.error("Failed to fetch quiz", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsFetching(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            let response;
            data.flipbookId = flipbookId;
            if (variantId) {
                response = await updateQuizApi(variantId, data);
            } else {
                response = await createQuizApi(data);
            }
            const output = {
                data: {
                    variantId: response.data.quiz._id,
                    isMandatory: false,
                }
            };

            addIntercationDataToMainStage(mainStage, setMainStage, selectedShape, selectedIndex, output);
            setOpen(false);
        } catch (error) {
            toast.error("Failed to save quiz", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button
                className="w-full text-black hover:text-primary"
                variant="outline"
                onClick={fetchQuiz}
                disabled={isFetching}
            >
                {isFetching ? <LoadingButton /> : <>
                    <Pencil /> Edit quiz
                </>}
            </Button>
            {open && (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-[640px] w-[90vw]">
                        <DialogHeader>
                            <DialogTitle>Quiz</DialogTitle>
                            <DialogDescription className="sr-only">
                                Description
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="lg:h-[calc(100vh-150px)] max-lg:max-h-[calc(100vh-300px)] overflow-y-auto">
                                <Tabs defaultValue="question" className="flex flex-col h-full align-items-start">
                                    <TabsList className="justify-start w-fit">
                                        <TabsTrigger value="question">
                                            Questions
                                        </TabsTrigger>
                                        <TabsTrigger value="settings">
                                            Settings
                                        </TabsTrigger>
                                    </TabsList>
                                    <div className="flex-grow overflow-y-auto">
                                        <TabsContent value="question" className="my-4 px-2">
                                            <QuizQuestions form={form} />
                                        </TabsContent>
                                        <TabsContent value="settings" className="my-4 px-2">
                                            <QuizSettings form={form} clearErrors={clearErrors} />
                                        </TabsContent>
                                    </div>
                                </Tabs>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setOpen(false)}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? <LoadingButton /> : "Save changes"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}