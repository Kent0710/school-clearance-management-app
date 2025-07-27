/*
    Used by SingleOfficePage component.
    A client component for interactivity on the fetched tasks data of the office
*/

"use client";

import { OfficeTasksType } from "@/types/objectTypes";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import OfficeTaskContainer from "./office-task-container";
import { useState } from "react";
import Description from "@/components/description";

interface OfficeTasksProps {
    officeTasks: OfficeTasksType[];
}
const OfficeTasks: React.FC<OfficeTasksProps> = ({ officeTasks }) => {
    // A copy state of the officeTasks for filtering and grouping
    const [mutableOfficeTasks, setMutableOfficeTasks] =
        useState<OfficeTasksType[]>(officeTasks);

    const [selectedFilter, setSelectedFilter] = useState<string | undefined>(
        undefined
    );

    return (
        <div className="space-y-2">
            {/* Header section  */}
            <section className="flex items-center justify-between">
                {/* Left  */}
                <div>
                    <h2> Office Tasks </h2>
                    <Description>
                        Accomplish all task to clear this office.
                    </Description>
                </div>
                {/* Right  */}
                <div>
                    <Select
                        value={selectedFilter}
                        onValueChange={(prevVal) => {
                            if (prevVal === "all") {
                                setMutableOfficeTasks(officeTasks);
                                return;
                            }
                            setMutableOfficeTasks(
                                officeTasks.filter(
                                    (task) =>
                                        task.taskStatus.toLowerCase() ===
                                        prevVal
                                )
                            );
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Filer by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                            <SelectItem value="accomplished">
                                Accomplished
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mutableOfficeTasks.map((task) => (
                    <OfficeTaskContainer
                        key={task.id}
                        taskId={task.id}
                        taskName={task.taskName}
                        taskDescription={task.taskDescription}
                        taskDueDate={task.taskDueDate}
                        taskStatus={task.taskStatus}
                        allowOnlineSubmission={task.allowOnlineSubmission}
                        type={task.type}
                    />
                ))}
            </section>
        </div>
    );
};

export default OfficeTasks;
