import React, { useState, useEffect } from "react";
import { ShoppingBag, X, Trash2, Download, Minus, Plus, ShoppingCart, Heart, Star } from "lucide-react";
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
import { useShopSettings } from "@/context/ShopSettingsContext";
import { ShopAppearance } from "@/utils/enum";

const ShoppingCartPopover = ({ flipbookId, isMobile }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { shopSettings, getCurrentCurrency } = useShopSettings();

    const getCartIcon = () => {
        if (shopSettings.shopAppearance === ShopAppearance.SHOP_BAG) {
            return <ShoppingBag />;
        }
        if (shopSettings.shopAppearance === ShopAppearance.SHOP_CART) {
            return <ShoppingCart />;
        }
        if (shopSettings.shopAppearance === ShopAppearance.SHOP_HEART) {
            return <Heart />;
        }
        if (shopSettings.shopAppearance === ShopAppearance.SHOP_STAR) {
            return <Star />;
        }
        return <ShoppingBag />;
    };

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

    // Helper to get step for quantity changes
    const getStep = (item) => item.restrictToMoqMultiples ? item.minQuantity : 1;

    // Helper to calculate personalization cost
    const getPersonalizationCost = (item) => {
        if (item.paidPersonalization) {
            if (item.pricingMethod === 'PER_CHAR') {
                return item.personalizationPrice * item.personalizationText.length;
            } else if (item.pricingMethod === 'FLAT_FEE') {
                return item.personalizationPrice;
            }
        }
        return 0;
    };

    // Update quantity using cartId
    const updateQuantityByCartId = async (cartId, newQuantity, item) => {
        // Only enforce min/max if they are not null/undefined
        if (
            (item.minQuantity !== null && item.minQuantity !== undefined && newQuantity < item.minQuantity) ||
            (item.maxQuantity !== null && item.maxQuantity !== undefined && newQuantity > item.maxQuantity)
        ) return;

        try {
            await cartService.updateProductQuantityByCartId(flipbookId, cartId, newQuantity);
        } catch (error) {
            toast.error('Failed to update quantity', {
                description: error.message,
            });
        }
    };

    // Legacy method for backward compatibility
    const updateQuantity = async (productIdentifier, newQuantity, item) => {
        // Only enforce min/max if they are not null/undefined
        if (
            (item.minQuantity !== null && item.minQuantity !== undefined && newQuantity < item.minQuantity) ||
            (item.maxQuantity !== null && item.maxQuantity !== undefined && newQuantity > item.maxQuantity)
        ) return;

        try {
            await cartService.updateProductQuantity(flipbookId, productIdentifier, newQuantity);
        } catch (error) {
            toast.error('Failed to update quantity', {
                description: error.message,
            });
        }
    };

    // Remove item using cartId
    const removeItemByCartId = async (cartId) => {
        try {
            await cartService.removeFromCartByCartId(flipbookId, cartId);
        } catch (error) {
            toast.error('Failed to remove item', {
                description: error.message,
            });
        }
    };

    // Legacy remove method for backward compatibility
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
        return cartItems.reduce((total, item) => {
            const personalizationCost = getPersonalizationCost(item);
            const itemBasePrice = item.productPrice || 0;
            return total + ((itemBasePrice + personalizationCost) * item.productQty);
        }, 0);
    };

    const handleDownload = (format) => {
        toast.success(`${format} downloaded successfully`);
    };

    const renderDownloadButton = () => {
        const { allowPdfDownload, allowCsvDownload } = shopSettings;

        if (!allowPdfDownload && !allowCsvDownload) {
            return null;
        }

        if (allowPdfDownload && allowCsvDownload) {
            return (
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
            );
        }

        return (
            <Button
                variant="outline"
                size="sm"
                disabled={cartItems.length === 0}
                onClick={() => handleDownload(allowPdfDownload ? 'PDF' : 'CSV')}
            >
                <Download className="h-4 w-4" />
            </Button>
        );
    };

    return (
        <div className="relative">
            <Button
                variant={isOpen ? "default" : "outline"}
                className="relative [&_svg]:size-5"
                onClick={() => setIsOpen(!isOpen)}
            >
                {getCartIcon()}
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
                    className={`absolute right-0 mt-2 w-auto bg-background border rounded-md shadow-lg z-50 max-h-[600px] flex flex-col ${isMobile ? 'md:w-[23rem]' : 'md:w-[28rem]'}`}
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
                            {renderDownloadButton()}
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
                            <div className="text-center text-muted-foreground">
                                Loading cart...
                            </div>
                        ) : cartItems.length === 0 ? (
                            <div className="text-center text-muted-foreground">
                                Your cart is empty
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.cartId} className="flex items-start gap-3">
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
                                            <p className="text-sm font-semibold">
                                                {/* Show price with personalization */}
                                                {item.productPrice + getPersonalizationCost(item)} {getCurrentCurrency()}
                                            </p>
                                            {item.personalizationText && (
                                                <p className="text-xs text-gray-500">{item.instructionMessage}: {item.personalizationText}</p>
                                            )}
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeItemByCartId(item.cartId)}
                                            >
                                                <Trash2 className="h-4 w-4" color="red" />
                                            </Button>
                                            <div className="flex items-center gap-1 border rounded-md">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => {
                                                        const step = getStep(item);
                                                        const newQty = item.productQty - step;
                                                        // Only check min if it's set
                                                        if (item.minQuantity === null || item.minQuantity === undefined || newQty >= item.minQuantity) {
                                                            updateQuantityByCartId(item.cartId, newQty, item);
                                                        }
                                                    }}
                                                    disabled={item.minQuantity !== null && item.minQuantity !== undefined && item.productQty <= item.minQuantity}
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
                                                    onClick={() => {
                                                        const step = getStep(item);
                                                        const newQty = item.productQty + step;
                                                        // Only check max if it's set
                                                        if (item.maxQuantity === null || item.maxQuantity === undefined || newQty <= item.maxQuantity) {
                                                            updateQuantityByCartId(item.cartId, newQty, item);
                                                        }
                                                    }}
                                                    disabled={item.maxQuantity !== null && item.maxQuantity !== undefined && item.productQty >= item.maxQuantity}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
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
                                    <span className="text-lg font-bold">{getTotalPrice()} {getCurrentCurrency()}</span>
                                </div>
                                {shopSettings.emailCheckout && (
                                    <Button className="w-full" size="lg">
                                        {shopSettings.checkoutButtonLabel}
                                    </Button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}

            <ConfirmationDialog
                isConfirmModalOpen={isConfirmModalOpen}
                setIsConfirmModalOpen={setIsConfirmModalOpen}
                title="Clear Shopping List"
                onConfirm={clearCart}
                description="Are you sure you want to clear all items from your shopping list? This action cannot be undone."
            />
        </div>
    );
};

export default ShoppingCartPopover;