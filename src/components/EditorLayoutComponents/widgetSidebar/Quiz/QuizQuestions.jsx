import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { GripVertical, X, ChevronDown, Plus, Check, Trash2, Edit } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function QuizQuestions() {
  const [questionData, setQuestionData] = useState([{
    id: '1',
    title: 'Untitled question',
    type: 'single',
    options: [
      { id: 'A', text: 'Option', isSelected: true },
      { id: 'B', text: 'Option', isSelected: false },
      { id: 'C', text: 'Option', isSelected: false },
      { id: 'D', text: 'Option', isSelected: false }
    ],
    isEditing: true
  }]);

  const generateLetters = () => {
    return Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  };

  const handleQuestionChange = (questionId, newTitle) => {
    setQuestionData(questionData.map(q =>
      q.id === questionId ? { ...q, title: newTitle } : q
    ));
  };

  const handleOptionChange = (questionId, optionId, newText) => {
    setQuestionData(questionData.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: q.options.map(opt =>
            opt.id === optionId ? { ...opt, text: newText } : opt
          )
        };
      }
      return q;
    }));
  };

  const handleOptionSelect = (questionId, optionId) => {
    setQuestionData(questionData.map(q => {
      if (q.id === questionId) {
        const updatedOptions = q.options.map(opt => ({
          ...opt,
          isSelected: q.type === 'single'
            ? opt.id === optionId
            : opt.id === optionId ? !opt.isSelected : opt.isSelected
        }));

        const hasSelectedOption = updatedOptions.some(opt => opt.isSelected);
        if (!hasSelectedOption && q.type === 'single') {
          updatedOptions[0].isSelected = true;
        }

        return {
          ...q,
          options: updatedOptions
        };
      }
      return q;
    }));
  };

  const addOption = (questionId) => {
    const letters = generateLetters();
    setQuestionData(questionData.map(q => {
      if (q.id === questionId && q.options.length < 26) {
        const newOptionId = letters[q.options.length];
        return {
          ...q,
          options: [...q.options, { id: newOptionId, text: 'Option', isSelected: false }]
        };
      }
      return q;
    }));
  };

  const removeOption = (questionId, optionId) => {
    setQuestionData(questionData.map(q => {
      if (q.id === questionId && q.options.length > 1) {
        const filteredOptions = q.options.filter(opt => opt.id !== optionId);
        const reorderedOptions = filteredOptions.map((opt, index) => ({
          ...opt,
          id: String.fromCharCode(65 + index)
        }));

        const hasSelectedOption = reorderedOptions.some(opt => opt.isSelected);
        if (!hasSelectedOption && q.type === 'single') {
          reorderedOptions[0].isSelected = true;
        }

        return {
          ...q,
          options: reorderedOptions
        };
      }
      return q;
    }));
  };

  const addQuestion = () => {
    const newId = String(questionData.length + 1);
    setQuestionData([...questionData, {
      id: newId,
      title: 'Untitled question',
      type: 'single',
      options: [
        { id: 'A', text: 'Option', isSelected: true },
        { id: 'B', text: 'Option', isSelected: false },
        { id: 'C', text: 'Option', isSelected: false },
        { id: 'D', text: 'Option', isSelected: false }
      ],
      isEditing: true
    }]);
  };

  const toggleQuestionType = (questionId) => {
    setQuestionData(questionData.map(q => {
      if (q.id === questionId) {
        let selectedOptions;
        if (q.type === 'single') {
          selectedOptions = q.options.map(opt => opt);
        } else {
          const selectedOpts = q.options.filter(opt => opt.isSelected);
          const lastSelected = selectedOpts[selectedOpts.length - 1];
          selectedOptions = q.options.map(opt => ({
            ...opt,
            isSelected: lastSelected ? opt.id === lastSelected.id : opt.id === 'A'
          }));
        }

        return {
          ...q,
          type: q.type === 'single' ? 'multiple' : 'single',
          options: selectedOptions
        };
      }
      return q;
    }));
  };

  const removeQuestion = (questionId) => {
    if (questionData.length > 1) {
      setQuestionData(questionData.filter(q => q.id !== questionId));
    }
  };

  const handleOptionSort = (questionId, newOptions) => {
    const reorderedOptions = newOptions.map((opt, index) => ({
      ...opt,
      id: String.fromCharCode(65 + index)
    }));

    setQuestionData(questionData.map(q =>
      q.id === questionId ? { ...q, options: reorderedOptions } : q
    ));
  };

  const toggleEditMode = (questionId) => {
    setQuestionData(questionData.map(q => {
      if (q.id === questionId) {
        const updatedOptions = q.options.map(opt => ({
          ...opt,
          text: !opt.text || opt.text.trim() === '' ? 'Option' : opt.text
        }));

        return {
          ...q,
          options: updatedOptions,
          isEditing: !q.isEditing
        };
      }
      return q;
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ReactSortable
        list={questionData}
        setList={(newQuestions) => setQuestionData(newQuestions)}
        animation={200}
        delayOnTouchOnly={true}
        delay={2}
        className="space-y-4"
        handle=".drag-handle"
      >
        {questionData.map((question, qIndex) => (
          <Card key={question.id} className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="drag-handle cursor-move">
                  <GripVertical className="text-gray-400" size={20} />
                </div>
                <span className="text-sm text-gray-500">{qIndex + 1}.</span>
                {question.isEditing ? (
                  <Input
                    type="text"
                    value={question.title}
                    onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                    className="flex-1"
                    placeholder="Untitled question"
                  />
                ) : (
                  <div className="flex-1 text-base text-gray-900">{question.title}</div>
                )}
                <div className="flex items-center gap-2">
                  {question.isEditing ? (
                    <>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="flex items-center gap-2">
                            {question.type === 'single' ? 'Single' : 'Multiple'}
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => toggleQuestionType(question.id)}>
                            {question.type === 'single' ? 'Multiple choice' : 'Single choice'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeQuestion(question.id)}
                        disabled={questionData.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button variant="ghost" size="icon" onClick={() => toggleEditMode(question.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <ReactSortable
                list={question.options}
                setList={(newOptions) => handleOptionSort(question.id, newOptions)}
                animation={200}
                delayOnTouchOnly={true}
                delay={2}
                handle=".option-drag-handle"
                className="space-y-3"
              >
                {question.options.map((option) => (
                  <div key={option.id} className="flex items-center gap-3">
                    {question.isEditing && (
                      <div className="option-drag-handle cursor-move">
                        <GripVertical className="text-gray-400" size={16} />
                      </div>
                    )}
                    <div className="flex flex-shrink-0">
                      {question.type === 'single' ? (
                        <RadioGroup
                          value={question.options.find(opt => opt.isSelected)?.id || ''}
                          onValueChange={(value) => handleOptionSelect(question.id, value)}
                          className="flex"
                        >
                          <RadioGroupItem 
                            value={option.id} 
                            id={`q${question.id}-${option.id}`} 
                            checked={option.isSelected}
                          />
                        </RadioGroup>
                      ) : (
                        <Checkbox
                          id={`q${question.id}-${option.id}`}
                          checked={option.isSelected}
                          onCheckedChange={() => handleOptionSelect(question.id, option.id)}
                        />
                      )}
                    </div>
                    <span className="text-sm text-gray-600">{option.id}.</span>
                    {question.isEditing ? (
                      <>
                        <Input
                          type="text"
                          value={option.text}
                          onChange={(e) => handleOptionChange(question.id, option.id, e.target.value)}
                          className="flex-1"
                          placeholder="Option"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeOption(question.id, option.id)}
                          disabled={question.options.length <= 1}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Label htmlFor={`q${question.id}-${option.id}`} className="flex-1 text-sm text-gray-900">
                        {option.text}
                      </Label>
                    )}
                  </div>
                ))}
              </ReactSortable>

              {question.isEditing && (
                <div className="mt-3 flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addOption(question.id)}
                    disabled={question.options.length >= 26}
                    className="text-gray-600"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add option
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleEditMode(question.id)}
                    className="text-gray-600"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Done
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </ReactSortable>

      {questionData.every(q => !q.isEditing) && (
        <Button
          variant="outline"
          onClick={addQuestion}
          className="w-full mt-4 border-2 border-dashed"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add question
        </Button>
      )}
    </div>
  );
}