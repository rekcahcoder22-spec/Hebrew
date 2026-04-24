export function isUploadImagePath(src: string): boolean {
  return src.startsWith("/uploads/") || src.startsWith("/api/upload/");
}

export function hasImage(src: string | null | undefined): src is string {
  return typeof src === "string" && src.trim().length > 0;
}
