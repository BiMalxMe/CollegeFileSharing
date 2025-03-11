"use client"

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Cloud, File, Loader2 } from "lucide-react";

interface FileUploadProps {
  onSuccess?: () => void;
}

export function FileUpload({ onSuccess }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setUploading(true);
        setUploadProgress(0);

        for (const file of acceptedFiles) {
          const formData = new FormData();
          formData.append("file", file);

          const xhr = new XMLHttpRequest();
          xhr.upload.addEventListener("progress", (event) => {
            if (event.lengthComputable) {
              const progress = Math.round((event.loaded * 100) / event.total);
              setUploadProgress(progress);
            }
          });

          const response = await new Promise((resolve, reject) => {
            xhr.open("POST", "/api/cloudinary/upload");
            xhr.onload = () => resolve(xhr.response);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(formData);
          });

          const data = JSON.parse(response as string);
          if (!data.success) throw new Error(data.error || "Upload failed");
        }

        toast.success("Files uploaded successfully");
        onSuccess?.();
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Failed to upload files");
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
    },
    [onSuccess]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    disabled: uploading,
    maxSize: 10000000, // 10MB
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative rounded-lg border-2 border-dashed p-8 transition-colors
        ${
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50"
        }
        ${uploading ? "pointer-events-none opacity-60" : "cursor-pointer"}
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        {uploading ? (
          <>
            <div className="relative h-12 w-12">
              <div className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-primary/20"></div>
              <div
                className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-primary border-t-transparent animate-spin"
                style={{
                  clipPath: `polygon(0 0, 100% 0, 100% ${uploadProgress}%, 0 ${uploadProgress}%)`,
                }}
              ></div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Uploading files...</p>
              <p className="text-xs text-muted-foreground">{uploadProgress}%</p>
            </div>
          </>
        ) : isDragActive ? (
          <>
            <Cloud className="h-10 w-10 text-primary animate-bounce" />
            <div className="space-y-2">
              <p className="text-sm font-medium">Drop the files here</p>
              <p className="text-xs text-muted-foreground">
                Files will be uploaded immediately
              </p>
            </div>
          </>
        ) : (
          <>
            <File className="h-10 w-10 text-muted-foreground" />
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Drag & drop files here, or click to select files
              </p>
              <p className="text-xs text-muted-foreground">
                PDF, XLS, XLSX up to 10MB
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}