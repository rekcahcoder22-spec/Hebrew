/**
 * Chuẩn hóa ảnh sản phẩm: vuông 1:1, crop từ giống object-cover trên grid.
 */
export const IMAGE_CONFIG = {
  /** Cạnh vuông đầu ra (px) — đủ nét cho retina + object-cover trên card */
  SIZE: 1600,
  get WIDTH() {
    return this.SIZE;
  },
  get HEIGHT() {
    return this.SIZE;
  },
  QUALITY: 0.9,
  FORMAT: "image/jpeg" as const,
  MAX_FILE_MB: 5,
  /** Lấp vùng trong suốt (PNG) — BLOOD INK, khớp nền ô sản phẩm */
  BACKGROUND: "#1C0A0A",
};

type ProcessedImageResult = {
  blob: Blob;
  preview: string;
  originalSize: number;
  processedSize: number;
};

export async function processProductImage(file: File): Promise<ProcessedImageResult> {
  const validTypes = ["image/jpeg", "image/png", "image/webp", "image/heic"];
  if (
    !validTypes.includes(file.type) &&
    !file.name.match(/\.(jpg|jpeg|png|webp|heic)$/i)
  ) {
    throw new Error("Invalid file type. Use JPG, PNG, or WEBP.");
  }

  const maxBytes = IMAGE_CONFIG.MAX_FILE_MB * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error(`File too large. Maximum ${IMAGE_CONFIG.MAX_FILE_MB}MB allowed.`);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context unavailable"));
        return;
      }

      const cw = IMAGE_CONFIG.SIZE;
      const ch = IMAGE_CONFIG.SIZE;
      canvas.width = cw;
      canvas.height = ch;

      const srcW = img.naturalWidth;
      const srcH = img.naturalHeight;
      if (srcW < 1 || srcH < 1) {
        reject(new Error("Invalid image dimensions"));
        return;
      }

      // Cover + center — giống object-cover object-center trên storefront
      const scale = Math.max(cw / srcW, ch / srcH);
      const drawW = Math.round(srcW * scale);
      const drawH = Math.round(srcH * scale);
      const drawX = Math.round((cw - drawW) / 2);
      const drawY = Math.round((ch - drawH) / 2);

      ctx.fillStyle = IMAGE_CONFIG.BACKGROUND;
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas conversion failed"));
            return;
          }
          const preview = canvas.toDataURL(IMAGE_CONFIG.FORMAT, IMAGE_CONFIG.QUALITY);
          resolve({
            blob,
            preview,
            originalSize: file.size,
            processedSize: blob.size,
          });
        },
        IMAGE_CONFIG.FORMAT,
        IMAGE_CONFIG.QUALITY,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };

    img.src = objectUrl;
  });
}

export async function processMultipleImages(files: File[]): Promise<
  Array<{
    index: number;
    blob: Blob;
    preview: string;
    originalSize: number;
    processedSize: number;
    fileName: string;
  }>
> {
  const results: Array<{
    index: number;
    blob: Blob;
    preview: string;
    originalSize: number;
    processedSize: number;
    fileName: string;
  }> = [];

  for (let i = 0; i < files.length; i += 1) {
    const result = await processProductImage(files[i]);
    results.push({
      index: i,
      fileName: files[i].name,
      ...result,
    });
  }

  return results;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}
