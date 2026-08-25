/** Resizes/re-encodes large photos client-side before upload. Skips GIF (animation) and SVG (vector). */
export async function compressImage(file: File, maxDimension = 2000, quality = 0.82): Promise<File> {
  if (file.type === "image/gif" || file.type === "image/svg+xml" || !file.type.startsWith("image/")) {
    return file
  }
  if (file.size < 1.5 * 1024 * 1024) {
    return file
  }

  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height))
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)

  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")
  if (!ctx) return file
  ctx.drawImage(bitmap, 0, 0, width, height)

  const outputType = file.type === "image/png" ? "image/png" : "image/jpeg"
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, outputType, quality))
  if (!blob || blob.size >= file.size) return file

  const ext = outputType === "image/png" ? "png" : "jpg"
  const newName = file.name.replace(/\.[^.]+$/, `.${ext}`)
  return new File([blob], newName, { type: outputType })
}
