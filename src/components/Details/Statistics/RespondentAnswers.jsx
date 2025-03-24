import React, { useState } from 'react';
import { SelectValue, SelectTrigger, SelectItem, SelectGroup, SelectContent, Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircleCheck, XCircle } from 'lucide-react';
import { getData } from '@/utils/datas';

export default function RespondentAnswers() {
  const [selectedRespondent, setSelectedRespondent] = useState("respondent1");
  
  // Simulated data based on the quiz data
  const quizData = getData('quizData');
  
  // Sample respondent data
  const respondentsData = [
    {
      id: "respondent1",
      name: "John Doe",
      email: "john.doe@example.com",
      score: "3/5",
      submittedAt: "Mar 16, 2025, 9:23 PM",
      answers: [
        { questionId: 1, selectedOption: 2, isCorrect: true },
        { questionId: 2, selectedOption: 2, isCorrect: true },
        { questionId: 3, selectedOption: 1, isCorrect: false },
        { questionId: 4, selectedOption: 1, isCorrect: true },
        { questionId: 5, selectedOption: 2, isCorrect: false }
      ]
    },
    {
      id: "respondent2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      score: "4/5",
      submittedAt: "Mar 15, 2025, 8:15 PM",
      answers: [
        { questionId: 1, selectedOption: 2, isCorrect: true },
        { questionId: 2, selectedOption: 2, isCorrect: true },
        { questionId: 3, selectedOption: 2, isCorrect: true },
        { questionId: 4, selectedOption: 1, isCorrect: true },
        { questionId: 5, selectedOption: 2, isCorrect: false }
      ]
    },
    {
      id: "respondent3",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      score: "5/5",
      submittedAt: "Mar 14, 2025, 3:45 PM",
      answers: [
        { questionId: 1, selectedOption: 2, isCorrect: true },
        { questionId: 2, selectedOption: 2, isCorrect: true },
        { questionId: 3, selectedOption: 2, isCorrect: true },
        { questionId: 4, selectedOption: 1, isCorrect: true },
        { questionId: 5, selectedOption: 1, isCorrect: true }
      ]
    }
  ];

  const selectedResponder = respondentsData.find(r => r.id === selectedRespondent);
  
  const handleRespondentChange = (value) => {
    setSelectedRespondent(value);
  };

  // Function to get option text
  const getOptionText = (questionId, optionId) => {
    const question = quizData.find(q => q.id === questionId);
    if (!question) return "";
    const option = question.options.find(o => o.id === optionId);
    return option ? option.text : "";
  };

  return (
    <div className="space-y-4">
      <Select value={selectedRespondent} onValueChange={handleRespondentChange}>
        <SelectTrigger className="w-[60%]">
          <SelectValue placeholder="Select a respondent" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {respondentsData.map(respondent => (
              <SelectItem key={respondent.id} value={respondent.id}>
                {respondent.name} ({respondent.email})
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      
      {selectedResponder && (
        <>
          <div className="space-y-1">
            <p className="text-sm font-medium">{selectedResponder.name} ({selectedResponder.email})</p>
            <p className="text-xs text-gray-500">Correct answers: {selectedResponder.score}</p>
            <p className="text-xs text-gray-500">Submitted: {selectedResponder.submittedAt}</p>
          </div>
          
          <Separator />
          
          <div className="space-y-6">
            {quizData.map((question, qIndex) => {
              const userAnswer = selectedResponder.answers.find(a => a.questionId === question.id);
              const selectedOption = question.options.find(o => o.id === userAnswer?.selectedOption);
              const isCorrect = userAnswer?.isCorrect;
              
              return (
                <Card key={question.id} className="overflow-hidden">
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
                              {question.id}. {question.question}
                            </h4>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 space-y-2">
                        {question.options.map(option => {
                          const isSelected = userAnswer?.selectedOption === option.id;
                          const bgColor = isSelected 
                            ? (option.isCorrect ? 'bg-green-100' : 'bg-red-100')
                            : option.isCorrect ? 'bg-green-50' : '';
                          
                          return (
                            <div 
                              key={option.id} 
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
      )}
    </div>
  );
}