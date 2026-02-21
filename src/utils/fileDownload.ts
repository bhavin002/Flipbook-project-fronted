/**
 * File Download Utilities
 * 
 * Why: On mobile, downloads need to be saved to device storage, not just
 * triggered in browser. This uses Capacitor Filesystem plugin to save files
 * to the Downloads folder.
 * 
 * Play Store Requirement: Apps must properly handle file downloads.
 */

import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { isNative, triggerHaptic, ImpactStyle } from './capacitor';
import { toast } from 'sonner';

/**
 * Download file to device storage
 * 
 * @param url - URL of file to download
 * @param filename - Name to save file as
 * @param mimeType - MIME type of file
 * 
 * @returns Promise that resolves when download completes
 * 
 * Usage:
 * ```tsx
 * await downloadFile(
 *   'https://example.com/file.pdf',
 *   'document.pdf',
 *   'application/pdf'
 * );
 * ```
 */
export const downloadFile = async (
  url: string,
  filename: string,
  mimeType?: string
): Promise<void> => {
  try {
    if (!isNative()) {
      // Web fallback: use standard download
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Download started');
      return;
    }

    // Show loading toast
    toast.loading('Downloading...', { id: 'download' });

    // Fetch file
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    // Convert to blob
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const base64Data = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    );

    // Determine directory based on file type
    let directory = Directory.Documents;
    if (mimeType) {
      if (mimeType.startsWith('image/')) {
        directory = Directory.Documents; // Or Directory.Pictures
      } else if (mimeType.startsWith('video/')) {
        directory = Directory.Documents; // Or Directory.Movies
      } else if (mimeType.includes('pdf') || mimeType.includes('document')) {
        directory = Directory.Documents;
      }
    }

    // Save to Downloads folder (Android)
    // Note: On Android, we use Documents directory which maps to Downloads
    const fileUri = await Filesystem.writeFile({
      path: filename,
      data: base64Data,
      directory: Directory.ExternalStorage, // Android Downloads folder
      // For Android, we need to use ExternalStorage and specify the Downloads subdirectory
    });

    // Haptic feedback
    await triggerHaptic(ImpactStyle.Medium);

    toast.success('File downloaded successfully', { id: 'download' });

    // Optionally open share dialog
    // await Share.share({
    //   title: 'Downloaded file',
    //   url: fileUri.uri,
    //   dialogTitle: 'Share file'
    // });
  } catch (error) {
    console.error('Download error:', error);
    toast.error('Failed to download file', {
      id: 'download',
      description: error instanceof Error ? error.message : 'Unknown error'
    });
    throw error;
  }
};

/**
 * Download file from blob
 * 
 * @param blob - Blob object to download
 * @param filename - Name to save file as
 * @param mimeType - MIME type of file
 */
export const downloadBlob = async (
  blob: Blob,
  filename: string,
  mimeType?: string
): Promise<void> => {
  try {
    if (!isNative()) {
      // Web fallback
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('Download started');
      return;
    }

    toast.loading('Saving file...', { id: 'download' });

    // Convert blob to base64
    const arrayBuffer = await blob.arrayBuffer();
    const base64Data = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    );

    // Save to device
    await Filesystem.writeFile({
      path: filename,
      data: base64Data,
      directory: Directory.ExternalStorage,
    });

    await triggerHaptic(ImpactStyle.Medium);
    toast.success('File saved successfully', { id: 'download' });
  } catch (error) {
    console.error('Download error:', error);
    toast.error('Failed to save file', {
      id: 'download',
      description: error instanceof Error ? error.message : 'Unknown error'
    });
    throw error;
  }
};

/**
 * Share file using native share dialog
 * 
 * @param url - URL of file to share
 * @param filename - Name of file
 */
export const shareFile = async (
  url: string,
  filename: string
): Promise<void> => {
  try {
    if (!isNative()) {
      // Web fallback: copy URL to clipboard
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard');
      return;
    }

    // For native, we can share the URL directly
    await Share.share({
      title: filename,
      url: url,
      dialogTitle: 'Share file'
    });
  } catch (error) {
    console.error('Share error:', error);
    toast.error('Failed to share file');
  }
};

/**
 * Check if file exists in device storage
 * 
 * @param filename - Name of file to check
 */
export const fileExists = async (filename: string): Promise<boolean> => {
  if (!isNative()) {
    return false;
  }

  try {
    await Filesystem.stat({
      path: filename,
      directory: Directory.ExternalStorage,
    });
    return true;
  } catch {
    return false;
  }
};

/**
 * Read file from device storage
 * 
 * @param filename - Name of file to read
 */
export const readFile = async (filename: string): Promise<string> => {
  if (!isNative()) {
    throw new Error('File reading only available on native platforms');
  }

  try {
    const result = await Filesystem.readFile({
      path: filename,
      directory: Directory.ExternalStorage,
    });
    return result.data as string;
  } catch (error) {
    console.error('Read file error:', error);
    throw error;
  }
};


