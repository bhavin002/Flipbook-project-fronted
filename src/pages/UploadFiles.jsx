import React, { useRef, useState } from "react";
import { useFileUpload } from "@/context/FileUploadContext";
import { Button } from "@/components/ui/button";
import {
  X,
  Upload,
  GripVertical,
  ArrowRight,
  Loader2,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import ConfirmationDialog from "@/utils/ConfirmationDialog";
import {
  UploadFilesNewApi,
  GenerateFlipbookApi,
  subscribeToUploadProgress,
} from "@/service/flipbook.service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FlipbookUploadMode } from "@/utils/enum";
import LoadingButton from "@/utils/LoadingButton";

function SortableFileItem({
  file,
  index,
  onRemove,
  disableRemove,
  progress,
  status,
  showProgress,
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: `${file.name}-${file.size}-${index}`,
      disabled: showProgress,
    });

  const style = { transform: CSS.Transform.toString(transform), transition };

  const getStatusText = () => {
    if (!showProgress) return "Ready";
    if (status === "done") return "Completed";
    if (status === "rendering") return "Processing…";
    if (status === "uploading") return "Uploading…";
    return "Processing…";
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border border-gray-200 rounded-2xl py-2 px-3 transition-all ${isDragging ? "opacity-50 scale-95" : "hover:border-gray-300 hover:shadow-sm"
        } ${disableRemove ? "opacity-75 cursor-not-allowed" : ""}`}
      {...attributes}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            {...listeners}
            style={{ touchAction: "none" }}
            className={`cursor-grab active:cursor-grabbing ${showProgress ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            <GripVertical className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex-1 truncate text-sm font-medium text-gray-900">
            {file.name}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onRemove(index)}
            disabled={disableRemove}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {showProgress && (
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{getStatusText()}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${status === "done" ? "bg-green-500" : "bg-purple-600"
                }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function FileUploadReorder() {
  const { files, setFiles } = useFileUpload();
  const fileInputRef = useRef(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [pendingDeleteIndex, setPendingDeleteIndex] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [fileProgressList, setFileProgressList] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const eventSourceRef = useRef(null);
  const navigate = useNavigate();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    if (showProgress) return;
    const { active, over } = event;
    if (active.id !== over?.id) {
      setFiles((items) => {
        const oldIdx = items.findIndex(
          (_, i) => `${items[i].name}-${items[i].size}-${i}` === active.id
        );
        const newIdx = items.findIndex(
          (_, i) => `${items[i].name}-${items[i].size}-${i}` === over.id
        );
        return arrayMove(items, oldIdx, newIdx);
      });
    }
  };

  const handleRemove = (idx) => {
    setPendingDeleteIndex(idx);
    setIsConfirmModalOpen(true);
  };

  const confirmRemove = () => {
    setFiles((prev) => prev.filter((_, i) => i !== pendingDeleteIndex));
    setFileProgressList((prev) => prev.filter((_, i) => i !== pendingDeleteIndex));
    setIsConfirmModalOpen(false);
    setPendingDeleteIndex(null);
  };

  const handleFileInputChange = (e) => {
    const selected = Array.from(e.target.files ?? []);
    if (selected.length) setFiles((prev) => [...prev, ...selected]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUploadClick = () => {
    if (uploading || isGenerating) return;
    fileInputRef.current?.click();
  };

  const handleContinue = async () => {
    if (!files.length || uploading) return;

    setUploading(true);
    setShowProgress(true);

    setFileProgressList(
      files.map((f) => ({
        name: f.name,
        size: f.size,
        percent: 0,
        status: "uploading",
      }))
    );

    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));
    formData.append("mode", FlipbookUploadMode.COMBINE);

    try {
      const { sessionId, mainFolderId, files: uploadedFiles } = await UploadFilesNewApi(formData);

      eventSourceRef.current = subscribeToUploadProgress(sessionId, async (data) => {
        if (!data) return;
        const { file, status, stage, percent, total, page } = data;
        let computedPercent = percent ?? (page && total ? Math.round((page / total) * 100) : 0);

        setFileProgressList((prev) => {
          const updated = [...prev];
          const idx = updated.findIndex((p) => p.name === file || p.name.includes(file));
          if (idx === -1) return prev;
          if (updated[idx].status === "done") return prev;

          const safePercent = Math.max(updated[idx].percent, computedPercent || 0);
          updated[idx] = {
            ...updated[idx],
            percent: Math.min(safePercent, 99),
            status: stage || status || "uploading",
          };

          if (stage === "file_done")
            updated[idx] = { ...updated[idx], percent: 100, status: "done" };
          return updated;
        });

        if (stage === "all_done") {
          setFileProgressList((prev) =>
            prev.map((f) => ({ ...f, percent: 100, status: "done" }))
          );
          toast.success("All files processed successfully 🎉");
          if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
          }

          setIsGenerating(true);
          setUploading(false);

          try {
            const genRes = await GenerateFlipbookApi({
              mainFolderId,
              files: uploadedFiles,
              mode: FlipbookUploadMode.COMBINE,
            });

            if (genRes.data.bookIds?.length) {
              toast.success("Flipbook created successfully!");
              setTimeout(() => {
                navigate(`/customize/${genRes.data.bookIds[0]}`);
              }, 800);
            } else {
              toast.error("Flipbook generation failed");
            }
          } catch (err) {
            toast.error("Flipbook generation failed", { description: err.message });
          } finally {
            setIsGenerating(false);
          }
        }

        if (stage === "failed") {
          if (eventSourceRef.current) eventSourceRef.current.close();
          toast.error("Upload failed", { description: data.message });
          setUploading(false);
          setShowProgress(false);
          setFileProgressList([]);
        }
      });
    } catch (err) {
      toast.error("Upload failed", { description: err.message });
      setUploading(false);
      setShowProgress(false);
      setFileProgressList([]);
    }
  };

  return (
    <div className="flex items-center justify-center w-full px-2">
      <div className="w-full bg-white flex h-full overflow-auto flex-col">
        <div className="flex flex-col justify-center m-auto max-w-2xl w-full">
          <h1 className="text-2xl font-semibold text-center mb-6 max-md:mt-5">
            Reorder or add more files
          </h1>

          <div
            className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-lg p-12 my-8 space-y-4 bg-purple-50/30 transition hover:border-purple-300 hover:bg-purple-50/50"
            onDrop={(e) => {
              e.preventDefault();
              const dropped = Array.from(e.dataTransfer.files);
              if (dropped.length) setFiles((prev) => [...prev, ...dropped]);
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <img src="/assets/upload_icon.svg" alt="upload" />
            <div className="text-center space-y-1">
              <h3 className="text-lg font-medium">Drag and drop or upload your files</h3>
              <p className="text-sm text-gray-500">
                Supported formats: PDF, PPTX, ODP, JPG, PNG, GIF.
              </p>
            </div>
            <Button
              onClick={handleUploadClick}
              disabled={uploading || isGenerating}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
            >
              <Upload className="w-4 h-4 mr-2" /> Upload more files
            </Button>
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
                Uploaded {files.length} file{files.length > 1 ? "s" : ""}
              </div>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
              >
                <SortableContext
                  items={files.map((f, i) => `${f.name}-${f.size}-${i}`)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3">
                    {files.map((file, idx) => {
                      const prog = fileProgressList.find(
                        (p) => p.name === file.name && p.size === file.size
                      );
                      return (
                        <SortableFileItem
                          key={`${file.name}-${file.size}-${idx}`}
                          file={file}
                          index={idx}
                          onRemove={handleRemove}
                          disableRemove={uploading || isGenerating}
                          progress={prog?.percent ?? 0}
                          status={prog?.status ?? "uploading"}
                          showProgress={showProgress}
                        />
                      );
                    })}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}
        </div>

        <div className="flex justify-center py-3">
          {isGenerating ? (
            <div className="flex items-center gap-2 text-purple-700 font-medium">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating flipbook… please wait</span>
            </div>
          ) : (
            <Button
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 min-w-32"
              onClick={handleContinue}
              disabled={!files.length || uploading}
            >
              {uploading ? (
                <LoadingButton />
              ) : (
                <>
                  Continue <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          )}
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
