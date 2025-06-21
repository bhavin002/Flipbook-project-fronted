import React, { useState, useEffect } from "react";
import { ShoppingBag, X, Trash2, Download, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ConfirmationDialog from "@/utils/ConfirmationDialog";
import cartService from '@/service/IndexedDBCart.service';
import { toast } from 'sonner';

const ShoppingCartPopover = ({ flipbookId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            if (!flipbookId) return;
            try {
                setIsLoading(true);
                const items = await cartService.getCart(flipbookId);
                setCartItems(items);
            } catch (error) {
                toast.error('Failed to load cart', {
                    description: error.message,
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchCart();

        const unsubscribe = cartService.on('cartUpdated', ({ flipbookId: updatedFlipbookId, cart }) => {
            if (updatedFlipbookId === flipbookId) {
                setCartItems(cart);
            }
        });

        return () => unsubscribe();
    }, [flipbookId]);

    const updateQuantity = async (productIdentifier, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            await cartService.updateProductQuantity(flipbookId, productIdentifier, newQuantity);
        } catch (error) {
            toast.error('Failed to update quantity', {
                description: error.message,
            });
        }
    };

    const removeItem = async (productIdentifier) => {
        try {
            await cartService.removeFromCart(flipbookId, productIdentifier);
        } catch (error) {
            toast.error('Failed to remove item', {
                description: error.message,
            });
        }
    };

    const clearCart = async () => {
        try {
            await cartService.clearCart(flipbookId);
            setIsConfirmModalOpen(false);
            setIsOpen(false);
        } catch (error) {
            toast.error('Failed to clear cart', {
                description: error.message,
            });
        }
    };

    const handleClearCartClick = () => {
        setIsConfirmModalOpen(true);
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.productQty, 0);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.productPrice * item.productQty), 0);
    };

    const handleDownload = (format) => {
        console.log(`Downloading as ${format}`);
    };

    return (
        <div className="relative">
            <Button
                variant={isOpen ? "default" : "outline"}
                className="relative [&_svg]:size-5"
                onClick={() => setIsOpen(!isOpen)}
            >
                <ShoppingBag />
                {getTotalItems() > 0 && !isOpen && (
                    <Badge
                        variant="default"
                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                        {getTotalItems()}
                    </Badge>
                )}
            </Button>

            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-96 bg-background border rounded-md shadow-lg z-50 max-h-[600px] flex flex-col"
                    style={{ top: '100%' }}
                >
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold">My list</h3>
                            <Badge className="bg-primary text-white">
                                {getTotalItems()}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                type="button"
                                size="sm"
                                onClick={handleClearCartClick}
                                disabled={cartItems.length === 0}
                            >
                                Clear list
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={cartItems.length === 0}
                                    >
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="center" className="w-20">
                                    <DropdownMenuItem onClick={() => handleDownload('PDF')}>
                                        PDF
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDownload('CSV')}>
                                        CSV
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: '200px' }}>
                        {isLoading ? (
                            <div className="text-center py-8 text-muted-foreground">
                                Loading cart...
                            </div>
                        ) : cartItems.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                Your cart is empty
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.productVariantId || item.productId} className="flex items-center gap-3">
                                        <div className="w-16 h-16 rounded-md flex items-center justify-center bg-gray-50">
                                            {item.productImage ? (
                                                <img
                                                    src={item.productImage}
                                                    alt={item.productTitle}
                                                    className="w-full h-full object-cover rounded-md"
                                                />
                                            ) : (
                                                <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium line-clamp-2">{item.productTitle}</h4>
                                            <p className="text-sm font-semibold">{item.productPrice} INR</p>
                                            {item.personalizationText && (
                                                <p className="text-xs text-gray-500">Personalization: {item.personalizationText}</p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 border rounded-md">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => updateQuantity(
                                                    { productId: item.productId, productVariantId: item.productVariantId },
                                                    item.productQty - 1
                                                )}
                                                disabled={item.productQty <= 1}
                                            >
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="px-3 py-1 text-sm min-w-[2rem] text-center">
                                                {item.productQty}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => updateQuantity(
                                                    { productId: item.productId, productVariantId: item.productVariantId },
                                                    item.productQty + 1
                                                )}
                                            >
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeItem(
                                                { productId: item.productId, productVariantId: item.productVariantId }
                                            )}
                                        >
                                            <Trash2 className="h-4 w-4" color="red" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <>
                            <Separator />
                            <div className="p-4 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold">Total:</span>
                                    <span className="text-lg font-bold">{getTotalPrice()} INR</span>
                                </div>
                                <Button className="w-full" size="lg">
                                    Send order
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            )}
            
            <ConfirmationDialog
                isConfirmModalOpen={isConfirmModalOpen}
                setIsConfirmModalOpen={setIsConfirmModalOpen}
                title="Clear Shopping List"
                description="Are you sure you want to clear all items from your shopping list? This action cannot be undone."
                onConfirm={clearCart}
            />
        </div>
    );
};

export default ShoppingCartPopover;