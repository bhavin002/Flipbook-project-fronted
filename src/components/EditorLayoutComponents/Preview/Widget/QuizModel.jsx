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
import { getQuizApi } from '@/service/quiz.service';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

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

const QuizModel = ({ open, onOpenChange, htmlData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [quizInfo, setQuizInfo] = useState(null);
    const [currentView, setCurrentView] = useState('quiz');
    const [quizResult, setQuizResult] = useState(null);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [marketingAccepted, setMarketingAccepted] = useState(false);

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
                const response = await getQuizApi(htmlData.variantId);
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
            if (!privacyAccepted) {
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

    const calculateScore = (answers) => {
        let correctAnswers = 0;
        const totalQuestions = quizInfo.questions.length;
        const detailedResults = [];

        quizInfo.questions.forEach((question, index) => {
            const userAnswer = answers[`question_${index}`];
            const correctOptions = question.options.filter(opt => opt.isCorrect).map(opt => opt._id);

            let isCorrect = false;

            if (question.isMultipleAnswer) {
                const userAnswerArray = Array.isArray(userAnswer) ? userAnswer : [];
                isCorrect = correctOptions.length === userAnswerArray.length &&
                    correctOptions.every(id => userAnswerArray.includes(id));
            } else {
                isCorrect = correctOptions.includes(userAnswer);
            }

            if (isCorrect) correctAnswers++;

            detailedResults.push({
                question: question.text,
                userAnswer,
                correctOptions,
                isCorrect,
                options: question.options
            });
        });

        return {
            score: correctAnswers,
            total: totalQuestions,
            percentage: (correctAnswers / totalQuestions) * 100,
            details: detailedResults
        };
    };

    const onSubmit = (data) => {
        if (!isFormValid()) {
            toast.error('Please complete all required fields');
            return;
        }
        
        const result = calculateScore(data);
        setQuizResult(result);
        setCurrentView('result');
    };

    const handleRetakeQuiz = () => {
        setCurrentView('quiz');
        setQuizResult(null);
        setPrivacyAccepted(false);
        setMarketingAccepted(false);
        reset();
    };

    const handleViewResults = () => {
        setCurrentView('results-detail');
    };

    const handleCloseModal = () => {
        setCurrentView('quiz');
        setQuizResult(null);
        setPrivacyAccepted(false);
        setMarketingAccepted(false);
        reset();
        onOpenChange(false);
    };

    if (isLoading) {
        return (
            <Dialog open={open} onOpenChange={handleCloseModal}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    </DialogHeader>

                    <div className="space-y-6 mt-4">
                        <div className="space-y-4 pb-4 border-b">
                            <div>
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                                <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                        {[1, 2, 3].map((_, index) => (
                            <div key={index} className="space-y-4">
                                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                                <div className="space-y-3">
                                    {[1, 2, 3, 4].map((_, optionIndex) => (
                                        <div key={optionIndex} className="flex items-center space-x-3 p-3 border rounded-lg">
                                            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    if (!quizInfo) return null;

    const renderQuizView = () => (
        <div className="space-y-6">
            {quizInfo.settings.collectEmail && (
                <div className="space-y-4 pb-4 border-b">
                    <div>
                        <Label htmlFor="email" className="text-sm font-medium">
                            Email address *
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Your email"
                            {...register('email')}
                            onChange={handleEmailChange}
                            className={`mt-1 ${errors.email && "border-red-500 focus:outline-none focus-visible:ring-0"}`}
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                id="privacy" 
                                checked={privacyAccepted}
                                onCheckedChange={setPrivacyAccepted}
                            />
                            <Label htmlFor="privacy" className="text-sm leading-relaxed">
                                I agree to the following company's Privacy Policy:
                                <a href={quizInfo.settings.privacyPolicyLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                                    {quizInfo.settings.companyName}
                                </a> *
                            </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                id="marketing" 
                                checked={marketingAccepted}
                                onCheckedChange={setMarketingAccepted}
                            />
                            <Label htmlFor="marketing" className="text-sm">
                                I agree to receive marketing materials
                            </Label>
                        </div>
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
                                    <RadioGroupItem value={option._id} id={`${questionIndex}_${option._id}`} />
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
            >
                {quizInfo.settings.quizButtonLabel || 'Submit quiz'}
            </Button>
        </div>
    );

    const renderResultView = () => (
        <div className="text-center space-y-6">
            {quizResult.passed ? (
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
                <Button onClick={handleViewResults} className="w-full">
                    View results
                </Button>

                {(quizInfo.settings.allowRetake || !quizResult.passed) && (
                    <Button onClick={handleRetakeQuiz} variant="outline" className="w-full">
                        Retake quiz
                    </Button>
                )}
            </div>
        </div>
    );

    const renderDetailedResults = () => (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">Quiz Results</h3>
                <p className="text-gray-600">
                    Score: {quizResult.score}/{quizResult.total} ({Math.round(quizResult.percentage)}%)
                </p>
            </div>

            {quizResult.details.map((result, index) => (
                <div key={index} className="space-y-3">
                    <h4 className="font-medium">{index + 1}. {result.question}</h4>

                    <div className="space-y-2">
                        {result.options.map((option) => {
                            const isUserAnswer = Array.isArray(result.userAnswer)
                                ? result.userAnswer.includes(option._id)
                                : result.userAnswer === option._id;
                            const isCorrect = result.correctOptions.includes(option._id);

                            let bgColor = '';
                            let icon = null;

                            if (isCorrect) {
                                bgColor = 'bg-green-50 border-green-200';
                                icon = <CheckCircle className="h-4 w-4 text-green-600" />;
                            } else if (isUserAnswer && !isCorrect) {
                                bgColor = 'bg-red-50 border-red-200';
                                icon = <XCircle className="h-4 w-4 text-red-600" />;
                            }

                            return (
                                <div key={option._id} className={`flex items-center justify-between p-3 border rounded-lg ${bgColor}`}>
                                    <span>{String.fromCharCode(65 + result.options.indexOf(option))}. {option.text}</span>
                                    {icon}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}

            <div className="flex gap-3">
                <Button onClick={handleRetakeQuiz} variant="outline" className="flex-1">
                    Retake quiz
                </Button>
                <Button onClick={handleCloseModal} className="flex-1">
                    Close
                </Button>
            </div>
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={handleCloseModal}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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