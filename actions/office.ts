"use server";

import { createOfficeFormSchema } from "@/types/formSchemaTypes";
import { z } from "zod";
import { getAccount } from "./auth";
import { revalidatePath } from "next/cache";

export async function createOffice(
    values: z.infer<typeof createOfficeFormSchema>
) {
    const { supabase, account } = await getAccount();

    /*
        Check if the role is institution_admin
            If it is, allow office creation
            If not, do not allow office creation
    */
    const isRoleValid = account.role === 'institution_admin' ? true : false;
    if (!isRoleValid) {
        console.error("Only institution admins can create an office.")
        return {
            success : false,
            error : 'You are not allowed to create an office.'
        }
    };

    const { error : officeError } = await supabase.from('office').insert({
        name : values.officeName,
        institution_id : account.institution_id,
    });

    if (officeError) {
        console.error('Can not create an office. ERR: ' + officeError.message);
        return {
            success : false,
            error : "Can not create an office. Try again."
        }
    };

    revalidatePath('/home')
    return {
        success : true,
        error : ''
    }
}
