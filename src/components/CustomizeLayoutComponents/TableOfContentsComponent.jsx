import React, { useState, useEffect } from 'react';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    KeyboardSensor,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, ChevronRight, GripVertical, Trash2 } from 'lucide-react';
import { useFlipbookPreviewSettings } from "@/hooks/useFlipbookPreviewSettings";
import { UpdateFlipbookPreviewSettingApi } from "@/service/flipbookPreviewSetting.service";
import { toast } from "sonner";

const SortableItem = ({
  id,
  type,
  title,
  depth,
  onDelete,
  onTitleChange,
  onAddChild,
  canAddChild,
  hasChildren,
  isCollapsed,
  onToggleCollapse,
  number,
  onNumberChange,
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
      marginLeft: `${depth * 20}px`,
  };

  // Handler to ensure only valid floating-point numbers or empty string are accepted
  const handleNumberChange = (e) => {
      const value = e.target.value;
      // Allow digits, a single decimal point, or empty string
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
          onNumberChange(value);
      }
  };

  // Handle blur event to set default value to "1" if empty
  const handleBlur = () => {
      if (number === '') {
          onNumberChange('1');
      }
  };

  return (
      <div ref={setNodeRef} style={style} className="flex items-center gap-2 mb-2 group text-white">
          {hasChildren && (
              <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleCollapse}
                  className="hover:bg-sidebar hover:text-white"
              >
                  <ChevronRight className={`w-4 h-4 transition-transform ${!isCollapsed ? 'rotate-90' : ''}`} />
              </Button>
          )}
          {!hasChildren && <div className="w-9" />} {/* Placeholder for alignment */}
          <div {...attributes} {...listeners} className="cursor-move">
              <GripVertical className="w-4 h-4" />
          </div>
          <Input
              type="text"
              value={number}
              onChange={handleNumberChange}
              onBlur={handleBlur}
              className="w-14 mr-2"
              placeholder="0"
              pattern="\d*\.?\d*"
              inputMode="decimal"
          />
          <Input
              placeholder={type === 'chapter' ? 'Chapter title' : 'Subchapter title'}
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="md:w-[300px] placeholder:text-[#d8dce3]"
          />
          {canAddChild && (
              <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-sidebar hover:text-white"
                  onClick={() => onAddChild(id)}
              >
                  <Plus className="w-4 h-4" />
              </Button>
          )}
          <Button variant="ghost" className="hover:text-red-500 hover:bg-sidebar" onClick={onDelete}>
              <Trash2 />
          </Button>
      </div>
  );
};

