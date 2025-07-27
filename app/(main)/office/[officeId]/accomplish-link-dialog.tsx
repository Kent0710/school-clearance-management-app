/*
    Used by OfficeTaskContainer component
    Handles link completion for users
*/
"use client";

import AccomplishLinkBlock from "@/components/accomplish-link-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { toast } from "sonner";

interface AccomplishLinkDialogProps {
    taskId: string;
}
const AccomplishLinkDialog: React.FC<AccomplishLinkDialogProps> = ({
    taskId,
}) => {
    const [open, setOpen] = useState(false);

    const handleMarkAsDone = (screenshotFile: File | null) => {
        if (screenshotFile) {
            toast.success("Mark as done: " + screenshotFile.name);
            setOpen(false);
            return;
        }

        toast.error("Screenshot file is required.");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Accomplish link</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center">
                        Accomplish given link{" "}
                        <Badge className="ml-2"> Due: Jul 5, 2025 </Badge>{" "}
                    </DialogTitle>
                    <DialogDescription>
                        Accomplish the given link below by one of the office
                        admin. Upload a screenshot afterwards and wait for
                        verification.
                    </DialogDescription>
                </DialogHeader>
                <main className="space-y-4 text-sm">
                    <AccomplishLinkBlock
                        taskId={taskId}
                        handleMarkAsDone={handleMarkAsDone}
                    />
                </main>
            </DialogContent>
        </Dialog>
    );
};

export default AccomplishLinkDialog;
