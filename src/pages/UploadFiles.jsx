import React, { useRef, useState } from 'react';
import { useFileUpload } from '@/context/FileUploadContext';
import { Button } from "@/components/ui/button";
import { X, Upload, GripVertical, ArrowRight } from 'lucide-react';
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
import ConfirmationDialog from "@/utils/ConfirmationDialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { UploadPdfApi } from "@/service/flipbook.service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FlipbookUploadMode } from '@/utils/enum';
import LoadingButton from '@/utils/LoadingButton';

function SortableFileItem({ file, index, onRemove, disableRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: `${file.name}-${file.size}-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 bg-white border border-gray-200 rounded-2xl py-1.5 px-3 transition-all ${isSortableDragging ? 'opacity-50 scale-95' : 'hover:border-gray-300 hover:shadow-sm'
        }`}
      {...attributes}
    >
      <div
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-5 h-5 text-gray-400" />
      </div>
      <div className="flex-1 min-w-0 border-r">
        <div className="font-medium truncate text-sm text-gray-900">{file.name}</div>
      </div>
      {disableRemove ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onRemove(index)}
                  disabled={disableRemove}
                  title="At least one file is required"
                  tabIndex={-1}
                >
                  <X className="w-4 h-4" />
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              align="center"
              className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs p-2 rounded-md"
            >
              <p className="text-sm">Your flipbook must have at least one file.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onRemove(index)}
          disabled={disableRemove}
          title="Remove file"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

export default function FileUploadReorder() {
  const { files, setFiles } = useFileUpload();
  console.log("files ?<>?<", files)
  const [replaceFile, setReplaceFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [pendingDeleteIndex, setPendingDeleteIndex] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setFiles((items) => {
        const oldIndex = items.findIndex(
          (item, index) => `${item.name}-${item.size}-${index}` === active.id
        );
        const newIndex = items.findIndex(
          (item, index) => `${item.name}-${item.size}-${index}` === over.id
        );

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Show confirmation dialog instead of immediately removing
  const handleRemove = (indexToRemove) => {
    setPendingDeleteIndex(indexToRemove);
    setIsConfirmModalOpen(true);
  };

  // Remove file if confirmed
  const confirmRemove = () => {
    setFiles(prevFiles => prevFiles.filter((_, index) => index !== pendingDeleteIndex));
    setIsConfirmModalOpen(false);
    setPendingDeleteIndex(null);
  };

  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (replaceFile && selectedFiles.length > 0) {
      const newFile = selectedFiles[0];
      setFiles(prevFiles =>
        prevFiles.map(f => f === replaceFile ? newFile : f)
      );
      setReplaceFile(null);
    } else if (selectedFiles.length > 0) {
      setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    setReplaceFile(null);
    fileInputRef.current?.click();
  };

  const handleContinue = async () => {
    if (files.length === 0) return;
    setUploading(true);
    try {
      const formData = new FormData();
      files.forEach(file => formData.append("files", file));
      formData.append("mode", FlipbookUploadMode.COMBINE);
      const response = await UploadPdfApi(formData);
      // Assuming response.data.bookId for navigation
      const bookId = response.data.bookId;
      toast.success("Files merged and uploaded!");
      setTimeout(() => {
        navigate(`/customize/${bookId}`);
      }, 100);
    } catch (error) {
      toast.error("Failed to upload files", {
        description: error.message
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOverUpload = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDropUpload = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => {
      const validTypes = ['application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.oasis.opendocument.presentation'];
      const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      return validTypes.includes(file.type) || validImageTypes.includes(file.type);
    });

    if (validFiles.length > 0) {
      setFiles(prevFiles => [...prevFiles, ...validFiles]);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full bg-white flex h-full overflow-auto flex-col">
        <div className='flex flex-col overflow-y-auto'>
          <div className='flex flex-col justify-center m-auto max-w-2xl w-full'>

            <h1 className="text-2xl font-semibold text-center">Reorder or add more files</h1>
            <div
              className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-lg p-12 my-8 space-y-4 bg-purple-50/30 transition-colors hover:border-purple-300 hover:bg-purple-50/50"
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOverUpload}
              onDrop={handleDropUpload}
            >
              <img src='/src/assets/upload_icon.svg' />
              <div className='space-y-1 flex flex-col justify-center text-center'>
                <h3 className="text-lg font-medium">Drag and drop or upload your files</h3>
                <p className="text-sm text-gray-500">Supported formats: PDF, PPTX, ODP, JPG, PNG, GIF.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleUploadClick}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Upload className="w-4 h-4" />
                  Upload more files
                </Button>
              </div>

              <input
                type="file"
                accept=".pdf,.pptx,.ppt,.odp,.jpg,.jpeg,.png,.gif"
                multiple
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileInputChange}
              />
            </div>

            {files.length > 0 && (
              <div className="mb-8">
                <div className="text-sm font-medium mb-4 text-gray-700">
                  Uploaded {files.length} of {files.length}
                </div>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext
                    items={files.map((file, index) => `${file.name}-${file.size}-${index}`)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <SortableFileItem
                          key={`${file.name}-${file.size}-${index}`}
                          file={file}
                          index={index}
                          onRemove={handleRemove}
                          disableRemove={files.length === 1}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>
            )}
          </div>
        </div>


        <div className='flex justify-center py-3'>
          <Button
            className="bg-purple-600 hover:bg-purple-700"
            onClick={handleContinue}
            disabled={files.length === 0 || uploading}
          >
            {uploading ? <LoadingButton /> : (<><span>Continue</span> <ArrowRight /></>)}
          </Button>
        </div>
      </div>
      <ConfirmationDialog
        isConfirmModalOpen={isConfirmModalOpen}
        setIsConfirmModalOpen={setIsConfirmModalOpen}
        title="Remove File"
        description="Are you sure you want to remove this file?"
        onConfirm={confirmRemove}
        onCancel={() => {
          setIsConfirmModalOpen(false);
          setPendingDeleteIndex(null);
        }}
      />
    </div>
  );
}