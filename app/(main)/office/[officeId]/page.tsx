import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Mail } from "lucide-react";
import Link from "next/link";
import { OfficeTasksType } from "@/types/objectTypes";
import OfficeTasks from "./office-tasks";
import ClearanceProgressSummary from "@/components/clearance-progress-summary";
import BackButton from "@/components/back-button";

const SingleOfficePage = async () => {
    const tasks: OfficeTasksType[] = [
        {
            id: "1",
            taskName: "Clearance Form",
            taskDescription: "Accomplish all assigned clearance offices.",
            taskStatus: "Pending",
            taskDueDate: "Jul 5 2025",
            allowOnlineSubmission: true,
            type : 'file',
        },
        {
            id: "2",
            taskName: "Clearance Form",
            taskDescription: "Accomplish all assigned clearance offices.",
            taskStatus: "Archived",
            taskDueDate: "Jul 5 2025",
            allowOnlineSubmission: false,
            type : 'file',
        },
        {
            id: "3",
            taskName: "Clearance Form",
            taskDescription: "Accomplish all assigned clearance offices.",
            taskStatus: "Accomplished",
            taskDueDate: "Jul 5 2025",
            allowOnlineSubmission: true,
            type : 'link',
        },
    ];

    return (
        <div className="space-y-4">
            <BackButton text="Back to home" href="/home" />
            {/* Welcome Header and Controls  */}
            <section className="flex items-center justify-between border-b pb-5">
                <div className="flex space-x-4 items-center ">
                    <div>
                        <h1 className="text-xl font-bold ">
                            {" "}
                            Welcome to the Registrar&apos;s Office!{" "}
                        </h1>
                        <p className="text-sm text-muted-foreground font-semibold">
                            {" "}
                            Manage and accomplish all registrar&apos;s task to
                            clear this office.{" "}
                        </p>
                    </div>
                    <Badge> Pending </Badge>
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
                currCount={3}
                maxCount={6}
                value={25}
            />

            {/* Task section  */}
            <OfficeTasks officeTasks={tasks} />
        </div>
    );
};

export default SingleOfficePage;
