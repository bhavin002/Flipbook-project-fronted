import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, GripVertical, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
import MaskInput from "@/utils/MaskInput";
import ManageVariantImages from "./ManageVariantImages";


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
        type="button"
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
        <MaskInput
          value={attribute.options}
          placeholder="Use Enter to separate choices (e.g., S, M, L)."
          onChange={(newOptions) => onOptionsChange(attribute.id, newOptions)}
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


export default function ProductAttributes({ setValue, errors, watch }) {
  const [attributes, setAttributes] = useState(() => {
    const productAttrs = watch("productAttributes") || [];
    return productAttrs.map((attr, index) => ({
      id: attr._id,
      name: attr.attributeName,
      options: attr.optionValues || [],
    }));
  });
  const [selectedAttributeId, setSelectedAttributeId] = useState(attributes.find(attr => attr.name === watch("variantImages")?.selectedAttribute)?.id);

  const price = watch("price");
  const discountPrice = watch("discountPrice");
  const sku = watch("sku");

  const addAttribute = (type) => {
    const newId = `attr-${Date.now()}`;
    const newAttribute = {
      id: newId,
      name: type,
      options: [],
    };

    const newAttributes = [...attributes, newAttribute];
    setAttributes(newAttributes);
    setValue("productAttributes", newAttributes.map(attr => ({
      attributeName: attr.name,
      optionValues: attr.options
    })));
  };

  const handleDeleteAttribute = (id) => {
    const newAttributes = attributes.filter(attr => attr.id !== id);
    setAttributes(newAttributes);
    setValue("productAttributes", newAttributes.map(attr => ({
      attributeName: attr.name,
      optionValues: attr.options
    })));
    // Reset selected attribute if the deleted attribute was selected
    if (selectedAttributeId === id) {
      setSelectedAttributeId(null);
      setValue("selectedAttribute", null);
    }
  };

  const handleAttributeNameChange = (id, newName) => {
    const newAttributes = attributes.map(attr =>
      attr.id === id ? { ...attr, name: newName } : attr
    );
    setAttributes(newAttributes);
    setValue("productAttributes", newAttributes.map(attr => ({
      attributeName: attr.name,
      optionValues: attr.options
    })));
  };

  const handleOptionsChange = (id, newOptions) => {
    const newAttributes = attributes.map(attr =>
      attr.id === id ? { ...attr, options: newOptions } : attr
    );
    setAttributes(newAttributes);
    setValue("productAttributes", newAttributes.map(attr => ({
      attributeName: attr.name,
      optionValues: attr.options
    })));
  };

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
        const newItems = arrayMove(items, oldIndex, newIndex);
        setValue("productAttributes", newItems.map(attr => ({
          attributeName: attr.name,
          optionValues: attr.options
        })));
        return newItems;
      });
    }
  }

  
  const variants = useMemo(() => {
    if (attributes.length === 0) return [];

    const validAttributes = attributes.filter(attr => attr.options.length > 0);
    if (validAttributes.length === 0) return [];

    // Get existing product variants to preserve visibility settings
    const existingVariants = watch("productVariants") || [];
    
    // Generate all possible combinations first
    let combinations = validAttributes[0].options.map(option => ({
      variant: option,
      price: price,
      discountPrice: discountPrice,
      sku: sku,
      visibility: true,
    }));

    for (let i = 1; i < validAttributes.length; i++) {
      const newCombinations = [];
      const currentOptions = validAttributes[i].options;

      combinations.forEach(comb => {
        currentOptions.forEach(option => {
          // Create the new variant name
          const newVariantName = `${comb.variant} | ${option}`;

          newCombinations.push({
            variant: newVariantName,
            price: comb.price,
            discountPrice: comb.discountPrice,
            sku: comb.sku,
            visibility: comb.visibility,
          });
        });
      });

      combinations = newCombinations;
    }

    // Now match with existing variants to preserve their values and _id
    combinations = combinations.map(comb => {
      const existingVariant = existingVariants.find(v => v.variantName === comb.variant);

      return {
        _id: existingVariant?._id,
        variant: comb.variant,
        price: existingVariant?.price || comb.price,
        discountPrice: existingVariant?.discountPrice || comb.discountPrice,
        sku: existingVariant?.sku || comb.sku,
        visibility: existingVariant ? existingVariant.visibility : comb.visibility,
      };
    });

    setValue("productVariants", combinations.map(comb => ({
      _id: comb._id,
      variantName: comb.variant,
      price: comb.price,
      discountPrice: comb.discountPrice,
      sku: comb.sku,
      visibility: comb.visibility,
    })));

    return combinations;
  }, [attributes, setValue, watch]);

  return (
    <div className="space-y-6">
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
            {attributes.map((attribute, index) => (
              <div key={attribute.id}>
                <SortableAttributeItem
                  attribute={attribute}
                  onDelete={handleDeleteAttribute}
                  onAttributeChange={handleAttributeNameChange}
                  onOptionsChange={handleOptionsChange}
                />
                {errors.productAttributes?.[index]?.attributeName && (
                  <p className="text-red-500 text-xs">{errors.productAttributes[index].attributeName.message}</p>
                )}
                {errors.productAttributes?.[index]?.optionValues && (
                  <p className="text-red-500 text-xs">{errors.productAttributes[index].optionValues.message}</p>
                )}
              </div>
            ))}
          </SortableContext>
        </DndContext>
        <div className="flex justify-between items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" disabled={attributes.length >= 3} type="button">
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
      </div>

      <ManageVariantImages
        attributes={attributes}
        variants={variants}
        setValue={setValue}
        watch={watch}
        selectedAttributeId={selectedAttributeId}
        setSelectedAttributeId={setSelectedAttributeId}
      />
    </div>
  );
}
