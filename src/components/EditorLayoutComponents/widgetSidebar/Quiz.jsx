import { Label } from "@/components/ui/label";
import QuizDialog from "./Quiz/QuizDialog";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { addIntercationDataToMainStage } from "@/utils/Helper";

const quizSchema = z.object({
    isMandatory: z.boolean(),
    instructions: z.string()
})

export default function Quiz({ selectedShape, mainStage, setMainStage, selectedIndex }) {
    const initialIsMandatory = selectedShape[0]?.attrs?.htmlData?.isMandatory || false;
    const initialInstructions = selectedShape[0]?.attrs?.htmlData?.instructions || "Please complete the highlighted quiz before proceeding.";

    const form = useForm({
        resolver: zodResolver(quizSchema),
        defaultValues: {
            isMandatory: initialIsMandatory,
            instructions: initialInstructions
        },
        mode: "onChange"
    });

    useEffect(() => {
        if (selectedShape[0]?.attrs?.htmlData) {
            const newIsMandatory = selectedShape[0]?.attrs?.htmlData?.isMandatory || false;
            const newInstructions = selectedShape[0]?.attrs?.htmlData?.instructions || "Please complete the highlighted quiz before proceeding.";

            form.setValue("isMandatory", newIsMandatory);
            form.setValue("instructions", newInstructions);
        } else {
            form.setValue("isMandatory", false);
            form.setValue("instructions", "Please complete the highlighted quiz before proceeding.");
        }
    }, [selectedShape, form]);

    const updateMainStage = (data) => {
        const output = {
            data: {
                action: "quiz",
                isMandatory: data.isMandatory,
                instructions: data.instructions
            }
        };
        addIntercationDataToMainStage(mainStage, setMainStage, selectedShape, selectedIndex, output);
    };

    const { watch } = form;
    const formValues = watch();

    const handleMandatoryChange = (checked) => {
        const currentInstructions = form.getValues("instructions");
        form.setValue("isMandatory", checked);
        
        // If instructions is empty or null when unchecking mandatory, set default instructions
        if (!checked && (!currentInstructions || currentInstructions.trim() === "")) {
            const defaultInstructions = "Please complete the highlighted quiz before proceeding.";
            form.setValue("instructions", defaultInstructions);
            updateMainStage({
                isMandatory: checked,
                instructions: defaultInstructions
            });
        } else {
            updateMainStage({
                isMandatory: checked,
                instructions: currentInstructions
            });
        }
    };

    const handleInstructionsChange = (e) => {
        const value = e.target.value;
        form.setValue("instructions", value);
        updateMainStage({
            isMandatory: form.getValues("isMandatory"),
            instructions: value
        });
    };

    return (
        <div className="p-6">
            <div className="space-y-2">
                <Label className="text-lg">Quiz</Label>
                <p className="text-sm">Create quizzes to test knowledge. Customize questions, share your quiz, and review results - all in one place.</p>
                <QuizDialog selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} />
            </div>

            <Form {...form}>
                <div className="space-y-2 mt-[20px]">
                    <FormField
                        control={form.control}
                        name="isMandatory"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex justify-between">
                                    <Label htmlFor="question-tooltip">
                                        Make element mandatory
                                    </Label>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={handleMandatoryChange}
                                        id="question-tooltip"
                                        className="data-[state=checked]:bg-violet-600"
                                    />
                                </div>
                            </FormItem>
                        )}
                    />

                    <p className="text-sm">
                        Respondents must complete their email address In order to submit answers.
                    </p>

                    {formValues.isMandatory && (
                        <FormField
                            control={form.control}
                            name="instructions"
                            render={({ field }) => (
                                <FormItem>
                                    <div>
                                        <Label htmlFor="instructions">
                                            Instructions
                                        </Label>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                id="instructions"
                                                onChange={handleInstructionsChange}
                                                placeholder="Please complete the highlighted quiz before proceeding."
                                                rows={4}
                                                className={`resize-none placeholder:text-[#d8dce3] ${form.formState.errors.instructions ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}`}
                                            />
                                        </FormControl>
                                    </div>
                                </FormItem>
                            )}
                        />
                    )}
                </div>
            </Form>
        </div>
    );
}