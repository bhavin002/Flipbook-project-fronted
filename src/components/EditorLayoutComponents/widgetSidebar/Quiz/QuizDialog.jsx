import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import QuizQuestions from "./QuizQuestions";
import QuizSettings from "./QuizSettings";

export default function QuizDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="w-full text-black hover:text-primary"
                    variant="outline"
                >
                    <Pencil />
                    Edit quiz
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[640px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Quiz</DialogTitle>
                    <DialogDescription className="sr-only">
                        Description
                    </DialogDescription>
                </DialogHeader>
                <div className="lg:h-[calc(100vh-150px)] max-lg:max-h-[calc(100vh-300px)]  overflow-y-auto">
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
                                <QuizQuestions />
                            </TabsContent>
                            <TabsContent value="settings" className="my-4 px-2">
                                <QuizSettings />
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
                <DialogFooter>
                    <Button variant="outline">
                        Cancel
                    </Button>
                    <Button>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}