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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from 'sonner';
import { quizAttemptApi, getQuizAttemptApi, getQuizByIdApi, getPublishedQuizByIdApi } from '@/service/quizAttempt.service';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { getContrastTextColor, hexToHslComponents } from '@/utils/colorUtils';

const createQuizSchema = (collectEmail, questions) => {
    const baseSchema = {};

    if (collectEmail) {
        baseSchema.email = z.string().email('Please enter a valid email address');
    }

    questions.forEach((_, index) => {
        baseSchema[`question_${index}`] = z.union([
            z.string().min(1, 'Please select an answer'),
            z.array(z.string()).min(1, 'Please select at least one answer')
        ]);
    });

    return z.object(baseSchema);
};

const QuizModel = ({ open, onOpenChange, htmlData, flipbookId, container, isPublicView, visibilitySettings }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [quizInfo, setQuizInfo] = useState(null);
    const [currentView, setCurrentView] = useState('quiz');
    const [quizResult, setQuizResult] = useState(null);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [gdprAccepted, setGdprAccepted] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [resultLoading, setResultLoading] = useState(false);
    const [detailedResultLoading, setDetailedResultLoading] = useState(false);
    const [detailedQuizResult, setDetailedQuizResult] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
        trigger,
    } = useForm({
        resolver: quizInfo ? zodResolver(createQuizSchema(quizInfo.settings.collectEmail, quizInfo.questions)) : undefined,
        mode: 'onChange'
    });

    useEffect(() => {
        const getQuizData = async () => {
            try {
                setIsLoading(true);
                const response = isPublicView ? await getPublishedQuizByIdApi(htmlData.variantId) : await getQuizByIdApi(htmlData.variantId);
                setQuizInfo(response.data);
            } catch (error) {
                toast.error('Failed to load quiz information', {
                    description: error.message,
                });
            } finally {
                setIsLoading(false);
            }
        };

        if (open && htmlData?.variantId) {
            getQuizData();
        }
    }, [open, htmlData?.variantId]);

    const watchedValues = watch();

    const isFormValid = () => {
        if (!quizInfo) return false;

        if (quizInfo.settings.collectEmail) {
            const email = watchedValues.email;
            if (!email || !email.includes('@') || errors.email) {
                return false;
            }
            if (quizInfo.settings.addPrivacyPolicy && !privacyAccepted) {
                return false;
            }
            if (quizInfo.settings.addGDPRCompliance && !gdprAccepted) {
                return false;
            }
        }

        for (let i = 0; i < quizInfo.questions.length; i++) {
            const answer = watchedValues[`question_${i}`];
            const question = quizInfo.questions[i];

            if (question.isMultipleAnswer) {
                if (!answer || !Array.isArray(answer) || answer.length === 0) {
                    return false;
                }
            } else {
                if (!answer || answer === '') {
                    return false;
                }
            }
        }

        return true;
    };

    const handleAnswerChange = async (questionIndex, optionId, isMultiple) => {
        if (isMultiple) {
            const currentAnswers = watchedValues[`question_${questionIndex}`] || [];
            const newAnswers = currentAnswers.includes(optionId)
                ? currentAnswers.filter(id => id !== optionId)
                : [...currentAnswers, optionId];
            setValue(`question_${questionIndex}`, newAnswers, { shouldValidate: true });
        } else {
            setValue(`question_${questionIndex}`, optionId, { shouldValidate: true });
        }

        await trigger(`question_${questionIndex}`);
    };

    const handleEmailChange = async (e) => {
        setValue('email', e.target.value, { shouldValidate: true });
        await trigger('email');
    };

    const onSubmit = async (data) => {
        if (!isFormValid()) {
            toast.error('Please complete all required fields');
            return;
        }
        setSubmitLoading(true);
        try {
            // Build answers array for API
            const answers = quizInfo.questions.map((q, idx) => ({
                questionId: q._id,
                answerIds: Array.isArray(data[`question_${idx}`]) ? data[`question_${idx}`] : [data[`question_${idx}`]]
            }));
            const payload = {
                quizId: quizInfo._id,
                email: data.email,
                addPrivacyPolicy: !!privacyAccepted,
                addGdprCompliance: !!gdprAccepted,
                answers,
                flipbookId: flipbookId || htmlData?.flipbookId
            };
            const createResponse = await quizAttemptApi(payload);
            const attemptRes = createResponse.data;
            setSubmitLoading(false);
            setResultLoading(true);
            // Only set attemptId and show result summary, do not fetch detailed result yet
            setQuizResult({ ...attemptRes, attemptId: attemptRes.attempt?._id });
            setCurrentView('result');
        } catch (error) {
            setSubmitLoading(false);
            setResultLoading(false);
            toast.error('Failed to submit quiz', { description: error.message });
        } finally {
            setSubmitLoading(false);
            setResultLoading(false);
        }
    };

    const handleRetakeQuiz = () => {
        setCurrentView('quiz');
        setQuizResult(null);
        setDetailedQuizResult(null);
        setPrivacyAccepted(false);
        setGdprAccepted(false);
        reset();
    };

    const handleViewResults = async () => {
        setCurrentView('results-detail');
        setDetailedResultLoading(true);
        setDetailedQuizResult(null);
        try {
            const attemptId = quizResult?.attemptId;
            if (!attemptId) throw new Error('No attempt ID found');
            const resultResponse = await getQuizAttemptApi(attemptId);
            setDetailedQuizResult(resultResponse.data);
        } catch (error) {
            toast.error('Failed to fetch detailed results', { description: error.message });
        } finally {
            setDetailedResultLoading(false);
        }
    };

    const handleCloseModal = () => {
        setCurrentView('quiz');
        setQuizResult(null);
        setDetailedQuizResult(null);
        setPrivacyAccepted(false);
        setGdprAccepted(false);
        reset();
        onOpenChange(false);
    };

    if (isLoading || submitLoading || resultLoading) {
        return (
            <Dialog open={open} onOpenChange={handleCloseModal}>
                <DialogContent className="max-h-[90vh] max-w-[90vw] lg:max-w-2xl overflow-y-auto z-[10000]" container={container}>
                    <DialogHeader>
                        <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    </DialogHeader>
                    <div className="space-y-6 mt-4">
                        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    if (!quizInfo) return null;

    const renderQuizView = () => (
        <div className="space-y-6" style={{ '--ring': hexToHslComponents(visibilitySettings?.playerAccentColorHash) }}>
            {quizInfo.settings.collectEmail && (
                <div className="space-y-4 pb-4 border-b">
                    <div>
                        <Label htmlFor="preview-email" className="text-sm font-medium">
                            Email address *
                        </Label>
                        <Input
                            id="preview-email"
                            type="email"
                            placeholder="Your email"
                            {...register('email')}
                            onChange={handleEmailChange}
                            className={`mt-1 ${errors.email && "border-red-500 focus:outline-none focus-visible:ring-0"}`}
                        />
                    </div>
                    <div className="space-y-2">
                        {quizInfo.settings.addPrivacyPolicy && (
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="preview-privacy"
                                    checked={privacyAccepted}
                                    onCheckedChange={setPrivacyAccepted}
                                    style={{
                                        borderColor: visibilitySettings?.playerAccentColorHash,
                                        backgroundColor: privacyAccepted ? visibilitySettings?.playerAccentColorHash : undefined,
                                        color: privacyAccepted ? 'white' : undefined
                                    }}
                                />
                                <Label htmlFor="preview-privacy" className="text-sm leading-relaxed">
                                    I agree to the following company's Privacy Policy:
                                    <a
                                        href={quizInfo.settings.privacyPolicyLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline ml-1"
                                        style={{ color: visibilitySettings?.playerAccentColorHash }}
                                    >
                                        {quizInfo.settings.companyName}
                                    </a> *
                                </Label>
                            </div>
                        )}
                        {quizInfo.settings.addGDPRCompliance && (
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="preview-gdpr"
                                    checked={gdprAccepted}
                                    onCheckedChange={setGdprAccepted}
                                    style={{
                                        borderColor: visibilitySettings?.playerAccentColorHash,
                                        backgroundColor: gdprAccepted ? visibilitySettings?.playerAccentColorHash : undefined,
                                        color: gdprAccepted ? 'white' : undefined
                                    }}
                                />
                                <Label htmlFor="preview-gdpr" className="text-sm">
                                    {quizInfo.settings.gdprMessage || "I agree to GDPR compliance"} *
                                </Label>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {quizInfo.questions.map((question, questionIndex) => (
                <div key={question._id} className="space-y-4">
                    <h3 className="text-lg font-semibold">
                        {questionIndex + 1}. {question.text}
                    </h3>

                    {question.isMultipleAnswer ? (
                        <div className="space-y-3">
                            {question.options.map((option) => (
                                <div key={option._id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                                    <Checkbox
                                        id={`${questionIndex}_${option._id}`}
                                        checked={(watchedValues[`question_${questionIndex}`] || []).includes(option._id)}
                                        onCheckedChange={() => handleAnswerChange(questionIndex, option._id, true)}
                                        style={{
                                            borderColor: visibilitySettings?.playerAccentColorHash,
                                            backgroundColor: (watchedValues[`question_${questionIndex}`] || []).includes(option._id) ? visibilitySettings?.playerAccentColorHash : undefined,
                                            color: (watchedValues[`question_${questionIndex}`] || []).includes(option._id) ? 'white' : undefined
                                        }}
                                    />
                                    <Label htmlFor={`${questionIndex}_${option._id}`} className="flex-1 cursor-pointer">
                                        {String.fromCharCode(65 + question.options.indexOf(option))}. {option.text}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <RadioGroup
                            value={watchedValues[`question_${questionIndex}`] || ''}
                            onValueChange={(value) => handleAnswerChange(questionIndex, value, false)}
                        >
                            {question.options.map((option) => (
                                <div key={option._id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                                    <RadioGroupItem
                                        value={option._id}
                                        id={`${questionIndex}_${option._id}`}
                                        style={{
                                            borderColor: visibilitySettings?.playerAccentColorHash,
                                            color: visibilitySettings?.playerAccentColorHash
                                        }}
                                    />
                                    <Label htmlFor={`${questionIndex}_${option._id}`} className="flex-1 cursor-pointer">
                                        {String.fromCharCode(65 + question.options.indexOf(option))}. {option.text}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    )}
                </div>
            ))}

            <Button
                onClick={handleSubmit(onSubmit)}
                className="w-full"
                disabled={!isFormValid()}
                style={{
                    backgroundColor: visibilitySettings?.playerAccentColorHash,
                    color: getContrastTextColor(visibilitySettings?.playerAccentColorHash)
                }}
            >
                {quizInfo.settings.quizButtonLabel || 'Submit quiz'}
            </Button>
        </div>
    );

    const renderResultView = () => {
        if (!quizResult) return null;
        // Use isCorrect from each answer in the API response
        const allCorrect = Array.isArray(quizResult.attempt?.answers) && quizResult.attempt.answers.length > 0
            ? quizResult.attempt.answers.every(ans => ans.isCorrect === true)
            : false;
        const passed = allCorrect;
        return (
            <div className="text-center space-y-6">
                {passed ? (
                    <>
                        <div className="flex justify-center">
                            <CheckCircle className="h-16 w-16 text-green-500" />
                        </div>
                        <h3 className="text-xl font-semibold">
                            {quizInfo.settings.useDifferentMessages
                                ? quizInfo.settings.passedQuizMessage
                                : "Congratulations, you passed the quiz! Well done!"}
                        </h3>
                    </>
                ) : (
                    <>
                        <div className="flex justify-center">
                            <AlertCircle className="h-16 w-16 text-red-500" />
                        </div>
                        <h3 className="text-xl font-semibold">
                            {quizInfo.settings.useDifferentMessages
                                ? quizInfo.settings.failedQuizMessage
                                : "You failed the quiz, but don't give up! Try again!"}
                        </h3>
                    </>
                )}
                <div className="space-y-3">
                    {quizInfo.settings.isShowCorrectAnswer && <Button
                        onClick={handleViewResults}
                        className="w-full"
                        style={{
                            backgroundColor: visibilitySettings?.playerAccentColorHash,
                            color: getContrastTextColor(visibilitySettings?.playerAccentColorHash)
                        }}
                    >
                        View results
                    </Button>}
                    {(quizInfo.settings.allowRetake) && (
                        <Button
                            onClick={handleRetakeQuiz}
                            className="w-full"
                            style={{
                                backgroundColor: visibilitySettings?.playerAccentColorHash,
                                color: getContrastTextColor(visibilitySettings?.playerAccentColorHash)
                            }}
                        >
                            Retake quiz
                        </Button>
                    )}
                </div>
            </div>
        );
    };

    const renderDetailedResults = () => {
        if (detailedResultLoading) {
            // Skeleton loader mimicking the detailed results UI
            return (
                <div className="space-y-6 animate-pulse">
                    <div className="text-center space-y-2">
                        <div className="h-6 w-1/3 mx-auto bg-gray-200 rounded" />
                        <div className="h-4 w-1/4 mx-auto bg-gray-200 rounded" />
                    </div>
                    <div className="flex gap-4 items-center text-sm mb-2">
                        <div className="h-4 w-32 bg-gray-200 rounded" />
                        <div className="h-4 w-24 bg-gray-200 rounded" />
                        <div className="h-4 w-40 bg-gray-200 rounded" />
                    </div>
                    {[...Array(2)].map((_, idx) => (
                        <div key={idx} className="space-y-3">
                            <div className="h-5 w-1/2 bg-gray-200 rounded" />
                            <div className="space-y-2">
                                {[...Array(3)].map((_, j) => (
                                    <div key={j} className="flex items-center justify-between p-3 border rounded-lg bg-gray-100">
                                        <div className="h-4 w-2/3 bg-gray-200 rounded" />
                                        <div className="h-4 w-4 bg-gray-300 rounded-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="flex gap-3">
                        <div className="h-10 flex-1 bg-gray-200 rounded" />
                        <div className="h-10 flex-1 bg-gray-200 rounded" />
                    </div>
                </div>
            );
        }
        if (!detailedQuizResult || !detailedQuizResult.quizDetails) return null;
        const { quizDetails } = detailedQuizResult;
        return (
            <div className="space-y-6">
                <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">Quiz Results</h3>
                    <p className="text-gray-600">
                        Score: {detailedQuizResult.correctAnswersCount}/{quizDetails.questions.length}
                    </p>
                </div>
                {/* Legend */}
                <div className="flex gap-4 items-center text-sm mb-2">
                    <div className="flex items-center gap-1"><span className="inline-block w-4 h-4 bg-green-50 border border-green-200 rounded"></span> Correct & Selected</div>
                    <div className="flex items-center gap-1"><span className="inline-block w-4 h-4 bg-green-100 border border-green-200 rounded"></span> Correct</div>
                    <div className="flex items-center gap-1"><span className="inline-block w-4 h-4 bg-red-50 border border-red-200 rounded"></span> Selected (Incorrect)</div>
                </div>
                {quizDetails.questions.map((question, index) => (
                    <div key={question._id} className="space-y-3">
                        <h4 className="font-medium">{index + 1}. {question.text}</h4>
                        <div className="space-y-2">
                            {question.options.map((option) => {
                                const isUserAnswer = option.userAnswer;
                                const isCorrect = option.isCorrect;
                                let bgColor = '';
                                let icon = null;
                                if (isCorrect && isUserAnswer) {
                                    bgColor = 'bg-green-50 border-green-200';
                                    icon = <CheckCircle className="h-4 w-4 text-green-600" />;
                                } else if (isCorrect) {
                                    bgColor = 'bg-green-100 border-green-200';
                                    icon = <CheckCircle className="h-4 w-4 text-green-400" />;
                                } else if (isUserAnswer) {
                                    bgColor = 'bg-red-50 border-red-200';
                                    icon = <XCircle className="h-4 w-4 text-red-600" />;
                                }
                                return (
                                    <div key={option._id} className={`flex items-center justify-between p-3 border rounded-lg ${bgColor}`}>
                                        <span>{String.fromCharCode(65 + question.options.indexOf(option))}. {option.text}</span>
                                        {icon}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
                <div className="flex gap-3">
                    <Button
                        onClick={handleRetakeQuiz}
                        className="flex-1"
                        style={{
                            backgroundColor: visibilitySettings?.playerAccentColorHash,
                            color: getContrastTextColor(visibilitySettings?.playerAccentColorHash)
                        }}
                    >
                        Retake quiz
                    </Button>
                    <Button
                        onClick={handleCloseModal}
                        className="flex-1"
                        style={{
                            backgroundColor: visibilitySettings?.playerAccentColorHash,
                            color: getContrastTextColor(visibilitySettings?.playerAccentColorHash)
                        }}
                    >
                        Close
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <Dialog open={open} onOpenChange={handleCloseModal}>
            <DialogContent className="max-h-[90vh] max-w-[90vw] lg:max-w-2xl overflow-y-auto z-[10000]" container={container}>
                <DialogHeader>
                    <DialogTitle className="text-xl text-gray-800">
                        {quizInfo.settings.quizName}
                    </DialogTitle>
                </DialogHeader>
                {currentView === 'quiz' && renderQuizView()}
                {currentView === 'result' && renderResultView()}
                {currentView === 'results-detail' && renderDetailedResults()}
            </DialogContent>
        </Dialog>
    );
};

export default QuizModel;