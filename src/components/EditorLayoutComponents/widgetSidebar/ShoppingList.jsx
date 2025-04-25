
import { Label } from "@/components/ui/label";
import ProductCustomize from "./ShoppingList/ProductCustomize";
import ProductDialog from "./ShoppingList/ProductDialog";
import ShopSettings from "./ShoppingList/ShopSettings/ShopSettings";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ShoppingList() {
    const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

    return (
        <>
            <div className="p-6 space-y-2 w-full overflow-y-auto flex flex-col">
                <Label className="text-lg">Shopping List</Label>
                <div className="space-y-2 flex flex-col flex-grow overflow-y-auto">
                    {/* <Button
                        className="w-full text-black hover:text-primary"
                        variant="outline"
                        onClick={() => setIsProductDialogOpen(true)}
                    >
                        <Plus /> Add product
                    </Button> */}
                    <ProductCustomize setIsProductDialogOpen={setIsProductDialogOpen} />
                    <ShopSettings />
                </div>
            </div>
            <ProductDialog isProductDialogOpen={isProductDialogOpen} setIsProductDialogOpen={setIsProductDialogOpen} />
        </>

    )
}