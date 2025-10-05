import React, { useRef, useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle } from 'lucide-react';

const createLeadFormSchema = (fields, settings) => {
    const baseSchema = {};

    fields.forEach((field, index) => {
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

    if (settings.gdprCompliancyCheck) {
        baseSchema.gdprAccepted = z.boolean().refine(val => val === true, {
            message: 'You must accept the GDPR compliance'
        });
    }

    return z.object(baseSchema);
};

const LeadFormModel = ({ open, onOpenChange, leadFormData }) => {
    const [currentView, setCurrentView] = useState('form');
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [gdprAccepted, setGdprAccepted] = useState(false);
    const containerRef = useRef(null); // Ref for the parent container

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
        trigger,
    } = useForm({
        resolver: leadFormData ? zodResolver(createLeadFormSchema(leadFormData.fields, leadFormData)) : undefined,
        mode: 'onChange',
        defaultValues: {
            privacyAccepted: false,
            gdprAccepted: false
        }
    });

    const watchedValues = watch();

    const isFormValid = () => {
        if (!leadFormData) return false;

        // Check required fields
        for (let i = 0; i < leadFormData.fields.length; i++) {
            const field = leadFormData.fields[i];
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
        if (leadFormData.addPrivacyPolicy && !privacyAccepted) {
            return false;
        }

        // Check GDPR compliance
        if (leadFormData.gdprCompliancyCheck && !gdprAccepted) {
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

    const onSubmit = (data) => {
        if (!isFormValid()) {
            toast.error('Please complete all required fields');
            return;
        }

        // Process form data
        const formData = {};
        leadFormData.fields.forEach((field, index) => {
            formData[field.label] = data[`field_${index}`];
        });

        toast.success('Form submitted successfully!');
        setCurrentView('success');
    };

    const handleCloseModal = () => {
        setCurrentView('form');
        setPrivacyAccepted(false);
        setGdprAccepted(false);
        reset();
        onOpenChange(false);
    };

    const handleSkip = () => {
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

    if (!leadFormData) return null;

    const renderFormView = () => (
        <div className="space-y-4">
            {leadFormData.fields.map((field, index) => (
                <div key={index}>
                    <Label htmlFor={`field_${index}`} className="text-sm font-medium">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                    </Label>
                    {renderField(field, index)}
                </div>
            ))}

            {(leadFormData.addPrivacyPolicy || leadFormData.gdprCompliancyCheck) && (
                <div className="space-y-3 pt-4 border-t">
                    {leadFormData.addPrivacyPolicy && (
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
                                    href={leadFormData.privacyPolicyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline ml-1"
                                >
                                    {leadFormData.companyName}
                                </a> <span className="text-red-500">*</span>
                            </Label>
                        </div>
                    )}

                    {leadFormData.gdprCompliancyCheck && (
                        <div className="flex items-start space-x-2">
                            <Checkbox
                                id="gdpr"
                                checked={gdprAccepted}
                                onCheckedChange={handleGdprChange}
                                className="mt-0.5"
                            />
                            <Label htmlFor="gdpr" className="text-sm leading-relaxed">
                                {leadFormData.gdprMessage} <span className="text-red-500">*</span>
                            </Label>
                        </div>
                    )}
                </div>
            )}

            <div className="flex gap-2">
                <Button
                    onClick={handleSubmit(onSubmit)}
                    className="flex-1"
                    disabled={!isFormValid()}
                >
                    {leadFormData.submitButtonText}
                </Button>
                {leadFormData.allowSkip && (
                    <Button
                        variant="outline"
                        onClick={handleSkip}
                        className="flex-1"
                    >
                        {leadFormData.skipButtonText}
                    </Button>
                )}
            </div>
        </div>
    );

    const renderSuccessView = () => (
        <div className="text-center space-y-4">
            <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold">
                Thank you for your submission!
            </h3>
            <Button onClick={handleCloseModal} className="w-full">
                Close
            </Button>
        </div>
    );

    return (
        <div ref={containerRef}>
            <Dialog open={open} onOpenChange={handleCloseModal}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto" container={containerRef.current}>
                    <DialogHeader>
                        <DialogTitle className="text-lg text-gray-800">
                            {leadFormData.title}
                        </DialogTitle>
                    </DialogHeader>
                    {currentView === 'form' && renderFormView()}
                    {currentView === 'success' && renderSuccessView()}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default LeadFormModel;