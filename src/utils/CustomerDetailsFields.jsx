import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, GripVertical, Plus, Mail, Phone, Globe, AlertCircle, Star, User } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    TouchSensor,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';
import { useWatch } from "react-hook-form";

// Field type mapping
const FIELD_TYPE_MAP = {
    "Full name": "custom_input",
    "Email address": "email",
    "Phone number": "phone_number",
    "Country/region": "custom_input",
    "Website": "website",
    "Paragraph": "custom_input",
    "Custom field": "custom_input"
};

// Field validation dropdown component
function ValidationDropdown({ field, onValidationChange }) {
    const getIcon = (type) => {
        switch (type) {
            case "email": return <Mail className="h-4 w-4" />;
            case "phone_number": return <Phone className="h-4 w-4" />;
            case "website": return <Globe className="h-4 w-4" />;
            case "custom_input": return <AlertCircle className="h-4 w-4" />;
            default: return <AlertCircle className="h-4 w-4" />;
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0" type="button" disabled={field.isLocked}>
                    {field.type ? getIcon(field.type) : <AlertCircle className="h-4 w-4" />}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40">
                <DropdownMenuItem onClick={() => onValidationChange(field.id, "custom_input")} disabled={field.isLocked}>
                    <AlertCircle className="mr-2 h-4 w-4" /> Custom field
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onValidationChange(field.id, "email")} disabled={field.isLocked}>
                    <Mail className="mr-2 h-4 w-4" /> Email address
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onValidationChange(field.id, "phone_number")} disabled={field.isLocked}>
                    <Phone className="mr-2 h-4 w-4" /> Phone number
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onValidationChange(field.id, "website")} disabled={field.isLocked}>
                    <Globe className="mr-2 h-4 w-4" /> Website
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

// Sortable field item component
function SortableFieldItem({ field, onDelete, onFieldChange, onValidationChange, onRequiredChange }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: field.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center gap-2 mb-3 ${isDragging ? 'bg-gray-50' : ''}`}
        >
            <button
                className="cursor-grab focus:outline-none"
                type="button"
                {...attributes}
                {...listeners}
                style={{ touchAction: 'none' }}
                disabled={field.isLocked}
            >
                <GripVertical className="h-4 w-4 text-gray-400" />
            </button>

            <div className="flex-1">
                <Input
                    type="text"
                    value={field.label || ''}
                    onChange={(e) => onFieldChange(field.id, e.target.value)}
                    placeholder="Field label"
                />
            </div>

            <ValidationDropdown field={field} onValidationChange={onValidationChange} />

            <Button
                variant="ghost"
                type="button"
                size="sm"
                onClick={() => onRequiredChange(field.id)}
                className={`h-8 px-2 text-xs ${field.required ? 'text-primary' : 'text-gray-400'}`}
                title={field.required ? 'Required field' : 'Optional field'}
                disabled={field.isLocked}
            >
                <Star className={field.required ? 'fill-current' : ''} />
            </Button>

            <Button
                variant="ghost"
                type="button"
                onClick={() => onDelete(field.id)}
                className="h-8 w-8 p-0"
                disabled={field.isLocked}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default function CustomerDetailsFields({ form, isEmailFieldRequired = false }) {
    if (!form) {
        return null;
    }
    // Watch the customerFields from the form
    const customerFields = useWatch({
        control: form.control,
        name: "customerFields"
    }) || [];

    // Convert form data to local state format for UI
    const [fields, setFields] = useState([]);

    useEffect(() => {
        let convertedFields = customerFields.map((field, index) => ({
            id: `field-${index}`,
            label: field.label || '',
            type: field.type || 'custom_input',
            required: field.required || false,
            isLocked: false
        }));

        if (isEmailFieldRequired && !convertedFields.some(f => f.label === "Email address")) {
            convertedFields = [{
                id: `field-email-locked`,
                label: "Email address",
                type: "email",
                required: true,
                isLocked: true
            }, ...convertedFields];
        } else if (isEmailFieldRequired && convertedFields.some(f => f.label === "Email address")) {
            convertedFields = convertedFields.map((field, index) => ({
                ...field,
                isLocked: index === 0
            }));
        }

        setFields(convertedFields);
    }, [customerFields, isEmailFieldRequired]);

    // Update form when local state changes
    const updateFormFields = (newFields) => {
        const formFields = newFields.map(field => ({
            label: field.label,
            type: field.type,
            required: field.required
        }));
        form.setValue("customerFields", formFields, { shouldValidate: true });
    };

    const addField = (typeName) => {
        const fieldType = FIELD_TYPE_MAP[typeName] || 'custom_input';
        const newId = `field-${Date.now()}`;

        const newField = {
            id: newId,
            label: typeName,
            type: fieldType,
            required: false,
            isLocked: false
        };

        const newFields = [...fields, newField];
        setFields(newFields);
        updateFormFields(newFields);
    };

    const handleDeleteField = (id) => {
        if (fields.length <= 1 || fields.find(f => f.id === id)?.isLocked) return;
        const newFields = fields.filter(field => field.id !== id);
        setFields(newFields);
        updateFormFields(newFields);
    };

    const handleFieldNameChange = (id, newLabel) => {
        const newFields = fields.map(field =>
            field.id === id ? { ...field, label: newLabel } : field
        );
        setFields(newFields);
        updateFormFields(newFields);
    };

    const handleValidationChange = (id, fieldType) => {
        const newFields = fields.map(field =>
            field.id === id ? { ...field, type: fieldType } : field
        );
        setFields(newFields);
        updateFormFields(newFields);
    };

    const handleRequiredChange = (id) => {
        const newFields = fields.map(field =>
            field.id === id ? { ...field, required: !field.required } : field
        );
        setFields(newFields);
        updateFormFields(newFields);
    };

    // DnD setup
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            const newFields = [...fields];
            const oldIndex = newFields.findIndex(item => item.id === active.id);
            const newIndex = newFields.findIndex(item => item.id === over.id);

            const reorderedFields = arrayMove(newFields, oldIndex, newIndex);
            setFields(reorderedFields);
            updateFormFields(reorderedFields);
        }
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
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
                        {fields.map((field) => (
                            <SortableFieldItem
                                key={field.id}
                                field={field}
                                onDelete={handleDeleteField}
                                onFieldChange={handleFieldNameChange}
                                onValidationChange={handleValidationChange}
                                onRequiredChange={handleRequiredChange}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" type="button">
                        <Plus className="mr-1 h-4 w-4" /> Add field
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => addField("Full name")}>
                        Full name
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addField("Email address")}>
                        Email address
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addField("Phone number")}>
                        Phone number
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addField("Country/region")}>
                        Country/region
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addField("Website")}>
                        Website
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addField("Paragraph")}>
                        Paragraph
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addField("Custom field")}>
                        Custom field
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}