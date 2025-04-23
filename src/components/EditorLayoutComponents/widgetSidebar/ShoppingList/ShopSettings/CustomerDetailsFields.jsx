import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, GripVertical, Plus, Mail, Phone, Globe, AlertCircle, Star } from "lucide-react";
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

// Field validation dropdown component
function ValidationDropdown({ field, onValidationChange }) {
    const getIcon = (type) => {
        switch (type) {
            case "email": return <Mail className="h-4 w-4" />;
            case "phone": return <Phone className="h-4 w-4" />;
            case "website": return <Globe className="h-4 w-4" />;
            default: return null;
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    {field.validation ? getIcon(field.validation) : <AlertCircle className="h-4 w-4" />}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40">
                <DropdownMenuItem onClick={() => onValidationChange(field.id, null)}>
                    <AlertCircle className="mr-2 h-4 w-4" /> No validation
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onValidationChange(field.id, "email")}>
                    <Mail className="mr-2 h-4 w-4" /> Email address
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onValidationChange(field.id, "phone")}>
                    <Phone className="mr-2 h-4 w-4" /> Phone number
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onValidationChange(field.id, "website")}>
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
                {...attributes}
                {...listeners}
            >
                <GripVertical className="h-4 w-4 text-gray-400" />
            </button>

            <div className="flex-1">
                <Input
                    type="text"
                    value={field.name}
                    onChange={(e) => onFieldChange(field.id, e.target.value)}
                />
            </div>

            <ValidationDropdown field={field} onValidationChange={onValidationChange} />

            <Button
                variant="ghost"
                size="sm"
                onClick={() => onRequiredChange(field.id)}
                className="h-8 px-2 text-xs"
            >
                {field.required ? <Star /> : <Star color="#7b39ed" />}
            </Button>
            <Button
                variant="ghost"
                onClick={() => onDelete(field.id)}
                className="h-8 w-8 p-0"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default function CustomerDetailsFields() {
    const [fields, setFields] = useState([
        { id: "field-1", name: "Full name", validation: null, required: true },
        { id: "field-2", name: "Email address", validation: "email", required: true },
        { id: "field-3", name: "Phone number", validation: "phone", required: false },
        { id: "field-4", name: "Country/region", validation: null, required: false }
    ]);

    const addField = (type) => {
        const newId = `field-${Date.now()}`;

        let validation = null;
        if (type === "Email address") validation = "email";
        else if (type === "Phone number") validation = "phone";
        else if (type === "Website") validation = "website";

        const newField = {
            id: newId,
            name: type,
            validation: validation,
            required: false
        };

        setFields([...fields, newField]);
    };

    const handleDeleteField = (id) => {
        setFields(fields.filter(field => field.id !== id));
    };

    const handleFieldNameChange = (id, newName) => {
        setFields(fields.map(field =>
            field.id === id ? { ...field, name: newName } : field
        ));
    };

    const handleValidationChange = (id, validationType) => {
        setFields(fields.map(field =>
            field.id === id ? { ...field, validation: validationType } : field
        ));
    };

    const handleRequiredChange = (id) => {
        setFields(fields.map(field =>
            field.id === id ? { ...field, required: !field.required } : field
        ));
    };

    // DnD setup
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setFields((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
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
                    <Button variant="outline" size="sm">
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