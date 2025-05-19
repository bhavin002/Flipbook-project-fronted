
import { Label } from "@/components/ui/label";
import ProductDialog from "./ShoppingList/ProductDialog";
import ShopSettings from "./ShoppingList/ShopSettings/ShopSettings";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCustomize from "./ShoppingList/ProductCustomize";

export default function ShoppingList({ mainStage, setMainStage, selectedShape, selectedIndex }) {
    const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

    return (
        <>
            <div className="p-6 space-y-2 w-full overflow-y-auto flex flex-col">
                <Label className="text-lg">Shopping List</Label>
                <div className="space-y-2 flex flex-col flex-grow overflow-y-auto">
                    <div className="h-full flex flex-col items-start flex-grow overflow-y-auto">
                        {
                            !selectedShape[0].attrs?.htmlData?.productId ? <Button
                                className="w-full text-black hover:text-primary"
                                variant="outline"
                                onClick={() => setIsProductDialogOpen(true)}
                            >
                                <Plus /> Add product
                            </Button> :
                                <ProductCustomize selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} setIsProductDialogOpen={setIsProductDialogOpen} />
                        }
                    </div>
                    <ShopSettings />
                </div>
            </div>
            <ProductDialog selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} isProductDialogOpen={isProductDialogOpen} setIsProductDialogOpen={setIsProductDialogOpen} />
        </>

    )
}