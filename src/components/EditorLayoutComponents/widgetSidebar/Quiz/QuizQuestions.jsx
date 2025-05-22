import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import { GripVertical, X, ChevronDown, Plus, Trash2 } from 'lucide-react';
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
import { Card, CardContent } from "@/components/ui/card";
import { useFieldArray } from "react-hook-form";

export default function QuizQuestions({ form }) {
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "questions"
  });

  const addQuestion = () => {
    append({
      text: 'Untitled question',
      options: [
        { text: 'Option', isCorrect: true },
        { text: 'Option', isCorrect: false },
        { text: 'Option', isCorrect: false },
        { text: 'Option', isCorrect: false }
      ],
      isMultipleAnswer: false
    });
  };

  const removeQuestion = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ReactSortable
        list={fields}
        setList={(newQuestions) => {
          newQuestions.forEach((_, index) => {
            move(index, newQuestions[index].id);
          });
        }}
        animation={200}
        delayOnTouchOnly={true}
        delay={2}
        className="space-y-4"
        handle=".drag-handle"
      >
        {fields.map((field, index) => (
          <Card key={field.id} className="bg-white shadow-sm">
            <CardContent className="p-4">
              <Question
                form={form}
                questionIndex={index}
                removeQuestion={removeQuestion}
              />
            </CardContent>
          </Card>
        ))}
      </ReactSortable>

      <Button
        variant="outline"
        type="button"
        onClick={addQuestion}
        className="w-full mt-4 border-2 border-dashed"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add question
      </Button>
    </div>
  );
}

function Question({ form, questionIndex, removeQuestion }) {
  const { fields: options, append, remove } = useFieldArray({
    control: form.control,
    name: `questions.${questionIndex}.options`
  });

  const handleOptionSelect = (optionIndex) => {
    const question = form.getValues(`questions.${questionIndex}`);
    const isMultipleAnswer = question.isMultipleAnswer;

    if (isMultipleAnswer) {
      const currentValue = form.getValues(`questions.${questionIndex}.options.${optionIndex}.isCorrect`);
      form.setValue(`questions.${questionIndex}.options.${optionIndex}.isCorrect`, !currentValue);
    } else {
      question.options.forEach((_, index) => {
        form.setValue(
          `questions.${questionIndex}.options.${index}.isCorrect`,
          index === optionIndex
        );
      });
    }
  };

  const addOption = () => {
    const currentOptions = form.getValues(`questions.${questionIndex}.options`);
    if (currentOptions.length < 26) {
      append({
        text: 'Option',
        isCorrect: false
      });
    }
  };

  const removeOption = (optionIndex) => {
    const currentOptions = form.getValues(`questions.${questionIndex}.options`);
    if (currentOptions.length > 1) {
      remove(optionIndex);
      if (!form.getValues(`questions.${questionIndex}.isMultipleAnswer`)) {
        const remainingOptions = form.getValues(`questions.${questionIndex}.options`);
        const hasCorrectAnswer = remainingOptions.some(opt => opt.isCorrect);
        if (!hasCorrectAnswer) {
          form.setValue(`questions.${questionIndex}.options.0.isCorrect`, true);
        }
      }
    }
  };

  const toggleQuestionType = () => {
    const currentType = form.getValues(`questions.${questionIndex}.isMultipleAnswer`);
    form.setValue(`questions.${questionIndex}.isMultipleAnswer`, !currentType);

    if (!currentType) {
      const options = form.getValues(`questions.${questionIndex}.options`);
      const firstCorrectIndex = options.findIndex(opt => opt.isCorrect);
      options.forEach((_, optIndex) => {
        form.setValue(
          `questions.${questionIndex}.options.${optIndex}.isCorrect`,
          optIndex === firstCorrectIndex
        );
      });
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <div className="drag-handle cursor-move">
          <GripVertical className="text-gray-400" size={20} />
        </div>
        <span className="text-sm text-gray-500">{questionIndex + 1}.</span>
        <Input
          type="text"
          {...form.register(`questions.${questionIndex}.text`)}
          className="flex-1"
          placeholder="Untitled question"
        />
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {form.watch(`questions.${questionIndex}.isMultipleAnswer`) ? 'Multiple' : 'Single'}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => toggleQuestionType()}>
                {form.watch(`questions.${questionIndex}.isMultipleAnswer`) ? 'Single choice' : 'Multiple choice'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => removeQuestion(questionIndex)}
            disabled={form.getValues('questions').length <= 1}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {options.map((option, optionIndex) => (
          <div key={option.id} className="flex items-center gap-3">
            <div className="option-drag-handle cursor-move">
              <GripVertical className="text-gray-400" size={16} />
            </div>
            <div className="flex flex-shrink-0">
              {!form.watch(`questions.${questionIndex}.isMultipleAnswer`) ? (
                <RadioGroup
                  value={form.watch(`questions.${questionIndex}.options`).findIndex(opt => opt.isCorrect)?.toString()}
                  onValueChange={() => handleOptionSelect(optionIndex)}
                  className="flex"
                >
                  <RadioGroupItem 
                    value={optionIndex.toString()}
                    id={`q${questionIndex}-${optionIndex}`}
                    checked={form.watch(`questions.${questionIndex}.options.${optionIndex}.isCorrect`)}
                  />
                </RadioGroup>
              ) : (
                <Checkbox
                  id={`q${questionIndex}-${optionIndex}`}
                  checked={form.watch(`questions.${questionIndex}.options.${optionIndex}.isCorrect`)}
                  onCheckedChange={() => handleOptionSelect(optionIndex)}
                />
              )}
            </div>
            <span className="text-sm text-gray-600">{String.fromCharCode(65 + optionIndex)}.</span>
            <Input
              type="text"
              {...form.register(`questions.${questionIndex}.options.${optionIndex}.text`)}
              className="flex-1"
              placeholder="Option"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeOption(optionIndex)}
              disabled={options.length <= 1}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <Button
          variant="ghost"
          type="button"
          size="sm"
          onClick={addOption}
          disabled={options.length >= 26}
          className="text-gray-600"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add option
        </Button>
      </div>
    </>
  );
}