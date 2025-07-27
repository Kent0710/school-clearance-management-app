/*
    Used by SingleTaskPage to render an area for accomplishing a link
    Similar logic with AccomplishLinkDialog but this does not show a dialog
    Renders an area for link accomplishment immediately
    Handles the state of the screenshot file as proof

    @params taskId - the id of the opened task
    @params handleMarkAsDone - a handler that passes the screenshot file (child to parent)
*/

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface AccomplishLinkBlockProps {
    taskId: string;
    handleMarkAsDone: (screenshotFile: File | null) => void;
}
export const AccomplishLinkBlock: React.FC<AccomplishLinkBlockProps> = ({
    taskId,
    handleMarkAsDone,
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [screenshotFile, setScreenshotFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            if (
                file.type === "image/jpeg" ||
                file.type === "image/png" ||
                file.type === "image/jpg"
            ) {
                setScreenshotFile(file);
                // Handle server logic
            } else {
                toast.error("Uploaded file has an invalid format.");
                setScreenshotFile(null);
                if (inputRef.current) {
                    inputRef.current.value = "";
                }
            }
        }
    };

    return (
        <div className="space-y-4">
            {/* Uploaded by */}
            <section>
                <p className="font-bold mb-2">Link by:</p>
                <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-yellow-500" />
                    <div>
                        <p className="font-semibold"> Namikazii nakiri </p>
                        <p> Posted: Jul 5, 2025 </p>
                    </div>
                </div>
            </section>
            {/* Actual link provided  */}
            <section>
                <p className="font-bold mb-2"> Uploaded link </p>
                <Link href={"#"}>
                    <Button
                        variant={"link"}
                        className="border w-full text-left self-start"
                    >
                        {" "}
                        http://localhost:3000{" "}
                    </Button>
                </Link>
            </section>
            {/* Screenshot  */}
            <section>
                <p className="font-bold">Proof upload</p>
                <Input
                    type="file"
                    className="my-2"
                    onChange={handleFileChange}
                    ref={inputRef}
                />
                <small className="font-semibold text-muted-foreground">
                    *Only jpg, jpeg and png formats are accepted.
                </small>
            </section>
            <Button
                className="w-full"
                onClick={() => handleMarkAsDone(screenshotFile)}
            >
                {" "}
                Mark as done{" "}
            </Button>
        </div>
    );
};

export default AccomplishLinkBlock;
