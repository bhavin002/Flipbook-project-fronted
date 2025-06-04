import { useState, useEffect } from "react";
import { Plus, Star, Trash2 } from "lucide-react";
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
import { GripVertical, Mail, Phone, Link2, Type } from "lucide-react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    KeyboardSensor,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";

const SortableDropdownOption = ({
    fieldId,
    option,
    updateDropdownOption,
    deleteDropdownOption,
    disabled,
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: `${fieldId}-option-${option.id}`,
        data: { type: "dropdownOption", fieldId, optionId: option.id },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div key={option.id} className="flex items-center gap-2 text-white" style={style}>
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
                    disabled={disabled}
                />
            </div>
            <Button
                variant="ghost"
                onClick={() => deleteDropdownOption(fieldId, option.id)}
                className="hover:text-red-500 hover:bg-sidebar"
                disabled={disabled}
            >
                <Trash2 />
            </Button>
        </div>
    );
};

const SortableField = ({
    field,
    fieldTypes,
    updateField,
    updateFieldType,
    toggleRequired,
    deleteField,
    dropdownOptions,
    updateDropdownOption,
    deleteDropdownOption,
    addDropdownOption,
    handleDropdownDragEnd,
    disabled,
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: field.id,
        data: { type: "field" },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

    const isDropdown = field.options.length > 1;

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
                    <Input
                        value={field.name}
                        onChange={(e) => updateField(field.id, "name", e.target.value)}
                        className="w-full"
                        disabled={disabled}
                    />
                </div>
                <Select
                    value={field.type}
                    onValueChange={(value) => updateFieldType(field.id, value)}
                    disabled={disabled}
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
                    disabled={disabled}
                >
                    <Star className="h-4 w-4" />
                </Button>
                <Button variant="ghost" onClick={() => deleteField(field.id)} className="hover:text-red-500 hover:bg-sidebar"><Trash2 /></Button>
            </div>
            {isDropdown && dropdownOptions[field.id] && (
                <div className="ml-5 space-y-1">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={(e) => handleDropdownDragEnd(e, field.id)}
                        modifiers={[restrictToVerticalAxis]}
                    >
                        <SortableContext
                            items={dropdownOptions[field.id].map((option) => `${field.id}-option-${option.id}`)}
                            strategy={verticalListSortingStrategy}
                        >
                            {dropdownOptions[field.id].map((option) => (
                                <SortableDropdownOption
                                    key={option.id}
                                    fieldId={field.id}
                                    option={option}
                                    updateDropdownOption={updateDropdownOption}
                                    deleteDropdownOption={deleteDropdownOption}
                                    disabled={disabled}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-primary"
                        onClick={() => addDropdownOption(field.id)}
                        disabled={disabled}
                    >
                        <Plus className="h-4 w-2 mr-2" /> Add Option
                    </Button>
                </div>
            )}
        </div>
    );
};

export default function DynamicForm({ fields: initialFields = [], onChange = () => onChange, disabled }) {
    console.log("initialFields", initialFields);
    const [fields, setFields] = useState([]);
    const [dropdownOptions, setDropdownOptions] = useState({});
    const [nextFieldId, setNextFieldId] = useState(1);
    const [nextOptionId, setNextOptionId] = useState(1);

    useEffect(() => {
        if (initialFields.length > 0) {
            setFields(initialFields);
            const options = {};
            initialFields.forEach((field) => {
                if (field.options.length > 1) {
                    options[field.id] = field.options.map((opt, idx) => ({
                        id: idx + nextOptionId,
                        value: opt,
                    }));
                }
            });
            setDropdownOptions(options);
            setNextOptionId(
                Math.max(...Object.values(options).flatMap((opts) => opts.map((o) => o.id)), 0) + 1 || 1
            );
            setNextFieldId(initialFields.length + 1);
        }
    }, [initialFields]);

    const fieldTypes = [
        { label: "Email", value: "email", icon: <Mail className="h-4 w-4" /> },
        { label: "Phone", value: "phone_number", icon: <Phone className="h-4 w-4" /> },
        { label: "Website", value: "website", icon: <Link2 className="h-4 w-4" /> },
        { label: "Custom Input", value: "custom_input", icon: <Type className="h-4 w-4" /> },
    ];

    const fieldOptions = [
        { label: "Email address", value: "Email address", type: "email" },
        { label: "Full name", value: "Full name", type: "custom_input" },
        { label: "Phone number", value: "Phone number", type: "phone_number" },
        { label: "Country/region", value: "Country/region", type: "custom_input" },
        { label: "Website", value: "Website", type: "website" },
        { label: "Dropdown field", value: "Dropdown field", type: "custom_input", isDropdown: true },
        { label: "Paragraph", value: "Paragraph", type: "custom_input" },
        { label: "Custom input", value: "Custom input", type: "custom_input" },
    ];

    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setFields((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over?.id);
                const newFields = arrayMove(items, oldIndex, newIndex);
                onChange(newFields);
                return newFields;
            });
        }
    };

    const handleDropdownDragEnd = (event, fieldId) => {
        const { active, over } = event;
        if (active.id !== over?.id && over?.id) {
            setDropdownOptions((prevOptions) => {
                const options = [...(prevOptions[fieldId] || [])];
                const activeOptionId = parseInt(active.id.split("-option-")[1]);
                const overOptionId = parseInt(over.id.split("-option-")[1]);
                const oldIndex = options.findIndex((option) => option.id === activeOptionId);
                const newIndex = options.findIndex((option) => option.id === overOptionId);
                const newOptions = arrayMove(options, oldIndex, newIndex);
                setFields((prevFields) => {
                    const newFields = prevFields.map((field) =>
                        field.id === fieldId
                            ? { ...field, options: newOptions.map((opt) => opt.value) }
                            : field
                    );
                    onChange(newFields);
                    return newFields;
                });
                return { ...prevOptions, [fieldId]: newOptions };
            });
        }
    };

    const addField = (fieldOption) => {
        if (fields.length >= 9) return;

        const fieldConfig = fieldOptions.find(opt => opt.label === fieldOption);
        const fieldType = fieldConfig?.type || "custom_input";
        let required = false;
        
        if (fieldOption === "Email address") required = true;

        const newFieldId = `field-${nextFieldId}`;
        const newField = {
            id: newFieldId,
            name: fieldOption,
            type: fieldType,
            required,
            options: fieldConfig?.isDropdown ? ["Option 1", "Option 2"] : [],
        };

        const newFields = [...fields, newField];
        setFields(newFields);
        setNextFieldId(nextFieldId + 1);
        onChange(newFields);

        if (fieldConfig?.isDropdown) {
            setDropdownOptions({
                ...dropdownOptions,
                [newFieldId]: [
                    { id: nextOptionId, value: "Option 1" },
                    { id: nextOptionId + 1, value: "Option 2" },
                ],
            });
            setNextOptionId(nextOptionId + 2);
        }
    };

    const updateField = (id, key, value) => {
        const newFields = fields.map((field) => (field.id === id ? { ...field, [key]: value } : field));
        setFields(newFields);
        onChange(newFields);
    };

    const updateFieldType = (id, type) => {
        setFields((prevFields) => {
            const newFields = prevFields.map((field) => {
                if (field.id === id) {
                    const newField = { ...field, type };
                    // If changing to custom_input and no options exist, keep it as regular input
                    // If changing away from custom_input that had dropdown options, clear them
                    if (type !== "custom_input" && field.options.length > 1) {
                        const newOptions = { ...dropdownOptions };
                        delete newOptions[id];
                        setDropdownOptions(newOptions);
                        newField.options = [];
                    }
                    return newField;
                }
                return field;
            });
            onChange(newFields);
            return newFields;
        });
    };

    const toggleRequired = (id) => {
        const newFields = fields.map((field) =>
            field.id === id ? { ...field, required: !field.required } : field
        );
        setFields(newFields);
        onChange(newFields);
    };

    const deleteField = (id) => {
        const newFields = fields.filter((field) => field.id !== id);
        setFields(newFields);
        onChange(newFields);
        if (dropdownOptions[id]) {
            const newDropdownOptions = { ...dropdownOptions };
            delete newDropdownOptions[id];
            setDropdownOptions(newDropdownOptions);
        }
    };

    const addDropdownOption = (fieldId) => {
        const options = dropdownOptions[fieldId] || [];
        const newOptions = [...options, { id: nextOptionId, value: "New option" }];
        setDropdownOptions({
            ...dropdownOptions,
            [fieldId]: newOptions,
        });
        setFields((prevFields) => {
            const newFields = prevFields.map((field) =>
                field.id === fieldId ? { ...field, options: newOptions.map((opt) => opt.value) } : field
            );
            onChange(newFields);
            return newFields;
        });
        setNextOptionId(nextOptionId + 1);
    };

    const updateDropdownOption = (fieldId, optionId, value) => {
        const options = dropdownOptions[fieldId] || [];
        const updatedOptions = options.map((option) =>
            option.id === optionId ? { ...option, value } : option
        );
        setDropdownOptions({
            ...dropdownOptions,
            [fieldId]: updatedOptions,
        });
        setFields((prevFields) => {
            const newFields = prevFields.map((field) =>
                field.id === fieldId ? { ...field, options: updatedOptions.map((opt) => opt.value) } : field
            );
            onChange(newFields);
            return newFields;
        });
    };

    const deleteDropdownOption = (fieldId, optionId) => {
        const options = dropdownOptions[fieldId] || [];
        if (options.length <= 2) return;
        const updatedOptions = options.filter((option) => option.id !== optionId);
        setDropdownOptions({
            ...dropdownOptions,
            [fieldId]: updatedOptions,
        });
        setFields((prevFields) => {
            const newFields = prevFields.map((field) =>
                field.id === fieldId ? { ...field, options: updatedOptions.map((opt) => opt.value) } : field
            );
            onChange(newFields);
            return newFields;
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
                <SortableContext items={fields.map((field) => field.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-4">
                        {fields.map((field) => (
                            <SortableField
                                key={field.id}
                                field={field}
                                fieldTypes={fieldTypes}
                                updateField={updateField}
                                updateFieldType={updateFieldType}
                                toggleRequired={toggleRequired}
                                deleteField={deleteField}
                                dropdownOptions={dropdownOptions}
                                updateDropdownOption={updateDropdownOption}
                                deleteDropdownOption={deleteDropdownOption}
                                addDropdownOption={addDropdownOption}
                                handleDropdownDragEnd={handleDropdownDragEnd}
                                disabled={disabled}
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
                            onClick={() => addField(option.label)}
                        >
                            {option.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}