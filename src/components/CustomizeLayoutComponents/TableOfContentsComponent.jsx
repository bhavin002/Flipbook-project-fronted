import React, { useState } from 'react';
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
import { getData } from '@/utils/datas';

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
    onNumberChange
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
  
    return (
      <div 
        ref={setNodeRef} 
        style={style}
        className="flex items-center gap-2 mb-2 group text-white"
      >
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
        
        {!hasChildren && <div className="w-9" />}
        
        <div 
          {...attributes} 
          {...listeners} 
          className="cursor-move"
        >
          <GripVertical className="w-4 h-4" />
        </div>
        
        <Input
          type="number"
          value={number}
          onChange={(e) => onNumberChange(Number(e.target.value))}
          min="1"
          className="w-14 mr-2"
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
        <Button variant="ghost" className="hover:text-red-500 hover:bg-sidebar"  onClick={onDelete}><Trash2 /></Button>
      </div>
    );
  };

export default function TableOfContentsComponent() {
  const [isActivated, setIsActivated] = useState(true);
  const [items, setItems] = useState(getData('tableOfContents'));
  const [collapsedChapters, setCollapsedChapters] = useState({});

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        
        return arrayMove(items, oldIndex, newIndex);
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
      number: 1,
    };
    setItems([...items, newItem]);
  };

  const deleteItem = (id) => {
    const childrenIds = items.filter(item => item.parentId === id).map(item => item.id);
    setItems(items.filter(item => item.id !== id && !childrenIds.includes(item.id)));
    const newCollapsed = {...collapsedChapters};
    delete newCollapsed[id];
    setCollapsedChapters(newCollapsed);
  };

  const updateItemTitle = (id, newTitle) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, title: newTitle } : item
    ));
  };

  const updateItemNumber = (id, newNumber) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, number: newNumber } : item
    ));
  };

  const addChildItem = (parentId) => {
    const parentItem = items.find(item => item.id === parentId);
    if (parentItem && parentItem.type === 'chapter') {
      addNewItem(parentId);
      setCollapsedChapters(prev => ({...prev, [parentId]: false}));
    }
  };

  const toggleCollapse = (chapterId) => {
    setCollapsedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const isItemVisible = (item) => {
    if (!item.parentId) return true;
    const parent = items.find(i => i.id === item.parentId);
    if (!parent) return true;
    return !collapsedChapters[item.parentId];
  };

  const hasChildren = (chapterId) => {
    return items.some(item => item.parentId === chapterId);
  };

  const getSortedItems = () => {
    const chapters = items.filter(item => !item.parentId);
    const result = [];
    
    chapters.forEach(chapter => {
      result.push(chapter);
      if (!collapsedChapters[chapter.id]) {
        const subchapters = items.filter(item => item.parentId === chapter.id);
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
            setIsActivated(!isActivated);
            if (!isActivated && items.length === 0) {
              addNewItem();
            }
          }}
        />
        <Label htmlFor="activate" className="text-sm font-medium">
          Activate Table of Contents
        </Label>
      </div>

      {isActivated && (
        <div className='text-white'>
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext 
              items={items.map(item => item.id)} 
              strategy={verticalListSortingStrategy}
            >
              {getSortedItems()
                .filter(item => isItemVisible(item))
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
                  />
                ))}
            </SortableContext>
          </DndContext>

          <Button 
            variant="outline" 
            className="mt-2 w-full text-primary"
            onClick={() => addNewItem()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Chapter
          </Button>
        </div>
      )}
    </div>
  );
}