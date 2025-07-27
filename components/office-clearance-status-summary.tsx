import { Building, Clock } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";

const OfficeClearanceStatus = () => {
    const officesStatus = [
        {
            officeName: "Registrar",
            status: "Pending",
            description: "You have files to submit.",
        },
        {
            officeName: "Accounting",
            status: "Pending",
            description: "You have files to submit.",
        },
        {
            officeName: "Libary",
            status: "Pending",
            description: "You have files to submit.",
        },
        {
            officeName: "Discipline Office",
            status: "Pending",
            description: "You have files to submit.",
        },
        {
            officeName: "Student Development and Activities Coordinator",
            status: "Pending",
            description: "You have files to submit.",
        },
        {
            officeName: "Subject Coordinator",
            status: "Pending",
            description: "You have files to submit.",
        },
        {
            officeName: "Principal",
            status: "Pending",
            description: "You have files to submit.",
        },
        {
            officeName: "Guidance Office",
            status: "Pending",
            description: "You have files to submit.",
        },
        {
            officeName: "Health Services Office",
            status: "Pending",
            description: "You have files to submit.",
        },
        {
            officeName: "Information Technology Services Office",
            status: "Pending",
            description: "You have files to submit.",
        },
        {
            officeName: "Adviser",
            status: "Pending",
            description: "You have files to submit.",
        },
    ];

    return (
        <div className="p-4 px-10 space-x-2 border rounded-lg">
            <div className="flex items-center space-x-2">
                <Building />
                <div>
                    <h2 className="text-xl font-bold">
                        {" "}
                        Office Clearance Status
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Detailed status for each office.
                    </p>
                </div>
            </div>

            <section className="space-y-4 p-8">
                {officesStatus.map((status) => (
                    <OfficeClearanceStatusContainer
                        key={status.officeName}
                        status={status.status}
                        officeName={status.officeName}
                        description={status.description}
                    />
                ))}
            </section>
        </div>
    );
};

export default OfficeClearanceStatus;

interface OfficeClearanceStatusProps {
    officeName: string;
    status: string;
    description: string;
}
const OfficeClearanceStatusContainer: React.FC<OfficeClearanceStatusProps> = ({
    officeName,
    status,
    description,
}) => {
    return (
        <div className="flex justify-between items-center border p-4 px-8 rounded-lg">
            {/* Left  */}
            <section className="flex items-center space-x-8">
                <Clock />
                <div>
                    <p className="font-semibold"> {officeName} </p>
                    <p className="text-sm text-muted-foreground font-semibold">
                        {" "}
                        {description}{" "}
                    </p>
                    <div className="space-x-2">
                        <Link href={`/office/1`}>
                            <Button className="mt-2">
                                {" "}
                                View office status{" "}
                            </Button>
                        </Link>
                        <Button variant={"secondary"}> Send a mail </Button>
                    </div>
                </div>
            </section>

            {/* Right  */}
            <section>
                <Badge> {status} </Badge>
            </section>
        </div>
    );
};
