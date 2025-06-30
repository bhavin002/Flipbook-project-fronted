import { Label } from "@/components/ui/label";
import QuestionDialog from "./Question/QuestionDialog";
export default function Question({ selectedShape, mainStage, setMainStage, selectedIndex, flipbookId }) {
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
    </div>
  );
}