import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import QuestionDialog from "./Question/QuestionDialog";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { addIntercationDataToMainStage } from "@/utils/Helper";

const questionSchema = z.object({
  tooltip: z.string().default("Click to answer question"),
})

export default function Question({ selectedShape, mainStage, setMainStage, selectedIndex, flipbookId }) {
  const initialTooltip = selectedShape[0]?.attrs?.htmlData?.tooltip || "Click to answer question";

  const form = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      tooltip: initialTooltip,
    },
    mode: "onChange"
  });

  useEffect(() => {
    if (selectedShape[0]?.attrs?.htmlData) {
      const newTooltip = selectedShape[0]?.attrs?.htmlData?.tooltip || "Click to answer question";
      form.setValue("tooltip", newTooltip);
    } else {
      form.setValue("tooltip", "Click to answer question");
    }
  }, [selectedShape, form]);

  const updateMainStage = (data) => {
    const output = {
      data: {
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
    <div className="p-6 space-y-2 w-full overflow-y-auto">
      <Label className="text-lg">Question</Label>
      <p className="text-sm ">
        Ask a question to gather feedback and insights.
        You can use this feature to collect responses, opinions, or any information you need from your readers.
      </p>
      <QuestionDialog
        selectedShape={selectedShape}
        mainStage={mainStage}
        setMainStage={setMainStage}
        selectedIndex={selectedIndex}
        flipbookId={flipbookId}
      />

      <Form {...form}>
        <div className="mt-2">
          <FormField
            control={form.control}
            name="tooltip"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <Label htmlFor="question-tooltip" className="text-xs">Tooltip</Label>
                <FormControl>
                  <Input
                    type="text"
                    id="question-tooltip"
                    placeholder="Click to answer question"
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