export default function TableOfContentsComponent({ flipbookId, settings }) {
    const { isFieldEnabled } = useFlipbookPreviewSettings();
    const [isActivated, setIsActivated] = useState(true);
    const [items, setItems] = useState([]);
    const [collapsedChapters, setCollapsedChapters] = useState({});

    useEffect(() => {
        if (settings) {
            setIsActivated(settings.isTableOfContent || false);
            const tocItems = (settings.tableOfContents || []).flatMap((chapter, chapterIndex) => [
                {
                    id: chapter._id,
                    type: 'chapter',
                    title: chapter.chapterName,
                    number: chapter.pageNumber || '1', // Ensure default value
                    depth: 0,
                    parentId: null,
                    sequence: chapter.sequence,
                },
                ...(chapter.subChapters || []).map((subChapter, subIndex) => ({
                    id: subChapter._id,
                    type: 'subchapter',
                    title: subChapter.chapterName,
                    number: subChapter.pageNumber || '1', // Ensure default value
                    depth: 1,
                    parentId: chapter._id,
                    sequence: subIndex + 1,
                })),
            ]);
            setItems(tocItems);
        }
    }, [settings]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    const handleUpdate = async (payload) => {
        try {
            const formData = new FormData();
            Object.entries(payload).forEach(([key, value]) => {
                if (key === 'tableOfContents') {
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, value);
                }
            });
            await UpdateFlipbookPreviewSettingApi(flipbookId, formData);
        } catch (error) {
            toast.error("Failed to update table of contents", { description: error.message });
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over?.id);
                const newItems = arrayMove(items, oldIndex, newIndex);
                handleUpdate({ tableOfContents: convertToApiFormat(newItems) });
                return newItems;
            });
        }
    };

    const addNewItem = (parentId = null) => {
        const newItem = {
            id: `item-${Date.now()}`,
            type: parentId ? 'subchapter' : 'chapter',
            title: '',
            parentId,
            depth: parentId ? 1 : 0,
            number: '1', // Default to "1"
            sequence: parentId ? items.filter((item) => item.parentId === parentId).length + 1 : items.filter((item) => !item.parentId).length + 1,
        };
        const newItems = [...items, newItem];
        setItems(newItems);
        handleUpdate({ tableOfContents: convertToApiFormat(newItems) });
    };

    const deleteItem = (id) => {
        const childrenIds = items.filter((item) => item.parentId === id).map((item) => item.id);
        const newItems = items.filter((item) => item.id !== id && !childrenIds.includes(item.id));
        setItems(newItems);
        const newCollapsed = { ...collapsedChapters };
        delete newCollapsed[id];
        setCollapsedChapters(newCollapsed);
        handleUpdate({ tableOfContents: convertToApiFormat(newItems) });
    };

    const updateItemTitle = (id, newTitle) => {
        const newItems = items.map((item) => (item.id === id ? { ...item, title: newTitle } : item));
        setItems(newItems);
        handleUpdate({ tableOfContents: convertToApiFormat(newItems) });
    };

    const updateItemNumber = (id, newNumber) => {
        const newItems = items.map((item) => (item.id === id ? { ...item, number: newNumber } : item));
        setItems(newItems);
        // Only call API if the number is not empty or after blur it will be set to "1"
        if (newNumber !== '') {
            handleUpdate({ tableOfContents: convertToApiFormat(newItems) });
        }
    };

    const addChildItem = (parentId) => {
        const parentItem = items.find((item) => item.id === parentId);
        if (parentItem && parentItem.type === 'chapter') {
            addNewItem(parentId);
            setCollapsedChapters((prev) => ({ ...prev, [parentId]: false }));
        }
    };

    const toggleCollapse = (chapterId) => {
        setCollapsedChapters((prev) => ({
            ...prev,
            [chapterId]: !prev[chapterId],
        }));
    };

    const isItemVisible = (item) => {
        if (!item.parentId) return true;
        const parent = items.find((i) => i.id === item.parentId);
        if (!parent) return true;
        return !collapsedChapters[item.parentId];
    };

    const hasChildren = (chapterId) => {
        return items.some((item) => item.parentId === chapterId);
    };

    const convertToApiFormat = (items) => {
        const chapters = items.filter((item) => !item.parentId).map((chapter, index) => ({
            chapterName: chapter.title,
            pageNumber: chapter.number === '' ? '1' : chapter.number, // Default to "1" for API
            sequence: index + 1,
            subChapters: items
                .filter((item) => item.parentId === chapter.id)
                .map((subChapter, subIndex) => ({
                    chapterName: subChapter.title,
                    pageNumber: subChapter.number === '' ? '1' : subChapter.number, // Default to "1" for API
                    sequence: subIndex + 1,
                })),
        }));
        return chapters;
    };

    const getSortedItems = () => {
        const chapters = items.filter((item) => !item.parentId);
        const result = [];
        chapters.forEach((chapter) => {
            result.push(chapter);
            if (!collapsedChapters[chapter.id]) {
                const subchapters = items.filter((item) => item.parentId === chapter.id);
                result.push(...subchapters);
            }
        });
        return result;
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
                <Checkbox
                    id="activate"
                    checked={isActivated}
                    className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary"
                    onCheckedChange={() => {
                        setIsActivated((prev) => {
                            const newState = !prev;
                            handleUpdate({ isTableOfContent: newState });
                            if (newState && items.length === 0) {
                                addNewItem();
                            }
                            return newState;
                        });
                    }}
                    disabled={!isFieldEnabled("isTableOfContent")}
                />
                <Label htmlFor="activate" className="text-sm font-medium">
                    Activate Table of Contents
                </Label>
            </div>
            {isActivated && (
                <div className={`text-white relative ${!isFieldEnabled("tableOfContents") ? "pointer-events-none opacity-50" : ""}`}>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                        modifiers={[restrictToVerticalAxis]}
                    >
                        <SortableContext
                            items={items.map((item) => item.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {getSortedItems()
                                .filter((item) => isItemVisible(item))
                                .map((item) => (
                                    <SortableItem
                                        key={item.id}
                                        id={item.id}
                                        type={item.type}
                                        title={item.title}
                                        depth={item.depth}
                                        number={item.number}
                                        onDelete={() => deleteItem(item.id)}
                                        onTitleChange={(newTitle) => updateItemTitle(item.id, newTitle)}
                                        onNumberChange={(newNumber) => updateItemNumber(item.id, newNumber)}
                                        onAddChild={() => addChildItem(item.id)}
                                        canAddChild={item.type === 'chapter'}
                                        hasChildren={item.type === 'chapter' && hasChildren(item.id)}
                                        isCollapsed={collapsedChapters[item.id]}
                                        onToggleCollapse={() => toggleCollapse(item.id)}
                                        disabled={!isFieldEnabled("tableOfContents")}
                                    />
                                ))}
                        </SortableContext>
                    </DndContext>
                    <Button
                        variant="outline"
                        className="mt-2 w-full text-primary"
                        onClick={() => addNewItem()}
                        disabled={!isFieldEnabled("tableOfContents")}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Chapter
                    </Button>
                </div>
            )}
        </div>
    );
}