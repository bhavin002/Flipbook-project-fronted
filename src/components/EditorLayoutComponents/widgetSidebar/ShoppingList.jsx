import { Label } from "@/components/ui/label";
import ProductDialog from "./ShoppingList/ProductDialog";
import ShopSettings from "./ShoppingList/ShopSettings/ShopSettings";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCustomize from "./ShoppingList/ProductCustomize";
import { toast } from "sonner";
import { getProductApi } from "@/service/product.service";

export default function ShoppingList({ mainStage, setMainStage, selectedShape, selectedIndex, flipbookId }) {
    const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [productData, setProductData] = useState(null);

    const fetchProductData = async (productId) => {
        if (!productId) {
            toast.error("Product ID is required", {
                description: "Please select a product to view details.",
            });
            return;
        }
        try {
            setIsLoading(true);
            const response = await getProductApi(productId);
            setProductData(response.data);
            setIsProductDialogOpen(true);
        } catch (error) {
            toast.error("Failed to fetch product", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="p-6 space-y-2 w-full overflow-y-auto flex flex-col">
                <Label className="text-lg">Shopping List</Label>
                <div className="space-y-2 flex flex-col flex-grow overflow-y-auto">
                    <div className="h-full flex flex-col items-start flex-grow overflow-y-auto">
                        {
                            !selectedShape[0].attrs?.htmlData?.variantId ? <Button
                                className="w-full text-black hover:text-primary"
                                variant="outline"
                                onClick={() => {
                                    setProductData(null);
                                    setIsProductDialogOpen(true);
                                }}
                            >
                                <Plus /> Add product
                            </Button> :
                                <ProductCustomize selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} setIsProductDialogOpen={setIsProductDialogOpen} fetchProductData={fetchProductData} isLoading={isLoading} />
                        }
                    </div>
                    <ShopSettings />
                </div>
            </div>
            {
                isProductDialogOpen && (
                    <ProductDialog
                        mainStage={mainStage}
                        setMainStage={setMainStage}
                        selectedShape={selectedShape}
                        selectedIndex={selectedIndex}
                        isProductDialogOpen={isProductDialogOpen}
                        setIsProductDialogOpen={setIsProductDialogOpen}
                        productData={productData}
                        flipbookId={flipbookId}
                    />
                )
            }
        </>
    )
}