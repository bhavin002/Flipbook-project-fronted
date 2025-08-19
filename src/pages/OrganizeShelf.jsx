import React, { useEffect } from "react";
import { useShelfCreate } from "@/layout/ShelfCreateLayout";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import bookLogo from '/assets/book_thumbnail.jpg';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { Loader } from "@/components/ui/loader";

function SortableFlipbookCard({ flipbook }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: flipbook._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'all cubic-bezier(.22,.68,0,1.71)',
    cursor: 'move',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`relative flex flex-col rounded-sm h-[351px] overflow-hidden group transition-all duration-200 border-2 border-primary group-hover:border-4 group-hover:border-primary group-hover:rounded-md group-hover:shadow-lg group-hover:shadow-black/30
        ${isSortableDragging ? 'shadow-2xl scale-105 border-primary' : ''}
      `}
    >
      <div
        className={`absolute inset-0 z-10 bg-black/40 pointer-events-none transition-opacity duration-200 
          ${isSortableDragging ? 'opacity-60' : 'opacity-0 group-hover:opacity-60'}`}
      />
      <div className="flex-grow flex items-center justify-center bg-[#f6f6f6] max-h-full h-[245px] relative" >
        <img
          src={flipbook.thumbnail ? flipbook.thumbnail : bookLogo}
          alt={flipbook.name}
          className="max-h-full"
        />
      </div>
      <div className="text-start px-3 space-y-1 py-2">
        <p
          className="font-semibold truncate"
          title={flipbook.name}
        >
          {flipbook.name}
        </p>
        <img src="/assets/globe.png" className="w-4 h-4"/>
      </div>
    </div>
  );
}

export default function OrganizeShelf() {
  const { 
    orderedFlipbooks, 
    setOrderedFlipbooks, 
    isEditMode,
    loading,
  } = useShelfCreate();

  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setOrderedFlipbooks((items) => {
        const oldIndex = items.findIndex(fb => fb._id === active.id);
        const newIndex = items.findIndex(fb => fb._id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!orderedFlipbooks || orderedFlipbooks.length === 0) {
    return (
      <div className="flex flex-col items-center w-full px-4 md:px-6 mt-4">
        <p className="text-lg text-gray-500 mt-8">No flipbooks selected. Please select flipbooks first.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-6 mt-4">
      <div className="flex justify-between items-center gap-3">
        <p className="text-lg font-semibold">
          {isEditMode ? "Reorganize" : "Organize"} flipbooks ({orderedFlipbooks.length})
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4 py-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToParentElement]}
        >
          <SortableContext
            items={orderedFlipbooks.map(fb => fb._id)}
            strategy={rectSortingStrategy}
          >
            {orderedFlipbooks.map((fb) => (
              <SortableFlipbookCard key={fb._id} flipbook={fb} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}