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
                    <h2 className="text-lg font-bold"> Office Tasks </h2>
                    <p className="text-sm text-muted-foreground font-semibold">
                        Accomplish all task to clear this office.
                    </p>
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
            <section className="grid grid-cols-2 grid-rows-1 gap-4">
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
