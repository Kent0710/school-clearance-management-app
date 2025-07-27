/*
    Used by OfficeTaskContainer component
    Handles file upload for tasks that required online files
*/

"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import DropBrowseFileArea from "../../../../components/drop-browse-file-area";
import {  X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface SubmitFileDialogProps {
    taskId: string;
}
const SubmitFileDialog: React.FC<SubmitFileDialogProps> = ({ taskId }) => {
    const [open, setOpen] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const handleSubmission = async () => {
        setOpen(false);
        toast.success('File submitted successfully.')
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Submit file</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Submit required file</DialogTitle>
                    <DialogDescription>
                        Submit the required file for this office task. Uploaded
                        file is subject to validation and will take time for the
                        office to verify.
                    </DialogDescription>
                </DialogHeader>
                {/* Additional notes  */}
                <section className="text-sm">
                    <p className="font-semibold"> Additional notes: </p>
                    <ul className="ml-4 list-disc">
                        <li> Up to 3 files only. </li>
                    </ul>
                </section>
                <DropBrowseFileArea setUploadedFiles={setUploadedFiles} />
                <UploadedFilesList
                    uploadedFiles={uploadedFiles}
                    setUploadedFiles={setUploadedFiles}
                />
                <Button onClick={handleSubmission}> Confirm submission </Button>
            </DialogContent>
        </Dialog>
    );
};

export default SubmitFileDialog;

interface UploadedFilesListProps {
    uploadedFiles: File[];
    setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}
const UploadedFilesList: React.FC<UploadedFilesListProps> = ({
    uploadedFiles,
    setUploadedFiles,
}) => {
    return (
        <ul>
            {uploadedFiles.map((file, index) => (
                <li
                    key={file.name + index}
                    className="flex justify-between items-center"
                >
                    <span>
                        <strong>Name:</strong> {file.name}
                    </span>
                    <X
                        onClick={() => {
                            setUploadedFiles((prevFiles) =>
                                prevFiles.filter((_, i) => i !== index)
                            );
                        }}
                    />
                </li>
            ))}
        </ul>
    );
};
