import React, { useEffect, useState } from 'react';
import { SelectValue, SelectTrigger, SelectItem, SelectGroup, SelectContent, Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircleCheck, XCircle } from 'lucide-react';
import { getQuizAttemptApi } from '@/service/quizAttempt.service';
import { toast } from "sonner";

export default function RespondentAnswers({ respondents = [], loading }) {
  const [selectedRespondent, setSelectedRespondent] = useState("");
  const [answerData, setAnswerData] = useState(null);
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  useEffect(() => {
    if (respondents.length > 0) {
      setSelectedRespondent(respondents[0].value);
    } else {
      setSelectedRespondent("");
      setAnswerData(null);
    }
  }, [respondents]);

  useEffect(() => {
    const fetchAnswerData = async () => {
      if (!selectedRespondent) return;
      setLoadingAnswer(true);
      try {
        const data = await getQuizAttemptApi(selectedRespondent);
        setAnswerData(data.data);
      } catch (err) {
        setAnswerData(null);
        toast.error("Failed to load respondent's answers", { description: err.message });
      } finally {
        setLoadingAnswer(false);
      }
    };
    if (selectedRespondent) fetchAnswerData();
  }, [selectedRespondent]);

  const handleRespondentChange = (value) => {
    setSelectedRespondent(value);
  };

  if (loading) {
    return <div className="h-32 bg-gray-100 animate-pulse rounded" />;
  }

  // Zero state: no respondents
  if (!loading && respondents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100px] text-center text-muted-foreground">
        <span className="text-lg font-medium">No respondents found for this quiz.</span>
        <span className="text-sm mt-2">Share the quiz to start collecting answers.</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Select value={selectedRespondent} onValueChange={handleRespondentChange}>
        <SelectTrigger className="w-[60%]">
          <SelectValue placeholder="Select a respondent" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {respondents.map(respondent => (
              <SelectItem key={respondent.value} value={respondent.value}>
                {respondent.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {loadingAnswer ? (
        <div className="h-32 bg-gray-100 animate-pulse rounded" />
      ) : answerData && answerData.quizDetails ? (
        <>
          <div className="space-y-1">
            <p className="text-sm font-medium">{answerData.email}</p>
            <p className="text-xs text-gray-500">Correct answers: {answerData.correctAnswersCount}</p>
            <p className="text-xs text-gray-500">Submitted: {new Date(answerData.submittedAt).toLocaleString()}</p>
          </div>
          <Separator />
          <div className="space-y-6">
            {answerData.quizDetails.questions.map((question, qIndex) => {
              const isCorrect = question.options.every(opt => {
                if (opt.userAnswer) return opt.isCorrect;
                return true;
              });
              return (
                <Card key={question._id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col">
                      <div className={`p-4 ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {isCorrect ? (
                              <CircleCheck size={20} className="text-green-600" />
                            ) : (
                              <XCircle size={20} className="text-red-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-base">
                              {qIndex + 1}. {question.text}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        {question.options.map(option => {
                          const isSelected = option.userAnswer;
                          const bgColor = isSelected
                            ? (option.isCorrect ? 'bg-green-100' : 'bg-red-100')
                            : option.isCorrect ? 'bg-green-50' : '';
                          return (
                            <div
                              key={option._id}
                              className={`flex items-center gap-2 p-2 rounded ${bgColor}`}
                            >
                              {option.isCorrect ? (
                                <CircleCheck size={16} className="text-green-600" />
                              ) : isSelected ? (
                                <XCircle size={16} className="text-red-500" />
                              ) : (
                                <div className="w-4 h-4"></div>
                              )}
                              <span className={`${isSelected ? 'font-medium' : ''}`}>
                                {option.text}
                              </span>
                              {isSelected && (
                                <span className="ml-auto text-sm">
                                  Your answer
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-gray-500 text-center">No answer data available.</div>
      )}
    </div>
  );
}