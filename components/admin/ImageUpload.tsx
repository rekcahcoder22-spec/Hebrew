"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { nanoid } from "nanoid";
import {
  IMAGE_CONFIG,
  formatFileSize,
  processProductImage,
} from "@/lib/imageProcessor";

type Props = {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
};

type PreviewItem = {
  id: string;
  url: string;
  preview: string;
  status: "processing" | "uploading" | "done" | "error";
  progress: number;
  originalSize: number;
  processedSize: number;
  error?: string;
};

export function ImageUpload({ value, onChange, maxImages = 4 }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<PreviewItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    setPreviews((prev) => {
      const doneMap = new Map(prev.filter((p) => p.status === "done").map((p) => [p.url, p]));
      return value.map((url) => {
        const existing = doneMap.get(url);
        return (
          existing ?? {
            id: nanoid(),
            url,
            preview: url,
            status: "done" as const,
            progress: 100,
            originalSize: 0,
            processedSize: 0,
          }
        );
      });
    });
  }, [value]);

  const doneItems = useMemo(
    () => previews.filter((p) => p.status === "done"),
    [previews],
  );

  const syncDoneUrls = (next: PreviewItem[]) => {
    onChange(next.filter((p) => p.status === "done").map((p) => p.url).filter(Boolean));
  };

  const handleFiles = async (incoming: FileList | File[]) => {
    const files = Array.from(incoming);
    if (files.length === 0) return;
    setFormError(null);
    const remaining = maxImages - doneItems.length;
    if (remaining <= 0) {
      setFormError(`Maximum ${maxImages} images reached.`);
      return;
    }
    const toProcess = files.slice(0, remaining);

    const placeholders: PreviewItem[] = toProcess.map(() => ({
      id: nanoid(),
      url: "",
      preview: "",
      status: "processing",
      progress: 0,
      originalSize: 0,
      processedSize: 0,
    }));
    setPreviews((prev) => [...prev, ...placeholders]);

    for (let i = 0; i < toProcess.length; i += 1) {
      const file = toProcess[i];
      const placeholderId = placeholders[i].id;
      try {
        const result = await processProductImage(file);
        setPreviews((prev) =>
          prev.map((p) =>
            p.id === placeholderId
              ? {
                  ...p,
                  status: "uploading",
                  preview: result.preview,
                  originalSize: result.originalSize,
                  processedSize: result.processedSize,
                  progress: 55,
                }
              : p,
          ),
        );

        const fd = new FormData();
        fd.append("file", result.blob, `product_${Date.now()}.jpg`);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = (await res.json()) as { error?: string; url?: string };
        if (!res.ok || !data.url) throw new Error(data.error ?? "Upload failed");

        setPreviews((prev) => {
          const next = prev.map((p) =>
            p.id === placeholderId
              ? { ...p, status: "done" as const, url: data.url!, progress: 100 }
              : p,
          );
          syncDoneUrls(next);
          return next;
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : "Upload failed";
        setPreviews((prev) =>
          prev.map((p) =>
            p.id === placeholderId ? { ...p, status: "error", error: message } : p,
          ),
        );
      }
    }
  };

  const removeImage = (id: string) => {
    setPreviews((prev) => {
      const next = prev.filter((p) => p.id !== id);
      syncDoneUrls(next);
      return next;
    });
  };

  const onDragStartItem = (id: string) => setDraggingId(id);
  const onDropItem = (targetId: string) => {
    if (!draggingId || draggingId === targetId) return;
    setPreviews((prev) => {
      const from = prev.findIndex((p) => p.id === draggingId);
      const to = prev.findIndex((p) => p.id === targetId);
      if (from < 0 || to < 0) return prev;
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      syncDoneUrls(next);
      return next;
    });
    setDraggingId(null);
  };

  const totalOriginal = doneItems.reduce((acc, item) => acc + item.originalSize, 0);
  const totalProcessed = doneItems.reduce((acc, item) => acc + item.processedSize, 0);
  const hasSavings = totalOriginal > 0 && totalProcessed > 0 && totalProcessed < totalOriginal;
  const savingsPercent = hasSavings
    ? Math.round(((totalOriginal - totalProcessed) / totalOriginal) * 100)
    : 0;

  return (
    <div>
      {previews.length > 0 && (
        <div className="mb-4 grid grid-cols-4 gap-2">
          {previews.map((item, index) => (
            <div
              key={item.id}
              draggable={item.status === "done"}
              onDragStart={() => onDragStartItem(item.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDropItem(item.id)}
              className={`relative aspect-square overflow-hidden bg-hb-gray group ${
                index === 0 && item.status === "done" ? "border-2 border-hb-gold" : ""
              }`}
            >
              {item.status === "processing" && (
                <>
                  <div className="animate-shimmer absolute inset-0" />
                  <div className="absolute inset-0 flex items-center justify-center font-body text-[8px] uppercase tracking-wider text-hb-white/30">
                    PROCESSING...
                  </div>
                </>
              )}
              {item.status === "uploading" && (
                <>
                  <img
                    src={item.preview}
                    alt=""
                    className="h-full w-full object-cover opacity-40 blur-sm"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-hb-border">
                    <div
                      className="h-full bg-hb-red transition-all duration-200"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <div className="absolute right-2 top-2 bg-hb-black/60 px-1 font-body text-[9px] text-white">
                    {item.progress}%
                  </div>
                </>
              )}
              {item.status === "done" && (
                <>
                  <img
                    src={item.url}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-hb-black/0 transition-all duration-300 group-hover:bg-hb-black/30">
                    <button
                      type="button"
                      onClick={() => removeImage(item.id)}
                      className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center bg-hb-red font-body text-sm text-white"
                    >
                      ✕
                    </button>
                    {doneItems.length > 1 && (
                      <span className="absolute left-2 top-2 text-sm text-white/60">⠿</span>
                    )}
                    <span className="absolute bottom-2 left-2 bg-hb-black/60 px-1.5 py-0.5 font-body text-[8px] uppercase tracking-wider text-white/60">
                      {index === 0 ? "MAIN" : `IMG ${index + 1}`}
                    </span>
                  </div>
                </>
              )}
              {item.status === "error" && (
                <div className="flex h-full flex-col items-center justify-center border border-hb-red/30 bg-hb-gray px-2 text-center">
                  <p className="text-2xl text-hb-red">✕</p>
                  <p className="mt-2 font-body text-[8px] text-hb-red/70">
                    {item.error ?? "Upload error"}
                  </p>
                </div>
              )}
            </div>
          ))}
          {doneItems.length > 0 && doneItems.length < maxImages && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="group flex aspect-square flex-col items-center justify-center border border-dashed border-hb-border bg-transparent transition-colors hover:border-hb-red"
            >
              <span className="font-display text-4xl text-hb-white/20 transition-colors group-hover:text-hb-red">
                +
              </span>
              <span className="mt-1 font-body text-[8px] uppercase tracking-wider text-hb-white/20 group-hover:text-hb-red/50">
                ADD MORE
              </span>
            </button>
          )}
        </div>
      )}

      {doneItems.length < maxImages && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            void handleFiles(e.dataTransfer.files);
          }}
          className={`group cursor-pointer rounded-none border-2 border-dashed p-8 text-center transition-colors duration-300 ${
            isDragging
              ? "border-hb-red bg-hb-red/5"
              : "border-hb-border bg-hb-gray/30 hover:border-hb-red"
          }`}
        >
          <svg
            className="mx-auto mb-4 h-12 w-12 text-hb-white/20 transition-colors group-hover:text-hb-red/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M12 11v8m0-8l-3 3m3-3l3 3" />
          </svg>
          <p className="font-display text-2xl text-hb-white/60">DROP IMAGES HERE</p>
          <p className="mt-2 font-body text-[9px] uppercase tracking-[0.15em] text-hb-white/30">
            OR CLICK TO BROWSE
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {[
              "1:1 CENTER CROP",
              `${IMAGE_CONFIG.SIZE}×${IMAGE_CONFIG.SIZE}px`,
              "JPG / PNG / WEBP",
              "MAX 5MB EACH",
              `UP TO ${maxImages} IMAGES`,
            ].map((pill) => (
              <span
                key={pill}
                className="border border-hb-border px-2 py-1 font-body text-[8px] uppercase tracking-wider text-hb-white/25"
              >
                {pill}
              </span>
            ))}
          </div>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                void handleFiles(e.target.files);
              }
              e.target.value = "";
            }}
          />
        </div>
      )}

      {doneItems.length > 0 && (
        <div className="mt-2 border border-hb-border/40 bg-hb-black/30 p-3">
          <div className="flex items-center gap-3">
            <span className="font-body text-sm text-hb-gold">✓</span>
            <p className="font-body text-[9px] tracking-wider text-hb-white/30">
              AUTO 1:1 — CENTER CROP — {IMAGE_CONFIG.SIZE}×{IMAGE_CONFIG.SIZE}px (KHỚP Ô GRID)
            </p>
            {hasSavings && (
              <span className="font-body text-[8px] text-hb-gold/60">
                SAVED {savingsPercent}% — {formatFileSize(totalProcessed)}
              </span>
            )}
          </div>
        </div>
      )}
      {formError && <p className="mt-2 font-body text-[9px] text-hb-red">{formError}</p>}
      <p className="mt-2 font-body text-[8px] uppercase tracking-wider text-hb-white/20">
        FIRST IMAGE IS THE MAIN PRODUCT PHOTO — DRAG TO REORDER
      </p>
    </div>
  );
}
