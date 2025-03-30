import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { GripVertical, Mail, Phone, Link2, Type, Star, Plus } from "lucide-react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    KeyboardSensor
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';
import { Input } from "@/components/ui/input";


const SortableDropdownOption = ({ fieldId, option, updateDropdownOption, deleteDropdownOption, disabled }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: `${fieldId}-option-${option.id}`,
        data: {
            type: 'dropdownOption',
            fieldId,
            optionId: option.id
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div key={option.id} className="flex items-center gap-2" style={style}>
            <div
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                className="flex items-center justify-center cursor-move"
            >
                <GripVertical className="h-4 w-4" />
            </div>
            <div className="flex-1">
                <Input
                    value={option.value}
                    onChange={(e) => updateDropdownOption(fieldId, option.id, e.target.value)}
                    className="w-full"
                />
            </div>
            <Button variant="ghost" onClick={() => deleteDropdownOption(fieldId, option.id)} className="hover:text-red-500"><Trash2 /></Button>
        </div>
    );
};

const SortableField = ({ field, fieldTypes, updateFieldType, toggleRequired, deleteField, dropdownOptions, updateDropdownOption, deleteDropdownOption, addDropdownOption, handleDropdownDragEnd }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: field.id,
        data: {
            type: 'field'
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    return (
        <div className="space-y-2" style={style}>
            <div className="flex items-center gap-2 text-white">
                <div
                    ref={setNodeRef}
                    {...attributes}
                    {...listeners}
                    className="flex items-center justify-center cursor-move"
                >
                    <GripVertical className="h-4 w-4" />
                </div>
                <div className="flex-1">
                    <Input value={field.name} className="w-full" />
                </div>
                <Select
                    value={field.type}
                    onValueChange={(value) => updateFieldType(field.id, value)}
                >
                    <SelectTrigger className="w-16">
                        <SelectValue>
                            {fieldTypes.find((t) => t.value === field.type)?.icon}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {fieldTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center gap-2">
                                    {type.icon}
                                    <span>{type.label}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleRequired(field.id)}
                    className={`hover:bg-sidebar hover:text-white ${field.required ? 'text-white' : 'text-gray-400'}`}
                >
                    <Star className="h-4 w-4" />
                </Button>
                <Button variant="ghost" onClick={() => deleteField(field.id)} className="hover:text-red-500 hover:bg-sidebar"><Trash2 /></Button>
            </div>

            {field.name === "Dropdown field" && dropdownOptions[field.id] && (
                <div className="ml-6 space-y-2">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={(event) => handleDropdownDragEnd(event, field.id)}
                        modifiers={[restrictToVerticalAxis]}
                    >
                        <SortableContext
                            items={dropdownOptions[field.id].map(option => `${field.id}-option-${option.id}`)}
                            strategy={verticalListSortingStrategy}
                        >
                            {dropdownOptions[field.id].map((option) => (
                                <SortableDropdownOption
                                    key={`${field.id}-option-${option.id}`}
                                    fieldId={field.id}
                                    option={option}
                                    updateDropdownOption={updateDropdownOption}
                                    deleteDropdownOption={deleteDropdownOption}
                                    disabled={dropdownOptions[field.id].length <= 1}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                    <Button variant="outline" size="sm" className="text-primary" onClick={() => addDropdownOption(field.id)}
                    >
                        <Plus /> Add option
                    </Button>
                </div>
            )}
        </div>
    );
};

export default function DynamicForm() {

    const [fields, setFields] = useState([
        { id: "field-1", name: "Email address", type: "email", required: true },
        { id: "field-2", name: "Full name", type: "text", required: true },
        { id: "field-3", name: "Phone number", type: "tel", required: false },
        { id: "field-4", name: "Website", type: "url", required: false },
    ]);

    const [dropdownOptions, setDropdownOptions] = useState({});
    const [nextOptionId, setNextOptionId] = useState(1);

    const fieldTypes = [
        { label: "No validation", value: "text", icon: <Type className="h-4 w-4" /> },
        { label: "Email address", value: "email", icon: <Mail className="h-4 w-4" /> },
        { label: "Phone number", value: "tel", icon: <Phone className="h-4 w-4" /> },
        { label: "Website", value: "url", icon: <Link2 className="h-4 w-4" /> },
    ];

    const fieldOptions = [
        { label: "Email address", value: "Email address" },
        { label: "Full name", value: "Full name" },
        { label: "Phone number", value: "Phone number" },
        { label: "Country/region", value: "Country/region" },
        { label: "Website", value: "Website" },
        { label: "Dropdown field", value: "Dropdown field" },
        { label: "Paragraph", value: "Paragraph" },
        { label: "Custom input", value: "Custom input" },
    ];

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setFields((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over?.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleDropdownDragEnd = (event, fieldId) => {
        const { active, over } = event;

        if (active.id !== over?.id && over?.id) {
            setDropdownOptions((prevOptions) => {
                const options = [...(prevOptions[fieldId] || [])];

                const activeOptionId = parseInt(active.id.split('-option-')[1]);
                const overOptionId = parseInt(over.id.split('-option-')[1]);

                const oldIndex = options.findIndex((option) => option.id === activeOptionId);
                const newIndex = options.findIndex((option) => option.id === overOptionId);

                return {
                    ...prevOptions,
                    [fieldId]: arrayMove(options, oldIndex, newIndex)
                };
            });
        }
    };

    const addField = (fieldName) => {
        let fieldType = "text";
        if (fieldName === "Email address") fieldType = "email";
        if (fieldName === "Phone number") fieldType = "tel";
        if (fieldName === "Website") fieldType = "url";

        const newFieldId = `field-${Date.now()}`;
        const newField = {
            id: newFieldId,
            name: fieldName,
            type: fieldType,
            required: false,
        };

        setFields([...fields, newField]);

        if (fieldName === "Dropdown field") {
            setDropdownOptions({
                ...dropdownOptions,
                [newFieldId]: [{ id: nextOptionId, value: "New option" }]
            });
            setNextOptionId(nextOptionId + 1);
        }
    };

    const updateFieldType = (id, type) => {
        setFields(
            fields.map((field) => (field.id === id ? { ...field, type } : field))
        );
    };

    const toggleRequired = (id) => {
        setFields(
            fields.map((field) =>
                field.id === id ? { ...field, required: !field.required } : field
            )
        );
    };

    const deleteField = (id) => {
        setFields(fields.filter((field) => field.id !== id));

        if (dropdownOptions[id]) {
            const newDropdownOptions = { ...dropdownOptions };
            delete newDropdownOptions[id];
            setDropdownOptions(newDropdownOptions);
        }
    };

    const addDropdownOption = (fieldId) => {
        const options = dropdownOptions[fieldId] || [];
        const newOptions = [
            ...options,
            { id: nextOptionId, value: "New option" }
        ];

        setDropdownOptions({
            ...dropdownOptions,
            [fieldId]: newOptions
        });

        setNextOptionId(nextOptionId + 1);
    };

    const updateDropdownOption = (fieldId, optionId, value) => {
        const options = dropdownOptions[fieldId] || [];
        const updatedOptions = options.map(option =>
            option.id === optionId ? { ...option, value } : option
        );

        setDropdownOptions({
            ...dropdownOptions,
            [fieldId]: updatedOptions
        });
    };

    const deleteDropdownOption = (fieldId, optionId) => {
        const options = dropdownOptions[fieldId] || [];

        if (options.length <= 1) return;

        const updatedOptions = options.filter(option => option.id !== optionId);

        setDropdownOptions({
            ...dropdownOptions,
            [fieldId]: updatedOptions
        });
    };
    return (
        <>
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
                        {fields.map((field) => (
                            <SortableField
                                key={field.id}
                                field={field}
                                fieldTypes={fieldTypes}
                                updateFieldType={updateFieldType}
                                toggleRequired={toggleRequired}
                                deleteField={deleteField}
                                dropdownOptions={dropdownOptions}
                                updateDropdownOption={updateDropdownOption}
                                deleteDropdownOption={deleteDropdownOption}
                                addDropdownOption={addDropdownOption}
                                handleDropdownDragEnd={handleDropdownDragEnd}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="text-primary">
                        <Plus />Add field
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    {fieldOptions.map((option) => (
                        <DropdownMenuItem
                            key={option.value}
                            onClick={() => addField(option.value)}
                        >
                            {option.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}