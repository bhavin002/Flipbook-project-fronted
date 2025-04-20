
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import ProductDialog from "./ShoppingList/ProductDialog";

export default function ShoppingList() {
    return (
        <div className="p-6 space-y-2">
            <Label className="text-lg">Shopping List</Label>
            <div className="space-y-2">
                    <ProductDialog />
            </div>
        </div>
    )
}