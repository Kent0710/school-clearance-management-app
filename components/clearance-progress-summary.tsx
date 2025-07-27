/*
    Shows the progress bar of a either the user or a specific office
    @param label - the main label of the progress bar
    @param currCount - sets the current count for accomplished office or task
    @param maxCount - sets the maximum count for accomplished office or task
    @param value - the calculated value of the progress bar

    @returns - a usable progress bar with customizable label
*/

import { Progress } from "./ui/progress";

interface ClearanceProgressSummaryProps {
    label: string;
    currCount?: number;
    maxCount?: number;
    value?: number;
    className? : string;
}

const ClearanceProgressSummary: React.FC<ClearanceProgressSummaryProps> = ({
    label,
    currCount = 0,
    maxCount = 0,
    value = 0,
    className,
}) => {
    return (
        <div className={`space-y-2 ${className}`}>
            <div className="flex items-center justify-between">
                <p className="font-semibold"> {label} </p>
                <p className="font-bold text-2xl text-blue-500">
                    {" "}
                    {currCount}/{maxCount}{" "}
                </p>
            </div>
            <Progress value={value} />
            <div className="flex items-center justify-between">
                <small className="text-muted-foreground font-semibold">
                    {currCount} {" "} accomplished
                </small>
                <small className="text-muted-foreground font-semibold">
                    {maxCount - currCount} {" "}
                    remaining
                </small>
            </div>
        </div>
    );
};

export default ClearanceProgressSummary;
