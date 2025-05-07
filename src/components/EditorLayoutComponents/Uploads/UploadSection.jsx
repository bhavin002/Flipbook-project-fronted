import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Trash2, Users, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import MediaImageDropDownCom from "./MediaImageDropDownCom";
import { CopyMediaFileToWorkspaceApi, DeleteMediaFilesApi, MoveToFolderApi } from "@/service/mediaFiles.service";
import { toast } from "sonner";
import ConfirmationDialog from "@/utils/ConfirmationDialog";
import { MediaImageSkeleton } from "@/utils/Skeleton";
import { v4 as uuid } from "uuid";

export default function UploadSection({
  mediaFiles = [],
  folders = [],
  currentView = 'main',
  currentFolderId,
  selectedFolder = null,
  setMediaFiles,
  setSelectedFolderMedia,
  isTeamMedia = false,
  mainStage,
  selectedIndex,
  setMainStage,
  isLoading = false
}) {
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
  const [activeImageDropdownIndex, setActiveImageDropdownIndex] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [isMoveDropdownOpen, setIsMoveDropdownOpen] = useState(false);
  const moveDropdownTriggerRef = useRef(null);

  useEffect(() => {
    if (mediaFiles.length === 0) {
      setSelectAll(false);
      setSelectedFiles([]);
      return;
    }

    setSelectAll(selectedFiles.length === mediaFiles.length);
  }, [selectedFiles, mediaFiles]);

  // Reset selections when changing folders or views
  useEffect(() => {
    setSelectedFiles([]);
    setSelectAll(false);
  }, [currentFolderId, currentView]);

  const handleImageDropdownOpen = (index) => {
    setActiveImageDropdownIndex(index);
  };

  const handleImageDropdownClose = () => {
    setActiveImageDropdownIndex(null);
  };

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedFiles(mediaFiles.map(file => file._id));
    } else {
      setSelectedFiles([]);
    }
  };

  const handleSelectFile = (fileId, checked) => {
    if (checked) {
      setSelectedFiles(prev => [...prev, fileId]);
    } else {
      setSelectedFiles(prev => prev.filter(id => id !== fileId));
    }
  };

  const isFileSelected = (fileId) => {
    return selectedFiles.includes(fileId);
  };

  const handleMoveToFolder = async (folderId) => {
    if (selectedFiles.length === 0) return;

    setIsMoving(true);
    try {
      const response = await MoveToFolderApi({
        sourceFolderId: currentFolderId,
        destinationFolderId: folderId,
        fileIds: selectedFiles
      });

      const movedFileIds = response.data;

      if (currentView === 'main') {
        setMediaFiles(prevFiles =>
          prevFiles.filter(file => !movedFileIds.includes(file._id))
        );
      } else if (currentView === 'folder') {
        setSelectedFolderMedia(prevFiles =>
          prevFiles.filter(file => !movedFileIds.includes(file._id))
        );
      }

      setSelectedFiles([]);

      toast.success("Files moved", {
        description: response.message || "Files successfully moved"
      });

      // Close dropdown after successful move
      setIsMoveDropdownOpen(false);
    } catch (error) {
      toast.error("Failed to move files", {
        description: error.message || "Something went wrong"
      });
    } finally {
      setIsMoving(false);
    }
  };

  const getMenuItems = () => {
    return (
      <>
        {folders.map((folder, index) => {
          const isSelected = (currentView === 'folder' && selectedFolder && folder._id === selectedFolder._id) ||
            (currentView === 'main' && folder.byDefault);
          return (
            <DropdownMenuItem
              key={index}
              disabled={isSelected || isMoving}
              onSelect={() => !isSelected && !isMoving && handleMoveToFolder(folder._id)}
            >
              {isSelected ?
                <Folder fill="currentColor" className="mr-2 h-4 w-4" /> :
                <Folder className="mr-2 h-4 w-4" />
              }
              {folder.name}
            </DropdownMenuItem>
          );
        })}
      </>
    );
  };

  const confirmDeleteSelected = () => {
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteSelected = async () => {
    if (selectedFiles.length === 0) return;

    setIsDeleteLoading(true);
    try {
      const response = await DeleteMediaFilesApi({
        folderId: currentFolderId,
        fileIds: selectedFiles
      });

      const deletedFileIds = response.data;

      if (currentView === 'main') {
        setMediaFiles(prevFiles =>
          prevFiles.filter(file => !deletedFileIds.includes(file._id))
        );
      } else if (currentView === 'folder') {
        setSelectedFolderMedia(prevFiles =>
          prevFiles.filter(file => !deletedFileIds.includes(file._id))
        );
      }

      setSelectedFiles([]);

      toast.success("Files deleted", {
        description: response.message || `${deletedFileIds.length} ${deletedFileIds.length === 1 ? 'file' : 'files'} successfully deleted`
      });
    } catch (error) {
      toast.error("Failed to delete files", {
        description: error.message || "Something went wrong"
      });
    } finally {
      setIsDeleteLoading(false);
      setIsDeleteConfirmOpen(false);
    }
  };

  const handleCopyToTeam = async () => {
    if (selectedFiles.length === 0 || isTeamMedia) return;

    setIsCopying(true);
    try {
      const response = await CopyMediaFileToWorkspaceApi({
        folderId: currentFolderId,
        fileIds: selectedFiles
      });

      setSelectedFiles([]);

      toast.success('Media copied', {
        description: response.message || `${selectedFiles.length} ${selectedFiles.length === 1 ? 'file' : 'files'} successfully copied to team`
      });
    } catch (error) {
      toast.error('Failed to copy media', {
        description: error.message || 'Something went wrong'
      });
    } finally {
      setIsCopying(false);
    }
  };

  const hasSelectedFiles = selectedFiles.length > 0;
  const selectedFilesCount = selectedFiles.length;

  const handleImageSelect = async (image, isDragStart = false) => {
    const imgSrc = `http://localhost:8080/api/v1/file/image?src=${encodeURIComponent(image.url)}`
    const dimensions = await new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imgSrc
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = () => reject("Error loading image");
    });

    const imageData = {
      width: dimensions.width,
      height: dimensions.height,
      type: "img",
      src: `${imgSrc}`,
      visible: true,
      title: "stock-photo",
      layer: "Image",
      htmlType: "stock-photo",
    };

    if (isDragStart) {
      mainStage[selectedIndex].dragRect.current = imageData;
      return;
    }

    const item = { attrs: imageData };

    if (item.attrs) {
      // Get the group from the stage
      let group = mainStage[selectedIndex].stageref.current.children[0].children[1];

      // Calculate the center of the group
      const groupWidth = group.width();
      const groupHeight = group.height();
      const dropX = (groupWidth / 2) / group.scaleX() - (item.attrs.width || 50) / 2;
      const dropY = (groupHeight / 2) / group.scaleY() - (item.attrs.height || 50) / 2;

      let isOverShapeWidget = false;
      let shapeWidget = null;
      let shapeWidgetData = [];

      // Check if the drop position overlaps with a shape-widget
      mainStage[selectedIndex].stageref.current.children[0].children[1].children.forEach(shape => {
        if (shape.attrs.title === 'shape-widget') {
          const shapeLeft = shape.attrs.x;
          const shapeTop = shape.attrs.y;
          const shapeRight = shape.attrs.x + (shape.attrs.width * (shape.attrs.scaleX || 1));
          const shapeBottom = shape.attrs.y + (shape.attrs.height * (shape.attrs.scaleY || 1));

          // Check if drop position is within shape-widget bounds
          if (dropX >= shapeLeft && dropX <= shapeRight && dropY >= shapeTop && dropY <= shapeBottom) {
            isOverShapeWidget = true;
            shapeWidget = shape.attrs;
            shapeWidgetData = shape.children[0].dataArray;
          }
        }
      });

      // Create new shape at the center of the group
      let newShape = {
        x: dropX,
        y: dropY,
        ...item.attrs,
        id: uuid()
      };

      // Handle masked image case
      if (isOverShapeWidget && shapeWidget?.isMasked &&
        (stage.dragRect.current.htmlType === 'stock-photo' || stage.dragRect.current.htmlType === 'upload-photo')) {
        newShape = {
          src: newShape.src,
          height: Number(shapeWidget.height),
          width: Number(shapeWidget.width),
          x: shapeWidget.x,
          y: shapeWidget.y,
          scaleX: shapeWidget.scaleX,
          scaleY: shapeWidget.scaleY,
          skewX: shapeWidget.skewX,
          skewY: shapeWidget.skewY,
          title: 'masked-image',
          layer: 'masked-image',
          htmlType: 'masked-image',
          type: 'img',
          data: shapeWidget.data,
          maskData: shapeWidgetData,
          maskType: shapeWidget.maskType,
          draggable: true,
          visible: true,
          id: uuid()
        };

        // Update mainStage by removing the shape-widget and adding the new masked-image
        mainStage[selectedIndex].selectedShapes = [];
        console.log("mainstage updateed before")
        setMainStage(prevState => {
          const updatedState = [...prevState];
          const updatedShapes = updatedState[selectedIndex].shapes.filter(
            shape => shape.id !== shapeWidget.id
          );
          updatedState[selectedIndex] = {
            ...updatedState[selectedIndex],
            shapes: [...updatedShapes, newShape]
          };
          return updatedState;
        });
      } else {
        // Add the new shape at the center of the group
        setMainStage(prevState => {
          const updatedState = [...prevState];
          updatedState[selectedIndex] = {
            ...updatedState[selectedIndex],
            shapes: [...updatedState[selectedIndex].shapes, newShape]
          };
          return updatedState;
        });
      }

      // Select the newly added shape
      setTimeout(() => {
        mainStage[selectedIndex].stageref.current.children[0].children[1].children.forEach((child) => {
          if (child.attrs.id === newShape.id) {
            setMainStage(prevState => {
              const updatedState = [...prevState];
              updatedState[selectedIndex] = {
                ...updatedState[selectedIndex],
                selectedShapes: [child]
              };
              return updatedState;
            });
          }
        });
      }, 100);

      setIsEditorDrawerOpen(false);
    }
  };

  return (
    <>
      <div className="space-y-2 flex flex-col flex-grow overflow-y-auto h-0">
        <div className="flex items-center justify-between w-full h-9">
          <div>
            <span className="font-semibold">Uploads</span>
          </div>
          <div className="flex items-center gap-3">
            {selectedFiles.length > 0 && (
              <>
                <DropdownMenu open={isMoveDropdownOpen} onOpenChange={setIsMoveDropdownOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      ref={moveDropdownTriggerRef}
                      variant="outline"
                      className="text-primary"
                      disabled={isMoving}
                    >
                      {isMoving ? 'Moving...' : 'Move to'} <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 max-h-[200px] overflow-y-auto" align="end">
                    <DropdownMenuGroup>
                      {getMenuItems()}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                {!isTeamMedia && (
                  <Users
                    className={`w-5 h-5 ${isCopying ? 'opacity-50' : 'cursor-pointer hover:text-primary'}`}
                    onClick={!isCopying ? handleCopyToTeam : undefined}
                  />
                )}

                <Trash2
                  className={`w-5 h-5 ${isDeleteLoading ? 'opacity-50' : 'cursor-pointer hover:text-red-500'}`}
                  onClick={!isDeleteLoading ? confirmDeleteSelected : undefined}
                />
              </>
            )}
            <Checkbox
              className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary w-5 h-5"
              checked={selectAll}
              onCheckedChange={handleSelectAll}
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-grow h-0">
          {isLoading ? (
            <MediaImageSkeleton />
          ) : mediaFiles.length > 0 ? (
            <div className="columns-3 gap-2 space-y-2 p-1 cursor-pointer">
              {mediaFiles.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="break-inside-avoid relative group"
                  onMouseEnter={() => setHoveredImageIndex(itemIndex)}
                  onMouseLeave={() => {
                    if (activeImageDropdownIndex !== itemIndex) {
                      setHoveredImageIndex(null);
                    }
                  }}
                  draggable
                  onDragStart={() => handleImageSelect(item, true)}
                  onClick={() => handleImageSelect(item, false)}
                >
                  <img
                    src={item.url}
                    alt={`Upload ${item._id}`}
                    className={`w-full rounded-lg ${isFileSelected(item._id) ? 'ring-2 ring-primary' : ''}`}
                  />

                  {(hoveredImageIndex === itemIndex || isFileSelected(item._id)) && (
                    <div className="absolute top-1 left-1.5">
                      <Checkbox
                        className="bg-white border-white data-[state=checked]:bg-white data-[state=checked]:text-primary"
                        checked={isFileSelected(item._id)}
                        onCheckedChange={(checked) => handleSelectFile(item._id, checked)}
                      />
                    </div>
                  )}

                  {!hasSelectedFiles && (hoveredImageIndex === itemIndex || activeImageDropdownIndex === itemIndex) && (
                    <>
                      <div className="absolute left-1 bottom-1 text-center bg-black bg-opacity-70 text-white px-2 py-0.5 rounded-[12px] text-xs font-medium">
                        {item.fileType || 'Image'}
                      </div>
                      <MediaImageDropDownCom
                        mediaFile={item}
                        folders={folders}
                        currentView={currentView}
                        currentFolderId={currentFolderId}
                        selectedFolder={selectedFolder}
                        setMediaFiles={setMediaFiles}
                        setSelectedFolderMedia={setSelectedFolderMedia}
                        isTeamMedia={isTeamMedia}
                        onOpenChange={(open) => {
                          if (open) {
                            handleImageDropdownOpen(itemIndex);
                          } else {
                            handleImageDropdownClose();
                          }
                        }}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-white text-xs py-2 px-3 text-center">
              This section is empty
            </div>
          )}
        </div>
      </div>

      <ConfirmationDialog
        isConfirmModalOpen={isDeleteConfirmOpen}
        setIsConfirmModalOpen={setIsDeleteConfirmOpen}
        title="Delete Media Files"
        description={`Are you sure you want to delete ${selectedFilesCount} ${selectedFilesCount === 1 ? 'file' : 'files'}? This action cannot be undone.`}
        onConfirm={handleDeleteSelected}
        isLoading={isDeleteLoading}
      />
    </>
  );
}