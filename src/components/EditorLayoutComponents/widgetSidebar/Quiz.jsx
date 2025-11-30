import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import QuizDialog from "./Quiz/QuizDialog";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { addIntercationDataToMainStage } from "@/utils/Helper";

const quizSchema = z.object({
    tooltip: z.string().default("Click to view quiz"),
})

export default function Quiz({ selectedShape, mainStage, setMainStage, selectedIndex, flipbookId }) {
    const initialTooltip = selectedShape[0]?.attrs?.htmlData?.tooltip || "Click to view quiz";

    const form = useForm({
        resolver: zodResolver(quizSchema),
        defaultValues: {
            tooltip: initialTooltip,
        },
        mode: "onChange"
    });

    useEffect(() => {
        if (selectedShape[0]?.attrs?.htmlData) {
            const newTooltip = selectedShape[0]?.attrs?.htmlData?.tooltip || "Click to view quiz";

            form.setValue("tooltip", newTooltip);
        } else {
            form.setValue("tooltip", "Click to view quiz");
        }
    }, [selectedShape, form]);

    const updateMainStage = (data) => {
        const output = {
            data: {
                action: "quiz",
                tooltip: data.tooltip,
            }
        };
        addIntercationDataToMainStage(mainStage, setMainStage, selectedShape, selectedIndex, output);
    };

    const handleTooltipChange = (e) => {
        const value = e.target.value;
        form.setValue("tooltip", value);
        setTimeout(() => {
            updateMainStage(form.getValues());
        }, 0);
    };

    return (
        <div className="p-6">
            <div className="space-y-2">
                <Label className="text-lg">Quiz</Label>
                <p className="text-sm">Create quizzes to test knowledge. Customize questions, share your quiz, and review results - all in one place.</p>
                <QuizDialog selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} flipbookId={flipbookId} />
            </div>

            <Form {...form}>
                <div className="mt-2">
                    <FormField
                        control={form.control}
                        name="tooltip"
                        render={({ field }) => (
                            <FormItem className="space-y-1" >
                                <Label htmlFor="quiz-tooltip" className="text-xs">Tooltip</Label>
                                <FormControl>
                                    <Input
                                        type="text"
                                        id="quiz-tooltip"
                                        placeholder="Click to view quiz"
                                        className="placeholder:text-gray-400"
                                        {...field}
                                        onChange={handleTooltipChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </Form>
        </div>
    );
}