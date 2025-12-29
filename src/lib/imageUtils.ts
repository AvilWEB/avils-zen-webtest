const MAX_DIMENSION = 1920;
const JPEG_QUALITY = 0.8;
const TARGET_SIZE_KB = 500;

export interface CompressedImage {
  blob: Blob;
  preview: string;
  originalName: string;
  compressedSize: number;
}

/**
 * Compresses an image file by resizing and reducing quality
 * - Resizes to max 1920px while maintaining aspect ratio
 * - Compresses to JPEG quality 80%
 * - Targets under 500KB per image
 */
export async function compressImage(file: File): Promise<CompressedImage> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    img.onload = () => {
      // Calculate new dimensions maintaining aspect ratio
      let { width, height } = img;
      
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width > height) {
          height = Math.round((height * MAX_DIMENSION) / width);
          width = MAX_DIMENSION;
        } else {
          width = Math.round((width * MAX_DIMENSION) / height);
          height = MAX_DIMENSION;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);

      // Try to achieve target size with progressive quality reduction
      let quality = JPEG_QUALITY;
      const compress = () => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'));
              return;
            }

            const sizeKB = blob.size / 1024;
            
            // If still too large and quality can be reduced, try again
            if (sizeKB > TARGET_SIZE_KB && quality > 0.3) {
              quality -= 0.1;
              compress();
              return;
            }

            const preview = URL.createObjectURL(blob);
            resolve({
              blob,
              preview,
              originalName: file.name,
              compressedSize: blob.size,
            });
          },
          'image/jpeg',
          quality
        );
      };

      compress();
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Compresses multiple images in parallel
 */
export async function compressImages(files: File[]): Promise<CompressedImage[]> {
  return Promise.all(files.map(compressImage));
}

/**
 * Converts a blob to base64 string
 */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      // Remove data URL prefix to get just the base64 data
      const base64Data = base64.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Cleans up preview URLs to prevent memory leaks
 */
export function revokePreviewUrls(images: CompressedImage[]): void {
  images.forEach((img) => URL.revokeObjectURL(img.preview));
}
