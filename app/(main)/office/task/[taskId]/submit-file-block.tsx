/*
    Used by SingleTaskPage to render an area for submitting a file
    Similar logic with SubmitFileDialog but this does not show a dialog
    Renders an area for file upload immediately
    Handles the state of the DropBrowseFileArea
*/

"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import DropBrowseFileArea from "../../../../../components/drop-browse-file-area";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const SubmitFileBlock = () => {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    return (
        <div className="grid grid-cols-2">
            {/* Section for viewing the uploaded files  */}
            <section>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>File</TableHead>
                            <TableHead>Type</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {uploadedFiles.map((file, index) => (
                            <TableRow key={index}>
                                <TableCell> {file.name} </TableCell>
                                <TableCell> {file.type} </TableCell>
                                <TableCell>
                                    <Button
                                        size={"icon"}
                                        variant={"secondary"}
                                        onClick={() => {
                                            setUploadedFiles((prevFiles) =>
                                                prevFiles.filter(
                                                    (_, i) => i !== index
                                                )
                                            );
                                        }}
                                    >
                                        <X />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <ul></ul>
            </section>

            {/* Section for the drag and drop for file submission  */}
            <section>
                <DropBrowseFileArea setUploadedFiles={setUploadedFiles} />
            </section>
        </div>
    );
};

export default SubmitFileBlock;
