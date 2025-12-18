import React from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  KeyboardSensor,
  TouchSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';
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

const SortableOption = ({
  id,
  optionIndex,
  questionIndex,
  form,
  removeOption,
  totalOptions
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleOptionSelect = () => {
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

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3">
      <div {...attributes} {...listeners} className="cursor-move" style={{ touchAction: 'none' }}>
        <GripVertical className="text-gray-400" size={16} />
      </div>
      <div className="flex flex-shrink-0">
        {!form.watch(`questions.${questionIndex}.isMultipleAnswer`) ? (
          <RadioGroup
            value={form.watch(`questions.${questionIndex}.options`).findIndex(opt => opt.isCorrect)?.toString()}
            onValueChange={() => handleOptionSelect()}
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
            onCheckedChange={() => handleOptionSelect()}
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
        disabled={totalOptions <= 1}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

const SortableQuestion = ({
  id,
  questionIndex,
  form,
  removeQuestion,
  totalQuestions
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { fields: options, append, remove, move } = useFieldArray({
    control: form.control,
    name: `questions.${questionIndex}.options`
  });

  const optionSensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const handleOptionDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = options.findIndex((option) => option.id === active.id);
      const newIndex = options.findIndex((option) => option.id === over?.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        move(oldIndex, newIndex);
      }
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

    // If switching FROM multiple TO single choice
    if (currentType) {
      const options = form.getValues(`questions.${questionIndex}.options`);
      const firstCorrectIndex = options.findIndex(opt => opt.isCorrect);

      // If we found a selected option, keep only the first one selected
      if (firstCorrectIndex !== -1) {
        options.forEach((_, optIndex) => {
          form.setValue(
            `questions.${questionIndex}.options.${optIndex}.isCorrect`,
            optIndex === firstCorrectIndex
          );
        });
      } else {
        // If no option was selected, select the first one by default
        form.setValue(`questions.${questionIndex}.options.0.isCorrect`, true);
      }
    }
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <div {...attributes} {...listeners} className="cursor-move" style={{ touchAction: 'none' }}>
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
                disabled={totalQuestions <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <DndContext
              sensors={optionSensors}
              collisionDetection={closestCenter}
              onDragEnd={handleOptionDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext
                items={options.map(option => option.id)}
                strategy={verticalListSortingStrategy}
              >
                {options.map((option, optionIndex) => (
                  <SortableOption
                    key={option.id}
                    id={option.id}
                    optionIndex={optionIndex}
                    questionIndex={questionIndex}
                    form={form}
                    removeOption={removeOption}
                    totalOptions={options.length}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>

          <div className="mt-3">
            <Button
              variant="ghost"
              type="button"
              size="sm"
              onClick={addOption}
              disabled={options.length >= 6}
              className="text-gray-600"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add option
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function QuizQuestions({ form }) {
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "questions"
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

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

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over?.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        move(oldIndex, newIndex);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={fields.map(field => field.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {fields.map((field, index) => (
              <SortableQuestion
                key={field.id}
                id={field.id}
                questionIndex={index}
                form={form}
                removeQuestion={removeQuestion}
                totalQuestions={fields.length}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

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