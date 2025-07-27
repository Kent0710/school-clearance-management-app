import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Mail } from "lucide-react";
import Link from "next/link";
import { OfficeTasksType } from "@/types/objectTypes";
import OfficeTasks from "./office-tasks";
import ClearanceProgressSummary from "@/components/clearance-progress-summary";
import BackButton from "@/components/back-button";
import { getAccountOffice } from "@/actions/office";

const SingleOfficePage = async ({
    params,
}: {
    params: { officeId: string };
}) => {
    const { officeId } = await params;
    const { accountOffice } = await getAccountOffice(officeId);

    const tasks: OfficeTasksType[] = [
        {
            id: "1",
            taskName: "Clearance Form",
            taskDescription: "Accomplish all assigned clearance offices.",
            taskStatus: "Pending",
            taskDueDate: "Jul 5 2025",
            allowOnlineSubmission: true,
            type: "file",
        },
        {
            id: "2",
            taskName: "Clearance Form",
            taskDescription: "Accomplish all assigned clearance offices.",
            taskStatus: "Archived",
            taskDueDate: "Jul 5 2025",
            allowOnlineSubmission: false,
            type: "file",
        },
        {
            id: "3",
            taskName: "Clearance Form",
            taskDescription: "Accomplish all assigned clearance offices.",
            taskStatus: "Accomplished",
            taskDueDate: "Jul 5 2025",
            allowOnlineSubmission: true,
            type: "link",
        },
    ];

    return (
        <div className="space-y-4">
            <BackButton text="Back to home" href="/home" />
            {/* Welcome Header and Controls  */}
            <section className="flex items-center justify-between border-b pb-5">
                <div className="flex space-x-4 items-center ">
                    <div>
                        <h1 className="text-xl font-medium ">
                            {" "}
                            Welcome to the {accountOffice.office.name} office!
                        </h1>
                        <p className="text-sm text-muted-foreground font-semibold">
                            {" "}
                            Manage and accomplish all {accountOffice.name} tasks
                            to clear this office.{" "}
                        </p>
                    </div>
                    <Badge>
                        {" "}
                        {Math.floor(
                            (accountOffice.progress / 100) *
                                accountOffice.office.task_count
                        ) !== accountOffice.office.taskCount
                            ? "Not cleared"
                            : "Cleared"}{" "}
                    </Badge>
                </div>
                <div className="space-x-2">
                    <Button variant={"outline"}>
                        <Mail /> Mail
                    </Button>
                </div>
            </section>

            {/* Progress Section  */}
            <ClearanceProgressSummary
                className="border-b pb-5"
                label="Office Task Progress"
                currCount={Math.floor(
                    (accountOffice.progress / 100) *
                        accountOffice.office.task_count
                )}
                maxCount={accountOffice.office.task_count}
                value={accountOffice.progress}
            />

            {/* Task section  */}
            <OfficeTasks officeTasks={tasks} />
        </div>
    );
};

export default SingleOfficePage;
