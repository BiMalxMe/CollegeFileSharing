"use client"

import { useEffect, useState } from "react";
import { FileIcon, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface File {
  id: string;
  title: string;
  url: string;
  created_at: string;
}

export function FileList() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch("/api/files");
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/files/${id}`, {
        method: "DELETE",
      });
      setFiles(files.filter(file => file.id !== id));
    } catch (error) {
      console.error("Failed to delete file:", error);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading files...</div>;
  }

  if (files.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No files uploaded yet
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Uploaded</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file) => (
          <TableRow key={file.id}>
            <TableCell className="flex items-center gap-2">
              <FileIcon className="h-4 w-4" />
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {file.title}
              </a>
            </TableCell>
            <TableCell>
              {formatDistanceToNow(new Date(file.created_at), { addSuffix: true })}
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(file.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}