import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';
import { getProductApi } from '@/service/product.service';
import cartService from '@/service/IndexedDBCart.service';

const ShopAreaModal = ({ open, onOpenChange, htmlData, flipbookId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [productInfo, setProductInfo] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState({});
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [personalizationText, setPersonalizationText] = useState('');
    const [currentImages, setCurrentImages] = useState([]);
    const [personalizationError, setPersonalizationError] = useState('');

    useEffect(() => {
        if (htmlData?.variantId && open) {
            const getProductInfo = async () => {
                try {
                    setIsLoading(true);
                    const response = await getProductApi(htmlData.variantId);
                    console.log("response.data ???",response.data);
                    setProductInfo(response.data);

                    if (response.data?.productAttributes?.length > 0) {
                        const defaultVariant = {};
                        response.data.productAttributes.forEach(attr => {
                            defaultVariant[attr.attributeName] = attr.optionValues[0];
                        });
                        setSelectedVariant(defaultVariant);
                        updateImagesForVariant(defaultVariant, response.data);
                    } else {
                        setCurrentImages(response.data?.images || []);
                    }

                    if (response.data?.minQuantity) {
                        setQuantity(response.data.minQuantity);
                    }
                } catch (error) {
                    toast.error('Failed to load product information', {
                        description: error.message,
                    });
                } finally {
                    setIsLoading(false);
                }
            };
            getProductInfo();
        }
    }, [htmlData?.variantId, open]);

    const updateImagesForVariant = (variant, product) => {
        if (product?.variantImages?.selectedAttribute && variant[product.variantImages.selectedAttribute]) {
            const selectedValue = variant[product.variantImages.selectedAttribute];
            const variantImageData = product.variantImages.attributeValues.find(
                item => item.value === selectedValue
            );
            setCurrentImages(variantImageData?.image || product.images || []);
        } else {
            setCurrentImages(product?.images || []);
        }
        setCurrentImageIndex(0);
    };

    const handleVariantChange = (attributeName, value) => {
        const newVariant = { ...selectedVariant, [attributeName]: value };
        setSelectedVariant(newVariant);
        updateImagesForVariant(newVariant, productInfo);
    };

    const handleQuantityChange = (change) => {
        const minQty = productInfo?.minQuantity || 1;
        const maxQty = productInfo?.maxQuantity || 100;
        const restrictToMoqMultiples = productInfo?.restrictToMoqMultiples;
        const step = restrictToMoqMultiples ? minQty : 1;

        let newQuantity = quantity + change * step;

        // Clamp to min/max
        if (newQuantity < minQty) newQuantity = minQty;
        if (newQuantity > maxQty) newQuantity = maxQty;

        setQuantity(newQuantity);
    };

    const getCurrentPrice = () => {
        if (!productInfo) return { price: 0, discountPrice: null };

        const variantKey = Object.entries(selectedVariant)
            .map(([key, value]) => `${value}`)
            .join(' | ');

        const matchingVariant = productInfo.productVariants?.find(
            variant => variant.variantName.includes(variantKey)
        );

        if (matchingVariant) {
            return {
                price: matchingVariant.price,
                discountPrice: matchingVariant.discountPrice,
            };
        }

        return {
            price: productInfo.price,
            discountPrice: productInfo.discountPrice,
        };
    };

    const getFinalPrice = () => {
        const { discountPrice, price } = getCurrentPrice();
        let personalizationCost = 0;
        if (productInfo?.paidPersonalization && personalizationText && personalizationText.length > 0) {
            if (productInfo.pricingMethod === 'PER_CHAR') {
                personalizationCost = (productInfo.personalizationPrice || 0) * personalizationText.length;
            } else if (productInfo.pricingMethod === 'FLAT_FEE') {
                personalizationCost = productInfo.personalizationPrice || 0;
            }
        }
        const basePrice = discountPrice != null ? discountPrice : price;
        return basePrice + personalizationCost;
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === currentImages.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? currentImages.length - 1 : prev - 1
        );
    };

    const handleAddToCart = async () => {
        if (
            productInfo?.customizableProduct &&
            productInfo?.instructionMessageRequired &&
            !personalizationText.trim()
        ) {
            setPersonalizationError('This product requires personalization.');
            return;
        }
        setPersonalizationError('');

        try {
            // Only check that the quantity being added does not exceed maxQuantity
            const maxQty = productInfo?.maxQuantity || 100;
            if (quantity > maxQty) {
                toast.error(`You cannot add more than ${maxQty} of this product at once.`, {
                    description: `You tried to add ${quantity}.`,
                });
                return;
            }

            const variantKey = Object.entries(selectedVariant)
                .map(([key, value]) => `${value}`)
                .join(' | ');

            const matchingVariant = productInfo.productVariants?.find(
                variant => variant.variantName.includes(variantKey)
            );

            let displayTitle = productInfo.productTitle;
            if (matchingVariant && matchingVariant.variantName) {
                const variantDisplay = matchingVariant.variantName.split(' | ').join(', ');
                displayTitle = `${productInfo.productTitle}, ${variantDisplay}`;
            }

            const productData = {
                productTitle: displayTitle,
                productImage: currentImages[0]?.imageLink || htmlData?.productImage,
                currentPrice: getCurrentPrice(),
                quantity: quantity,
                productId: productInfo._id,
                productVariantId: matchingVariant?._id || null,
                minQuantity: productInfo.minQuantity,
                maxQuantity: productInfo.maxQuantity,
                restrictToMoqMultiples: productInfo.restrictToMoqMultiples,
                instructionMessage: productInfo.instructionMessage,
                paidPersonalization: productInfo.paidPersonalization,
                personalizationPrice: productInfo.personalizationPrice,
                pricingMethod: productInfo.pricingMethod,
                personalizationText: productInfo.customizableProduct ? personalizationText : null,
            };

            console.log("productData ????", productData);

            await cartService.addToCart(flipbookId, productData);
            onOpenChange(false);
        } catch (error) {
            toast.error('Failed to add product to cart', {
                description: error.message,
            });
        }
    };

    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[calc(80vh-48px)]">
            <div className="space-y-4">
                <Skeleton className="w-full h-80 rounded-lg" />
                <div className="flex gap-2">
                    <Skeleton className="w-16 h-16 rounded" />
                    <Skeleton className="w-16 h-16 rounded" />
                </div>
            </div>

            <div className="space-y-4 overflow-y-auto p-2">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />

                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Skeleton className="h-4 w-12 mb-2" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div>
                            <Skeleton className="h-4 w-16 mb-2" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-20 w-full" />
                </div>

                <div className="space-y-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-8 w-24" />
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-10 w-32" />
                    </div>
                </div>

                <div className="space-x-3">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
            </div>
        </div>
    );

    const hasImages = currentImages?.length > 0;
    const hasPrice = productInfo?.price != null || productInfo?.discountPrice != null;
    const hasQuantityControls = productInfo?.minQuantity > 0 && productInfo?.maxQuantity > 0;

    const getSelectedVariantName = () => {
        if (!productInfo?.productVariants || !selectedVariant) return '';
        const variantKey = Object.entries(selectedVariant)
            .map(([key, value]) => `${value}`)
            .join(' | ');
        const matchingVariant = productInfo.productVariants.find(
            variant => variant.variantName.includes(variantKey)
        );
        if (matchingVariant && matchingVariant.variantName) {
            return matchingVariant.variantName.split(' | ').join(', ');
        }
        return '';
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] max-w-[90vw] lg:max-w-6xl overflow-y-auto">
                {isLoading ? (
                    <LoadingSkeleton />
                ) : productInfo ? (
                    <div className={`grid ${hasImages ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 overflow-y-auto max-h-[calc(80vh-48px)]`}>
                        {hasImages && (
                            <div className="space-y-4">
                                <div className="relative">
                                    <img
                                        src={currentImages[currentImageIndex]?.imageLink || htmlData?.productImage}
                                        alt={productInfo.productTitle || 'Product Image'}
                                        className="w-full h-80 object-contain rounded-lg"
                                    />

                                    {currentImages.length > 1 && (
                                        <>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80"
                                                onClick={prevImage}
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80"
                                                onClick={nextImage}
                                            >
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </>
                                    )}
                                </div>

                                {currentImages.length > 1 && (
                                    <div className="flex gap-2 overflow-x-auto">
                                        {currentImages.map((image, index) => (
                                            <img
                                                key={image.imageId}
                                                src={image.imageLink}
                                                alt={`${productInfo.productTitle || 'Product'} ${index + 1}`}
                                                className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${index === currentImageIndex ? 'border-black' : 'border-gray-200'}`}
                                                onClick={() => setCurrentImageIndex(index)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="space-y-4 overflow-y-auto p-2">
                            {(productInfo.productTitle || productInfo.sku) && (
                                <div>
                                    {productInfo.productTitle && (
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            {productInfo.productTitle}
                                            {getSelectedVariantName() && `, ${getSelectedVariantName()}`}
                                        </h2>
                                    )}
                                    {productInfo.sku && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            {productInfo.sku}
                                        </p>
                                    )}
                                </div>
                            )}

                            {productInfo.description && (
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {productInfo.description}
                                </p>
                            )}

                            {productInfo.productAttributes && productInfo.productAttributes.length > 0 && (
                                <div className="grid grid-cols-2 gap-4">
                                    {productInfo.productAttributes.map((attribute) => (
                                        <div key={attribute._id}>
                                            <Label className="text-sm font-medium">
                                                {attribute.attributeName}
                                            </Label>
                                            <Select
                                                value={selectedVariant[attribute.attributeName] || ''}
                                                onValueChange={(value) =>
                                                    handleVariantChange(attribute.attributeName, value)
                                                }
                                            >
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue placeholder={`Select ${attribute.attributeName}`} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {attribute.optionValues.map((value) => (
                                                        <SelectItem key={value} value={value}>
                                                            {value}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {productInfo.customizableProduct && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Label className={`text-sm font-medium ${personalizationError ? 'text-red-500' : ''}`}>
                                            {productInfo.instructionMessage}
                                            {productInfo.instructionMessageRequired && <span> *</span>}
                                        </Label>
                                        {productInfo.paidPersonalization && productInfo.personalizationPrice != null && (
                                            <Badge variant="secondary" className="text-xs">
                                                + {productInfo.personalizationPrice} INR
                                            </Badge>
                                        )}
                                    </div>
                                    <Textarea
                                        value={personalizationText}
                                        onChange={(e) => {
                                            if (!productInfo.paidPersonalization || !productInfo.charLimit || e.target.value.length <= productInfo.charLimit) {
                                                setPersonalizationText(e.target.value);
                                                setPersonalizationError('');
                                            }
                                        }}
                                        className={`resize-none ${personalizationError ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}`}
                                        rows={3}
                                        required={productInfo.instructionMessageRequired}
                                    />
                                    {personalizationError && (
                                        <div className="text-xs text-red-500">{personalizationError}</div>
                                    )}
                                    {productInfo.paidPersonalization && productInfo.charLimit && (
                                        <div className="text-xs text-gray-500 text-right">
                                            {personalizationText.length} / {productInfo.charLimit}
                                        </div>
                                    )}
                                </div>
                            )}

                            {hasPrice && (
                                <div>
                                    {getCurrentPrice().discountPrice != null && getCurrentPrice().price > getCurrentPrice().discountPrice && (
                                        <p className="text-sm text-gray-500 line-through">
                                            {getCurrentPrice().price} INR
                                        </p>
                                    )}
                                    <p className="text-xl font-bold text-gray-900">
                                        {getFinalPrice()} INR
                                    </p>
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                <div className="flex items-center border rounded-md p-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= (productInfo.minQuantity || 1)}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <Input
                                        value={quantity}
                                        onChange={(e) => {
                                            let val = parseInt(e.target.value) || productInfo.minQuantity || 1;
                                            const minQty = productInfo.minQuantity || 1;
                                            const maxQty = productInfo.maxQuantity || 100;
                                            const restrictToMoqMultiples = productInfo.restrictToMoqMultiples;

                                            if (restrictToMoqMultiples) {
                                                // Snap to nearest lower multiple of minQty
                                                val = Math.max(minQty, Math.floor(val / minQty) * minQty);
                                            }

                                            if (val >= minQty && val <= maxQty) {
                                                setQuantity(val);
                                            }
                                        }}
                                        readOnly
                                        className="w-16 text-center border-0 focus-visible:ring-0 shadow-none"
                                        min={productInfo.minQuantity || 1}
                                        max={productInfo.maxQuantity || 100}
                                    />
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleQuantityChange(1)}
                                        disabled={quantity >= (productInfo.maxQuantity || 100)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                {hasQuantityControls && (
                                    <div className="text-xs text-gray-500">
                                        {productInfo.minQuantity} / {productInfo.maxQuantity}
                                    </div>
                                )}
                            </div>

                            <div className="space-x-3">
                                {htmlData?.customizeButton?.secondaryButton && (
                                    <Button
                                        variant="outline"
                                        onClick={() => window.open(htmlData.customizeButton.secondaryButtonLink, '_blank')}
                                    >
                                        {htmlData.customizeButton.secondaryButtonLabel}
                                    </Button>
                                )}
                                <Button
                                    style={{
                                        backgroundColor: htmlData?.customizeButton?.buttonColor || '#774B15',
                                        color: htmlData?.customizeButton?.labelColor || '#DD400E',
                                    }}
                                    onClick={handleAddToCart}
                                >
                                    {htmlData?.customizeButton?.buttonLabel || 'Add to Cart'}
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500">Failed to load product information</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ShopAreaModal;