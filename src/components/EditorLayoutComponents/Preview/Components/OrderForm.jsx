import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle } from 'lucide-react';
import { useShopSettings } from '@/context/ShopSettingsContext';
import cartService from '@/service/IndexedDBCart.service';
import { CreateOrderApi } from '@/service/order.service';
import LoadingButton from '@/utils/LoadingButton';
import { getContrastTextColor, hexToHslComponents } from '@/utils/colorUtils';

const createOrderFormSchema = (customerFields, shopSettings) => {
    const baseSchema = {};

    // Find all email field indices
    const emailFieldIndices = customerFields
        .map((field, idx) => field.type === 'email' ? idx : -1)
        .filter(idx => idx !== -1);

    customerFields.forEach((field, index) => {
        const fieldKey = `field_${index}`;
        // Special logic for email fields
        if (field.type === 'email') {
            if (emailFieldIndices.length === 1) {
                // Only one email field: always required
                baseSchema[fieldKey] = z.string()
                    .min(1, `${field.label} is required`)
                    .email('Please enter a valid email address');
            } else if (emailFieldIndices.length > 1) {
                if (index === emailFieldIndices[0]) {
                    // First email field: always required
                    baseSchema[fieldKey] = z.string()
                        .min(1, `${field.label} is required`)
                        .email('Please enter a valid email address');
                } else {
                    // All other email fields: always optional
                    baseSchema[fieldKey] = z.string()
                        .optional()
                        .refine((val) => !val || z.string().email().safeParse(val).success, {
                            message: 'Please enter a valid email address'
                        });
                }
            }
        } else if (field.required) {
            switch (field.type) {
                case 'phone_number':
                    baseSchema[fieldKey] = z.string()
                        .min(1, `${field.label} is required`)
                        .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number');
                    break;
                case 'website':
                    baseSchema[fieldKey] = z.string()
                        .min(1, `${field.label} is required`)
                        .regex(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, 'Please enter a valid website URL');
                    break;
                case 'custom_input':
                default:
                    baseSchema[fieldKey] = z.string()
                        .min(1, `${field.label} is required`);
                    break;
            }
        } else {
            switch (field.type) {
                case 'phone_number':
                    baseSchema[fieldKey] = z.string()
                        .optional()
                        .refine((val) => !val || /^[\+]?[1-9][\d]{0,15}$/.test(val), {
                            message: 'Please enter a valid phone number'
                        });
                    break;
                case 'website':
                    baseSchema[fieldKey] = z.string()
                        .optional()
                        .refine((val) => !val || /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(val), {
                            message: 'Please enter a valid website URL'
                        });
                    break;
                case 'custom_input':
                default:
                    baseSchema[fieldKey] = z.string().optional();
                    break;
            }
        }
    });

    if (shopSettings.showPrivacyPolicy) {
        baseSchema.privacyAccepted = z.boolean().refine(val => val === true, {
            message: 'You must accept the privacy policy'
        });
    }

    if (shopSettings.shopEmailType === 1) {
        baseSchema.conditionalInboxOption = z.string().min(1, 'Please select a location');
    }

    return z.object(baseSchema);
};

