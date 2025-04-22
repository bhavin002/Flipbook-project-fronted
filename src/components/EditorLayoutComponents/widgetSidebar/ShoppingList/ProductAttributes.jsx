import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, GripVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
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

// Sortable attribute item component
function SortableAttributeItem({ attribute, onDelete, onAttributeChange, onOptionsChange }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: attribute.id });

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
      
      <div className="flex-shrink-0 w-32">
        <Input
          type="text"
          value={attribute.name}
          onChange={(e) => onAttributeChange(attribute.id, e.target.value)}
        />
      </div>
      
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Use Enter to separate choices (e.g., S, M, L)."
          value={attribute.options.join(", ")}
          onChange={(e) => {
            const options = e.target.value.split(",").map(opt => opt.trim());
            onOptionsChange(attribute.id, options);
          }}
        />
      </div>
      
      <Button 
        variant="ghost" 
        onClick={() => onDelete(attribute.id)}
        className="h-8 w-8 p-0"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function ProductAttributes() {
  const [attributes, setAttributes] = useState([]);
  
  const addAttribute = (type) => {
    const newId = `attr-${Date.now()}`;
    const newAttribute = {
      id: newId,
      name: type,
      options: [],
    };
    
    setAttributes([...attributes, newAttribute]);
  };
  
  const handleDeleteAttribute = (id) => {
    setAttributes(attributes.filter(attr => attr.id !== id));
  };
  
  const handleAttributeNameChange = (id, newName) => {
    setAttributes(attributes.map(attr => 
      attr.id === id ? { ...attr, name: newName } : attr
    ));
  };
  
  const handleOptionsChange = (id, newOptions) => {
    setAttributes(attributes.map(attr => 
      attr.id === id ? { ...attr, options: newOptions } : attr
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
      setAttributes((items) => {
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
            items={attributes.map(attr => attr.id)}
            strategy={verticalListSortingStrategy}
          >
            {attributes.map((attribute) => (
              <SortableAttributeItem
                key={attribute.id}
                attribute={attribute}
                onDelete={handleDeleteAttribute}
                onAttributeChange={handleAttributeNameChange}
                onOptionsChange={handleOptionsChange}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Plus className="mr-1 h-4 w-4" /> Add attributes
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => addAttribute("Custom attribute")}>
            Custom attribute
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addAttribute("Size")}>
            Size
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addAttribute("Color")}>
            Color
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addAttribute("Material")}>
            Material
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}