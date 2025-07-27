/*
    Drag and drop area for file uploads
    Use to take a file from user when clearing a task clearance
    This must be used within a client component with a state for the uploaded files

    @params setUploadedFiles - useState handler for managing the state of uploaded files
*/

'use client'

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DropBrowseFileAreaProps {
    setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}
const DropBrowseFileArea: React.FC<DropBrowseFileAreaProps> = ({
    setUploadedFiles,
}) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        console.log("Entered");
        setIsDragging(true);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDragLeave = () => {
        console.log("Left");
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();

        setIsDragging(false);
        console.log("File is dropped: ", e.dataTransfer.files[0]);

        if (e.dataTransfer.files.length > 1) {
            toast.error("Only one file per upload.");
            return;
        } else if (e.dataTransfer.files.length === 0) {
            toast.error("No uploaded file.");
            return;
        }

        const newFile = e.dataTransfer.files[0];
        setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
    };

    return (
        <section
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex items-center justify-center rounded-lg border border-dashed flex-col space-y-4 py-4 ${
                isDragging && " border-blue-500"
            }`}
        >
            <Download size={37} />
            <div>
                <p className="text-lg font-bold">
                    Drop files here or click to browse
                </p>
                <p className="text-sm font-semibold text-muted-foreground">
                    {" "}
                    Supported formats: PDF, DOC, DOCX, JPG, PNG{" "}
                </p>
            </div>
            <Button variant={"secondary"}> Browse files </Button>
        </section>
    );
};

export default DropBrowseFileArea;