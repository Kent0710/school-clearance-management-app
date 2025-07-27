import BackButton from "@/components/back-button";
import { Badge } from "@/components/ui/badge";
import { Building, Clock, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import TaskSubmissionAreaRenderer from "./task-submission-area-renderer";

const SingleTaskPage = () => {
    const taskType = "link";

    return (
        <div className="space-y-4">
            <BackButton text="Back to office" href={`/office/1`} />
            <ul className="text-sm text-muted-foreground font-medium ">
                <div className="flex items-center space-x-2 ">
                    <h1 className="text-xl font-bold text-black">
                        {" "}
                        Task Name Goes Here{" "}
                    </h1>
                    <Badge> Pending </Badge>
                </div>
                <TaskDetailsItem
                    label="This task is under the:"
                    icon={Building}
                    strongText="Registrar's Office"
                />
                <TaskDetailsItem
                    label="Task is due on:"
                    icon={Clock}
                    strongText="Jul 5, 2025"
                />
            </ul>

            {/* Task Description  */}
            <section>
                <h2 className="text-lg font-bold"> Task Description </h2>
                <p>
                    {" "}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tenetur, a. Tempore, id. Magnam quis adipisci voluptate? Ex,
                    consectetur! Nam voluptatibus iste optio, minus mollitia
                    corporis ullam similique. Eos, quis omnis! Lorem ipsum dolor
                    sit amet consectetur adipisicing elit. Ullam nihil
                    perspiciatis impedit, sit vitae possimus error natus,
                    laborum asperiores quae iste autem quas et laboriosam sint
                    ipsam a dicta.
                </p>
            </section>

            {/* Task Notes  */}
            <section className="border-b pb-6">
                <h2 className="text-lg font-bold"> Task Notes </h2>
                <ul className="list-decimal ml-8">
                    <li> Go and submit file </li>
                    <li> Wait for validation </li>
                    <li> Clear the office </li>
                </ul>
            </section>

            {/* Submit file area  */}
            <section>
                <h2 className="text-lg font-bold"> Submission area </h2>
                <TaskSubmissionAreaRenderer taskType={taskType} taskId={"1"} />
            </section>
        </div>
    );
};

export default SingleTaskPage;

/*
    Responsible for rendering extra task details
    Fixed regardless of the task type
*/

interface TaskDetailsItemProps {
    label: string;
    strongText: string;
    icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
}
const TaskDetailsItem: React.FC<TaskDetailsItemProps> = ({
    label,
    strongText,
    icon: Icon,
}) => {
    return (
        <li className="flex items-center space-x-2">
            <p> {label} </p>
            <span className="flex items-center space-x-2">
                <Icon size={15} />
                <strong> {strongText} </strong>
            </span>
        </li>
    );
};
