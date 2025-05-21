
import { Label } from "@/components/ui/label";
import QuizDialog from "./Quiz/QuizDialog";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Quiz({ selectedShape, mainStage, setMainStage, selectedIndex }) {
    const [isMandatory, setIsMandatory] = useState(false);
    return (
        <div className="p-6">
            <div className="space-y-2">
                <Label className="text-lg">Quiz</Label>
                <p className="text-sm">Create quizzes to test knowledge. Customize questions, share your quiz, and review results - all in one place.</p>
                <QuizDialog selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} />
            </div>

            <div className="space-y-2 mt-[20px]">
                <div className="flex justify-between">
                    <Label htmlFor="question-tooltip" >
                        Make element mandatory
                    </Label>
                    <Switch
                        checked={isMandatory}
                        onCheckedChange={setIsMandatory}
                        className="data-[state=checked]:bg-violet-600"
                    />
                </div>
                <p className="text-sm">
                    Respondents must complete their email address In order to submit answers.
                </p>
                {isMandatory && <div>
                    <div>
                        <Label htmlFor="instructions" >
                            Instructions <span>*</span>
                        </Label>
                        <Textarea
                            type="text"
                            id="instructions"
                            defaultValue="Please complete the highlighted quiz before proceeding."
                            placeholder="Please complete the highlighted quiz before proceeding."
                            rows={4}
                            className="resize-none"
                        />
                    </div>
                </div>}
            </div>
        </div>
    )
}