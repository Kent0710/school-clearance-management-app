"use client";

import {
    ArrowRight,
    ArrowRightToLine,
    Clock,
    Loader2,
    Mail,
} from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import Link from "next/link";
import { toast } from "sonner";
import { registerAccountToOffice } from "@/actions/office";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { Progress } from "@/components/ui/progress";
import Description from "@/components/description";

interface OfficeClearanceStatusContainerProps {
    officeName: string;
    isRegistered: boolean;
    institutionId: string;
    officeId: string;
    progress: number | null;
}

const OfficeClearanceStatusContainer: React.FC<
    OfficeClearanceStatusContainerProps
> = ({ officeName, isRegistered, institutionId, officeId, progress }) => {
    const [isRegistering, setIsRegistering] = useState(false);

    if (isRegistering) {
        return (
            <div className="flex space-x-2  items-center justify-center p-4 border rounded-lg bg-neutral-200 text-neutral-600 text-sm animate-pulse">
                <Loader2 className="animate-spin" />
                <p>Registering...</p>
            </div>
        );
    }

    const renderProgress = () => {
        switch (progress) {
            case 0:
                return "Not started";
            case 100:
                return "Completed";
            default:
                return "N/A";
        }
    };

    return (
        <div
            className={`flex shadow-sm items-center border p-8 rounded-lg  ${
                isRegistered
                    ? "bg-blue-50/30 border-blue-200"
                    : "bg-red-50/30 border-red-200"
            }`}
        >
            <section className="flex items-center space-x-8  w-full">
                <Clock />
                <div className="w-full space-y-2">
                    <section className="flex justify-between items-center">
                        <p className="font-semibold">{officeName}</p>
                        <Badge>{renderProgress()}</Badge>
                    </section>
                    {isRegistered ? (
                        <section className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Description className="text-xs"> {progress}% </Description>
                                <Description className="text-xs"> 3 clearence tasks </Description>
                            </div>
                            <Progress value={progress || 0} />
                            <div className="space-x-2">
                                <Link href={`/office/${officeId}`}>
                                    <Button>
                                        <ArrowRight /> Open office
                                    </Button>
                                </Link>
                                <Button variant={"secondary"}>
                                    {" "}
                                    <Mail />{" "}
                                </Button>
                            </div>
                        </section>
                    ) : (
                        <section className="space-y-2">
                            <Description>
                                {" "}
                                Register to monitor your progress{" "}
                            </Description>
                            <Progress value={0} />
                            <RegisterOfficeButton
                                institutionId={institutionId}
                                officeId={officeId}
                                setIsRegistering={setIsRegistering}
                            />
                        </section>
                    )}
                </div>
            </section>
        </div>
    );
};

export default OfficeClearanceStatusContainer;

interface RegisterOfficeButtonProps {
    institutionId: string;
    officeId: string;
    setIsRegistering: Dispatch<SetStateAction<boolean>>;
}
const RegisterOfficeButton: React.FC<RegisterOfficeButtonProps> = ({
    institutionId,
    officeId,
    setIsRegistering,
}) => {
    const handleOfficeRegistration = async () => {
        setIsRegistering(true);
        toast.loading("Registering office...");
        const res = await registerAccountToOffice(officeId, institutionId);
        toast.dismiss();
        if (!res.success) {
            toast.error(res.error);
            return;
        }
        toast.success("Office registered successfully!");
    };

    return (
        <Button onClick={handleOfficeRegistration}>
            {" "}
            <ArrowRightToLine /> Register{" "}
        </Button>
    );
};
