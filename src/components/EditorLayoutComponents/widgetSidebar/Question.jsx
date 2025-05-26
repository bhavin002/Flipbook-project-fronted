import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import QuestionDialog from "./Question/QuestionDialog";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { addIntercationDataToMainStage } from "@/utils/Helper";

const questionSchema = z.object({
  question: z.string().min(1, "Question cannot be empty"),
});

export default function Question({ selectedShape, mainStage, setMainStage, selectedIndex }) {
  const initialQuestion = selectedShape[0]?.attrs?.htmlData?.question || "Add your question here...";

  const form = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: initialQuestion,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (selectedShape[0]?.attrs?.htmlData) {
      const newQuestion = selectedShape[0]?.attrs?.htmlData?.question || "Add your question here...";
      form.setValue("question", newQuestion);
    } else {
      form.setValue("question", "Add your question here...");
    }
  }, [selectedShape, form]);

  const updateMainStage = (data) => {
    const output = {
      data: {
        action: "question",
        question: data.question,
      },
    };
    addIntercationDataToMainStage(mainStage, setMainStage, selectedShape, selectedIndex, output);
  };

  const handleQuestionChange = (e) => {
    const value = e.target.value;
    form.setValue("question", value);
    updateMainStage({
      question: value,
    });
  };

  return (
    <div className="p-6 space-y-2 w-full overflow-y-auto">
      <Label className="text-lg">Question</Label>
      <p className="text-sm">Ask a question to gather feedback and insights.</p>
      <Form {...form}>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    id="product-description"
                    placeholder="Add your question here..."
                    onChange={handleQuestionChange}
                    className={`resize-none placeholder:text-gray-300 ${
                      form.formState.errors.question ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""
                    }`}
                    rows={4}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </Form>
      <QuestionDialog
        selectedShape={selectedShape}
        mainStage={mainStage}
        setMainStage={setMainStage}
        selectedIndex={selectedIndex}
      />
    </div>
  );
}