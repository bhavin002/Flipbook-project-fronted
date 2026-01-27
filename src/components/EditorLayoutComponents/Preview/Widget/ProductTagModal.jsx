import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductTagModal = ({ open, onOpenChange, htmlData, container }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const defaultTitle = "My product title";
    const defaultDescription = "My product description";
    const defaultButtonLabel = "Shop this item";
    const defaultProductUrl = "http://www.mywebsite.com"

    const title = htmlData === undefined ? defaultTitle : htmlData?.title;
    const description = htmlData === undefined ? defaultDescription : htmlData?.description;
    const buttonLabel = htmlData === undefined ? defaultButtonLabel : htmlData?.buttonLabel;
    const productUrl = htmlData === undefined ? defaultProductUrl : htmlData?.productUrl;

    const images = htmlData?.images || [];
    const hasImages = images.length > 0;

    const rawPrice = htmlData?.price;
    const rawDiscountPrice = htmlData?.discountPrice;
    const price = rawPrice === "" || rawPrice == null ? null : parseFloat(rawPrice) || 0;
    const discountPrice = rawDiscountPrice === "" || rawDiscountPrice == null ? null : parseFloat(rawDiscountPrice) || null;

    const hasPrice = price != null;

    const getFinalPrice = () => {
        return discountPrice != null ? discountPrice : price;
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const isNonEmptyString = (str) => typeof str === 'string' && str.trim() !== '';

    const showTitle = isNonEmptyString(title);
    const showDescription = isNonEmptyString(description);
    const showTitleOrDescriptionSection = showTitle || showDescription;
    const showButton = isNonEmptyString(buttonLabel) && isNonEmptyString(productUrl);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[80vh] max-w-[90vw] lg:max-w-6xl overflow-y-auto z-[10000]" container={container}>
                <div className={`grid ${hasImages ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 overflow-y-auto max-h-[calc(80vh-48px)]`}>
                    {hasImages && (
                        <div className="space-y-4">
                            <div className="relative">
                                <img
                                    src={images[currentImageIndex]?.url}
                                    alt={`${title || 'Product'} Image`}
                                    className="w-full h-80 object-contain rounded-lg"
                                />

                                {images.length > 1 && (
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

                            {images.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto">
                                    {images.map((image, index) => (
                                        <img
                                            key={image.fileId}
                                            src={image.url}
                                            alt={`${title || 'Product'} ${index + 1}`}
                                            className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${index === currentImageIndex ? 'border-black' : 'border-gray-200'}`}
                                            onClick={() => setCurrentImageIndex(index)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="space-y-4 p-2">
                        {showTitleOrDescriptionSection && (
                            <div>
                                {showTitle && (
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        {title}
                                    </h2>
                                )}
                                {showDescription && (
                                    <p className="text-sm text-gray-700 leading-relaxed mt-1 whitespace-pre-line">
                                        {description}
                                    </p>
                                )}
                            </div>
                        )}

                        {hasPrice && (
                            <div>
                                {discountPrice != null && price > discountPrice && (
                                    <p className="text-sm text-gray-500 line-through">
                                        {price} INR
                                    </p>
                                )}
                                <p className="text-xl font-bold text-gray-900">
                                    {getFinalPrice()} INR
                                </p>
                            </div>
                        )}

                        {showButton && (
                            <div className="space-y-3">
                                <Button
                                    className="bg-black text-white hover:bg-black/80"
                                    onClick={() => {
                                        let url = htmlData.productUrl;
                                        if (url && !/^https?:\/\//i.test(url)) {
                                            url = 'https://' + url;
                                        }
                                        window.open(url, '_blank');
                                    }}
                                >
                                    {buttonLabel}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProductTagModal;