import { BookOpen, Layers } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export default function PanelRight({ isCropping, isRightLateralCollapse, setIsRightLateralCollapse, currentRightPanel, setCurrentRightPanel }) {

  const elements = [
    {
      "text": "Pages",
      "icon": <BookOpen className="w-5 h-5" />
    },
    {
      "text": "Layers",
      "icon": <Layers className="w-5 h-5" />
    }
  ]

  const handleRightPanel = (currentRightPanel, elementText) => {
    if(isCropping){
      return;
    }
    setCurrentRightPanel(elementText);
    if (currentRightPanel == elementText) {
      setIsRightLateralCollapse(!isRightLateralCollapse)
      setCurrentRightPanel('')
    } else {
      setIsRightLateralCollapse(true)
    }
  }

  return (
    <div className="z-[11]">
      <div className="flex flex-col space-y-2 mt-2">
        {elements.map((element, index) => (
          <div className="text-center w-[72px] flex flex-col" key={index} onClick={() => handleRightPanel(currentRightPanel, element.text)} >
            <Button className={`${(currentRightPanel == element.text) ? 'text-primary bg-accent' : 'hover:text-black'}`} size="sm" variant="ghost">
              {element.icon}
            </Button>
            <Label className={`text-xs ${(currentRightPanel == element.text) ? 'text-primary' : ''}`}>{element.text}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};
