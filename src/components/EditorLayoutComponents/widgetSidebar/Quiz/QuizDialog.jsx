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
                <div className="h-[calc(100vh-150px)] overflow-y-auto">
                    <Tabs defaultValue="general">
                        <TabsList>
                            <TabsTrigger value="general">
                                Questions
                            </TabsTrigger>
                            <TabsTrigger value="order-options">
                                Settings
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="general" className="my-4 px-2">
                            <QuizQuestions />
                        </TabsContent>
                        <TabsContent value="order-options" className="my-4 px-2">
                            <QuizSettings />
                        </TabsContent>
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