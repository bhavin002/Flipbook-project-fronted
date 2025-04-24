
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import QuestionDialog from "./Question/QuestionDialog";

export default function Question() {
    return (
        <div className="p-6 space-y-2 w-full">
            <Label className="text-lg">Question</Label>
            <p className="text-sm">Ask a question to gather feedback and insights.</p>
            <div>
                <Textarea
                    id="product-description"
                    placeholder="Add your question here..."
                    defaultValue="Add your question here..."
                    className="resize-none placeholder:text-gray-300"
                    rows={4}
                />
            </div>
            <QuestionDialog/>
        </div>
    )
}