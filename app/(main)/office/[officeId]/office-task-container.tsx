/*
    Used by OfficeTasks component.
    Used to render individual office tasks using map function
*/

import { Badge } from "@/components/ui/badge";
import { Maximize } from "lucide-react";
import AlreadyAccomplishedForm from "./already-accomplished-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SubmitFileDialog from "./submit-file-dialog";
import AccomplishLinkDialog from "./accomplish-link-dialog";

interface OfficeTaskContainerProps {
    taskId: string;
    taskName: string;
    taskStatus: string;
    taskDescription: string;
    taskDueDate: string;
    allowOnlineSubmission: boolean;
    type: "link" | "file";
}
const OfficeTaskContainer: React.FC<OfficeTaskContainerProps> = ({
    taskId,
    taskName,
    taskStatus,
    taskDescription,
    taskDueDate,
    allowOnlineSubmission,
    type,
}) => {
    return (
        <div className="border p-4 rounded-lg flex flex-col items-center justify-center space-y-4">
            <div className="space-x-2 flex items-center justify-between w-full">
                <div className="space-x-2">
                    <Badge> {taskStatus} </Badge>
                    <Badge> Due: {taskDueDate} </Badge>
                </div>
                <div className="space-x-2">
                    <Link href={`/office/task/1`}>
                        <Button
                            size={"icon"}
                            variant={"secondary"}
                            className="hover:opacity-80 hover:cursor-pointer hover:shadow-sm hover:border"
                        >
                            <Maximize />
                        </Button>
                    </Link>
                </div>
            </div>
            <div>
                <p className="font-bold text-center"> {taskName} </p>
                <p className="text-center"> {taskDescription} </p>
            </div>
            <SubmissionComponent
                allowOnlineSubmission={allowOnlineSubmission}
                taskId={taskId}
                type={type}
            />
            <div className="text-muted-foreground font-semibold text-xs">
                <> Already accomplished? </>
                <AlreadyAccomplishedForm taskId={taskId} />
            </div>
        </div>
    );
};

export default OfficeTaskContainer;

interface SubmissionComponentProps {
    allowOnlineSubmission: boolean;
    taskId: string;
    type: string;
}
const SubmissionComponent: React.FC<SubmissionComponentProps> = ({
    allowOnlineSubmission,
    taskId,
    type,
}) => {
    if (!allowOnlineSubmission) {
        return (
            <div className="rounded-lg py-1.5 px-3 border font-semibold text-red-500">
                {" "}
                Online submission not allowed{" "}
            </div>
        );
    }

    if (type === "file") return <SubmitFileDialog taskId={taskId} />;
    if (type === "link") return <AccomplishLinkDialog taskId={taskId} />;

    return null;
};