const OrderForm = ({ open, onOpenChange, flipbookId, visibilitySettings, container }) => {
    const { shopSettings, isLoading } = useShopSettings();
    const [currentView, setCurrentView] = useState('form');
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const isRTL = visibilitySettings?.rightToLeftOrientation;

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
        trigger,
    } = useForm({
        resolver: shopSettings ? zodResolver(createOrderFormSchema(shopSettings.customerFields || [], shopSettings)) : undefined,
        mode: 'onChange',
        defaultValues: {
            privacyAccepted: false,
            conditionalInboxOption: '',
        }
    });

    const watchedValues = watch();

    const isFormValid = () => {
        if (!shopSettings) return false;
        for (let i = 0; i < (shopSettings.customerFields?.length || 0); i++) {
            const field = shopSettings.customerFields[i];
            const value = watchedValues[`field_${i}`];
            if (field.required && (!value || value.trim() === '')) {
                return false;
            }
        }
        if (Object.keys(errors).length > 0) {
            return false;
        }
        if (shopSettings.showPrivacyPolicy && !privacyAccepted) {
            return false;
        }
        if (shopSettings.shopEmailType === 1 && !watchedValues.conditionalInboxOption) {
            return false;
        }
        return true;
    };

    const handleFieldChange = async (fieldIndex, value) => {
        setValue(`field_${fieldIndex}`, value, { shouldValidate: true });
        await trigger(`field_${fieldIndex}`);
    };

    const handlePrivacyChange = (checked) => {
        setPrivacyAccepted(checked);
        setValue('privacyAccepted', checked, { shouldValidate: true });
    };

    const handleLocationChange = (value) => {
        setSelectedLocation(value);
        setValue('conditionalInboxOption', value, { shouldValidate: true });
    };

    const onSubmit = async (data) => {
        if (!isFormValid()) {
            toast.error('Please complete all required fields');
            return;
        }
        if (!flipbookId) {
            toast.error('Flipbook ID is missing.');
            return;
        }
        setSubmitting(true);
        try {
            const cartItems = await cartService.getCart(flipbookId);
            if (!cartItems || cartItems.length === 0) {
                toast.error('Your cart is empty.');
                setSubmitting(false);
                return;
            }
            let email = '';
            (shopSettings.customerFields || []).forEach((field, idx) => {
                if (field.type === 'email' && !email) {
                    email = data[`field_${idx}`];
                }
            });
            const products = cartItems.map(item => ({
                productId: item.productId,
                variantId: item.productVariantId || undefined,
                quantity: item.productQty,
                customizationText: item.personalizationText || undefined,
            }));
            const customerFields = (shopSettings.customerFields || []).map((field, idx) => ({
                label: field.label,
                value: data[`field_${idx}`],
            }));
            const payload = {
                email,
                flipbookId,
                products,
                customerFields,
            };
            if (shopSettings.shopEmailType === 1) {
                payload.conditionalInboxSelection = data.conditionalInboxOption;
            }
            await CreateOrderApi(payload);
            await cartService.clearCart(flipbookId);
            toast.success(shopSettings.orderConfirmationMessage || 'Order submitted successfully!');
            setCurrentView('success');
        } catch (err) {
            toast.error('Failed to submit order', { description: err.message });
        } finally {
            setSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        setCurrentView('form');
        setPrivacyAccepted(false);
        setSelectedLocation('');
        reset();
        onOpenChange && onOpenChange(false);
    };

    const renderField = (field, index) => {
        const fieldKey = `field_${index}`;
        const fieldValue = watchedValues[fieldKey] || '';
        const hasError = errors[fieldKey];
        const commonProps = {
            id: fieldKey,
            placeholder: field.label,
            value: fieldValue,
            onChange: (e) => handleFieldChange(index, e.target.value),
            className: `mt-1 ${hasError ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}`
        };
        switch (field.type) {
            case 'email':
                return (
                    <Input
                        {...commonProps}
                        type="email"
                        {...register(fieldKey)}
                    />
                );
            case 'phone_number':
                return (
                    <Input
                        {...commonProps}
                        type="tel"
                        {...register(fieldKey)}
                    />
                );
            case 'website':
                return (
                    <Input
                        {...commonProps}
                        type="url"
                        {...register(fieldKey)}
                    />
                );
            case 'custom_input':
            default:
                return (
                    <Input
                        {...commonProps}
                        type="text"
                        {...register(fieldKey)}
                    />
                );
        }
    };

    if (isLoading) {
        return (
            <Dialog open={open} onOpenChange={handleCloseModal}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        {[1, 2, 3, 4].map((_, index) => (
                            <div key={index} className="space-y-2">
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        ))}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    if (!shopSettings) return null;

    const renderFormView = () => (
        <div className="space-y-4" style={{ '--ring': hexToHslComponents(visibilitySettings?.playerAccentColorHash) }}>
            {shopSettings.contactTitle && (
                <h3 className="text-lg font-semibold text-gray-800">{shopSettings.contactTitle}</h3>
            )}
            {shopSettings.contactDescription && (
                <p className="text-sm text-gray-600 mb-4">{shopSettings.contactDescription}</p>
            )}
            {shopSettings.shopEmailType === 1 && (
                <div>
                    <Label htmlFor="conditionalInboxOption" className="text-sm font-medium">
                        {shopSettings.conditionalInboxDescription || 'Select location'} <span className="text-red-500">*</span>
                    </Label>
                    <Select value={selectedLocation} onValueChange={handleLocationChange}>
                        <SelectTrigger id="conditionalInboxOption" className={errors.conditionalInboxOption ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}>
                            <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                            {(shopSettings.conditionalInboxOptions || []).map((opt) => (
                                <SelectItem key={opt._id} value={opt.option}>{opt.option}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.conditionalInboxOption && (
                        <p className="text-xs text-red-500 mt-1">{errors.conditionalInboxOption.message}</p>
                    )}
                </div>
            )}
            {(shopSettings.customerFields || []).map((field, index) => {
                // Determine required asterisk logic for email fields
                let showAsterisk = false;
                if (field.type === 'email') {
                    const emailFieldIndices = (shopSettings.customerFields || [])
                        .map((f, idx) => f.type === 'email' ? idx : -1)
                        .filter(idx => idx !== -1);
                    if (emailFieldIndices.length === 1) {
                        showAsterisk = true;
                    } else if (emailFieldIndices.length > 1 && index === emailFieldIndices[0]) {
                        showAsterisk = true;
                    }
                } else if (field.required) {
                    showAsterisk = true;
                }
                return (
                    <div key={field._id}>
                        <Label htmlFor={`field_${index}`} className="text-sm font-medium">
                            {field.label} {showAsterisk && <span className="text-red-500">*</span>}
                        </Label>
                        {renderField(field, index)}
                        {errors[`field_${index}`] && (
                            <p className="text-xs text-red-500 mt-1">{errors[`field_${index}`].message}</p>
                        )}
                    </div>
                );
            })}
            {shopSettings.showPrivacyPolicy && (
                <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-start gap-2">
                        <Checkbox
                            id="privacy"
                            checked={privacyAccepted}
                            onCheckedChange={handlePrivacyChange}
                            className="mt-0.5"
                            style={{
                                borderColor: visibilitySettings?.playerAccentColorHash,
                                backgroundColor: privacyAccepted ? visibilitySettings?.playerAccentColorHash : undefined,
                                color: privacyAccepted ? 'white' : undefined
                            }}
                        />
                        <Label htmlFor="privacy" className="text-sm leading-relaxed">
                            I agree to the following company's Privacy Policy:
                            <a
                                href={shopSettings.privacyPolicyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline ml-1"
                                style={{ color: visibilitySettings?.playerAccentColorHash }}
                            >
                                {shopSettings.privacyPolicyCompanyName}
                            </a> <span className="text-red-500">*</span>
                        </Label>
                    </div>
                </div>
            )}
            <Button
                onClick={handleSubmit(onSubmit)}
                className="w-full"
                disabled={!isFormValid()}
                style={{
                    backgroundColor: visibilitySettings?.playerAccentColorHash,
                    color: getContrastTextColor(visibilitySettings?.playerAccentColorHash)
                }}
            >
                {submitting ? <LoadingButton /> : (shopSettings.checkoutButtonLabel || 'Place Order')}
            </Button>
        </div>
    );

    const renderSuccessView = () => (
        <div className="text-center space-y-4">
            <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold">
                {shopSettings.orderConfirmationMessage || "Thank you for your order!"}
            </h3>
            <Button
                onClick={handleCloseModal}
                className="w-full"
                style={{
                    backgroundColor: visibilitySettings?.playerAccentColorHash,
                    color: getContrastTextColor(visibilitySettings?.playerAccentColorHash)
                }}
            >
                Close
            </Button>
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={handleCloseModal}>
            <DialogContent container={container} className={`sm:max-w-[540px] w-[90vw] max-h-[90vh] overflow-y-auto${isRTL ? "text-right" : "text-left"}`} dir={isRTL ? "rtl" : "ltr"}>
                {currentView === 'form' && renderFormView()}
                {currentView === 'success' && renderSuccessView()}
            </DialogContent>
        </Dialog>
    );
};

export default OrderForm;
