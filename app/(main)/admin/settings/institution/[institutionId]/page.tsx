import {
    getInstitutionAdminApplicants,
    getInstitutionAdmins,
    getInstitutionData,
} from "@/actions/institution";
import AdminApplicantsDataTable from "@/app/(main)/admin/_components/admin-applicants-data-table";
import BackButton from "@/components/back-button";
import Description from "@/components/description";
import { Card, CardContent } from "@/components/ui/card";
import { Building } from "lucide-react";
import React from "react";
import InstitutionAdminsTable from "../../../_components/institution-admins-table";

const AdminInstitutionSettingsPage = async () => {
    const { institution } = await getInstitutionData();
    const institutionId = await institution.id;
    const adminJoinCode = await institution.admin_join_code;

    const institutionInfo: InstitutionInfoItemProps[] = [
        {
            header: "Institution name",
            mainText: institution.name,
        },
        {
            header: "Join code (students)",
            mainText: institution.join_code,
        },
        {
            header: "Admin join code",
            mainText: adminJoinCode,
        },
    ];

    return (
        <div className="space-y-4">
            <BackButton text="Back to home" href={`/home`} />
            <header className="flex items-center space-x-2">
                <Building />
                <div>
                    <h1 className="text-xl font-medium">
                        {" "}
                        NU Lipa Admin Settings{" "}
                    </h1>
                    <p className="text-sm text-muted-foreground font-semibold">
                        Preferences and configuration for this institution.
                    </p>
                </div>
            </header>
            <main className="space-y-4">
                <section className="grid grid-cols-3 gap-4">
                    {institutionInfo.map(institution => (
                        <InstitutionInfoItem 
                            key={institution.header}
                            header={institution.header}
                            mainText={institution.mainText}
                        />
                    ))}
                </section>

                {adminJoinCode && (
                    <AdminApplicants
                        adminJoinCode={institution.admin_join_code}
                    />
                )}

                {institutionId && (
                    <InstitutionAdmins institutionId={institutionId} />
                )}
            </main>
        </div>
    );
};

export default AdminInstitutionSettingsPage;

interface InstitutionInfoItemProps {
    header: string;
    mainText: string;
}
const InstitutionInfoItem: React.FC<InstitutionInfoItemProps> = ({
    header,
    mainText,
}) => {
    return (
        <Card>
            <CardContent>
                <small className="text-muted-foreground font-medium">
                    {header}
                </small>
                <p className="text-2xl font-medium"> {mainText} </p>
            </CardContent>
        </Card>
    );
};

interface InstitutionAdminsProps {
    institutionId: string;
}
const InstitutionAdmins: React.FC<InstitutionAdminsProps> = async ({
    institutionId,
}) => {
    // Fetch institution admins
    const { admins } = await getInstitutionAdmins(institutionId);

    return (
        <section>
            <h2 className="text-lg font-medium"> Institution admins </h2>
            <Description> Manage admins for this institution. </Description>
            <InstitutionAdminsTable data={admins} />
        </section>
    );
};

interface AdminApplicantsProps {
    adminJoinCode: string;
}
const AdminApplicants: React.FC<AdminApplicantsProps> = async ({
    adminJoinCode,
}) => {
    const { applicants } = await getInstitutionAdminApplicants(adminJoinCode);

    return (
        <section>
            <h2 className="text-lg font-medium"> Admin applicants </h2>
            <Description>
                {" "}
                Manage admin applicants for this institution.{" "}
            </Description>
            <AdminApplicantsDataTable data={applicants} />
        </section>
    );
};
