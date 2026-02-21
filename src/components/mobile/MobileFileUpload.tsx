/**
 * MobileFileUpload Component
 * 
 * Why: On mobile, file uploads should use native camera and document picker
 * instead of just file input. This provides better UX and access to device features.
 * 
 * Play Store Requirement: Apps should use native features when available.
 */

import React, { useRef, useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { isNative } from '@/utils/capacitor';
import { toast } from 'sonner';

interface MobileFileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string; // MIME types, e.g., "image/*", "application/pdf"
  multiple?: boolean;
  maxSize?: number; // in bytes
  children?: React.ReactNode;
  className?: string;
}

/**
 * Mobile-optimized file upload component
 * 
 * On native: Uses camera and document picker
 * On web: Falls back to standard file input
 * 
 * Usage:
 * ```tsx
 * <MobileFileUpload
 *   onFileSelect={(file) => handleUpload(file)}
 *   accept="image/*,application/pdf"
 * >
 *   <Button>Upload File</Button>
 * </MobileFileUpload>
 * ```
 */
export const MobileFileUpload: React.FC<MobileFileUploadProps> = ({
  onFileSelect,
  accept,
  multiple = false,
  maxSize,
  children,
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  // Convert Capacitor file to web File object
  const capacitorFileToFile = async (
    path: string,
    name: string,
    mimeType: string
  ): Promise<File> => {
    try {
      const file = await Filesystem.readFile({
        path,
        directory: Directory.Data,
      });

      // Convert base64 to blob
      const base64Data = file.data as string;
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });

      return new File([blob], name, { type: mimeType });
    } catch (error) {
      console.error('Error converting file:', error);
      throw error;
    }
  };

  // Handle camera capture
  const handleCameraCapture = async () => {
    if (!isNative()) {
      // Fallback to file input
      fileInputRef.current?.click();
      return;
    }

    try {
      setUploading(true);

      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      if (!photo.webPath) {
        throw new Error('Failed to capture photo');
      }

      // Convert to File object
      const response = await fetch(photo.webPath);
      const blob = await response.blob();
      const file = new File([blob], `camera-${Date.now()}.jpg`, {
        type: 'image/jpeg',
      });

      // Validate size
      if (maxSize && file.size > maxSize) {
        toast.error('File too large', {
          description: `Maximum size is ${(maxSize / 1024 / 1024).toFixed(2)}MB`,
        });
        return;
      }

      onFileSelect(file);
    } catch (error: any) {
      if (error.message !== 'User cancelled') {
        console.error('Camera error:', error);
        toast.error('Failed to capture photo', {
          description: error.message,
        });
      }
    } finally {
      setUploading(false);
    }
  };

  // Handle photo library selection
  const handlePhotoLibrary = async () => {
    if (!isNative()) {
      // Fallback to file input
      fileInputRef.current?.click();
      return;
    }

    try {
      setUploading(true);

      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
      });

      if (!photo.webPath) {
        throw new Error('Failed to select photo');
      }

      // Convert to File object
      const response = await fetch(photo.webPath);
      const blob = await response.blob();
      const file = new File([blob], photo.path || `photo-${Date.now()}.jpg`, {
        type: photo.format === 'png' ? 'image/png' : 'image/jpeg',
      });

      // Validate size
      if (maxSize && file.size > maxSize) {
        toast.error('File too large', {
          description: `Maximum size is ${(maxSize / 1024 / 1024).toFixed(2)}MB`,
        });
        return;
      }

      onFileSelect(file);
    } catch (error: any) {
      if (error.message !== 'User cancelled') {
        console.error('Photo library error:', error);
        toast.error('Failed to select photo', {
          description: error.message,
        });
      }
    } finally {
      setUploading(false);
    }
  };

  // Handle document picker (for PDFs, etc.)
  const handleDocumentPicker = () => {
    // On native, we still use file input but with better UX
    // For true document picker, you'd need a plugin like @capacitor-community/file-picker
    fileInputRef.current?.click();
  };

  // Handle file input change (web fallback and document picker)
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      // Validate size
      if (maxSize && file.size > maxSize) {
        toast.error('File too large', {
          description: `Maximum size is ${(maxSize / 1024 / 1024).toFixed(2)}MB`,
        });
        return;
      }

      onFileSelect(file);
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Determine which options to show based on accept prop
  const isImageOnly = accept?.includes('image/') && !accept.includes('application/');
  const isDocumentOnly = accept?.includes('application/') && !accept.includes('image/');

  // Show action sheet on mobile
  const handleMobileUpload = () => {
    if (!isNative()) {
      fileInputRef.current?.click();
      return;
    }

    // For images: show camera/photo library options
    if (isImageOnly) {
      // You can use an action sheet here
      // For now, default to photo library
      handlePhotoLibrary();
      return;
    }

    // For documents: use file input
    if (isDocumentOnly) {
      handleDocumentPicker();
      return;
    }

    // Mixed: show options
    // In a real app, you'd show an action sheet with options
    // For now, default to photo library for images, file input for others
    if (accept?.includes('image/')) {
      handlePhotoLibrary();
    } else {
      handleDocumentPicker();
    }
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />

      {children ? (
        <div onClick={handleMobileUpload} style={{ cursor: 'pointer' }}>
          {children}
        </div>
      ) : (
        <button
          onClick={handleMobileUpload}
          disabled={uploading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload File'}
        </button>
      )}
    </div>
  );
};

/**
 * Action Sheet Component (optional)
 * Shows options: Camera, Photo Library, Documents
 * 
 * You can integrate this with @capacitor/action-sheet if needed
 */
export const UploadActionSheet = () => {
  // Implementation would use @capacitor/action-sheet
  // This is a placeholder for the concept
  return null;
};


