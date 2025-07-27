'use client'

import { DataTable } from "@/components/data-table";
import { InstitutionAdminsType } from "@/types/table-types";
import { ColumnDef } from "@tanstack/react-table";

const columns : ColumnDef<InstitutionAdminsType>[] = [
    {
        accessorKey : 'username',
        header : "Username",
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