"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

const MAX_FILES = 5;
const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPT = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

type Props = {
  value: string[];
  onChange: (urls: string[]) => void;
};

export function ImageUpload({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      if (!ACCEPT.includes(file.type)) {
        setError("Chỉ chấp nhận JPEG, PNG, WebP.");
        return;
      }
      if (file.size > MAX_BYTES) {
        setError("Mỗi ảnh tối đa 5MB.");
        return;
      }
      if (value.length >= MAX_FILES) {
        setError(`Tối đa ${MAX_FILES} ảnh.`);
        return;
      }
      setError(null);
      setBusy(true);
      setProgress(5);
      const fd = new FormData();
      fd.set("file", file);
      try {
        const xhr = new XMLHttpRequest();
        const url = await new Promise<string>((resolve, reject) => {
          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              setProgress(5 + (e.loaded / e.total) * 90);
            }
          };
          xhr.onload = () => {
            setProgress(100);
            if (xhr.status >= 200 && xhr.status < 300) {
              const data = JSON.parse(xhr.responseText) as { url?: string };
              if (data.url) resolve(data.url);
              else reject(new Error("No URL"));
            } else {
              try {
                const data = JSON.parse(xhr.responseText) as { error?: string };
                reject(new Error(data.error ?? "Upload failed"));
              } catch {
                reject(new Error("Upload failed"));
              }
            }
          };
          xhr.onerror = () => reject(new Error("Network error"));
          xhr.open("POST", "/api/upload");
          xhr.send(fd);
        });
        onChange([...value, url]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload thất bại.");
      } finally {
        setBusy(false);
        setTimeout(() => setProgress(0), 400);
      }
    },
    [onChange, value],
  );

  const onFiles = useCallback(
    (files: FileList | null) => {
      if (!files?.length) return;
      const list = Array.from(files).slice(0, MAX_FILES - value.length);
      void (async () => {
        for (const f of list) {
          await uploadFile(f);
        }
      })();
    },
    [uploadFile, value.length],
  );

  const removeAt = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
        Ảnh sản phẩm (tối đa {MAX_FILES}, mỗi ảnh 5MB)
      </label>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          onFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`mt-2 flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed px-4 py-10 transition ${
          drag
            ? "border-red-600 bg-red-50"
            : "border-gray-300 bg-gray-50 hover:border-gray-400"
        }`}
      >
        <p className="font-mono text-xs text-gray-600">
          Kéo thả ảnh vào đây hoặc click để chọn
        </p>
        <p className="mt-1 font-mono text-[10px] text-gray-400">
          JPEG, PNG, WebP
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT.join(",")}
          multiple
          className="hidden"
          onChange={(e) => {
            onFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>
      {busy && (
        <div className="mt-3 h-1 w-full overflow-hidden rounded bg-gray-200">
          <div
            className="h-full bg-red-600 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {error && (
        <p className="mt-2 font-mono text-xs text-red-600">{error}</p>
      )}
      {value.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {value.map((url, i) => (
            <div
              key={`${url}-${i}`}
              className="relative aspect-square overflow-hidden rounded-md border border-gray-200 bg-white"
            >
              <Image
                src={url}
                alt=""
                fill
                className="object-cover"
                sizes="120px"
                unoptimized={
                  url.startsWith("/uploads") || url.startsWith("/api/upload/")
                }
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeAt(i);
                }}
                className="absolute right-1 top-1 rounded bg-gray-900/80 px-2 py-0.5 font-mono text-[10px] text-white hover:bg-red-600"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
