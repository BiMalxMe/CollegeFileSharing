"use client"

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { Loader2, RefreshCw, Trash2, Download } from "lucide-react";

interface File {
  public_id: string;
  original_filename: string;
  format: string;
  resource_type: string;
  secure_url: string;
  created_at: string;
}

export const FileList = forwardRef<{ fetchFiles: () => Promise<void> }, {}>(
  (_, ref) => {
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);

    const fetchFiles = async () => {
      try {
        setRefreshing(true);
        const response = await fetch("/api/cloudinary/list");
        if (!response.ok) throw new Error("Failed to fetch files");
        const data = await response.json();
        setFiles(data.files.filter(Boolean));
      } catch (error) {
        console.error("Error fetching files:", error);
        toast.error("Failed to fetch files");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };

    useImperativeHandle(ref, () => ({
      fetchFiles,
    }));

    useEffect(() => {
      fetchFiles();
    }, []);

    const handleDelete = async (publicId: string, resourceType: string) => {
      try {
        setDeleting(publicId);
        const response = await fetch("/api/cloudinary/delete", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_id: publicId, resource_type: resourceType }),
        });

        if (!response.ok) throw new Error("Failed to delete file");
        
        setFiles((prev) => prev.filter((file) => file.public_id !== publicId));
        toast.success("File deleted successfully");
      } catch (error) {
        console.error("Error deleting file:", error);
        toast.error("Failed to delete file");
      } finally {
        setDeleting(null);
      }
    };

    if (loading) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="text-center space-y-4">
            <div className="relative w-12 h-12 mx-auto">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-sm text-muted-foreground">Loading files...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <button
            onClick={() => fetchFiles()}
            disabled={refreshing}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>

        {files.length === 0 ? (
          <div className="text-center py-8 space-y-3">
            <div className="text-muted-foreground">No files uploaded yet</div>
            <p className="text-sm text-muted-foreground">
              Upload your first file to get started
            </p>
          </div>
        ) : (
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Uploaded</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => (
                    <tr key={file.public_id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{file.original_filename}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {file.format.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 align-middle text-muted-foreground">
                        {formatDistanceToNow(new Date(file.created_at), { addSuffix: true })}
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={file.secure_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
                            title="Download"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                          <button
                            onClick={() => handleDelete(file.public_id, file.resource_type)}
                            disabled={deleting === file.public_id}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-destructive hover:text-destructive-foreground h-10 w-10"
                            title="Delete"
                          >
                            {deleting === file.public_id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }
);