"use server";

import { createOfficeFormSchema } from "@/types/formSchemaTypes";
import { z } from "zod";
import { getAccount } from "./auth";
import { revalidatePath } from "next/cache";

export async function getAccountOffice(officeId: string) {
    const { supabase, account } = await getAccount();

    const { data: office, error: officeError } = await supabase
        .from("account_office")
        .select("*, office(*)")
        .eq("office_id", officeId)
        .eq("account_id", account.id)
        .single();

    if (officeError || !office) {
        console.error("Can not get account office. ERR: " + officeError?.message);
        return {
            success: false,
            error: "Something went wrong. Try again.",
            office: null,
        };
    }

    return {
        success: true,
        error: "",
        accountOffice: office,
    };
}

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

export async function getAccountClearanceOffices() {
    const { supabase, account } = await getAccount();

    const { data: offices, error: officeError } = await supabase
        .from("account_office")
        .select("*, account_office:office(*)")
        .eq("account_id", account.id);

    if (officeError) {
        console.error("Can not get account clearance offices. ERR: " + officeError.message);
        return {
            success: false,
            error: "Something went wrong. Try again.",
            offices: []
        };
    }

    return {
        success: true,
        error: "",
        offices: offices || []
    };
}

export async function registerAccountToOffice(officeId: string, institutionId : string) {
    const { supabase, account } = await getAccount();

    const { error: registerError } = await supabase
        .from("account_office")
        .insert({
            account_id: account.id,
            office_id: officeId,
            institution_id : institutionId,
            progress : 0
        });

    if (registerError) {
        console.error(
            "Can not register account to office. ERR: " + registerError.message
        );
        return {
            success: false,
            error: "Something went wrong. Try again.",
        };
    }

    revalidatePath('/home');
    return {
        success: true,
        error: "",
    };
}