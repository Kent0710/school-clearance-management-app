/*
    Used by SingleTaskPage component
    Every task page has a submission area
    Every task has either the types: file or link
    This renderer is responsible for rendering the component for task type

    @params taskType - the type of the task: 'file' or 'link
    @params taskId - the id of the opened task
*/

'use client'

import SubmitFileBlock from "./submit-file-block";
import AccomplishLinkBlock from "../../../../../components/accomplish-link-block";
import { toast } from "sonner";

interface TaskSubmissionAreaRendererProps {
    taskType: string;
    taskId: string;
}
const TaskSubmissionAreaRenderer: React.FC<TaskSubmissionAreaRendererProps> = ({
    taskType,
    taskId,
}) => {
    /*
        Handler for screenshot file submission of the AccomplishLinkBlock component
        See AccomplishLinkBlock component for params documentation
        AccomplishLinkBlock passes a screenshotFile to this handler (child to parent)

        @params screenshotFile  - the passed screenshot file from the child AccomplishLinkBlock component
    */
    const handleMarkAsDone = (screenshotFile: File | null) => {
        if (!screenshotFile) {
            toast.error("Screenshot proof is required.");
            return;
        }

        toast.success("Screenshot submitted. Wait for verification.");
    };

    if (taskType === "file") return <SubmitFileBlock />;
    if (taskType === "link")
        return (
            <AccomplishLinkBlock
                taskId={taskId}
                handleMarkAsDone={handleMarkAsDone}
            />
        );

    return null;
};

export default TaskSubmissionAreaRenderer;