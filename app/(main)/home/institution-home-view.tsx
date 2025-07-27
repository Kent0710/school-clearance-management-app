import ClearanceProgressSummary from "@/components/clearance-progress-summary";
import OfficeClearanceStatus from "@/components/office-clearance-status-summary";
import StudentInfoSummary from "@/components/student-info-summary";
import { User } from "lucide-react";

const InstitutionHomeView = () => {
    return (
        <div className="space-y-4">
            {/* Clearance Summary  */}
            <div className="border bg-yellow-100/50 p-4 px-10 rounded-lg space-y-4">
                <div className="flex space-x-2 items-center">
                    <User />
                    <div>
                        <h2 className="text-xl font-bold">
                            Clearance Progress
                        </h2>
                        <p className="text-muted-foreground text-sm">
                            {" "}
                            Track your clearance status across all offices.{" "}
                        </p>
                    </div>
                </div>
                <ClearanceProgressSummary
                    label="Clearance Progress Summary"
                    maxCount={10}
                    currCount={5}
                    value={50}
                />
            </div>

            <StudentInfoSummary />
            <OfficeClearanceStatus />
        </div>
    );
};

export default InstitutionHomeView;
