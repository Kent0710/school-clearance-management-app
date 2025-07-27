"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { AdminApplicantType } from "@/types/table-types";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { acceptAsInstitutionAdmin } from "@/actions/institution";

const columns: ColumnDef<AdminApplicantType>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return (
                <Button
                    onClick={async () => {
                        toast.loading("Accepting applicant...");
                        const res = await acceptAsInstitutionAdmin(row.original.id);
                        toast.dismiss();
                        if (!res.success) {
                            toast.error(res.error)
                            return;
                        };
                        toast.success('Applicant accepted.')
                    }}
                >
                    {/* {row.original.id} */}
                    {row.original.type === "institution" && (
                        <> Accept as institution admin </>
                    )}

                    {row.original.type === "office" && (
                        <> Accept as office admin </>
                    )}
                </Button>
            );
        },
    },
];

interface AdminApplicantsDataTableProps {
    data: AdminApplicantType[];
}
const AdminApplicantsDataTable: React.FC<AdminApplicantsDataTableProps> = ({
    data,
}) => {
    return <DataTable data={data} columns={columns} />;
};

export default AdminApplicantsDataTable;
