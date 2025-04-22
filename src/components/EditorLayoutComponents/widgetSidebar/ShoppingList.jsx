
import { Label } from "@/components/ui/label";
import ProductCustomize from "./ShoppingList/ProductCustomize";
import ProductDialog from "./ShoppingList/ProductDialog";
import ShopSettings from "./ShoppingList/ShopSettings/ShopSettings";

export default function ShoppingList() {

    return (
        <div className="p-6 space-y-2">
            <Label className="text-lg">Shopping List</Label>
            <div className="space-y-2">
                <ProductDialog />
                <ProductCustomize />
                <ShopSettings />
            </div>
        </div>
    )
}