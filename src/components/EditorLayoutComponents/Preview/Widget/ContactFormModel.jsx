import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';
import { getContactFormApi, getPublishedContactFormApi } from '@/service/contactForm.service';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle } from 'lucide-react';
import { ContactSubmissionApi } from '@/service/contactSubmission.service';
import LoadingButton from '@/utils/LoadingButton';

const createContactFormSchema = (customerFields, settings) => {
    const baseSchema = {};

    customerFields.forEach((field, index) => {
        const fieldKey = `field_${index}`;

        if (field.required) {
            switch (field.type) {
                case 'email':
                    baseSchema[fieldKey] = z.string()
                        .min(1, `${field.label} is required`)
                        .email('Please enter a valid email address');
                    break;
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
                case 'email':
                    baseSchema[fieldKey] = z.string()
                        .optional()
                        .refine((val) => !val || z.string().email().safeParse(val).success, {
                            message: 'Please enter a valid email address'
                        });
                    break;
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

    if (settings.addPrivacyPolicy) {
        baseSchema.privacyAccepted = z.boolean().refine(val => val === true, {
            message: 'You must accept the privacy policy'
        });
    }

    if (settings.addGDPRCompliance) {
        baseSchema.gdprAccepted = z.boolean().refine(val => val === true, {
            message: 'You must accept the GDPR compliance'
        });
    }

    return z.object(baseSchema);
};

const ContactFormModel = ({ open, onOpenChange, htmlData, flipbookId, container, isPublicView }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [contactFormInfo, setContactFormInfo] = useState(null);
    const [currentView, setCurrentView] = useState('form');
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [gdprAccepted, setGdprAccepted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
        trigger,
    } = useForm({
        resolver: contactFormInfo ? zodResolver(createContactFormSchema(contactFormInfo.customerFields, contactFormInfo.settings)) : undefined,
        mode: 'onChange',
        defaultValues: {
            privacyAccepted: false,
            gdprAccepted: false
        }
    });

    useEffect(() => {
        const getContactFormInfo = async () => {
            try {
                setIsLoading(true);
                const response = isPublicView ? await getPublishedContactFormApi(htmlData.variantId) : await getContactFormApi(htmlData.variantId);
                setContactFormInfo(response.data);
            } catch (error) {
                toast.error('Failed to load contact form information', {
                    description: error.message,
                });
            } finally {
                setIsLoading(false);
            }
        };

        if (open && htmlData?.variantId) {
            getContactFormInfo();
        }
    }, [open, htmlData?.variantId]);

    const watchedValues = watch();

    const isFormValid = () => {
        if (!contactFormInfo) return false;

        // Check required fields
        for (let i = 0; i < contactFormInfo.customerFields.length; i++) {
            const field = contactFormInfo.customerFields[i];
            const value = watchedValues[`field_${i}`];

            if (field.required && (!value || value.trim() === '')) {
                return false;
            }
        }

        // Check validation errors
        if (Object.keys(errors).length > 0) {
            return false;
        }

        // Check privacy policy
        if (contactFormInfo.settings.addPrivacyPolicy && !privacyAccepted) {
            return false;
        }

        // Check GDPR compliance
        if (contactFormInfo.settings.addGDPRCompliance && !gdprAccepted) {
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

    const handleGdprChange = (checked) => {
        setGdprAccepted(checked);
        setValue('gdprAccepted', checked, { shouldValidate: true });
    };

    const onSubmit = async (data) => {
        if (!isFormValid()) {
            toast.error('Please complete all required fields');
            return;
        }
        setSubmitting(true);
        try {
            const submittedFields = contactFormInfo.customerFields.map((field, index) => ({
                fieldId: field._id,
                type: field.type,
                value: data[`field_${index}`]
            }));
            const payload = {
                contactFormId: htmlData.variantId,
                privacyAccepted: !!privacyAccepted,
                gdprAccepted: !!gdprAccepted,
                submittedFields,
                flipbookId: flipbookId
            };
            await ContactSubmissionApi(payload);
            setCurrentView('success');
        } catch (error) {
            toast.error('Failed to submit form', { description: error.message });
        } finally {
            setSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        setCurrentView('form');
        setPrivacyAccepted(false);
        setGdprAccepted(false);
        reset();
        onOpenChange(false);
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
                <DialogContent className="max-h-[90vh] max-w-[90vw] lg:max-w-2xl overflow-y-auto z-[10000]" container={container}>
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
                            <div className="flex items-center space-x-2">
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

    if (!contactFormInfo) return null;

    const renderFormView = () => (
        <div className="space-y-4">
            {contactFormInfo.description && (
                <p className="text-sm text-gray-600 mb-4">
                    {contactFormInfo.description}
                </p>
            )}

            {contactFormInfo.customerFields.map((field, index) => (
                <div key={field._id}>
                    <Label htmlFor={`field_${index}`} className="text-sm font-medium">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                    </Label>
                    {renderField(field, index)}
                </div>
            ))}

            {(contactFormInfo.settings.addPrivacyPolicy || contactFormInfo.settings.addGDPRCompliance) && (
                <div className="space-y-3 pt-4 border-t">
                    {contactFormInfo.settings.addPrivacyPolicy && (
                        <div className="flex items-start space-x-2">
                            <Checkbox
                                id="privacy"
                                checked={privacyAccepted}
                                onCheckedChange={handlePrivacyChange}
                                className="mt-0.5"
                            />
                            <Label htmlFor="privacy" className="text-sm leading-relaxed">
                                I agree to the following company's Privacy Policy:
                                <a
                                    href={contactFormInfo.settings.privacyPolicyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline ml-1"
                                >
                                    {contactFormInfo.settings.companyName}
                                </a> <span className="text-red-500">*</span>
                            </Label>
                        </div>
                    )}

                    {contactFormInfo.settings.addGDPRCompliance && (
                        <div className="flex items-start space-x-2">
                            <Checkbox
                                id="gdpr"
                                checked={gdprAccepted}
                                onCheckedChange={handleGdprChange}
                                className="mt-0.5"
                            />
                            <Label htmlFor="gdpr" className="text-sm leading-relaxed">
                                {contactFormInfo.settings.gdprMessage} <span className="text-red-500">*</span>
                            </Label>
                        </div>
                    )}
                </div>
            )}

            <Button
                onClick={handleSubmit(onSubmit)}
                className="w-full"
                disabled={!isFormValid() || submitting}
            >
                {submitting ? <LoadingButton /> : (contactFormInfo.settings.buttonLabel || 'Submit')}
            </Button>
        </div>
    );

    const renderSuccessView = () => (
        <div className="text-center space-y-4">
            <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold">
                {contactFormInfo.settings.thankYouMessage || "Thank you for your submission!"}
            </h3>
            <Button onClick={handleCloseModal} className="w-full">
                Close
            </Button>
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={handleCloseModal}>
            <DialogContent className="max-h-[90vh] max-w-[90vw] lg:max-w-2xl overflow-y-auto z-[10000]" container={container}>
                <DialogHeader>
                    <DialogTitle className="text-lg text-gray-800">
                        {contactFormInfo.formTitle}
                    </DialogTitle>
                </DialogHeader>
                {currentView === 'form' && renderFormView()}
                {currentView === 'success' && renderSuccessView()}
            </DialogContent>
        </Dialog>
    );
};

export default ContactFormModel;