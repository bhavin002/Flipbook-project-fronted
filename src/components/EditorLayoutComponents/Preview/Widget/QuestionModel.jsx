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
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import { getQuestionFormApi } from '@/service/question.service';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle } from 'lucide-react';
import { CreateQuestionFormResponseApi } from '@/service/questionFormResponse.service';
import LoadingButton from '@/utils/LoadingButton';

const createQuestionSchema = (formData) => {
    const baseSchema = {
        response: z.string().min(1, 'Please provide your response')
    };

    if (formData.collectEmailAddress) {
        baseSchema.email = z.string().email('Please enter a valid email address');
    }

    return z.object(baseSchema);
};

const QuestionModel = ({ open, onOpenChange, htmlData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(null);
    const [currentView, setCurrentView] = useState('question');
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
        resolver: formData ? zodResolver(createQuestionSchema(formData)) : undefined,
        mode: 'onChange'
    });

    useEffect(() => {
        const getQuestionData = async () => {
            try {
                setIsLoading(true);
                const response = await getQuestionFormApi(htmlData.variantId);
                setFormData(response.data);
            } catch (error) {
                toast.error('Failed to load question information', {
                    description: error.message,
                });
            } finally {
                setIsLoading(false);
            }
        };

        if (open && htmlData?.variantId) {
            getQuestionData();
        }
    }, [open, htmlData?.variantId]);

    const watchedValues = watch();

    const isFormValid = () => {
        if (!formData) return false;

        // Check if response is provided
        const response = watchedValues.response;
        if (!response || response.trim() === '' || errors.response) {
            return false;
        }

        // Check email if required
        if (formData.collectEmailAddress) {
            const email = watchedValues.email;
            if (!email || !email.includes('@') || errors.email) {
                return false;
            }
        }

        // Check privacy policy if required
        if (formData.addPrivacyPolicy && !privacyAccepted) {
            return false;
        }

        // Check GDPR compliance if required
        if (formData.addGDPRCompliance && !gdprAccepted) {
            return false;
        }

        return true;
    };

    const handleEmailChange = async (e) => {
        setValue('email', e.target.value, { shouldValidate: true });
        await trigger('email');
    };

    const handleResponseChange = async (e) => {
        setValue('response', e.target.value, { shouldValidate: true });
        await trigger('response');
    };

    const onSubmit = async (data) => {
        setSubmitting(true);
        if (!isFormValid()) {
            toast.error('Please complete all required fields');
            return;
        }
        try {
            const payload = {
                questionFormId: htmlData.variantId,
                email: data.email,
                answer: data.response,
                addGDPRCompliance: !!formData.addGDPRCompliance && !!gdprAccepted,
                addPrivacyPolicy: !!formData.addPrivacyPolicy && !!privacyAccepted,
            };
            await CreateQuestionFormResponseApi(payload);
            setCurrentView('success');
            toast.success('Response submitted successfully!');
        } catch (err) {
            toast.error('Failed to submit response', { description: err.message });
        } finally {
            setSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        setCurrentView('question');
        setPrivacyAccepted(false);  
        setGdprAccepted(false);
        reset();
        onOpenChange(false);
    };

    const handleBackToQuestion = () => {
        setCurrentView('question');
        setPrivacyAccepted(false);
        setGdprAccepted(false);
        reset();
        setValue('response', '');
        setValue('email', '');
    };

    if (isLoading) {
        return (
            <Dialog open={open} onOpenChange={handleCloseModal}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    </DialogHeader>

                    <div className="space-y-6 mt-4">
                        <div className="space-y-2">
                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                        </div>

                        <div className="space-y-2">
                            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-24 w-full bg-gray-200 rounded animate-pulse"></div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>

                        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    if (!formData) return null;

    const renderQuestionView = () => (
        <div className="space-y-4">
            {/* Email Collection */}
            {formData.collectEmailAddress && (
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                        Email address *
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        {...register('email')}
                        onChange={handleEmailChange}
                        className={`${errors.email && "border-red-500 focus:outline-none focus-visible:ring-0"}`}
                    />
                </div>
            )}

            {/* Question Response */}
            <div className="space-y-2">
                <Label htmlFor="response" className="text-sm font-medium">
                    {formData.question} *
                </Label>
                <Textarea
                    id="response"
                    placeholder="Type your response here..."
                    rows={4}
                    {...register('response')}
                    onChange={handleResponseChange}
                    className={`resize-none ${errors.response && "border-red-500 focus:outline-none focus-visible:ring-0"}`}
                />
            </div>

            <div className='space-y-2'>
                {/* Privacy Policy */}
                {formData.addPrivacyPolicy && formData.companyName && formData.privacyPolicyLink && (
                    <div className="flex items-start space-x-2">
                        <Checkbox
                            id="privacy"
                            checked={privacyAccepted}
                            onCheckedChange={setPrivacyAccepted}
                            className="mt-1"
                        />
                        <Label htmlFor="privacy" className="text-sm leading-relaxed">
                            I agree to the following company's Privacy Policy:
                            <a
                                href={formData.privacyPolicyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline ml-1"
                            >
                                {formData.companyName}
                            </a> *
                        </Label>
                    </div>
                )}

                {/* GDPR Compliance */}
                {formData.addGDPRCompliance && formData.formulateMessage && (
                    <div className="flex items-start space-x-2">
                        <Checkbox
                            id="gdpr"
                            checked={gdprAccepted}
                            onCheckedChange={setGdprAccepted}
                            className="mt-1"
                        />
                        <Label htmlFor="gdpr" className="text-sm leading-relaxed">
                            {formData.formulateMessage} *
                        </Label>
                    </div>
                )}
            </div>

            <Button
                onClick={handleSubmit(onSubmit)}
                className="w-full"
                disabled={!isFormValid() || submitting}
            >
                {submitting ? <LoadingButton /> : (formData.buttonLabel || 'Submit')}
            </Button>
        </div>
    );

    const renderSuccessView = () => (
        <div className="text-center space-y-6">
            <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
            </div>

            <h3 className="text-xl font-semibold">
                {formData.thankYouMessage || 'Thank you for your response!'}
            </h3>
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={handleCloseModal}>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-lg text-gray-800">
                        {currentView === 'question'
                            ? (htmlData?.question || 'Your Question')
                            : 'Response Submitted'
                        }
                    </DialogTitle>
                </DialogHeader>

                {currentView === 'question' && renderQuestionView()}
                {currentView === 'success' && renderSuccessView()}
            </DialogContent>
        </Dialog>
    );
};

export default QuestionModel;