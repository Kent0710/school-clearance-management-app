
import Description from "../../../components/description";
import { getInstitutionOffices } from "@/actions/institution";
import { getAccountClearanceOffices } from "@/actions/office";

import OfficeClearanceStatusContainer from "./office-clearance-status-container";

interface OfficeClearanceStatusProps {
    institutionId: string;
}

const OfficeClearanceStatus: React.FC<OfficeClearanceStatusProps> = async ({
    institutionId,
}) => {
    const { offices } = await getInstitutionOffices(institutionId);
    const { offices: accountOffices } = await getAccountClearanceOffices();

    // Create a Set of registered office IDs
    const registeredOfficeIds = new Set(accountOffices.map((o) => o.office_id));

    // Filter out offices that are already registered
    const unregisteredOffices = offices.filter(
        (office) => !registeredOfficeIds.has(office.id)
    );

    return (
        <section className="space-y-4">
            {/* Debug */}
            {/* <pre>{JSON.stringify(offices, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(accountOffices, null, 2)}</pre> */}

            <div>
                <h2 className="text-xl font-medium">Your Offices</h2>
                <Description>
                    Manage your office clearance status. Each office has its own
                    requirements and status.
                </Description>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Unregistered offices: show register button */}
                {unregisteredOffices.map((office) => (
                    <OfficeClearanceStatusContainer
                        key={office.id}
                        officeName={office.name}
                        isRegistered={false}
                        institutionId={institutionId}
                        officeId={office.id}
                        progress={null}
                    />
                ))}
                {/* Registered offices: show view status button */}
                {accountOffices.map((office) => (
                    <OfficeClearanceStatusContainer
                        key={office.office_id}
                        officeName={office.account_office.name}
                        isRegistered={true}
                        institutionId={institutionId}
                        officeId={office.office_id}
                        progress={office.progress}
                    />
                ))}
            </section>
        </section>
    );
};

export default OfficeClearanceStatus;

