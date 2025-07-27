'use client'

import { removeInstitutionAdmin } from "@/actions/institution";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { InstitutionAdminsType } from "@/types/table-types";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

const columns : ColumnDef<InstitutionAdminsType>[] = [
    {
        accessorKey : 'username',
        header : "Username",
    },  
    {
        accessorKey : 'isSuperAdmin',
        header : 'Actions',
        cell : ({ row }) => {
            if (row.original.isSuperAdmin) {
                return (
                    <Button 
                        onClick={async() => {
                            toast.loading("Removing admin...");
                            const res = await removeInstitutionAdmin(
                                row.original.accountId,
                                row.original.institutionId
                            );
                            toast.dismiss();
                            if (res.success) {
                                toast.success("Admin removed successfully.");
                                return;
                            }
                            toast.error(res.error);
                        }}
                    >

                        Remove
                    </Button>
                )
            } else return null;
        }
    },
]


interface InstitutionAdminsTableProps {
    data : InstitutionAdminsType[];
}
const InstitutionAdminsTable : React.FC<InstitutionAdminsTableProps> = ({
    data
}) => {
    return (
       <DataTable data={data} columns={columns} />
    )
};

export default InstitutionAdminsTable;