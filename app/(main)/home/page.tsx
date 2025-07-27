import { checkUserInstitution, getRole } from "@/actions/users";
import JoinInstitutionDialog from "./join-institution-dialog";
import InstitutionHomeView from "./institution-home-view";
import UnassignedAdmin from "./unassigned-admin-view";
import InstitutionAdminView from "./_admin-components/institution-admin-view";

const HomePage = async () => {
    return (
        <div className="space-y-20">
            <InstitutionAdminView />
            <InstitutionHomeView />
        </div>
    );
    // Check if the current user has a joined institution
    // const hasInstitution = await checkUserInstitution();

    // if (!hasInstitution) {
    //     const role = await getRole();

    //     if (role === "student") {
    //         return (
    //             <div className="flex items-center justify-center h-full pb-20">
    //                 <JoinInstitutionDialog />
    //             </div>
    //         );
    //     } else if (role === "unassigned_admin") {
    //         return <UnassignedAdmin />
    //     } else if (role === 'institution_admin') {
    //         return <InstitutionAdminView />
    //     }
    // }

    // return <InstitutionHomeView />
};

export default HomePage;
